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

## Sebelum merge
Review visual Preview/Production, uji accordion/mobile/navigation/link, lalu merge hanya setelah review final.
