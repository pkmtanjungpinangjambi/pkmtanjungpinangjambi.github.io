# CHECKPOINT — SOCIAL MEDIA CARDS 2026-09-01

Branch: `feat/informasi-social-cards-2026-09-01`
Base: `main` @ `a041a1a07c27d0fa60dc199e01ce2dfe5c690fd3`

## Scope
- Menambahkan blok **Ikuti Kami di Media Sosial** pada `informasi.html` melalui `social-channels.js`.
- Platform yang aktif pada tahap ini: WhatsApp, Facebook, YouTube.
- Instagram belum ditambahkan karena aset Instagram belum tersedia.
- Aset existing dikonversi menjadi WebP transparan dan ditempatkan pada `assets/social/`.
- Tidak mengubah navbar, mekanisme galeri Google Drive, footer, atau floating WhatsApp CTA.

## Assets
- `assets/social/wa.webp`
- `assets/social/fb.webp`
- `assets/social/yutu.webp`

Source asset QC:
- `wa.png`: 750×380 RGBA
- `fb.png`: 750×383 RGBA
- `yutu.png`: 748×399 RGBA
- Ketiganya memiliki transparansi dan telah diperiksa secara visual.

## Links resmi
- WhatsApp: `https://wa.me/6282180622274`
- Facebook: `https://web.facebook.com/kiki.ayu.98229`
- YouTube: `https://www.youtube.com/@puskesmastanjungpinangkota7276`

## Implementation QC
- Loader sosial hanya dipanggil pada `informasi.html`.
- Kartu menggunakan `target="_blank"` dan `rel="noopener noreferrer"`.
- Layout responsif: 3 kolom desktop, 2 kolom tablet, 1 kolom mobile.
- Asset WebP digunakan langsung oleh browser tanpa data URI.
- `main` tidak diubah langsung; seluruh perubahan berada di branch ini.

## Next checkpoint
Saat aset Instagram tersedia, tambahkan kartu Instagram ke blok yang sama, lakukan QC empat kartu, lalu review dan merge ke `main`.