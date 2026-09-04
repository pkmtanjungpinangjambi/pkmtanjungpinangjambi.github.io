# CHECKPOINT — DATABASE JEJARING K1

Tanggal: 4 September 2026

## Struktur
- Puskesmas terdiri dari 5 klaster layanan.
- Posyandu dan Pustu bukan klaster tambahan.
- Pengelolaan/pembinaan jejaring berada pada Klaster 1 — Manajemen Jejaring.
- Kegiatan jejaring ditautkan ke klaster sasaran layanan sesuai siklus hidup.

## Implementasi publik
- `data/jejaring-public.js` menyimpan metadata jejaring publik tanpa data individual.
- `jejaring-puskesmas.html` menjadi halaman informasi publik Jejaring Pelayanan.
- `klaster-data-ui.js` menyediakan pintasan dari Pusat Data Klaster 1 ke halaman Jejaring.
- `data/jadwal-public.js` membedakan `managementClusterId` dan `serviceClusterIds`.
- `home-klaster-dashboard.js` menampilkan ringkasan jadwal dan jejaring dari sumber publik yang sama.

## Data saat ini
- Posyandu: metadata agregat 42 Posyandu aktif berdasarkan Profil Puskesmas 2025.
- Pustu: 3 unit metadata yang sudah tercantum dalam materi profil website: Kasang Jaya, Sijenjang I, Sijenjang II.

## Keamanan
Tidak ada NIK, rekam medis, hasil pemeriksaan individual, identitas kader, atau PHI/PII dalam repository publik. Database operasional harus berada di backend terproteksi dengan autentikasi, otorisasi berbasis peran, audit log, validasi input, dan pemisahan data sensitif.

## Berikutnya
Bangun skema database operasional per klaster dan jejaring, dimulai dari master wilayah/jejaring dan jadwal, lalu relasi kegiatan → sasaran → PWS/Monev. Data pasien individual tetap terpisah dari data publik.
