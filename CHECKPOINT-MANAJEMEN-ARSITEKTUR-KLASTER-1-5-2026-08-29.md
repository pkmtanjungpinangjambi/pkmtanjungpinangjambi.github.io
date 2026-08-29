# CHECKPOINT — ARSITEKTUR PELAYANAN KLASTER 1–5

Tanggal: 29 Agustus 2026
Baseline main: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
Branch kerja: `feature/manajemen-puskesmas-cluster-1-clean`

## Keputusan arsitektur
- **Klaster 1–5 menjadi tulang punggung struktur informasi website.**
- **Profil** berfokus pada identitas Puskesmas dan tidak lagi menjadi rumah Klaster 1.
- **Manajemen Puskesmas** menjadi menu utama untuk informasi lengkap **Klaster 1 — Manajemen**.
- **Pelayanan** tetap menampilkan **Klaster 1, 2, 3, 4, dan 5**.
- **Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online** berada di dalam masing-masing klaster sebagai **Informasi Pelayanan**, bukan menu global di halaman Pelayanan.
- Detail manajemen Klaster 1 diarahkan ke `manajemen-puskesmas.html`, sehingga tidak terjadi duplikasi konten besar.

## Struktur Klaster 1
- Ketatausahaan & Layanan Administrasi
- Manajemen Sumber Daya
- Manajemen Puskesmas
- Mutu & Keselamatan Pasien
- Manajemen Jejaring
- Pemberdayaan Masyarakat
- Struktur Organisasi
- Wilayah Kerja & Pustu
- Komitmen & IKM
- Prestasi & Penghargaan
- Standar Pelayanan Klaster 1

## Struktur Pelayanan
Setiap klaster memiliki:
1. Daftar layanan utama.
2. Informasi Pelayanan:
   - Jadwal
   - Tarif
   - Persyaratan
   - Alur
   - Layanan Online

## Implementasi terbaru
- `pelayanan.html` dikembalikan menjadi halaman 5 klaster.
- Klaster 1 dibuat sebagai entry point menuju Manajemen Puskesmas.
- Klaster 2–5 tetap mempertahankan layanan utama yang tersedia melalui halaman detail.
- Paket Informasi Pelayanan ditempatkan di dalam setiap klaster.
- Dropdown Pelayanan pada halaman utama hanya memuat Klaster 1–5.
- Workflow sementara untuk migrasi sudah dibersihkan; workflow repository aktif yang tersisa adalah workflow content protection yang sudah ada sebelumnya.

## QC
- Validasi struktur lima klaster: dilakukan pada implementasi langsung.
- `pelayanan.html` memuat lima klaster.
- Setiap klaster memiliki paket lima Informasi Pelayanan.
- `manajemen-puskesmas.html` tetap menjadi pusat detail Klaster 1.
- `main` tidak diubah langsung.
- Pixel-level Production belum diverifikasi dari sesi ini karena akses Vercel berbeda team.

## Catatan sebelum merge
- Lakukan review visual pada Preview/Production.
- Pastikan tidak ada regresi pada accordion, mobile navigation, dan halaman detail layanan.
- Merge PR hanya setelah review final.
