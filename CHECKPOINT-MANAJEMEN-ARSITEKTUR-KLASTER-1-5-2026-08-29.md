# CHECKPOINT — ARSITEKTUR PELAYANAN KLASTER 1–5

Tanggal: 29 Agustus 2026
Baseline main: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
Branch kerja: `feature/manajemen-puskesmas-cluster-1-clean`

- Klaster 1–5 menjadi tulang punggung struktur informasi website.
- Profil berfokus pada identitas Puskesmas; Klaster 1 tidak lagi menjadi section utama Profil.
- Manajemen Puskesmas menjadi menu utama untuk informasi lengkap Klaster 1.
- Pelayanan tetap menampilkan Klaster 1–5.
- Setiap klaster memiliki Informasi Pelayanan di dalamnya: Jadwal, Tarif, Persyaratan, Alur, Layanan Online.
- Manajemen Puskesmas dan Pelayanan saling melengkapi tanpa duplikasi konten besar.
- `main` tidak diubah langsung.
- Pixel-level Production belum diverifikasi karena akses Vercel berbeda team.

## Implementasi terbaru
- `pelayanan.html` memuat lima klaster dengan accordion.
- Klaster 1 menjadi entry point ke Manajemen Puskesmas.
- Informasi Pelayanan lima unsur berada di dalam masing-masing klaster.
- Dropdown Pelayanan di halaman Pelayanan memuat Klaster 1–5.
- Global link Jadwal/Tarif/Persyaratan/Alur/Layanan Online dari dropdown Pelayanan pada halaman legacy sudah dibersihkan.

## QC
- Cleanup global service links workflow: SUCCESS.
- Validasi HTML/navigation pada workflow cleanup: PASS.
- Workflow migrasi sementara sudah dibersihkan.

## Sebelum merge
Review visual Preview/Production, uji accordion/mobile/navigation/link, lalu merge hanya setelah review final.
