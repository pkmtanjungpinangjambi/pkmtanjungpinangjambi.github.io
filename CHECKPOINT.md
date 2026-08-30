# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Tanggal
2026-08-31

## Baseline Produksi
- Branch produksi: `main`
- Commit baseline terakhir sebelum milestone ini: `6e68f81b01c396c3edeebdf3e1fe5f8c4e7352ef`
- Produksi utama: Vercel (`pkmtanjungpinangjambi.vercel.app`), canonical resmi.

## Milestone Navigasi & Pelayanan
- Navbar utama distandarkan menjadi 4 menu: `Beranda`, `Profil`, `Pelayanan`, `Informasi`.
- Dropdown `Pelayanan` ditetapkan hanya untuk Klaster 1–5.
- `Manajemen Puskesmas` bukan item navbar tersendiri.
- Semua halaman layanan/detail Klaster 1–5 menggunakan pola `← Kembali ke Pelayanan` menuju `pelayanan.html`.
- Navigasi terpusat menggunakan `script.js` sebagai bootstrap dan mempertahankan logika lama pada `script-original.js`.
- Checkpoint navigasi service-back v7 sudah tercatat.
- Vercel untuk baseline navigasi terakhir berstatus SUCCESS.

## Audit Pelayanan v1
- Hub `pelayanan.html` memiliki 5 klaster: Manajemen; Ibu & Anak; Dewasa & Lansia; Penanggulangan Penyakit Menular; Lintas Klaster.
- Kartu layanan Klaster 1–5 pada hub diarahkan ke halaman atau bagian layanan yang relevan.
- Informasi pendukung per klaster mencakup jadwal, tarif, persyaratan, alur, dan layanan online.
- Ditemukan markup navbar statis lama pada beberapa HTML; normalisasi runtime sudah menangani struktur tersebut, tetapi cache-busting script perlu diperhatikan agar browser tidak memakai `script.js` lama.
- Ditemukan dua pengendali navigasi (`script.js` dan `content-protection.js`); baseline saat ini tetap berjalan, namun arsitektur ideal berikutnya adalah satu sumber kontrol navigasi.
- Tidak ada perubahan konten klinis pada milestone navigasi.

## Aturan Kerja
1. `main` diperlakukan sebagai branch produksi dan tidak diedit langsung.
2. Perubahan dilakukan melalui branch terpisah.
3. Perubahan besar melalui Pull Request dan review.
4. Jangan menghapus atau mengganti file sebelum diverifikasi penggunaannya.
5. Setelah perubahan, lakukan testing dan pemeriksaan regresi.
6. Update checkpoint setelah milestone penting.
7. Jangan menyimpan data pasien, kredensial, API key, token, atau rahasia lain di repository publik.

## Status
- [x] Audit repository
- [x] Struktur navbar 4 menu
- [x] Dropdown Pelayanan Klaster 1–5
- [x] Penghapusan Manajemen Puskesmas sebagai item navbar tersendiri
- [x] Navigasi kembali ke Pelayanan pada halaman layanan
- [x] Script lama dipreservasi sebagai `script-original.js`
- [x] Audit awal hub Pelayanan
- [ ] Konsolidasi penuh pengendali navigasi agar satu sumber saja
- [ ] Audit visual hub Pelayanan desktop/mobile
- [ ] Audit konsistensi setiap kartu layanan Klaster 1–5
- [ ] Audit dan standardisasi `Dasar Hukum & Referensi`
- [ ] Review cache-busting semua HTML agar versi `script.js` selalu terbaru
- [ ] Setelah Pelayanan stabil, lanjut QC Beranda

## Next Step
Fokus berikutnya: **QC visual dan UX hub Pelayanan (`pelayanan.html`)**, dilanjutkan audit satu per satu Klaster 1–5 tanpa mengubah isi klinis yang sudah tervalidasi.
