# CHECKPOINT — KLASTER 3 QC REGULATORY 2026

Tanggal: 31 Agustus 2026
Baseline: main `843104b7b069e9488448088e96b067dbd9e4e3af`
Branch: `fix/klaster3-regulatory-2026-08-31`

## Scope
Regulatory refresh untuk lima halaman layanan Klaster 3. Tidak mengubah desain besar dan tidak menambahkan prosedur klinis rinci.

## Temuan dan keputusan
1. Cek Kesehatan Gratis menggunakan Kepmenkes HK.01.07/Menkes/84/2026, berstatus berlaku, dan dilaksanakan 1 tahun sekali.
2. Klaster dewasa dan lansia diberi konteks CKG tahunan.
3. Klaster lansia menyebut skrining geriatri ADL dan SKILAS pada konteks CKG usia >=60 tahun.
4. Pelayanan KB dan Catin menggunakan Permenkes 2 Tahun 2025 tentang Penyelenggaraan Upaya Kesehatan Reproduksi sebagai dasar aktif; Permenkes 21 Tahun 2021 tidak lagi dipakai sebagai dasar aktif karena telah dicabut oleh Permenkes 2/2025.
5. Catin juga dihubungkan dengan CKG 2026.
6. UBM menggunakan PP 28 Tahun 2024 tentang Peraturan Pelaksanaan UU 17/2023, serta Perda Kota Jambi No. 3 Tahun 2017 tentang Kawasan Tanpa Rokok.

## Perubahan file
- pelayanan-kesehatan-dewasa.html
- pelayanan-kesehatan-lansia.html
- pelayanan-kb.html
- pelayanan-catin.html
- pelayanan-ubm.html

## QC
- Effective code changes: 5 halaman layanan Klaster 3.
- Vercel status pada head branch: SUCCESS.
- Main branch tidak diedit langsung.
- Browser automation belum diklaim PASS; visual check final tetap dilakukan setelah deployment merge.

## Sumber regulasi utama
- JDIH Kemenkes: Permenkes 19/2024 — status berlaku.
- JDIH Kemenkes: Permenkes 2/2025 — status berlaku, mencabut Permenkes 21/2021.
- JDIH Kemenkes: Kepmenkes HK.01.07/Menkes/84/2026 — status berlaku, Petunjuk Teknis Cek Kesehatan Gratis.
- PP 28/2024 — pengamanan zat adiktif/produk tembakau dan rokok elektronik.
- JDIH Kota Jambi: Perda Kota Jambi No. 3/2017 — Kawasan Tanpa Rokok, status berlaku.
