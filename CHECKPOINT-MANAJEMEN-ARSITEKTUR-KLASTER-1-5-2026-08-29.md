# CHECKPOINT — ARSITEKTUR PELAYANAN KLASTER 1–5

Tanggal: 29 Agustus 2026
Baseline main: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
Branch kerja: `feature/manajemen-puskesmas-cluster-1-clean`

## Keputusan arsitektur
- Klaster 1–5 menjadi tulang punggung struktur informasi website.
- Profil berfokus pada identitas Puskesmas dan tidak lagi menjadi rumah Klaster 1.
- Manajemen Puskesmas menjadi menu utama untuk informasi lengkap Klaster 1 — Manajemen.
- Pelayanan tetap menampilkan Klaster 1, 2, 3, 4, dan 5.
- Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online berada di dalam masing-masing klaster sebagai Informasi Pelayanan.
- Detail manajemen Klaster 1 diarahkan ke `manajemen-puskesmas.html` sehingga tidak terjadi duplikasi konten besar.

## Struktur setiap Klaster
- Layanan utama.
- Informasi Pelayanan: Jadwal, Tarif, Persyaratan, Alur, Layanan Online.

## Implementasi
- `pelayanan.html` menjadi halaman utama lima klaster.
- Klaster 1 menjadi entry point ke Manajemen Puskesmas.
- Klaster 2–5 tetap menyediakan tautan ke halaman detail layanan yang tersedia.
- Informasi Pelayanan ditempatkan di dalam accordion masing-masing klaster.
- Dropdown Pelayanan pada halaman Pelayanan memuat Klaster 1–5.
- Workflow sementara migrasi sudah dibersihkan.

## QC
- Lima klaster tersedia di Pelayanan.
- Lima unsur Informasi Pelayanan tersedia di setiap klaster.
- Klaster 1 tidak lagi menjadi section/tab utama di Profil.
- Detail Klaster 1 tetap tersedia di Manajemen Puskesmas.
- Asset dan halaman detail yang direferensikan tetap tersedia.
- `main` tidak diubah langsung.
- Pixel-level Production belum diverifikasi karena akses Vercel berbeda team.

## Sebelum merge
- Review visual Preview/Production.
- Uji accordion, mobile navigation, dan seluruh tautan layanan.
- Merge hanya setelah review final.
