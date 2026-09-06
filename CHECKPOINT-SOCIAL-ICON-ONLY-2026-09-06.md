# CHECKPOINT — Media Sosial Icon-Only

Tanggal: 2026-09-06

## Keputusan desain
- Media sosial tetap tersedia sebagai kanal resmi.
- Tampilan website tidak memakai kartu promosi, feed, embed, thumbnail, atau ajakan mengikuti.
- Kanal sosial ditampilkan sebagai ikon saja dengan `aria-label` dan `title` untuk aksesibilitas.
- Website diposisikan sebagai pusat informasi utama; media sosial sebagai kanal pendukung.

## Implementasi
- `social-channels.js` diubah dari kartu media sosial menjadi baris ikon resmi.
- `social-feed-core.js` tidak lagi mengambil feed Instagram; bila blok legacy ditemukan, hanya kanal resmi berbentuk ikon yang ditampilkan.
- Tidak mengubah header/logo dan tidak mengubah 10 ikon menu utama Beranda.
- WhatsApp tetap tersedia sebagai kanal kontak resmi.

## QC
- [x] Tidak ada fetch feed Instagram dari `social-feed-core.js`.
- [x] Kartu sosial `social-channels.js` dihapus dari pola visual.
- [x] Ikon tetap punya nama aksesibel melalui `aria-label`/`title`.
- [x] Link eksternal memakai `target="_blank"` dan `rel="noopener noreferrer"`.
- [ ] QC visual pada Vercel production setelah deployment tersedia.
