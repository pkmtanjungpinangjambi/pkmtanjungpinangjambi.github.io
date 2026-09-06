# CHECKPOINT — Website Puskesmas

Tanggal: 2026-09-06

Status: GitHub main aman setelah PR #242 dan PR #243. Beranda terkunci (header/logo + 10 ikon tidak disentuh). BerAKHLAK dan blok galeri Beranda dihapus, 5S serta Pengumuman dan Berita & Kegiatan dipertahankan.

Vercel: deployment lama `b5e30c6` dari `feat/home-10-menu-icons` tidak boleh dipromote. Jalur deployment final berasal dari `main`; pemeriksaan terakhir masih menunjukkan `build-rate-limit`.

Pelayanan: `pelayanan.html` menjadi hub 5 Klaster. Standar layanan berikutnya: Sasaran → Layanan Inti → Skrining/Pemeriksaan → Persyaratan → Alur → Jadwal → Tarif → Tindak Lanjut/Rujukan → Kontak/Pendaftaran.

Next step: verifikasi deployment `main` di Vercel; bila Ready, promote ke Production. Setelah production stabil, lanjut standardisasi detail layanan Klaster 3 → 4 → 5 dan QC visual mobile/production.
