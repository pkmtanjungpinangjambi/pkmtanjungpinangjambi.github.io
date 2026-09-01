# CHECKPOINT — INFORMASI CONTENT & CORRELATION 2026-09-01

## Scope
Audit dan koreksi materi pada ekosistem menu `Informasi`: Galeri, Edukasi, Program & Inovasi, Download, serta hubungan dengan ILP dan Klaster 1–5.

## Temuan
- Beberapa halaman masih memakai alamat topbar lama `Jl. Taruma Negara No.RT.12` sehingga tidak seragam dengan alamat resmi situs.
- Materi edukasi sudah relevan, tetapi belum memberi penanda korelasi layanan/klaster.
- Program & Inovasi sudah menjelaskan 5 klaster, ILP, budaya pelayanan, dan IKM, tetapi hubungan fungsionalnya dengan layanan belum eksplisit.
- Download berisi dokumen utama, tetapi konteks dokumen terhadap tata kelola/Manajemen Klaster 1 belum dijelaskan.
- Halaman Informasi berfungsi sebagai galeri, tetapi belum memiliki peta hubungan Galeri → Edukasi → Program → ILP → Dokumen → Kontak.

## Koreksi
- Normalisasi alamat topbar pada Informasi dan turunannya.
- Tambahkan `Peta Korelasi Informasi` pada `informasi.html`.
- Tambahkan penanda korelasi layanan pada kartu Edukasi.
- Tambahkan penjelasan korelasi fungsi pada Program & Inovasi.
- Tambahkan konteks korelasi dokumen pada Download.
- Gunakan istilah klaster sesuai arsitektur ILP: Manajemen; Ibu & Anak; Usia Dewasa & Lanjut Usia; Penanggulangan Penyakit Menular; dan Lintas Klaster.
- Tidak mengubah isi klinis inti Klaster 1–5.

## Acuan resmi
- KMK HK.01.07/Menkes/2015/2023 — Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer.
- KMK HK.01.07/Menkes/84/2026 — Petunjuk Teknis Cek Kesehatan Gratis.

## QC
- Perubahan dikerjakan melalui branch terpisah.
- `main` tidak diedit langsung.
- Perubahan dibatasi pada navigasi/konteks informasi dan tidak menambah klaim klinis baru.
