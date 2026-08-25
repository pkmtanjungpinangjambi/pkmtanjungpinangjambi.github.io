# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Tanggal
2026-08-23

## Kondisi saat checkpoint
- Website statis HTML/CSS/JS. Produksi utama di Vercel (`pkmtanjungpinangjambi.vercel.app`, canonical resmi), juga tersedia melalui GitHub Pages.
- Beranda versi visual-final sudah live (leader card, banner SIPPN, galeri video, tautan terkait, footer 3D).
- PR #83 (merge): link Instagram/Facebook footer diarahkan ke akun yang dipakai social-feed; blok "Statistik Pengunjung" statis/palsu dihapus dari index.html.
- PR #84 (merge): seluruh halaman aktif memakai `styles.css?v=20260817-visual1` untuk mencegah cache CSS lama.
- Catatan: link Facebook saat ini memakai profil `kiki.ayu.98229`; perlu dikonfirmasi apakah ada halaman Facebook resmi Puskesmas.

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
- [x] CHECKPOINT.md dan PROJECT_RULES.md
- [x] Hardening visual beranda (fix/beranda-visual-final)
- [x] Perbaikan link media sosial dan hapus statistik palsu (PR #83)
- [x] Cache-busting CSS pada halaman aktif (PR #84)
- [ ] Penghitung pengunjung sungguhan (butuh layanan/backend)
- [ ] Konfirmasi halaman Facebook resmi
- [ ] Pembersihan file legacy (index-4, profil-2, struktur*.html) setelah verifikasi
- [ ] Pembersihan branch patch lama (66+ branch)
- [ ] Branch protection / aturan PR di GitHub

## Next step
Tentukan solusi penghitung pengunjung, konfirmasi akun Facebook resmi, lalu jadwalkan pembersihan repo.