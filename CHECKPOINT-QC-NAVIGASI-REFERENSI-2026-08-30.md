# CHECKPOINT — QC NAVIGASI & REFERENSI

Tanggal: 30 Agustus 2026
Status: READY FOR REVIEW

## Baseline
- Main terbaru saat branch dibuat: `2b917060797f704f28c8457cb5cf732a57eb288e`
- Branch: `fix/nav-hukum-referensi-qc-2026-08-30-v2`
- Perubahan fitur pada branch: 1 file utama (`content-protection.js`) + dokumen checkpoint ini.

## Temuan QC
1. Navigasi utama harus mempertahankan tepat 4 menu: Beranda, Profil, Pelayanan, Informasi.
2. Manajemen Puskesmas tidak boleh tampil sebagai menu utama tersendiri; posisinya berada di Pelayanan → Klaster 1 — Manajemen.
3. Beberapa halaman masih membawa markup header lama dengan item Manajemen Puskesmas pada sumber HTML, sehingga diperlukan normalisasi terpusat dan guard setelah halaman dimuat.
4. Daftar Dasar Hukum/Referensi menggunakan pola tipografi yang berbeda: sebagian item memakai `<strong>`, sebagian tidak.

## Perbaikan
- Menambahkan versi kontrol navigasi `2026-08-30`.
- Menambahkan verifikasi top-level navigation dan normalisasi ulang bila label `Manajemen Utama` atau `Manajemen Puskesmas` muncul pada level utama.
- Menambahkan `MutationObserver` agar perubahan DOM yang memasukkan kembali navigasi lama dinormalisasi ulang.
- Mempertahankan Manajemen Puskesmas hanya sebagai item di submenu Pelayanan → Klaster 1 — Manajemen.
- Menyeragamkan tipografi `.source-list` dan `.refs` menjadi bobot font regular/medium, termasuk elemen `<strong>` di dalam daftar, sehingga daftar referensi tidak lagi campuran bold/non-bold.

## Dampak yang dijaga
- Struktur 4 menu utama tetap dipertahankan.
- Submenu Profil, Pelayanan, dan Informasi tetap dipertahankan.
- CTA WhatsApp tetap dipertahankan.
- Wiring link layanan Klaster 2–5 tetap dipertahankan.
- Tidak ada perubahan isi klinis, data pasien, atau regulasi pada patch ini.

## Testing / Review
- Perubahan branch dibanding `main`: **PASS — ahead 1, behind 0**.
- Commit implementasi: `7af7809363e6b8007fb3dbeccbda0c4a014326e6`
- Sintaks JavaScript telah diuji dengan `node --check`: **PASS**.
- Review diff: perubahan terlokalisasi pada `content-protection.js`; dokumen checkpoint hanya dokumentasi.
- Browser/pixel-level production verification belum diklaim pada sesi ini karena integrasi Vercel yang tersedia tidak menunjuk ke project website dan runtime lokal tidak dapat mengakses GitHub.

## Keputusan merge
- `main` **tidak diubah langsung**.
- Branch ini menunggu review/PR sebelum merge.
