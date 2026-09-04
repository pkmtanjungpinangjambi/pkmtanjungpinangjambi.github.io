# CHECKPOINT — JADWAL PUBLIK 2026-09-04

## Scope
Menjadikan `jadwal.html` sebagai hub publik untuk jam pelayanan Puskesmas dan jadwal Posyandu.

## Implementasi
- `jadwal-posyandu-2026.js`: 41 entri Posyandu dari jadwal master internal.
- `jadwal-posyandu-ui.js`: renderer + filter kelurahan/tanggal + tabel responsif.
- `jadwal.html`: navigasi kanonis 4 menu utama dan tampilan jadwal publik terintegrasi.

## Governance
Dataset publik hanya memuat informasi operasional: kelurahan, nama Posyandu, tanggal, jam, RT lokasi, dan wilayah kerja.
Tidak memuat nama pasien, NIK, No. eRM, nomor HP, alamat rumah, TB/BB, atau hasil klinis.

## QC batas
- Branch terpisah: `feat/public-schedule-home-20260904`.
- PR: #195.
- `main` tetap tidak berubah.
- Browser pixel-level dan Vercel production belum diklaim PASS pada tahap ini.

## Catatan data
Kolom tanggal pada workbook master tidak menyertakan bulan pada baris Posyandu; karena itu UI menampilkan angka tanggal persis sebagaimana sumber dan meminta konfirmasi sebelum kunjungan.

## Next gate
Review owner/PJ → cek deployment → integrasikan kartu “Jadwal Terdekat” di Beranda → lanjut sinkronisasi jadwal imunisasi dengan sumber resmi.
