# CHECKPOINT BERANDA — 2026-08-17

## Basis
- Base: `main`
- Perubahan dikerjakan di branch terpisah.
- Fokus: visual Beranda, proporsi logo/font/navigasi, konsistensi alamat, dan pendaftaran tanpa jam.

## Ketetapan
- Alamat: Jl. Taruma Negara No. 50, RT.12, Kel. Tanjung Pinang, Jambi Timur, Kota Jambi.
- Beranda tidak menampilkan jam pendaftaran.
- Jadwal resmi menjadi acuan waktu pelayanan dan pendaftaran karena Jumat/Sabtu berbeda.
- Struktur pelayanan tetap 5 klaster.

## Masalah yang sedang ditangani
- Potensi tampilan logo terlalu besar pada deployment/cache tertentu.
- Perlu hardening CSS agar ukuran logo dan font tidak mudah berubah akibat stylesheet lama.
- Jangan mengubah `main` langsung.

## Langkah berikutnya
1. Branch visual final dari `main`.
2. Hardening header/logo dan cache stylesheet.
3. Review diff.
4. Buat PR untuk review.
5. Setelah visual dinyatakan sesuai, baru lanjut halaman berikutnya.
