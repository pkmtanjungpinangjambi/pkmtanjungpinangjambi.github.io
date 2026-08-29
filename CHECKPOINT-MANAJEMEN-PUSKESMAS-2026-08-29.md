# CHECKPOINT WEB — MANAJEMEN PUSKESMAS

Tanggal: 29 Agustus 2026

## Baseline aman
- Main baseline: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
- Main tidak diubah langsung.
- Branch fitur: `feature/manajemen-puskesmas-cluster-1-clean`
- Branch head saat checkpoint: `7d27ebf4fabca9c574f90875a0c5b3962a88e679`
- Pull Request: #138

## Arsitektur yang ditetapkan
- **Profil** fokus pada identitas Puskesmas: sejarah, visi & misi, motto & tata nilai, karakteristik & kekuatan.
- **Manajemen Puskesmas** menjadi menu utama untuk **Klaster 1 — Manajemen**.
- **Pelayanan** berfokus pada Klaster 2–5.
- Standar pelayanan Klaster 1 menjadi unsur penunjang di dalam Manajemen Puskesmas.
- Seluruh konten website direncanakan memiliki keterkaitan dengan Klaster 1–5.

## Isi Manajemen Puskesmas
- Ketatausahaan & Layanan Administrasi
  - Front Liner / Front Office
  - Pendaftaran & Rekam Medik
  - Informasi, Keluhan & Pengaduan
  - Surat Masuk & Surat Keluar
  - Surat Keterangan Sehat
  - Promosi Kesehatan
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

## Preservation / anti-regression
Materi Klaster 1 yang sebelumnya berada di Profil tidak dihilangkan secara fungsional, tetapi dipindahkan ke Manajemen Puskesmas, termasuk:
- daftar unsur/PJ manajemen;
- Wilayah Kerja dan 3 Pustu;
- Maklumat & Komitmen Pelayanan;
- IKM Triwulan I 2026 dan Triwulan II 2026 beserta asset poster;
- Prestasi & Penghargaan 2019–2025.

## Testing yang sudah lolos
- Validasi HTML seluruh halaman: PASS.
- `node --check script.js`: PASS.
- `node --check content-protection.js`: PASS.
- Guard: `profil.html` tidak lagi memiliki section/tab legacy `klaster1`.
- Guard: `pelayanan.html` tidak lagi memiliki accordion legacy `klaster-1`.
- Guard: halaman HTML dengan navigasi memiliki link Manajemen Puskesmas.
- Guard: asset Maklumat dan IKM tersedia.
- `git diff --check`: PASS.

## Deployment
- Production deployment dari sesi ini belum dapat diverifikasi pixel-level karena akses Vercel yang terhubung berbeda team.
- Jangan merge sebelum review final dan verifikasi preview/Production oleh akses yang sesuai.

## Aturan lanjutan
- Jangan mengubah `main` langsung.
- Perubahan lanjutan melalui branch dan PR.
- Jangan menghapus fitur/content yang sudah berjalan tanpa verifikasi.
- Setelah merge, buat checkpoint baru dengan SHA merge sebagai baseline berikutnya.
