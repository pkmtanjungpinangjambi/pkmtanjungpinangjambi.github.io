# CHECKPOINT — NAVIGASI 4 MENU UTAMA

Tanggal: 29 Agustus 2026
Status: POST-MERGE BASELINE

## Keputusan arsitektur yang berlaku
- Website mempertahankan tepat **4 menu utama** pada navigasi utama:
  1. Beranda
  2. Profil
  3. Pelayanan
  4. Informasi
- CTA seperti WhatsApp/Pendaftaran bukan menu utama.
- **Manajemen Puskesmas tidak menjadi menu utama tersendiri.**
- Manajemen Puskesmas ditempatkan dalam ekosistem **Pelayanan → Klaster 1 — Manajemen**.
- Pelayanan menjadi induk **Klaster 1–5**.
- Setiap klaster memiliki ekosistem pelayanan: **Layanan Utama + Jadwal + Tarif + Persyaratan + Alur + Layanan Online**.
- Jadwal dan Tarif tidak menjadi submenu global pada navigasi utama; keduanya tetap dapat diakses dari konteks klaster.

## Struktur navigasi Pelayanan
Pelayanan
├── Klaster 1 — Manajemen
│   ├── Akses Klaster 1
│   └── Manajemen Puskesmas
├── Klaster 2 — Ibu & Anak
├── Klaster 3 — Dewasa & Lansia
├── Klaster 4 — Penanggulangan Penyakit Menular
└── Klaster 5 — Lintas Klaster

## Struktur menu Profil
Profil
├── Sejarah
├── Visi & Misi
├── Motto & Tata Nilai
└── Karakteristik & Kekuatan

## Struktur menu Informasi
Informasi
├── Pengumuman
├── Berita & Kegiatan
├── Galeri Foto & Video
├── Edukasi
├── Program & Inovasi
├── Informasi ILP
├── Download
└── Kontak & Lokasi

## Implementasi yang sudah masuk main
- Normalisasi navigasi sitewide menggunakan `content-protection.js` sebagai titik kontrol bersama.
- Dropdown Pelayanan memuat Klaster 1–5 serta akses Manajemen Puskesmas.
- Detail layanan per klaster tetap ditampilkan pada halaman/komponen klaster, bukan ditumpuk seluruhnya di navbar.
- Materi Klaster 1 yang dipindahkan dari Profil tetap dipertahankan pada halaman Manajemen Puskesmas.

## Baseline keselamatan
- **Main baseline terbaru:** `d05738e5822c817bfd70cfff532b792171ccbd3c`
- Baseline sebelumnya: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
- PR **#138 sudah MERGED** pada 29 Agustus 2026.
- Merge commit: `d05738e5822c817bfd70cfff532b792171ccbd3c`.
- Vercel pada merge commit: **SUCCESS**.
- `main` tidak diubah langsung selama pekerjaan fitur; perubahan masuk melalui branch dan PR.
- Workflow migrasi sementara sudah dibersihkan.
- `node --check content-protection.js`: PASS.
- Pixel-level screenshot Production belum diverifikasi dari sesi ini karena akses Vercel yang tersedia berada pada team berbeda.

## Checkpoint lanjutan
- Branch checkpoint: `chore/checkpoint-post-merge-2026-08-29`
- Dokumen ini menjadi sumber keputusan navigasi terbaru.
- Tata ulang detail submenu Klaster 1–5 dilakukan pada branch terpisah berikutnya.
- Jangan menambah menu utama baru tanpa keputusan arsitektur baru.
