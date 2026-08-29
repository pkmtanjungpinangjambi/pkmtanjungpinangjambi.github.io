# CHECKPOINT WEB — ARSITEKTUR KLASTER 1–5

Tanggal: 29 Agustus 2026

## Baseline aman
- Main baseline: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
- Main tidak diubah langsung.
- Branch fitur: `feature/manajemen-puskesmas-cluster-1-clean`
- Pull Request: #138

## Arsitektur master yang ditetapkan
- **Klaster 1–5 menjadi tulang punggung struktur informasi website.**
- **Profil** fokus pada identitas Puskesmas: sejarah, visi & misi, motto & tata nilai, karakteristik & kekuatan.
- **Manajemen Puskesmas** menjadi menu utama untuk informasi lengkap **Klaster 1 — Manajemen**.
- **Pelayanan** tetap menampilkan **Klaster 1–5** sebagai struktur utama pelayanan.
- **Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online** menjadi **Informasi Pelayanan di dalam masing-masing klaster**, bukan submenu global.
- Klaster 1 pada menu Pelayanan menjadi entry point menuju detail lengkap di `manajemen-puskesmas.html` agar tidak terjadi duplikasi konten besar.
- Seluruh konten website ke depan harus memiliki keterkaitan dengan satu atau lebih Klaster 1–5.

## Struktur Manajemen Puskesmas — Klaster 1
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

## Struktur Pelayanan
Setiap Klaster menggunakan pola yang seragam:

**Layanan Utama**
+
**Informasi Pelayanan**
- Jadwal
- Tarif
- Persyaratan
- Alur
- Layanan Online

## Preservation / anti-regression
Materi Klaster 1 yang sebelumnya berada di Profil dipindahkan ke Manajemen Puskesmas dan tetap dipertahankan secara fungsional, termasuk:
- daftar unsur/PJ manajemen;
- Wilayah Kerja dan 3 Pustu;
- Maklumat & Komitmen Pelayanan;
- IKM Triwulan I 2026 dan Triwulan II 2026 beserta asset poster;
- Prestasi & Penghargaan 2019–2025.

## QC yang sudah dilakukan
- Validasi HTML seluruh halaman: PASS.
- `node --check script.js`: PASS.
- `node --check content-protection.js`: PASS.
- Guard Profil: section/tab legacy Klaster 1 sudah dikeluarkan.
- Guard Pelayanan: struktur Klaster 1–5 sudah tersedia.
- Guard navigasi: halaman legacy sudah diberi akses Manajemen Puskesmas.
- Guard asset Maklumat dan IKM: PASS.
- `git diff --check`: PASS.
- Vercel/CI pada branch: SUCCESS.

## Status visual
- Struktur visual dan responsive CSS mengikuti pola halaman Klaster 4–5 yang sebelumnya lulus QC.
- Pixel-level screenshot langsung dari Production belum dapat diverifikasi dari sesi ini karena akses Vercel yang terhubung berada pada team berbeda.

## Sebelum merge
- Review visual final Preview/Production.
- Uji desktop dan mobile.
- Uji accordion Klaster 1–5.
- Uji link Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online dari setiap klaster.
- Uji seluruh navigasi utama dan halaman detail.
- Merge hanya setelah review final dinyatakan aman.

## Aturan lanjutan
- Jangan mengubah `main` langsung.
- Perubahan lanjutan melalui branch dan PR.
- Jangan menghapus fitur/content yang sudah berjalan tanpa verifikasi.
- Setelah merge, buat checkpoint baru dengan SHA merge sebagai baseline berikutnya.
