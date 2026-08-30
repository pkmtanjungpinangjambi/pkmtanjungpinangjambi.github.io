# CHECKPOINT — PELAYANAN QC v1

Tanggal: 31 Agustus 2026

## Fokus
- Hub `pelayanan.html` menjadi pusat navigasi Klaster 1–5.
- Semua halaman detail layanan menggunakan satu tombol: **← Kembali ke Pelayanan**.
- Tidak menggunakan label “Semua Klaster” atau “Kembali ke Klaster ...”.
- Blok **Dasar Hukum & Referensi** menggunakan satu standar tipografi; isi daftar referensi regular/medium, sedangkan judul section tetap tegas.

## Implementasi QC
- Normalisasi tombol kembali dilakukan terpusat melalui `content-protection.js` sehingga halaman lama tidak perlu ditambal satu per satu.
- Bila sebuah halaman sudah memiliki `a.back-link`, link lama dinormalisasi menjadi **← Kembali ke Pelayanan** dan diarahkan ke `pelayanan.html`.
- Blok referensi dideteksi dari judul `<summary>` yang memuat “Dasar Hukum” atau “Referensi”, kemudian diberi class `references-section`.
- Isi daftar referensi dan elemen `<strong>` di dalamnya dipaksa regular/medium melalui CSS terpusat.
- Dropdown Pelayanan pada kontrol navigasi pusat menampilkan Klaster 1–5 dengan pola link yang seragam ke `pelayanan.html#klaster-X`.
- Tidak mengubah konten klinis.

## QC target
- Klaster 1–5: navigasi konsisten.
- Semua halaman `pelayanan-*.html` + `manajemen-puskesmas.html`: tombol kembali konsisten.
- Referensi: regular/medium, judul section tetap tegas.
