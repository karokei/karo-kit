import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { saveToMemory, searchMemory, getEmbedding, updateContinuity, readContinuity, saveLearnings } from "./memory.mjs";

const PROJECT_ROOT = process.cwd();
const AGENT_DIR = path.join(PROJECT_ROOT, ".agent");
const SKILLS_DIR = path.join(PROJECT_ROOT, "skills");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

function loadSkill(name) {
  let skillName = name.startsWith('karo-') ? name : `karo-${name}`;
  let skillDir = path.join(SKILLS_DIR, skillName);
  let file = path.join(skillDir, "SKILL.md");

  if (!fs.existsSync(file)) {
    throw new Error(`\n❌ Không tìm thấy kỹ năng "${name}" tại: ${skillDir}\n💡 Sếp kiểm tra lại thư mục skills/ nhé! 🕵️‍♂️🔍\n`);
  }
  return fs.readFileSync(file, "utf-8");
}


function parseSteps(content) {
  // Tìm các dòng bắt đầu bằng số trong mục Protocol
  const protocolMatch = content.match(/## Protocol([\s\S]*?)(##|$)/);
  if (!protocolMatch) return content.split("\n").filter(l => l.includes("karo-"));
  
  return protocolMatch[1]
    .split("\n")
    .map(line => line.trim())
    .filter(line => /^\d+\./.test(line));
}

async function geminiReason(prompt) {
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "execute";
}

async function runStep(step, context) {
  // 🧠 RAG: Tìm kiếm kinh nghiệm tương đương từ bộ nhớ
  const memories = await searchMemory(step, 3);
  const memoryContext = memories.length > 0 
    ? `\nKinh nghiệm từ quá khứ:\n${memories.map(m => `- Step: ${m.step}, Kết quả: ${m.decision}`).join('\n')}`
    : "";

  const decision = await geminiReason(
    `Nhiệm vụ: ${step}\nNgữ cảnh: ${JSON.stringify(context)}${memoryContext}\nHãy đưa ra quyết định thực thi (ngắn gọn):`
  );

  console.log(`🤖 Gemini decision: ${decision}`);

  return {
    ...context,
    history: [...(context.history || []), { step, decision }]
  };
}

async function runWorkflow(name, input) {
  console.log(`🚀 Khởi chạy Karo Skill: ${name}`);

  const content = loadSkill(name);
  const steps = parseSteps(content);

  const existingContinuity = readContinuity();
  let context = { 
    input, 
    history: [],
    continuity: existingContinuity // 🧠 Thêm ngữ cảnh từ continuity nếu có
  };

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    context = await runStep(step, context);
    
    // 📝 Cập nhật Working Memory sau mỗi bước
    updateContinuity({
      currentTask: name,
      steps: steps.map((s, idx) => ({ 
        desc: s, 
        status: idx <= i ? 'done' : 'pending' 
      })),
      notes: `Đang thực hiện bước ${i+1}/${steps.length}`
    });
  }

  // 💾 Ghi nhớ kết quả workflow này để lần sau dùng lại
  for (const entry of context.history) {
    const embedding = await getEmbedding(entry.step);
    saveToMemory({ step: entry.step, decision: entry.decision, embedding });
  }

  // ⚖️ THE JUDGE REVIEW
  console.log("\n⚖️ Đang gọi Judge Agent để review kết quả cuối cùng...");
  const judgeVerdict = await geminiReason(
    `BẠN LÀ JUDGE AGENT. Hãy review quá trình và kết quả sau:\nTask: ${name}\nInput: ${input}\nLịch sử thực thi: ${JSON.stringify(context.history)}\n\nHãy đưa ra nhận xét ngắn gọn và kết luận đạt (PASS) hay không (FAIL).`
  );
  console.log(`👨‍⚖️ Kết luận của Judge: ${judgeVerdict}`);

  // 🎓 Lưu bài học kinh nghiệm tổng thể
  saveLearnings(`Skill "${name}" hoàn tất. Judge Verdict: ${judgeVerdict.slice(0, 50)}...`);

  console.log("✅ Hoàn tất và đã ghi nhớ kinh nghiệm.");
  return context;
}

// CLI
const args = process.argv.slice(2);
const workflow = args[0] || "build-system";
const input = args[1] || "default";

runWorkflow(workflow, input);
