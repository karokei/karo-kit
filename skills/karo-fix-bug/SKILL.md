# Skill: Karo Fix Bug
Quy trình chuyên nghiệp để tiếp nhận, phân tích và sửa lỗi hệ thống an toàn, đảm bảo không phát sinh lỗi hồi quy.

## Protocol
1.  **Tiếp nhận báo cáo**: Hiểu rõ hiện tượng lỗi từ sếp hoặc từ hệ thống logs.
2.  **Working Memory**: Ghi lại context lỗi vào `CONTINUITY.md`.
3.  **Nghiên cứu nguyên nhân**: Sử dụng kỹ năng `karo-debugger` (nếu có) hoặc duyệt mã nguồn để tìm root cause.
4.  **Đề xuất giải pháp**: Trình bày phương án sửa lỗi cho sếp trước khi thực hiện (nếu lỗi nghiêm trọng).
5.  **Thực hiện sửa lỗi**: Áp dụng các thay đổi mã nguồn một cách tối ưu.
6.  **Kiểm tra hồi quy**: Đảm bảo lỗi đã hết và không ảnh hưởng đến các module khác.
7.  **Học hỏi (Learnings)**: Ghi lại bài học kinh nghiệm sau khi fix xong vào `learnings.json`.

## When to Use
Sử dụng khi có bất kỳ báo cáo lỗi (Bug), ngoại lệ (Exception), hoặc hành vi không mong muốn trong dự án.

## Rules
- Luôn tạo bản commit hoặc backup trước khi thay đổi mã nguồn.
- Ưu tiên viết Test Case (TDD) nếu có thể để ngăn chặn lỗi quay trở lại.
- Trả lời sếp bằng tiếng Việt, giải thích đơn giản về nguyên nhân.

---
*Powered by Karo Agent Modular Architecture*
