import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';
import fs from 'fs';
import path from 'path';

const log = console.log;

function clear() {
  process.stdout.write('\x1Bc');
}

function renderHeader() {
  const header = boxen(
    chalk.cyan.bold('⚡ KARO AGENT - PROFESSIONAL SUITE v3.0 ⚡') + 
    '\n' + 
    chalk.gray('Hệ thống điều phối AI đa nhiệm bậc nhất của Sếp Karo'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'magenta',
      float: 'center',
    }
  );
  log(header);
}

function renderAgentsTable() {
  const table = new Table({
    head: [chalk.yellow('ID'), chalk.yellow('Agent Name'), chalk.yellow('Status'), chalk.yellow('Last Action')],
    colWidths: [5, 25, 12, 30],
    style: { head: [], border: ['gray'] }
  });

  table.push(
    ['1', 'Karo Orchestrator', chalk.green('READY'), 'Awaiting command...'],
    ['2', 'Karo AI Engineer', chalk.green('READY'), 'Monitoring Codebase'],
    ['3', 'Karo QA & Tester', chalk.green('READY'), 'Watching Playwright'],
    ['4', 'Karo Security Auditor', chalk.green('READY'), 'Auditing Dependencies'],
    ['5', 'Karo Idea Incubator', chalk.blue('IDLE'), 'Generating options...']
  );

  log(chalk.bold('🤖 Trạng thái biệt đội Agent:'));
  log(table.toString());
}

function renderSystemStats() {
  log('\n' + chalk.bold('📊 Thống kê hệ thống:'));
  
  const memoryFile = path.join('.agent', 'memory', 'knowledge_base.json');
  let memoryCount = 0;
  if (fs.existsSync(memoryFile)) {
    const memory = JSON.parse(fs.readFileSync(memoryFile, 'utf-8'));
    memoryCount = memory.length;
  }

  const stats = [
    `${chalk.cyan('🧠 Bộ nhớ RAG:')} ${memoryCount} kinh nghiệm đã lưu`,
    `${chalk.cyan('🛠️ Workflows:')} 14 quy trình chuẩn`,
    `${chalk.cyan('🛡️ Auto-Pilot:')} ${chalk.green('ON')} (Git Hooks)`,
    `${chalk.cyan('👁️ UI Vision:')} ${chalk.green('ENABLED')}`
  ];

  log(boxen(stats.join('\n'), { 
    padding: 0.5, 
    borderColor: 'cyan', 
    borderStyle: 'round' 
  }));
}

function renderFooter() {
  log('\n' + chalk.gray('Sẵn sàng cho các dự án Next.js, Node.js và bảo mật chuyên sâu.'));
  log(chalk.magenta('Chào sếp! Karo Agent v3.0 luôn sẵn sàng phục vụ! 🫡🔥\n'));
}

function main() {
  clear();
  renderHeader();
  renderAgentsTable();
  renderSystemStats();
  renderFooter();
}

main();
setInterval(main, 5000); // Tự động làm mới mỗi 5 giây
