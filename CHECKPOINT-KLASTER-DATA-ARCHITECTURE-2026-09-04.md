# CHECKPOINT — ARSITEKTUR DATA 5 KLASTER

Tanggal: 4 September 2026

## Keputusan arsitektur
- Puskesmas diposisikan sebagai satu sistem pelayanan berbasis 5 klaster.
- Database mengikuti klaster masing-masing; tidak ada menu database publik yang berdiri sendiri.
- Data publik hanya memuat metadata/modul layanan.
- Data pasien, NIK, rekam medis, dan PHI/PII tidak boleh dimasukkan ke repository publik.

## Posyandu dan jejaring
- Posyandu **bukan klaster Puskesmas**.
- Fungsi pengelolaan/pembinaan jejaring Posyandu ditempatkan pada **Klaster 1 — Manajemen Jejaring**.
- Kegiatan Posyandu dapat terhubung ke **Klaster 2 — Ibu & Anak** dan **Klaster 3 — Dewasa & Lansia** sesuai sasaran siklus hidup.
- Pustu/jejaring lain mengikuti pola yang sama: dikelola sebagai jejaring dan ditautkan ke klaster layanan yang relevan.
- Konsep ini mengikuti Juknis ILP KMK HK.01.07/MENKES/2015/2023 dan kerangka penyelenggaraan Puskesmas pada Permenkes 19 Tahun 2024.

## Implementasi tahap 2
- `data/klaster-config.js` menjadi kontrak metadata lima klaster.
- Klaster 1 sekarang secara eksplisit memuat `Manajemen Jejaring` serta `Posyandu & UKBM`.
- `data/jadwal-public.js` menggunakan relasi `managementClusterId` dan `serviceClusterIds` untuk jejaring/kegiatan.
- `data/jejaring-public.js` menjadi kontrak publik untuk Posyandu dan Pustu tanpa PII/PHI.
- `jadwal-ui.js` memisahkan label "Dikelola" dan "Sasaran" agar Posyandu tidak disalahartikan sebagai klaster.

## Arah berikutnya
- Hubungkan UI Pusat Data Klaster ke `klaster-config.js` secara konsisten di halaman Pelayanan.
- Hubungkan Beranda dan Jadwal ke satu sumber jadwal publik.
- Bangun modul database operasional secara terpisah di backend terautentikasi dengan otorisasi berbasis peran, audit log, dan pemisahan data sensitif.
