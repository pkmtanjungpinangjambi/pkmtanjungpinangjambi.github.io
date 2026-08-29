# CHECKPOINT WEB — MANAJEMEN PUSKESMAS

Tanggal: 29 Agustus 2026

## Baseline aman
- Main baseline: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
- Main tidak diubah langsung.
- Branch fitur: `feature/manajemen-puskesmas-cluster-1-clean`
- Pull Request: #138

## Arsitektur terbaru yang ditetapkan
- Website mempertahankan tepat **4 menu utama**: **Beranda, Profil, Pelayanan, Informasi**.
- **Manajemen Puskesmas bukan menu utama tersendiri**.
- Manajemen Puskesmas berada di ekosistem **Pelayanan → Klaster 1 — Manajemen**.
- **Pelayanan adalah induk Klaster 1–5**.
- Setiap klaster memiliki ekosistem pelayanan lengkap: **Layanan Utama + Jadwal + Tarif + Persyaratan + Alur + Layanan Online**.
- Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online tidak menjadi submenu global pada navigasi utama.
- Profil fokus pada identitas Puskesmas dan tidak menjadi rumah Klaster 1.

## Isi Manajemen Puskesmas — Klaster 1
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

## Struktur navigasi Pelayanan
- Klaster 1 — Manajemen
  - Akses Klaster 1 pada `pelayanan.html#klaster-1`
  - Akses detail Manajemen Puskesmas pada `manajemen-puskesmas.html`
- Klaster 2 — Ibu & Anak
- Klaster 3 — Dewasa & Lansia
- Klaster 4 — Penanggulangan Penyakit Menular
- Klaster 5 — Lintas Klaster

## Preservation / anti-regression
Materi Klaster 1 yang sebelumnya berada di Profil tetap dipertahankan secara fungsional di Manajemen Puskesmas, termasuk:
- daftar unsur/PJ manajemen;
- Wilayah Kerja dan 3 Pustu;
- Maklumat & Komitmen Pelayanan;
- IKM Triwulan I 2026 dan Triwulan II 2026 beserta aset poster;
- Prestasi & Penghargaan 2019–2025.

## Implementasi navigasi
- Konsistensi empat menu utama diterapkan melalui `content-protection.js` sebagai titik kontrol navigasi bersama.
- Pelayanan dropdown memuat Klaster 1–5 serta akses Manajemen Puskesmas.
- Informasi dropdown tidak lagi memuat Tarif sebagai submenu global; Tarif tetap diakses melalui ekosistem klaster.
- CTA seperti WhatsApp/Pendaftaran tetap terpisah dari empat menu utama.

## Testing
- `node --check content-protection.js`: PASS.
- Validasi HTML/JavaScript sebelumnya: PASS.
- `git diff --check` sebelumnya: PASS.
- Workflow migrasi sementara sudah dihapus.

## Deployment
- Vercel untuk commit terbaru masih menunggu status final saat checkpoint ini dibuat.
- Pixel-level Production belum diverifikasi karena akses Vercel yang terhubung berbeda team.

## Aturan lanjutan
- Jangan mengubah `main` langsung.
- Perubahan lanjutan melalui branch dan PR.
- Jangan menghapus fitur/content yang sudah berjalan tanpa verifikasi.
- Tata ulang detail submenu dapat dilanjutkan setelah arsitektur empat menu utama stabil.
- Setelah merge, buat checkpoint baru dengan SHA merge sebagai baseline berikutnya.