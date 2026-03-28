# 👑 Karo Kit v1.5.0: The Modular AI Orchestrator 🚀

[![NPM Version](https://img.shields.io/npm/v/karo-kit?color=magenta&style=for-the-badge)](https://www.npmjs.com/package/karo-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Engine: Gemini](https://img.shields.io/badge/Engine-Gemini_Pro-blue?style=for-the-badge)](https://ai.google.dev/)

**Karo Kit** không chỉ là một CLI tool, đây là một hệ sinh thái **AI Agentic System** siêu cấp. Mang lại khả năng điều phối, tự học và kiểm soát chất lượng phần mềm hoàn toàn tự động cho sếp.

---

## ✨ Điểm tinh hoa v1.5.0 (Elite Features)

### 🧱 Modular Skill Architecture
Thay vì các quy trình phẳng, Karo v1.5.0 chia nhỏ năng lực thành các **Skill Modules** (tọa lạc tại thư mục `skills/`). Mỗi kỹ năng có một **Protocol (Giao thức)** riêng biệt, giúp Agent xử lý công việc cực kỳ chuẩn xác và dễ dàng mở rộng.

### ⚖️ The Judge Review (Cơ chế Giám khảo)
Mọi tác vụ của Karo đều phải đi qua lớp kiểm định cuối cùng của **Judge Agent**. Chỉ khi kết quả đạt chuẩn "Senior Quality", Agent mới coi là hoàn thành nhiệm vụ. Sếp hoàn toàn có thể yên tâm về chất lượng code bàn giao.

### 🧠 5-Tier Memory & Continuity
- **Working Memory**: Duy trì ngữ cảnh liên tục qua file `CONTINUITY.md`.
- **Long-term Learnings**: Tự rút kinh nghiệm sau mỗi task và lưu vào `learnings.json`.
- Agent của sếp sẽ ngày càng thông minh hơn qua thời gian thực chiến.

### 🛠️ Skill Creator (Tự tiến hóa)
Sếp chỉ cần ra lệnh, Karo sẽ tự mình nghiên cứu và **tự viết ra các kỹ năng mới** cho chính nó. Khả năng tự học không giới hạn!

---

## 🚀 Cài đặt & Khởi chạy

### Cài đặt toàn cục
```bash
npm install -g karo-kit
```

### Sử dụng lệnh `karo`
Sếp có thể sử dụng lệnh `karo` từ bất kỳ đâu:

1.  **`karo init`**: Khởi tạo "Bộ não" Agent (.agent) và quy trình chuẩn vào dự án của sếp.
2.  **`karo start <skill>`**: Kích hoạt một kỹ năng siêu cấp (Ví dụ: `karo start fix-bug`).
3.  **`karo dashboard`**: Mở dashboard trực quan để theo dõi Agent "đang nghĩ gì".
4.  **`karo help`**: Xem hướng dẫn chi tiết các lệnh.

---

## 📂 Cấu trúc Dự án chuẩn Karo
```text
.
├── .agent/
│   ├── memory/       # Nơi lưu trữ "bài học xương máu" (learnings.json)
│   └── rules/        # Các luật lệ "bất di bất dịch" (global_rules.md)
├── skills/           # Thư viện kỹ năng Modular (Skill Protocol)
│   ├── karo-fix-bug/
│   ├── karo-analyze-product/
│   └── ...
└── CONTINUITY.md     # Working Memory - Nhật ký thực thi thời gian thực
```

---

## 🔐 Yêu cầu hệ thống
- **Node.js**: v18+ (Dùng Module ES)
- **API Key**: Sếp cần thiết lập `GEMINI_API_KEY` trong môi trường hệ thống.

---
> [!TIP]
> **Antigravity AI**: "Chúng em không chỉ viết code, chúng em xây dựng tương lai cùng sếp!"

*Bản quyền thuộc về **Karo Kei**. Chúc sếp có những trải nghiệm bùng nổ cùng Karo Agent v1.5.0! 🫡🔥⚡*
