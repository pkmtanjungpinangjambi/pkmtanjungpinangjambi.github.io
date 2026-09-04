# CHECKPOINT — INFORMASI HEADER LOGO 2026-09-02

## Scope
Menyeragamkan identitas logo pada seluruh halaman di bawah menu **Informasi** agar header menampilkan dua identitas: Lambang Kota Jambi + Lambang Puskesmas.

## Halaman terdampak
- `informasi.html`
- `edukasi.html`
- `program.html`
- `download.html`

## Asset
- `assets/identity/logo-puskesmas.svg` — asset lokal vektor untuk Lambang Puskesmas.
- `logo-kota-jambi.webp` tetap dipakai sebagai Lambang Kota Jambi.

## Implementasi
- Menambahkan wrapper `brand-marks` untuk dua logo di header.
- Menambahkan styling lokal yang konsisten untuk ukuran, border, padding, dan responsive mobile.
- Tidak mengubah konten utama, navbar structure, link sosial, galeri Google Drive, footer, atau floating WhatsApp CTA.
- Tidak menggunakan CDN/external image untuk logo.

## QC
- Branch: `feat/informasi-logo-2026-09-02`
- `main` tidak diubah langsung.
- Asset path diverifikasi pada branch.
- Header Information, Education, Program, dan Download direferensikan ke asset Puskesmas lokal yang sama.
- Responsive rule tersedia untuk viewport <= 520px.

## Review / PR
Perubahan menunggu review Pull Request sebelum merge ke `main`.
