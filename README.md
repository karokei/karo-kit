# 👑 Karo Kit v3.0

Hệ thống AI Agent điều phối siêu việt cho lập trình viên chuyên nghiệp. Được thiết kế bởi **Antigravity** (By Karo Kei) để mang lại trải nghiệm phát triển phần mềm tuyệt vời nhất.

## 🚀 Cài đặt nhanh

### Cách 1: Cài đặt toàn cục (Khuyên dùng)
```bash
npm install -g karo-kit
```

### Cách 2: Sử dụng trực tiếp qua npx
```bash
npx karo-kit start
```

## 🛠️ Các lệnh CLI chính (Lệnh: `karo`)

Sếp có thể sử dụng lệnh `karo` từ bất kỳ đâu sau khi cài đặt.

1.  **`karo init`**: Khởi tạo bộ não Agent (.agent folder) và quy trình chuẩn (Git, Husky) vào dự án mới của sếp.
2.  **`karo start <workflow>`**: Chạy quy trình làm việc tự động (Ví dụ: `karo start fix-bug`).
3.  **`karo dashboard`**: Mở Dashboard Premium cực ngầu để theo dõi Agent theo thời gian thực.
4.  **`karo doctor`**: Tự động kiểm tra sức khỏe và bảo mật cho dự án của sếp.

## 🧠 Cấu trúc hệ thống
- **.agent/rules**: Những nguyên tắc "bất di bất dịch" của dự án.
- **.agent/skills**: Các kĩ năng chuyên biệt (UI Vision, Security Audit, v.v.).
- **.agent/workflows**: Quy trình thực thi các tác vụ phức tạp.
- **orchestrator**: Bộ não điều phối toàn bộ tài nguyên.

## 🔐 Yêu cầu hệ thống
- **Node.js**: v18+
- **Biến môi trường**: Sếp cần thiết lập `GEMINI_API_KEY` trong file `.env` hoặc biến hệ thống để Agent có thể suy nhĩ và học hỏi.

---
*Chúc sếp một ngày làm việc bùng nổ cùng Karo Agent! 🫡🔥*
