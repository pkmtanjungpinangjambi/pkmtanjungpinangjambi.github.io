# CHECKPOINT — ARSITEKTUR PELAYANAN KLASTER 1–5

Tanggal: 29 Agustus 2026
Status: POST-MERGE BASELINE

## Keputusan arsitektur yang berlaku
- Klaster **1–5** menjadi tulang punggung struktur informasi pelayanan website.
- **Profil** berfokus pada identitas Puskesmas; Klaster 1 tidak lagi menjadi section utama Profil.
- **Manajemen Puskesmas bukan menu utama tersendiri**.
- Manajemen Puskesmas ditempatkan dalam ekosistem **Pelayanan → Klaster 1 — Manajemen**.
- **Pelayanan** menjadi induk Klaster 1–5.
- Setiap klaster memiliki ekosistem pelayanan lengkap: **Layanan Utama + Jadwal + Tarif + Persyaratan + Alur + Layanan Online**.
- Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online bukan submenu global pada navigasi utama; semuanya mengikuti konteks klaster.

## Struktur master
Pelayanan
├── Klaster 1 — Manajemen
│   ├── Akses Klaster 1
│   └── Manajemen Puskesmas
├── Klaster 2 — Ibu & Anak
├── Klaster 3 — Dewasa & Lansia
├── Klaster 4 — Penanggulangan Penyakit Menular
└── Klaster 5 — Lintas Klaster

Di dalam masing-masing klaster:
├── Layanan Utama
├── Jadwal
├── Tarif
├── Persyaratan
├── Alur
└── Layanan Online

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

## Preservation / anti-regression
Materi Klaster 1 yang sebelumnya berada di Profil telah dipindahkan dan dipertahankan secara fungsional pada Manajemen Puskesmas, termasuk unsur/PJ, wilayah & Pustu, Maklumat/Komitmen, IKM, serta Prestasi & Penghargaan.

## Implementasi navigasi
- Navigasi sitewide memakai titik kontrol bersama `content-protection.js`.
- Navigasi utama tetap **4 menu**: Beranda, Profil, Pelayanan, Informasi.
- Dropdown Pelayanan memuat Klaster 1–5 serta akses Manajemen Puskesmas.
- Detail submenu per klaster tetap berada pada halaman/komponen klaster agar navbar tidak terlalu dalam.

## Baseline dan deployment
- **Main baseline terbaru:** `d05738e5822c817bfd70cfff532b792171ccbd3c`
- PR **#138** telah MERGED pada 29 Agustus 2026.
- Merge commit: `d05738e5822c817bfd70cfff532b792171ccbd3c`.
- Vercel pada merge commit: **SUCCESS**.
- Pixel-level screenshot Production belum diverifikasi dari sesi ini karena akses Vercel yang tersedia berbeda team.

## Aturan proyek selanjutnya
- Jangan mengubah `main` langsung; gunakan branch + PR untuk perubahan berikutnya.
- Jangan menghapus fitur/content yang masih berjalan tanpa verifikasi.
- Tata ulang detail submenu Klaster 1–5 dilakukan bertahap dengan pola seragam.
- Checkpoint ini menjadi baseline sebelum pekerjaan detail submenu berikutnya.
