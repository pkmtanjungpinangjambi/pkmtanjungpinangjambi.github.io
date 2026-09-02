# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Tanggal
2026-09-02

## Baseline Produksi
- Branch produksi: `main`
- Commit produksi terbaru: `0bcbd2bfc0de6d13aae1deb8b9ce6f2fc0e12b3b`
- Produksi utama: Vercel (`pkmtanjungpinangjambi.vercel.app`), canonical resmi.

## Milestone Navigasi
- Navbar utama distandarkan menjadi 4 menu: `Beranda`, `Profil`, `Pelayanan`, `Informasi`.
- Dropdown `Pelayanan` memuat Klaster 1–5.
- Dropdown caret Profil/Pelayanan/Informasi sudah memiliki handler klik terpusat.
- `Manajemen Puskesmas` bukan item navbar tersendiri.
- Halaman layanan/detail menggunakan pola `← Kembali ke Pelayanan`.
- `script.js` menjadi bootstrap navigasi dan mempertahankan logika lama pada `script-original.js`.
- Link Klaster 2 dipertahankan ke halaman detail `pelayanan-klaster-2-ibu-anak.html`.

## Milestone Informasi
- Ekosistem `Informasi` mencakup Galeri, Edukasi, Program & Inovasi, Download, Informasi ILP, dan Kontak.
- Materi dan korelasi Informasi sudah diaudit dan diperbaiki.
- `Peta Korelasi Informasi` menghubungkan pengumuman, berita/kegiatan, edukasi, program/inovasi, ILP, dan dokumen.
- Kartu media sosial lengkap tetap berada di `informasi.html` agar tidak duplikatif dengan Beranda.
- Beranda tetap menjadi pintu masuk utama; akses sosial cepat tersedia melalui topbar.
- Instagram masih menunggu aset visual final; WhatsApp, Facebook, dan YouTube sudah tersedia.

## Milestone Klaster 1
- Narasi Klaster 1 dikoreksi agar konsisten bahwa menu Pelayanan mencakup Klaster 1–5.
- Istilah `Dasar Hukum & Referensi` dinormalisasi.

## Milestone Klaster 2
- PR #182 berhasil di-merge ke `main` pada 2026-09-02.
- Merge commit: `0bcbd2bfc0de6d13aae1deb8b9ce6f2fc0e12b3b`.
- Sasaran Klaster 2 dinarasikan lengkap: ibu hamil, ibu bersalin, ibu nifas, bayi, balita/anak prasekolah, anak usia sekolah, dan remaja.
- Lima kartu sasaran diposisikan sebagai pengelompokan visual, bukan klaim lima sasaran resmi.
- Korelasi dibuat eksplisit: sasaran → layanan inti → lintas klaster → tindak lanjut → data/mutu.
- Pathway ANC → Triple Eliminasi → SIHEPI → tindak lanjut ibu/bayi → Data → Monev → Risiko → Mutu dipertahankan sebagai peta proses, bukan pengganti SOP klinis.
- Status regulasi Triple Eliminasi diperjelas: Permenkes 3/2026 sebagai rujukan regulasi terbaru, dengan ketentuan tertentu dari Permenkes 52/2017 yang masih dipertahankan; Permenkes 6/2024 tetap sebagai salah satu dasar teknis SPM.
- Tidak menambahkan dosis/regimen, data pasien, kredensial, atau rahasia.

## Status QC
- [x] Struktur navbar 4 menu
- [x] Dropdown Pelayanan Klaster 1–5
- [x] Dropdown caret aktif
- [x] Penghapusan Manajemen Puskesmas sebagai item navbar tersendiri
- [x] Navigasi kembali ke Pelayanan
- [x] Script lama dipreservasi sebagai `script-original.js`
- [x] Audit awal hub Pelayanan
- [x] Normalisasi Dasar Hukum & Referensi
- [x] Audit materi & korelasi Informasi
- [x] Audit Klaster 1
- [x] Audit Klaster 2
- [x] Koreksi regulasi Triple Eliminasi 2026
- [ ] Audit konsistensi setiap kartu layanan Klaster 1–5 secara menyeluruh
- [ ] Konsolidasi penuh pengendali navigasi agar satu sumber saja
- [ ] Review cache-busting semua HTML agar versi `script.js` selalu terbaru
- [ ] QC visual final Pelayanan pada production/mobile live
- [ ] QC Beranda setelah Pelayanan stabil

## Arsitektur Informasi yang Diputuskan
- **Beranda:** orientasi, aksi utama, pengumuman, berita, layanan, CKG, pendaftaran, dan akses sosial cepat.
- **Informasi:** pusat dokumentasi dan distribusi konten; galeri, edukasi, program/inovasi, dokumen, serta kartu media sosial lengkap.
- Prinsip: jangan menduplikasi blok besar yang sama pada Beranda dan Informasi; gunakan tautan silang seperlunya.

## Aturan Kerja
1. `main` diperlakukan sebagai branch produksi dan tidak diedit langsung.
2. Perubahan dilakukan melalui branch terpisah.
3. Perubahan besar melalui Pull Request.
4. Jangan menghapus atau mengganti file sebelum diverifikasi penggunaannya.
5. Setelah perubahan, lakukan testing dan pemeriksaan regresi.
6. Update checkpoint setelah milestone penting.
7. Jangan menyimpan data pasien, NIK, kredensial, API key, token, atau rahasia lain di repository publik.

## Next Step
Fokus berikutnya: **QC detail layanan Klaster 3**, lalu Klaster 4 dan Klaster 5. Setelah seluruh detail konsisten, lakukan QC visual production/mobile dan kemudian finalisasi Beranda.
