# CHECKPOINT — INFORMASI SOCIAL LOGO FIX 2026-09-04

## Temuan akar masalah
Pada `main`, `informasi.html` memuat `social-channels.js`, tetapi folder `assets/social/` hanya memiliki `ig.svg` serta asset WebP lama. `wa.svg`, `fb.svg`, dan `yutu.svg` belum masuk ke `main`, sehingga tiga kartu sosial tidak dapat memuat gambar SVG yang baru.

## Perbaikan
- Menambahkan `assets/social/wa.svg`.
- Menambahkan `assets/social/fb.svg`.
- Menambahkan `assets/social/yutu.svg`.
- Mengubah `social-channels.js` agar seluruh 4 kanal menggunakan SVG lokal.
- Mengubah gambar sosial dari `loading="lazy"` menjadi `loading="eager"`.
- Menambahkan `decoding="async"` dan `fetchpriority="high"`.
- Cache-busting asset dinaikkan ke `v=20260904-4`.
- `informasi.html` dinaikkan ke `social-channels.js?v=20260904-3`.

## Target visual
Instagram → WhatsApp → Facebook → YouTube, menggunakan kartu panorama 3D glossy yang seragam berdasarkan acuan Library.

## Branch
`fix/social-logos-render-2026-09-04`

## Safety
Tidak mengubah konten klinis Klaster 3. Perubahan dibatasi pada Menu Informasi / media sosial.

## Next
QC preview Vercel → cek 4 gambar desktop dan mobile → bila lulus, merge ke `main`.
