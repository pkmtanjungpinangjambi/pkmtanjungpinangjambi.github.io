# CHECKPOINT — ARSITEKTUR DATA BERBASIS KLASTER

Tanggal: 4 September 2026
Branch: `feat/klaster-data-architecture-20260904`

## Keputusan arsitektur

Puskesmas diperlakukan sebagai satu sistem pelayanan yang terdiri dari 5 klaster:

1. Klaster 1 — Manajemen
2. Klaster 2 — Ibu & Anak
3. Klaster 3 — Dewasa & Lansia
4. Klaster 4 — Penyakit Menular
5. Klaster 5 — Lintas Klaster

Database tidak dibuat sebagai menu yang berdiri sendiri. Data mengikuti klaster dan menjadi bagian dari modul klaster bersama pelayanan, jadwal, skrining/surveilans, tindak lanjut, Monev, indikator, dan evidence sesuai kebutuhan.

## Prinsip data

- `KLASTER -> DATA -> OPERASIONAL -> MONEV -> MUTU -> EVIDENCE`
- Beranda hanya menampilkan ringkasan/quick access yang bersumber dari modul klaster.
- Jadwal umum dan jadwal imunisasi dapat ditampilkan di beranda, tetapi sumbernya tetap berasal dari klaster terkait.
- Repository publik tidak boleh menyimpan data pasien, NIK, nomor rekam medis, hasil pemeriksaan individual, atau informasi kesehatan yang dapat mengidentifikasi seseorang.
- Data operasional sensitif nantinya harus berada di backend/database terproteksi dengan autentikasi, otorisasi berbasis peran, audit log, validasi input, dan perlindungan terhadap akses langsung.

## Implementasi tahap ini

File `data/klaster-config.js` dibuat sebagai kontrak metadata untuk lima klaster. File tersebut hanya berisi struktur modul dan tidak menyimpan data pasien.

## Tahap berikutnya

Integrasikan konfigurasi ini ke halaman Pelayanan dan buat komponen/halaman data per klaster tanpa mengubah navigasi publik menjadi database pasien.
