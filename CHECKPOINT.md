# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Branch checkpoint
`chore/project-governance`

## Tanggal
2026-08-15

## Kondisi saat checkpoint
- Website berbasis static HTML/CSS/JavaScript.
- `main` adalah branch produksi/default.
- Branch governance dibuat dari `main` tanpa mengubah `main`.
- Repository memiliki beberapa file aktif, media, dokumentasi, serta beberapa file versi/backup yang perlu diverifikasi sebelum dirapikan.
- Belum ada perubahan kode aplikasi yang dilakukan pada checkpoint ini.

## Aturan kerja
1. `main` diperlakukan sebagai branch produksi dan tidak diedit langsung.
2. Perubahan dilakukan melalui branch terpisah.
3. Perubahan besar harus melalui Pull Request dan review.
4. Jangan menghapus atau mengganti file yang belum diverifikasi penggunaannya.
5. Setelah perubahan, lakukan testing dan pemeriksaan regresi.
6. Update checkpoint setelah milestone penting.
7. Jangan menyimpan data pasien, kredensial, API key, token, atau rahasia lain di repository publik.

## Status saat ini
- [x] Audit awal repository
- [x] Branch `chore/project-governance`
- [x] CHECKPOINT.md
- [x] PROJECT_RULES.md
- [ ] Review isi branch
- [ ] Branch protection / aturan PR
- [ ] Integrasi workflow Claude
- [ ] Uji perubahan kecil pertama

## Next step
Review `PROJECT_RULES.md`, kemudian lakukan pemeriksaan branch/PR sebelum perubahan fitur website.
