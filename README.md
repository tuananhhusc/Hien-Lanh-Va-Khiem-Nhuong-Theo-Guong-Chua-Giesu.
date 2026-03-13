# Khảo Luận Công giáo: Hiền Lành Và Khiêm Nhường

Website học thuật được xây dựng bằng Next.js 15 để trình bày khảo luận chuyên sâu về lòng hiền lành và khiêm nhường theo gương Chúa Giêsu.

## 1. Mục tiêu dự án

- Hiển thị một bài nghiên cứu dài theo phong cách học thuật, rõ ràng, dễ đọc.
- Tổ chức nội dung theo cấu trúc thần học với Mục lục (TOC) bám section đang đọc.
- Tối ưu SEO học thuật (Metadata API + JSON-LD `ScholarlyArticle`).
- Giữ hiệu năng cao với Server Components làm mặc định.

## 2. Công nghệ sử dụng

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MDX (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`)
- React 19

## 3. Tính năng chính

- Trang đơn (`/`) với bố cục học thuật:
  - Hero tiêu đề khảo luận
  - TOC sidebar (desktop)
  - Nút TOC mobile ở góc dưới phải, mở panel để điều hướng nhanh
  - Nội dung bài viết MDX
- Scroll-spy TOC: tự đánh dấu mục đang đọc.
- Auto slug heading `h2/h3` cho liên kết neo (anchor).
- Chú thích học thuật:
  - Tự nhận diện số tham chiếu trong nội dung
  - Tạo liên kết qua lại giữa tham chiếu trong bài và danh mục nguồn.
- Bảng dữ liệu trong MDX được style học thuật (viền, header, zebra rows, hỗ trợ cuộn ngang mobile).
- SEO + OpenGraph + Twitter + structured data.

## 4. Cấu trúc thư mục

```txt
.
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ article-layout.tsx
│  ├─ citation-sync.tsx
│  ├─ hero.tsx
│  ├─ mdx-components.tsx
│  └─ toc.tsx
├─ content/
│  └─ report.mdx
├─ lib/
│  ├─ slugify.ts
│  └─ toc.ts
├─ mdx-components.tsx
├─ next.config.ts
├─ tailwind.config.ts
└─ package.json
```

## 5. Luồng render nội dung

1. `content/report.mdx` là nguồn nội dung chính.
2. `app/page.tsx` import MDX và render trong layout.
3. `lib/toc.ts` đọc file MDX để trích xuất `h2/h3` thành TOC.
4. `components/mdx-components.tsx` map các thẻ MDX (`h2`, `h3`, `table`, `blockquote`, `a`, `p`, ...).
5. `components/citation-sync.tsx` đồng bộ `id` tham chiếu và danh mục nguồn để tạo backlink.

## 6. Cài đặt và chạy local

### Yêu cầu

- Node.js 18.18+ (khuyến nghị Node 20+)
- npm

### Cài đặt

```bash
npm install
```

### Chạy development

```bash
npm run dev -- --hostname localhost --port 3000
```

Mở: `http://localhost:3000`

### Build production

```bash
npm run build
npm run start
```

## 7. Scripts

- `npm run dev`: chạy môi trường phát triển.
- `npm run build`: build production.
- `npm run start`: chạy bản production đã build.
- `npm run lint`: kiểm tra lint.

## 8. Cấu hình môi trường

Biến tùy chọn:

- `NEXT_PUBLIC_SITE_URL`  
  Dùng để cấu hình `metadataBase` trong SEO.  
  Ví dụ:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 9. Cách cập nhật nội dung bài nghiên cứu

1. Mở `content/report.mdx`.
2. Cập nhật nội dung, giữ cấu trúc heading `##` và `###` để TOC hoạt động chuẩn.
3. Nếu có bảng, dùng markdown table hoặc HTML table trong MDX.
4. Chạy lại:

```bash
npm run build
```

## 10. Thiết kế và quy ước giao diện

- Nền parchment sáng, chữ serif dễ đọc dài.
- Sans-serif cho heading, điều hướng, chỉ mục.
- Accent màu vàng, tím phụng vụ, đỏ burgundy.
- Nội dung ưu tiên khả năng đọc, hạn chế yếu tố gây nhiễu.

## 11. Troubleshooting

### 1) `localhost` không vào được / bị từ chối kết nối

- Kiểm tra cổng 3000:

```powershell
netstat -ano | findstr :3000
```

- Nếu có tiến trình cũ, dừng tiến trình đó rồi chạy lại `npm run dev`.

### 2) `localhost` trả `500` khi dev

- Khởi động lại dev server.
- Nếu vẫn lỗi, xóa cache `.next` rồi chạy lại:

```powershell
Remove-Item .next -Recurse -Force
npm run dev -- --hostname localhost --port 3000
```

### 3) TOC không highlight đúng

- Đảm bảo heading trong MDX là `##` hoặc `###`.
- Không đặt heading trùng nhau hoàn toàn.

## 12. Ghi chú triển khai

- Dự án tối ưu cho một bài khảo luận đơn lẻ ở route `/`.
- Nội dung gốc được chuyển từ file văn bản sang MDX để render có cấu trúc.
- TOC desktop và mobile đã tách rõ hành vi, đảm bảo đọc mượt trên cả hai.
