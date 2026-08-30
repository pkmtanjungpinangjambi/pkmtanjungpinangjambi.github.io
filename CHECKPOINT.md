# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Tanggal
2026-08-31

## Baseline Produksi
- Branch produksi: `main`
- Commit baseline terbaru: `e1afa3c2c0a00667f348c48594abbbae1c500a97`
- Produksi utama: Vercel (`pkmtanjungpinangjambi.vercel.app`), canonical resmi.

## Milestone Navigasi & Pelayanan
- Navbar utama distandarkan menjadi 4 menu: `Beranda`, `Profil`, `Pelayanan`, `Informasi`.
- Dropdown `Pelayanan` ditetapkan hanya untuk Klaster 1–5.
- `Manajemen Puskesmas` bukan item navbar tersendiri.
- Semua halaman layanan/detail Klaster 1–5 menggunakan pola `← Kembali ke Pelayanan` menuju `pelayanan.html`.
- Navigasi terpusat menggunakan `script.js` sebagai bootstrap dan mempertahankan logika lama pada `script-original.js`.
- Blok `Dasar Hukum & Referensi` sudah dinormalisasi ke satu standar tipografi melalui kontrol terpusat.

## Audit Hub Pelayanan
- Hub `pelayanan.html` memiliki 5 klaster: Manajemen; Ibu & Anak; Dewasa & Lansia; Penanggulangan Penyakit Menular; Lintas Klaster.
- Kartu layanan Klaster 1–5 pada hub diarahkan ke halaman atau bagian layanan yang relevan.
- Informasi pendukung per klaster mencakup jadwal, tarif, persyaratan, alur, dan layanan online.
- Header klaster menggunakan layout responsive: proporsional pada desktop dan vertikal pada mobile agar judul tidak terjepit.
- Tombol `+ / −` tetap berada pada posisi yang jelas di header klaster saat mobile.
- Tidak mengubah konten klinis pada milestone visual ini.

## Status QC
- [x] Struktur navbar 4 menu
- [x] Dropdown Pelayanan Klaster 1–5
- [x] Penghapusan Manajemen Puskesmas sebagai item navbar tersendiri
- [x] Navigasi kembali ke Pelayanan pada halaman layanan
- [x] Script lama dipreservasi sebagai `script-original.js`
- [x] Audit awal hub Pelayanan
- [x] Normalisasi Dasar Hukum & Referensi
- [x] Responsive layout header Klaster 1–5
- [ ] Konsolidasi penuh pengendali navigasi agar satu sumber saja
- [ ] Audit konsistensi setiap kartu layanan Klaster 1–5 secara menyeluruh
- [ ] Review cache-busting semua HTML agar versi `script.js` selalu terbaru
- [ ] QC visual final Pelayanan pada production/mobile live
- [ ] Setelah Pelayanan stabil, lanjut QC Beranda

## Aturan Kerja
1. `main` diperlakukan sebagai branch produksi dan tidak diedit langsung.
2. Perubahan dilakukan melalui branch terpisah.
3. Perubahan besar melalui Pull Request dan review.
4. Jangan menghapus atau mengganti file sebelum diverifikasi penggunaannya.
5. Setelah perubahan, lakukan testing dan pemeriksaan regresi.
6. Update checkpoint setelah milestone penting.
7. Jangan menyimpan data pasien, kredensial, API key, token, atau rahasia lain di repository publik.

## Next Step
Fokus berikutnya: **QC detail layanan Klaster 1–5**, dimulai dari Klaster 1, tanpa mengubah isi klinis yang sudah tervalidasi. Setelah seluruh detail konsisten, lakukan QC visual production terakhir lalu lanjut ke Beranda.
