# Skill: Karo Audit Security
Quy trình kiểm toán bảo mật chuyên nghiệp theo chuẩn Cyber Security Auditor.

## Protocol
1.  **Phát hiện lỗ hổng**: Sử dụng kỹ năng `karo-security-scanner` (nếu có) hoặc duyệt mã nguồn để tìm các mẫu mã độc, XSS, SQL Injection.
2.  **Đánh giá mức độ**: Phân loại rủi ro theo thang điểm (Critical, High, Medium, Low).
3.  **Báo cáo chi tiết**: Liệt kê file bị lỗi, mô tả lý do và mức độ ảnh hưởng.
4.  **Đề xuất bản vá**: Cung cấp mã nguồn fix tối ưu và an toàn.
5.  **Kiểm tra lại**: Đảm bảo bản vá đã chặn được lỗ hổng nhưng không làm hỏng tính năng.

## When to Use
Sử dụng định kỳ cho dự án, hoặc bất cứ khi nào triển khai tính năng mới liên quan đến dữ liệu người dùng, API, hoặc Authentication.

## Rules
- Không bao giờ để lộ API Key hay Secret trong báo cáo.
- Ưu tiên các lỗi nguy hiểm (Critical) lên hàng đầu.
- Trình bày dạng bảng so sánh "Trước vs Sau khi fix".

---
*Powered by Karo Agent Modular Architecture*
