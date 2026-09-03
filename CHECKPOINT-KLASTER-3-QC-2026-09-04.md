# CHECKPOINT — KLASTER 3 QC 2026-09-04

## Baseline
- Base produksi: `main` @ `0bcbd2bfc0de6d13aae1deb8b9ce6f2fc0e12b3b`.
- Branch kerja: `feat/klaster-3-qc-2026-09-04`.
- Fokus: audit konsistensi detail layanan Klaster 3 sebelum memperluas pathway klinis.

## Ruang lingkup layanan yang diaudit
1. `pelayanan-kesehatan-dewasa.html`
2. `pelayanan-kesehatan-lansia.html`
3. `pelayanan-kb.html`
4. `pelayanan-catin.html`
5. `pelayanan-ubm.html`

## Hasil audit awal
- Hub `pelayanan.html` sudah memetakan Klaster 3 ke lima layanan detail: Dewasa, Lansia, KB, Catin, dan UBM.
- Seluruh lima halaman memakai pola navigasi kembali ke `pelayanan.html#klaster-3`.
- Halaman Dewasa sudah memuat skrining, pemeriksaan, pencegahan/edukasi, tata laksana/tindak lanjut, alur/persyaratan/waktu/biaya, serta keselamatan pasien dan rujukan.
- Halaman Lansia sudah memuat pemeriksaan/screening, kemandirian/risiko, promotif-preventif, tata laksana, alur/persyaratan, serta keselamatan dan perlindungan pasien.
- KB, Catin, dan UBM sudah memiliki alur dasar, konseling/pemeriksaan, tindak lanjut, dan bagian `Dasar Hukum & Referensi`.
- Kanal layanan dan standar lokal 2026 sudah tercermin pada struktur layanan Klaster 3.

## Integrasi Matrix RME Klaster 3 — Lansia
- Tahap 1 validasi terdiri dari 8 instrumen raw: SCR-005 sampai SCR-012.
- SKILAS dan ADL diposisikan sebagai **core annual screening**.
- Mini-Cog, Frailty, SPPB, MNA-SF, dan GDS-4 diposisikan **conditional/triggered**, bukan skrining annual universal.
- AMT ditandai **REVIEW KHUSUS** dan tidak diaktifkan sebagai default baru.
- IADL Lawton, SARC-CalF, dan AD-8 dicatat sebagai **guidance delta/supporting assessment** dan tidak membuat SCR baru otomatis.
- Final clinical guidance masih memerlukan review owner/PJ lokal.

## Keputusan website pada gate ini
1. Jangan menambahkan decision tree klinis baru ke halaman publik sebelum guidance final/owner review.
2. Pertahankan halaman Lansia pada bahasa umum yang aman: skrining → asesmen lanjutan sesuai temuan → tindak lanjut/rujukan sesuai SOP.
3. Pertahankan perbedaan antara `core annual` dan `conditional` agar website tidak memberi kesan semua instrumen dilakukan setiap kunjungan atau setiap tahun.
4. Jangan memasukkan IADL Lawton/SARC-CalF/AD-8 sebagai SCR baru di website atau registry tanpa keputusan governance.
5. Permenkes 24/2022 dan KMK 165/2023 digunakan sebagai landasan tata kelola RME, mutu, rekam medis, manajemen risiko, dan keselamatan pasien pada tahap arsitektur; bukan sebagai dasar terapi klinis.
6. Permen PANRB 1/2023 dicatat sebagai referensi tata kelola Jabatan Fungsional/kinerja bila kelak diperlukan pada modul manajemen SDM, bukan pada halaman klinis Klaster 3.

## Gap untuk tahap berikutnya
- Standardisasi visual `Dasar Hukum & Referensi` pada seluruh halaman detail Klaster 3.
- Standardisasi penanda tata kelola RME/kerahasiaan pada halaman layanan yang relevan.
- Review Stage 2 Klaster 3: skrining lansia non-geriatri dan layanan dewasa/PTM berdasarkan Matrix 55 instrumen.
- Setelah owner/PJ mengunci guidance, refresh pathway publik Klaster 3 tanpa mengubah nama raw 55 instrumen.

## Status
- [x] Branch khusus dibuat dari baseline produksi.
- [x] Hub Klaster 3 diaudit.
- [x] Lima halaman detail Klaster 3 ditemukan dan direview.
- [x] Matrix lansia v0.4 dicocokkan dengan konten publik.
- [x] Tidak ada clinical decision rule baru ditambahkan pada gate ini.
- [ ] Standardisasi UI referensi Klaster 3.
- [ ] Validasi owner/PJ tahap berikutnya.
- [ ] Stage 2 Matrix Klaster 3.

## Prinsip keamanan
Tidak ada data pasien, NIK, kredensial, API key, token, atau rahasia yang ditambahkan ke repository publik.
