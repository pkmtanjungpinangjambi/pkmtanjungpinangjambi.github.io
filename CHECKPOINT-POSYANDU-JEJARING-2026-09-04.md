# CHECKPOINT — POSYANDU SEBAGAI JEJARING ILP

Tanggal: 4 September 2026

## Keputusan
- Posyandu bukan salah satu dari Klaster 1–5 Puskesmas.
- Posyandu merupakan jejaring pelayanan kesehatan primer berbasis masyarakat.
- Fungsi pengelolaan dan pembinaan jejaring Posyandu ditempatkan pada Klaster 1 — Manajemen, khususnya Manajemen Jejaring.
- Kegiatan Posyandu dapat melayani sasaran beberapa klaster menurut siklus hidup, terutama Klaster 2 (Ibu & Anak) dan Klaster 3 (Dewasa & Lansia).

## Dasar rujukan
- KMK HK.01.07/MENKES/2015/2023 tentang Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer: Klaster 1 mencakup manajemen jejaring Puskesmas.
- Permenkes 19 Tahun 2024 tentang Penyelenggaraan Pusat Kesehatan Masyarakat: pelayanan primer diselenggarakan secara terintegrasi di Puskesmas serta jaringan/jejaring Puskesmas untuk memenuhi kebutuhan setiap fase kehidupan.
- Kementerian Kesehatan menjelaskan integrasi layanan primer melalui Posyandu dengan sasaran seluruh siklus hidup dan penguatan pemantauan wilayah setempat (PWS).

## Implementasi website
- `data/klaster-config.js`: Klaster 1 memiliki modul `Manajemen Jejaring` dan `Posyandu & UKBM`.
- `data/jejaring-public.js`: kontrak metadata publik Posyandu dan Pustu tanpa data individual.
- `data/jadwal-public.js`: relasi `managementClusterId` dan `serviceClusterIds` membedakan tempat pengelolaan dan sasaran layanan.
- `README-KLASTER-ARCHITECTURE.md`: dokumentasi arsitektur kanonik.

## Catatan keamanan
Data pasien, NIK, nomor rekam medis, hasil pemeriksaan individual, identitas kader, dan PHI/PII tidak boleh diletakkan di repository publik. Data operasional harus berada pada backend terautentikasi/terotorisasi.
