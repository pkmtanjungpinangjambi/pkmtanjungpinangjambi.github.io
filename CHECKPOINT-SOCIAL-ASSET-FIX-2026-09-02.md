# CHECKPOINT — SOCIAL ASSET FIX 2026-09-02

## Temuan
- `assets/social/fb.webp` valid WebP.
- `assets/social/wa.webp` dan `assets/social/yutu.webp` tidak memiliki signature WebP yang valid sehingga kartu dapat tampil kosong/tidak ter-render.
- `social-channels.js` sudah menunjuk ke folder asset yang benar; masalah utama adalah integritas dua file raster.

## Perbaikan
- Menambahkan `assets/social/wa.svg`.
- Menambahkan `assets/social/fb.svg`.
- Menambahkan `assets/social/yutu.svg`.
- Mengubah kartu sosial agar menggunakan SVG lokal dengan cache-busting query.
- SVG menggunakan ikon merek sebagai vektor lokal sehingga tidak bergantung CDN eksternal atau file WebP korup.

## Keamanan & performa
- Tidak menghapus file lama untuk menjaga rollback.
- Tidak ada data pasien, kredensial, API key, token, atau rahasia.
- Aset SVG tetap ringan dan tajam pada desktop/mobile.

## QC
- Branch terpisah dari `main`.
- Path asset diverifikasi terhadap struktur repository.
- Referensi kartu sosial diperiksa ulang.
- Target akhir: Vercel preview success sebelum merge.
