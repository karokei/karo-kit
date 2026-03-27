import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { saveToMemory, searchMemory, getEmbedding } from "./memory.mjs";

const PROJECT_ROOT = process.cwd();
const AGENT_DIR = path.join(PROJECT_ROOT, ".agent");
const WORKFLOW_DIR = path.join(AGENT_DIR, "workflows");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

function loadWorkflow(name) {
  if (!fs.existsSync(AGENT_DIR)) {
    throw new Error(`\n❌ Không tìm thấy thư mục .agent tại: ${PROJECT_ROOT}\n💡 Sếp vui lòng chạy lệnh "karo init" trước để khởi tạo bộ não cho dự án nhé! 🫡🔥\n`);
  }

  let file = path.join(WORKFLOW_DIR, `${name}.md`);
  if (!fs.existsSync(file)) {
    // Thử thêm prefix 'karo-' nếu sếp quên
    file = path.join(WORKFLOW_DIR, `karo-${name}.md`);
  }
  if (!fs.existsSync(file)) {
    throw new Error(`\n❌ Workflow "${name}" không tồn tại trong danh sách Karo Kit.\n📂 Vị trí kiểm tra: ${WORKFLOW_DIR}\n💡 Sếp kiểm tra lại tên file trong thư mục .agent/workflows nhé! 🕵️‍♂️🔍\n`);
  }
  return fs.readFileSync(file, "utf-8");
}


function parseSteps(content) {
  return content.split("\n").filter(l => l.includes("karo-"));
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
  console.log(`🚀 Khởi chạy Karo Workflow: ${name}`);

  const content = loadWorkflow(name);
  const steps = parseSteps(content);

  let context = { input, history: [] };

  for (const step of steps) {
    context = await runStep(step, context);
  }

  // 💾 Ghi nhớ kết quả workflow này để lần sau dùng lại
  for (const entry of context.history) {
    const embedding = await getEmbedding(entry.step);
    saveToMemory({ step: entry.step, decision: entry.decision, embedding });
  }

  console.log("✅ Hoàn tất và đã ghi nhớ kinh nghiệm.");
  return context;
}

// CLI
const args = process.argv.slice(2);
const workflow = args[0] || "build-system";
const input = args[1] || "default";

runWorkflow(workflow, input);
