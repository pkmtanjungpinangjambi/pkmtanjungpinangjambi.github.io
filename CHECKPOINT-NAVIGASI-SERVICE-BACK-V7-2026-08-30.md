# CHECKPOINT — UNIFIED SERVICE NAVIGATION v7

Tanggal: 30 Agustus 2026

## Keputusan UX
- Navbar utama tetap 4 menu: Beranda, Profil, Pelayanan, Informasi.
- Dropdown Pelayanan hanya menampilkan Klaster 1–5.
- `Manajemen Puskesmas` bukan item navbar tersendiri.
- Semua halaman layanan/detail dari Klaster 1–5 memiliki satu tombol **← Kembali ke Pelayanan**.
- Tombol selalu menuju `pelayanan.html`.

## Implementasi
- `script.js` menjadi bootstrap navigasi terpusat.
- Script lama dipertahankan utuh sebagai `script-original.js`.
- Bootstrap menormalkan navbar dan tombol kembali, lalu memuat `script-original.js` agar fitur lama tetap berjalan.
- Tidak mengubah konten klinis.

## QC
- Perubahan dilakukan melalui branch terpisah dan Pull Request.
- Tidak menimpa isi script lama; blob lama dipertahankan.
