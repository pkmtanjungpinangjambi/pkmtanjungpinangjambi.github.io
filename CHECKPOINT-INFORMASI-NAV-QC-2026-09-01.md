# CHECKPOINT — INFORMASI NAV QC 2026

Tanggal: 1 September 2026
Scope: normalisasi static navbar pada empat halaman Informasi.

## Temuan
- `informasi.html`, `edukasi.html`, `program.html`, dan `download.html` masih membawa markup navbar legacy.
- Markup legacy menampilkan Tarif Pelayanan sebagai top-level menu dan memasukkan kelompok Informasi/Pengaduan ke dalam dropdown utama.
- Dropdown Pelayanan juga memakai label Klaster yang tidak seragam.

## Keputusan
Navbar statis diseragamkan dengan arsitektur final:
- menu utama: Beranda, Profil, Pelayanan, Informasi;
- dropdown Pelayanan: Klaster 1 — Manajemen sampai Klaster 5 — Lintas Klaster;
- tidak ada Tarif Pelayanan atau grup Pengaduan sebagai menu utama;
- CTA WhatsApp tetap terpisah.

## QC
- 4 halaman diperbarui.
- Perubahan hanya pada markup navbar.
- Workflow normalisasi satu-kali dihapus setelah eksekusi.
- Tidak mengubah konten edukasi/program/download.
