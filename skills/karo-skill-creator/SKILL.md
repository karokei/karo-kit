# Skill: Karo Skill Creator
Kỹ năng đặc biệt giúp Karo Agent tự tiến hóa bằng cách tạo ra các kỹ năng (Skills) mới dựa trên yêu cầu của sếp hoặc quan sát quy trình làm việc.

## Protocol
1.  **Phân tích yêu cầu**: Hiểu rõ mục tiêu của kỹ năng mới sếp muốn tạo.
2.  **Nghiên cứu SOP**: Tìm kiếm các quy trình chuẩn (SOP) liên quan trên mạng hoặc trong bộ nhớ.
3.  **Phác thảo cấu trúc**: Định nghĩa các bước trong mục `Protocol`, điều kiện sử dụng `When to Use` và các `Rules`.
4.  **Tạo thư mục**: Tạo thư mục mới tại `skills/karo-[tên-kỹ-năng]/`.
5.  **Ghi file SKILL.md**: Lưu nội dung kỹ năng theo định dạng chuẩn Modular Skill.
6.  **Xác nhận với sếp**: Thông báo cho sếp biết kỹ năng mới đã sẵn sàng "thực chiến".

## When to Use
Sử dụng khi sếp yêu cầu Karo làm một việc gì đó chưa có trong bộ kỹ năng hiện tại, hoặc khi thấy một quy trình lặp đi lặp lại có thể tự động hóa.

## Rules
- Luôn đặt tên thư mục có prefix `karo-`.
- Nội dung `SKILL.md` phải trình bày sạch đẹp, dễ hiểu.
- Phải có ít nhất 3 bước trong `Protocol`.

---
*Powered by Karo Agent Modular Architecture*
