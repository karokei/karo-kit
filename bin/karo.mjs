#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import chalk from 'chalk';
import boxen from 'boxen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const ORCHESTRATOR_PATH = path.join(__dirname, '..', 'orchestrator', 'index.mjs');
const DASHBOARD_PATH = path.join(__dirname, '..', 'orchestrator', 'dashboard.mjs');
const INIT_PATH = path.join(__dirname, '..', 'orchestrator', 'init.mjs');
const DOCTOR_PATH = path.join(__dirname, '..', '.agent', 'scripts', 'karo_doctor.py');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
const currentVersion = packageJson.version;

function checkForUpdate(silent = false) {
  try {
    const latestVersion = execSync('npm view karo-kit version', { encoding: 'utf-8' }).trim();
    if (latestVersion !== currentVersion) {
      const message = chalk.yellow.bold(`🔔 Đã có phiên bản mới: ${chalk.green(latestVersion)}`) + 
                      chalk.white(`\nSếp đang dùng bản: ${chalk.red(currentVersion)}`) + 
                      chalk.cyan(`\n\nGõ lệnh để cập nhật ngay sếp ơi:`) + 
                      chalk.white(`\nnpm install -g karo-kit`);
      
      console.log('\n' + boxen(message, { 
        padding: 1, 
        margin: 1, 
        borderColor: 'yellow', 
        borderStyle: 'double',
        title: '💎 KARO UPDATE NOTIFIER 💎'
      }));
      return true;
    } else if (!silent) {
      console.log(chalk.green(`\n✅ Chúc mừng sếp! Karo Agent v${currentVersion} đã là bản mới nhất rồi ạ! 🫡🔥\n`));
    }
  } catch (error) {
    if (!silent) console.error(chalk.red('❌ Không thể kiểm tra update. Sếp hãy kiểm tra lại kết nối mạng nhé!'));
  }
  return false;
}

switch (command) {
  case 'init':
    checkForUpdate(true); // 🤫 Kiểm tra âm thầm
    console.log('🚀 Khởi tạo Karo Agent cho dự án mới...');
    import(pathToFileURL(INIT_PATH).href);
    break;

  case 'update':
    checkForUpdate(false); // 🕵️‍♂️ Kiểm tra chi tiết
    break;

  case 'start':
    checkForUpdate(true); // 🤫 Kiểm tra âm thầm
    const workflow = args[1] || 'build-system';
    const input = args[2] || 'default';
    execSync(`node ${ORCHESTRATOR_PATH} ${workflow} "${input}"`, { stdio: 'inherit' });
    break;

  case 'dashboard':
    checkForUpdate(true);
    execSync(`node ${DASHBOARD_PATH}`, { stdio: 'inherit' });
    break;

  case 'doctor':
    checkForUpdate(true);
    execSync(`python ${DOCTOR_PATH}`, { stdio: 'inherit' });
    break;

  case 'help':
  default:
    console.log(`
🌟 KARO KIT CLI v1.4.0 🌟

Sử dụng: karo <lệnh> [tham số]

Các lệnh hỗ trợ:
  init          Khởi tạo Karo Agent (.agent folder) vào dự án hiện tại.
  start <wf>    Chạy một Karo Workflow (vd: karo start fix-bug "lỗi CSS").
  dashboard     Mở Dashboard Premium trực quan.
  doctor        Kiểm tra sức khỏe hệ thống Karo.
  update        Kiểm tra và cập nhật lên Karo Kit mới nhất.
  help          Hiển thị hướng dẫn này.

Chúc sếp một ngày tốt lành! 🫡🔥
    `);
    break;
}
