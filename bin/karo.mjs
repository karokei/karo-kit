#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const ORCHESTRATOR_PATH = path.join(__dirname, '..', 'orchestrator', 'index.mjs');
const DASHBOARD_PATH = path.join(__dirname, '..', 'orchestrator', 'dashboard.mjs');
const INIT_PATH = path.join(__dirname, '..', 'orchestrator', 'init.mjs');
const DOCTOR_PATH = path.join(__dirname, '..', '.agent', 'scripts', 'karo_doctor.py');

switch (command) {
  case 'init':
    console.log('🚀 Khởi tạo Karo Agent cho dự án mới...');
    import(pathToFileURL(INIT_PATH).href);
    break;


  case 'start':
    const workflow = args[1] || 'build-system';
    const input = args[2] || 'default';
    execSync(`node ${ORCHESTRATOR_PATH} ${workflow} "${input}"`, { stdio: 'inherit' });
    break;

  case 'dashboard':
    execSync(`node ${DASHBOARD_PATH}`, { stdio: 'inherit' });
    break;

  case 'doctor':
    execSync(`python ${DOCTOR_PATH}`, { stdio: 'inherit' });
    break;

  case 'help':
  default:
    console.log(`
🌟 KARO KIT CLI v1.0.0 🌟

Sử dụng: karo <lệnh> [tham số]

Các lệnh hỗ trợ:
  init          Khởi tạo Karo Agent (.agent folder) vào dự án hiện tại.
  start <wf>    Chạy một Karo Workflow (vd: karo start fix-bug "lỗi CSS").
  dashboard     Mở Dashboard Premium trực quan.
  doctor        Kiểm tra sức khỏe hệ thống Karo.
  help          Hiển thị hướng dẫn này.

Chúc sếp một ngày tốt lành! 🫡🔥
    `);
    break;
}
