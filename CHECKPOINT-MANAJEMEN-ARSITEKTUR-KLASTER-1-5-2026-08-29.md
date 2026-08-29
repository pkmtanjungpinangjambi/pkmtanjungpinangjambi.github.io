# CHECKPOINT — ARSITEKTUR PELAYANAN KLASTER 1–5

Tanggal: 29 Agustus 2026
Baseline main: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
Branch kerja: `feature/manajemen-puskesmas-cluster-1-clean`

## Keputusan
- Klaster 1–5 menjadi tulang punggung struktur informasi website.
- Profil berfokus pada identitas Puskesmas; Klaster 1 tidak lagi menjadi section utama Profil.
- Manajemen Puskesmas menjadi menu utama untuk informasi lengkap Klaster 1.
- Pelayanan tetap menampilkan Klaster 1–5.
- Setiap klaster memiliki Informasi Pelayanan di dalamnya: Jadwal, Tarif, Persyaratan, Alur, Layanan Online.
- Manajemen Puskesmas dan Pelayanan saling melengkapi tanpa duplikasi konten besar.

## Implementasi
- `pelayanan.html` menjadi halaman utama lima klaster dengan accordion.
- Klaster 1 menjadi entry point menuju Manajemen Puskesmas.
- Klaster 2–5 tetap memiliki tautan ke halaman detail layanan yang tersedia.
- Global link Jadwal/Tarif/Persyaratan/Alur/Layanan Online dari dropdown Pelayanan pada halaman legacy dibersihkan.
- Workflow sementara migrasi dibersihkan.

## QC
- Lima klaster tersedia di Pelayanan.
- Lima unsur Informasi Pelayanan tersedia per klaster.
- Klaster 1 tidak lagi menjadi section/tab utama di Profil.
- Detail Klaster 1 tetap tersedia di Manajemen Puskesmas.
- Asset dan halaman detail yang direferensikan tersedia.
- `main` tidak diubah langsung.
- Pixel-level Production belum diverifikasi karena akses Vercel berbeda team.
- Review visual Preview/Production tetap wajib sebelum merge.
