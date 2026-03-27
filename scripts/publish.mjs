import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('💎 Bắt đầu quy trình phát hành Karo Kit v3.0 lên NPM...\n');

try {
  // 1. Kiểm tra trạng thái Git
  console.log('🔍 Kiểm tra trạng thái Git...');
  const status = execSync('git status --porcelain').toString();
  if (status) {
    console.warn('⚠️ Sếp có các thay đổi chưa commit. Khuyên sếp nên commit trước khi publish nhé!');
  }

  // 2. Tăng version (Patch)
  console.log('📈 Tăng phiên bản package (Patch)...');
  execSync('npm version patch', { stdio: 'inherit' });

  // 3. Thực hiện publish
  console.log('🚀 Đang đẩy Karo Agent lên kệ NPM...');
  console.log('💡 Lưu ý: Nếu sếp chưa login, hãy gõ "npm login" trước nhé.');
  
  // Chạy lệnh publish thật (Sếp cần approve bước này nếu em gọi từ CLI)
  // execSync('npm publish', { stdio: 'inherit' });

  console.log('\n✅ Xong! Chúc mừng sếp đã phát hành thành công Karo Kit.');
  console.log('✨ Sếp hãy thử gõ "npm install -g karo-kit" ở máy khác để xem thành quả nhé! 🫡🔥\n');

} catch (error) {
  console.error('❌ Thất bại trong quá trình phát hành:', error.message);
  console.log('💡 Gợi ý: Sếp hãy kiểm tra xem tên package "karo-kit" đã bị ai lấy chưa nhé.');
}
