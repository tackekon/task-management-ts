Cách 1: Dùng tsx kết hợp với nodemon (Khuyên dùng)Như đã phân tích ở trên, tsx sử dụng esbuild thay vì dựa vào Compiler API cũ của TypeScript, do đó nó tương thích hoàn toàn với cấu trúc mới của TypeScript 7.   
Cài đặt nodemon và tsx:
Bash
npm install --save-dev nodemon tsx
Cấu hình file nodemon.json (hoặc viết trực tiếp vào package.json):
JSON
{
  "watch": ["src"],
  "ext": "ts,json",
  "exec": "tsx src/index.ts"
}
Chạy lệnh:
npx nodemon

Cách 2: Sử dụng --watch native của Node.js (Không cần cài nodemon).
Bản thân Node.js hiện nay đã tích hợp sẵn tính năng theo dõi thay đổi file (watch mode) và khả năng đọc trực tiếp TypeScript (thông qua cơ chế type stripping). Bạn có thể vứt bỏ hoàn toàn nodemon và ts-node:   
Trong package.json, bạn chỉ cần cấu hình script:

"scripts": {
  "start": "node --watch index.ts"
}

