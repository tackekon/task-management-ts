Nguyên nhân chính khiến ts-node@10.9.2 không tương thích với typescript@7.0.2 là do sự thay đổi lớn trong kiến trúc nội bộ của TypeScript 7.0, cụ thể là việc trình biên dịch (tsc) được viết lại hoàn toàn bằng ngôn ngữ Go (Project Corsa) và việc loại bỏ/thay đổi các API lập trình (Compiler API) cũ mà ts-node đang phụ thuộc vào


1. Sử dụng tính năng chạy trực tiếp của Node.js (Khuyên dùng)

Kể từ các phiên bản Node.js hiện đại (Node.js 23/24+), bạn không cần cài thêm bất kỳ thư viện bên thứ ba nào nữa. Node.js đã hỗ trợ cơ chế tự động loại bỏ định nghĩa kiểu (type stripping) để thực thi trực tiếp tệp .ts:
#bash
node tên_file.ts


2. Chuyển sang sử dụng tsx

tsx là công cụ thay thế hoàn hảo cho ts-node ở thời điểm hiện tại. Nó sử dụng esbuild bên dưới nên tốc độ cực nhanh và hỗ trợ tốt cả EcmaScript Modules (ESM) lẫn TypeScript mới:
#bash
# Cài đặt
npm install -D tsx

# Chạy tệp
npx tsx tên_file.ts