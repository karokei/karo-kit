import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fetch from 'node-fetch';
import chalk from 'chalk';
import boxen from 'boxen';
import { searchMemory, saveToMemory, getEmbedding } from './memory.mjs';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const rl = readline.createInterface({ input, output });

async function askGemini(prompt, history) {
  const contents = [
    ...history,
    { role: 'user', parts: [{ text: prompt }] }
  ];

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Em xin lỗi, em đang bị mất kết nối một chút ạ... 🫡";
}

async function wakeUp() {
  console.log('\x1Bc'); // Clear screen
  const welcome = chalk.cyan.bold("💎 KARO AGENT v1.5.1 - INTERACTIVE MODE 💎") + 
                  chalk.white("\nChào sếp! Em đã thức giấc và sẵn sàng phục vụ. Sếp dặn dò em gì thế ạ? 🫡🔥") +
                  chalk.gray("\n(Gõ 'exit' hoặc 'quit' để em đi ngủ tiếp nhé sếp!)");
  
  console.log(boxen(welcome, { padding: 1, borderColor: 'magenta', borderStyle: 'double' }));

  let chatHistory = [];

  while (true) {
    const userInput = await rl.question(chalk.green.bold('\nSếp Karo 👤: '));
    
    if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
      console.log(chalk.yellow('\nDạ vâng, em xin phép đi ngủ tiếp đây ạ. Chúc sếp một ngày tuyệt vời! 🫡💤\n'));
      break;
    }

    if (!userInput.trim()) continue;

    console.log(chalk.gray('\n🤖 Karo Agent đang suy nghĩ...'));

    try {
      // 🧠 RAG: Kiểm tra bộ nhớ xem có gì liên quan không
      const memories = await searchMemory(userInput, 2);
      const memoryContext = memories.length > 0 
        ? `\n(Ghi chú từ bộ nhớ: ${memories.map(m => m.step).join(', ')})`
        : "";

      const response = await askGemini(userInput + memoryContext, chatHistory);
      
      console.log(chalk.cyan.bold('\nKaro Agent 🤖: ') + chalk.white(response));
      
      chatHistory.push({ role: 'user', parts: [{ text: userInput }] });
      chatHistory.push({ role: 'model', parts: [{ text: response }] });

      // Giới hạn history để tránh quá tải token
      if (chatHistory.length > 10) chatHistory.splice(0, 2);

    } catch (error) {
      console.error(chalk.red('\n❌ Lỗi rồi sếp ơi:'), error.message);
    }
  }

  process.exit(0);
}

wakeUp();
