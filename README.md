# DUYXYZ Personal Dashboard 🚀

Một ứng dụng Dashboard cá nhân được xây dựng bằng **React + Vite**, tối ưu hóa cho cả trải nghiệm Desktop và Mobile với giao diện hiện đại, mượt mà.

## ✨ Tính năng chính

- 📂 **Quản lý tài liệu (File Tree):** Hệ thống cây thư mục trực quan giúp quản lý các tệp Markdown (Docs), PDF (UTE) và Hình ảnh (BANK).
- 🔐 **Authenticator (TOTP):** Tích hợp trình tạo mã OTP (6 số) trực tiếp trên giao diện với Web Worker để đảm bảo thời gian chính xác và hiệu năng mượt mà.
- 🖼️ **Trình xem ảnh chuyên nghiệp (Mobile):** Sử dụng thư viện `react-photo-view` trên di động, hỗ trợ vuốt chạm, phóng to/thu nhỏ (pinch-to-zoom) và kéo để đóng.
- 📄 **Trình xem PDF nội bộ:** Hiển thị trực tiếp các tài liệu PDF trên máy tính (Desktop) và hỗ trợ mở tab mới nhanh chóng trên di động.
- 📝 **Markdown Support:** Tự động render các file Markdown với tính năng click-to-copy cho các khối mã nguồn (code blocks).
- 🌌 **Thiết kế Dynamic Aurora:** Nền video động kết hợp với các hiệu ứng ánh sáng (Aurora/LightRays) tạo cảm giác premium.
- 📊 **GitHub API Integration:** Kiểm tra giới hạn (Rate Limit) của GitHub API trực tiếp từ dashboard.

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 19, Vite, Vanilla CSS.
- **Thư viện chính:**
  - `marked`: Render Markdown.
  - `react-pdf`: Hiển thị file PDF.
  - `react-photo-view`: Trình xem ảnh tối ưu cho mobile.
  - `three.js` & `ogl`: Xử lý các hiệu ứng đồ họa nền.
- **Tiện ích:** Web Worker (vận hành TOTP).

## 🚀 Khởi chạy dự án

### Cài đặt
```powershell
npm install
```

### Chạy môi trường Development
```powershell
npm run dev
```

### Xây dựng bản Production
```powershell
npm run build
```

## 📱 Tối ưu hóa Mobile
Giao diện Mobile được thiết kế lại hoàn toàn:
- Loại bỏ các thành phần dư thừa để tập trung vào nội dung chính.
- Hệ thống navigation dạng nút bấm thuần túy (loại bỏ highlight active) giúp trải nghiệm nhẹ nhàng.
- Các nút thư mục nằm ở phía trên, trình Authenticator luôn nằm ở dưới cùng để tiện thao tác.

---
Phát triển bởi [DuyXYZ](https://duyxyz.github.io/)
