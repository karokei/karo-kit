import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_AGENT_DIR = path.join(__dirname, '..', '.agent');
const TARGET_AGENT_DIR = path.join(process.cwd(), '.agent');

console.log(`\n📂 Đang khởi tạo bộ não Karo Agent tại: ${process.cwd()}...`);

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  // 1. Copy .agent folder
  if (!fs.existsSync(TARGET_AGENT_DIR)) {
    copyRecursiveSync(SOURCE_AGENT_DIR, TARGET_AGENT_DIR);
    console.log('✅ Đã sao chép cấu trúc .agent (Rules, Skills, Workflows).');
  } else {
    console.log('⚠️ Thư mục .agent đã tồn tại. Bỏ qua bước sao chép để tránh ghi đè dữ liệu của sếp.');
  }

  // 2. Initialize Git if not exists
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('🔧 Đang khởi tạo Git...');
    execSync('git init', { stdio: 'inherit' });
  }

  // 3. Setup Husky & Lint-staged locally
  console.log('🛠️ Đang thiết lập các công cụ hỗ trợ (Husky, Lint-staged)...');
  execSync('npm install --save-dev husky lint-staged', { stdio: 'inherit' });
  execSync('npx husky init', { stdio: 'inherit' });

  // 4. Update local package.json with Karo scripts
  const localPackageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(localPackageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(localPackageJsonPath, 'utf8'));
    pkg.scripts = {
      ...pkg.scripts,
      "karo-start": "karo start",
      "karo-dashboard": "karo dashboard",
      "karo-doctor": "karo doctor"
    };
    pkg["lint-staged"] = {
      "**/*": "karo doctor" // Or use pre-commit script
    };
    fs.writeFileSync(localPackageJsonPath, JSON.stringify(pkg, null, 2));
    console.log('✅ Đã cập nhật scripts vào package.json địa phương.');
  }

  console.log('\n✨ Xong! Karo Agent v3.0 đã sẵn sàng phục vụ sếp.');
  console.log('💡 Sếp hãy gõ "karo dashboard" để bắt đầu trải nghiệm nhé! 🫡🔥\n');

} catch (error) {
  console.error('❌ Lỗi khi khởi tạo:', error.message);
}
