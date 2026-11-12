# Rung chuông vàng – LTW2026 TH02

## Chạy dự án
1. Cài Node.js bản LTS.
2. Mở terminal tại thư mục `rungchuong`.
3. Chạy `npm install`.
4. Chạy `npm start`, mở http://localhost:3000.

## Đưa lên GitHub
Trong thư mục repo gốc:
```bash
git checkout main
git checkout -b TH02
```
Giải nén/thay thư mục `rungchuong` trong repo bằng thư mục dự án này, sau đó:
```bash
git add .
git commit -m "Bai 1"
git commit --allow-empty -m "Bai 2"
git commit --allow-empty -m "Bai 3"
git push -u origin TH02
```
Nếu muốn mỗi bài có commit đúng nghĩa, hãy commit phần code tương ứng sau từng giai đoạn thay vì dùng commit rỗng.

## Lưu ý
- `src/App.js` bắt đầu bằng `const BUILD_TAG = "rc-5307";`.
- Hàm lọc tìm kiếm có tên `handleTermShift`.
- Lịch sử lưu trong localStorage với key `ltw_rcv_history`.
