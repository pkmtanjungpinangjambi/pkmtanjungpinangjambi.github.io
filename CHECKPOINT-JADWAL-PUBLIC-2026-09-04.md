# CHECKPOINT — PUBLIC SCHEDULE 2026-09-04

## Status
Fondasi Hub Jadwal Publik selesai pada branch `feat/public-schedule-home-20260904`.

## Implementasi
- `jadwal.html` dinormalisasi menjadi hub jadwal pelayanan publik.
- Dataset Posyandu 2026 dipisahkan dari master internal.
- Hanya data operasional non-individual yang dipublikasikan.
- Filter Kelurahan dan Tanggal tersedia.
- Tabel responsif untuk desktop dan mobile.
- Batas pendaftaran Mobile JKN dan pendaftaran langsung dipertahankan.

## Governance
Dataset publik tidak memuat nama pasien, NIK, No. eRM, nomor HP, alamat rumah, tinggi/berat badan, diagnosis, atau data klinis individual.

## Next gate
1. Review PR #195.
2. Setelah fondasi Jadwal disetujui, integrasikan kartu `Jadwal Terdekat` ke Beranda.
3. Tambahkan sumber jadwal imunisasi publik setelah dataset resmi tersedia.
4. QC routing, responsive, dan data exposure sebelum merge ke `main`.
