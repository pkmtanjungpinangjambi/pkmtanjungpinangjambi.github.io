# CHECKPOINT — NAVIGASI 4 MENU UTAMA

Tanggal: 30 Agustus 2026
Status: POST-QC BASELINE

## Keputusan arsitektur yang berlaku
- Website mempertahankan tepat **4 menu utama** pada navigasi utama:
  1. Beranda
  2. Profil
  3. Pelayanan
  4. Informasi
- CTA seperti WhatsApp/Pendaftaran bukan menu utama.
- **Manajemen Puskesmas tidak menjadi menu utama tersendiri dan tidak menjadi item tersendiri di dropdown navbar.**
- Pelayanan menjadi induk **Klaster 1–5**.
- **Klaster 1 — Manajemen** menjadi satu-satunya pintu masuk manajemen dari navbar.
- Detail manajemen tetap tersedia pada halaman `manajemen-puskesmas.html` melalui ekosistem/isi Klaster 1, tanpa menambah item navbar baru.
- Setiap klaster memiliki ekosistem pelayanan: **Layanan Utama + Jadwal + Tarif + Persyaratan + Alur + Layanan Online**.
- Jadwal dan Tarif tidak menjadi submenu global pada navigasi utama; keduanya tetap dapat diakses dari konteks klaster.

## Struktur navigasi Pelayanan
Pelayanan
├── Klaster 1 — Manajemen
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

## Implementasi
- Normalisasi navigasi sitewide menggunakan `content-protection.js` sebagai titik kontrol bersama.
- Dropdown Pelayanan hanya memuat Klaster 1–5.
- Guard + `MutationObserver` menjaga agar markup lama tidak mengembalikan item Manajemen Puskesmas ke navbar.
- Detail layanan per klaster tetap ditampilkan pada halaman/komponen klaster, bukan ditumpuk seluruhnya di navbar.
- Materi Klaster 1 tetap dipertahankan pada halaman Manajemen Puskesmas.

## Baseline keselamatan
- `main` terbaru saat checkpoint ini diperbarui dari merge PR #142.
- Perubahan masuk melalui branch dan PR; `main` tidak diubah langsung.
- Vercel pada commit merge PR #142 berstatus **SUCCESS**.
- `node --check content-protection.js`: **PASS**.
- Pixel-level screenshot Production belum diverifikasi dari sesi ini karena akses Vercel yang tersedia berada pada team berbeda.

## Checkpoint lanjutan
- **Jangan menambah menu utama baru tanpa keputusan arsitektur baru.**
- Untuk navigasi, istilah **Manajemen Puskesmas** diperlakukan sebagai nama halaman/isi Klaster 1, bukan item navbar.
