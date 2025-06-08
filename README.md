# Documentation

## Design System
Berikut ini adalah desain website [e-Syarat](https://www.figma.com/design/HozrMLTxvVZh4AY5eU6puY/E-Syarat-Project?node-id=22-4&t=UJc0XMB5eTDEEr0z-1) yang dibuat menggunakan Figma.

---

## Cara Menjalankan Project
1. **Install package:**
   ```bash
   npm install
   ```
2. **Jalankan development server:**
   ```bash
   npm run start-dev
   ```
   atau sesuai script yang ada di `package.json`.
3. **Akses di browser:**
   Buka `http://localhost:xxxx` (lihat port di terminal).

## Struktur Folder Penting
- `src/pages/` : Halaman utama (home, practice, auth, dst)
- `src/components/` : Komponen UI (navbar, footer, dsb)
- `src/routes/` : Routing SPA
- `src/assets/` : Gambar/logo
- `src/styles/` : CSS

## Fitur Routing & Akses
- User yang **belum login** akan diarahkan ke halaman login jika mengakses halaman selain Home (`#/` atau `#/home`).
- Home page bisa diakses tanpa login.
- Setelah login, user bisa mengakses halaman lain.

## Task/Feature yang Belum Selesai
- Jika di kode ada direct ke halaman di atas, developer perlu:
  1. Membuat file page di `src/pages/` dan presenter-nya.
  2. Menambahkan route di `src/routes/routes.js`.
  3. Implementasi tampilan dan logic sesuai kebutuhan.
- Membuat transisi animasi
- Membuat konfigurasi halaman responsive untuk tablet dan mobile
- Membuat Fetch API untuk tiap page yang memerlukan back-end (about, signup)
- Membuat Fetch API untuk page practice yang memerlukan machine learning
- Mengatur Style halaman agar sesuai dengan desain web (practice, dictionary, login, signup, about)

## Catatan Developer
- Jika menemukan direct/link ke page yang belum ada, cek task di atas dan tambahkan page/route sesuai kebutuhan.
- Untuk integrasi data dinamis (progress, lesson count, dsb), ganti placeholder di HTML dengan data dari backend/database jika sudah tersedia.
- Pada page Login ada 2 logic:
   1. Logic login sementara (tidak include dictionary yang sudah terintegrasi database)
   2. Logic login yang menggunakan API (database masih lokal jadi harus clone dan setting lagi jika mau pakai yang login lewat database)
Sementara login yang pakai logic sementara saja, sampai nanti Back-End di deploy.

---

Happy coding! 🚀

