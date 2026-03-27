import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const MEMORY_FILE = path.join('.agent', 'memory', 'knowledge_base.json');

export async function getEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: { parts: [{ text }] }
    })
  });

  const data = await response.json();
  return data.embedding.values;
}

export function saveToMemory(item) {
  let memory = [];
  if (fs.existsSync(MEMORY_FILE)) {
    memory = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
  }
  memory.push({
    ...item,
    timestamp: new Date().toISOString()
  });
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

export function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (mag1 * mag2);
}

export async function searchMemory(query, limit = 3) {
  if (!fs.existsSync(MEMORY_FILE)) return [];
  
  const queryEmbedding = await getEmbedding(query);
  const memory = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));

  const results = memory.map(item => ({
    ...item,
    similarity: cosineSimilarity(queryEmbedding, item.embedding)
  }))
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, limit);

  return results;
}
