# CHECKPOINT BERANDA — 2026-08-17

## Basis
- Base: `main`
- Branch kerja: `fix/beranda-visual-final`
- Fokus: visual Beranda, proporsi logo/font/navigasi, konsistensi alamat, dan pendaftaran tanpa jam.

## Ketetapan
- Alamat: Jl. Taruma Negara No. 50, RT.12, Kel. Tanjung Pinang, Jambi Timur, Kota Jambi.
- Beranda tidak menampilkan jam pendaftaran.
- Jadwal resmi menjadi acuan waktu pelayanan dan pendaftaran karena Jumat/Sabtu berbeda.
- Struktur pelayanan tetap 5 klaster.

## Masalah yang sedang ditangani
- Potensi tampilan logo terlalu besar pada deployment/cache tertentu.
- Hardening CSS agar ukuran logo dan font tidak mudah berubah akibat stylesheet lama.
- `main` tidak disentuh langsung.

## Langkah
1. Hardening header/logo dan cache stylesheet.
2. Review diff.
3. Buat PR untuk review.
4. Setelah visual dinyatakan sesuai, lanjut halaman berikutnya.
