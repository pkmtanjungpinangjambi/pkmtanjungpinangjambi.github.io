# CHECKPOINT — KLASTER 2 ECOSYSTEM PILOT

Tanggal: 29 Agustus 2026
Status: PILOT / REVIEW BEFORE MERGE

## Tujuan
Menguji pola **1 Klaster = 1 ekosistem pelayanan lengkap** pada Klaster 2 — Ibu & Anak sebelum pola diterapkan ke Klaster 1, 3, 4, dan 5.

## Arsitektur pilot
- Klaster 2 menjadi halaman/hub tersendiri: `pelayanan-klaster-2-ibu-anak.html`.
- Hub menghubungkan:
  - Sasaran siklus hidup
  - Layanan utama
  - Alur pelayanan terintegrasi
  - Jadwal
  - Tarif
  - Persyaratan
  - Alur
  - Layanan Online
  - UKP + UKM
  - Data → Monev → Mutu → Risiko
  - Jejaring & Lintas Klaster
  - Dasar hukum & referensi
- Navigasi Pelayanan mengarahkan **Klaster 2 — Ibu & Anak** ke hub tersebut.

## Sumber lokal utama
`1.a.Ak SK STANDAR PELAYANAN 2026.pdf` di Library menjadi sumber lokal utama untuk standar pelayanan Klaster 2.

Dokumen tersebut memuat standar resmi untuk:
1. Pelayanan Kesehatan Ibu Hamil, Bersalin, atau Nifas
2. Pelayanan Anak
3. Pelayanan Imunisasi
4. Pelayanan Tumbuh Kembang Anak

Dokumen yang sama juga memuat 14 komponen Standar Pelayanan dan dasar pengelolaan evaluasi pelayanan.

## Prinsip ILP yang dipakai
- Klaster 2 mengikuti pendekatan siklus hidup.
- UKP dan UKM diperlakukan sebagai dimensi pelayanan di dalam klaster, bukan menu yang berdiri sejajar dengan klaster.
- Data, PWS, Monev, Mutu, dan Manajemen Risiko diperlakukan sebagai lapisan penghubung lintas layanan.
- Risiko klinis/nonklinis dan data individual tetap internal; informasi publik hanya menampilkan materi yang layak dipublikasikan dan/atau data agregat yang telah disetujui.

## Layanan yang saat ini tersedia
- Ibu Hamil, Bersalin & Nifas
- Pelayanan Anak
- Imunisasi
- Tumbuh Kembang Anak

Sasaran resmi Klaster 2 juga mencakup anak prasekolah, anak usia sekolah, dan remaja. Hub pilot menampilkan sasaran tersebut meskipun belum semuanya mempunyai halaman layanan khusus pada website.

## Testing / QC
- Penambahan hub Klaster 2 berhasil dibuat pada branch `feature/klaster-2-ecosystem`.
- Link menu Klaster 2 pada kontrol navigasi bersama diarahkan ke hub baru.
- Vercel status pada commit implementasi navigasi terakhir: **SUCCESS**.
- Local clone/browser test tidak dapat dilakukan dari sesi ini karena environment tidak dapat me-resolve `github.com`; karena itu pixel-level/browser verification lokal belum diklaim.

## Baseline & keselamatan
- Main baseline sebelum pilot: `b6f496a4c7b1f97687350691a908005a9d7b0e46`.
- Branch pilot: `feature/klaster-2-ecosystem`.
- `main` tidak diubah langsung.
- Belum ada merge ke `main`.
- Perubahan pilot dibatasi pada hub Klaster 2 dan link navigasi terkait.

## Tahap berikutnya
Review struktur dan UX pilot Klaster 2 terlebih dahulu. Setelah pola dinyatakan layak, pola yang sama dapat dijadikan template untuk Klaster 1, 3, 4, dan 5.
