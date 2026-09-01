# CHECKPOINT

## Proyek
Website UPTD Puskesmas Tanjung Pinang Kota Jambi

## Tanggal
2026-09-01

## Baseline Produksi
- Branch produksi: `main`
- Merge terbaru: `77e6b89` (koreksi materi dan korelasi ekosistem Informasi).
- Produksi utama: Vercel (`pkmtanjungpinangjambi.vercel.app`), canonical resmi.

## Milestone Navigasi & Pelayanan
- Navbar utama distandarkan menjadi 4 menu: `Beranda`, `Profil`, `Pelayanan`, `Informasi`.
- Dropdown `Pelayanan` berisi Klaster 1–5.
- `Manajemen Puskesmas` bukan item navbar tersendiri.
- Semua halaman layanan/detail Klaster 1–5 menggunakan pola `← Kembali ke Pelayanan` menuju `pelayanan.html`.
- Navigasi terpusat menggunakan `script.js` sebagai bootstrap dan mempertahankan logika lama pada `script-original.js`.
- Handler caret dropdown diperbaiki agar submenu dapat dibuka/ditutup secara konsisten.
- Blok `Dasar Hukum & Referensi` dinormalisasi melalui kontrol terpusat pada halaman terkait.

## Audit Hub Pelayanan
- Hub `pelayanan.html` memiliki 5 klaster: Manajemen; Ibu & Anak; Dewasa & Lansia; Penanggulangan Penyakit Menular; Lintas Klaster.
- Kartu layanan Klaster 1–5 diarahkan ke halaman atau bagian layanan yang relevan.
- Informasi pendukung per klaster mencakup jadwal, tarif, persyaratan, alur, dan layanan online.
- Header klaster responsif dan tombol `+ / −` tetap jelas pada mobile.

## Klaster 1
- QC struktur Klaster 1 / Manajemen Puskesmas telah dilakukan.
- Koreksi konsistensi narasi dengan arsitektur navbar Klaster 1–5 telah diterapkan.
- Label referensi dinormalisasi menjadi `Dasar Hukum & Referensi` / `Referensi`.
- Tidak ada perubahan isi klinis inti.

## Ekosistem Informasi
- `informasi.html`, `edukasi.html`, `program.html`, dan `download.html` telah dikoreksi pada konteks dan korelasi.
- Peta korelasi Informasi menghubungkan Pengumuman → Berita/Kegiatan → Edukasi → Program & Inovasi → ILP → Dokumen.
- Materi Edukasi diberi konteks korelasi layanan/klaster.
- Program & Inovasi diberi konteks fungsi terhadap Klaster 1–5, ILP, Profil, dan mutu.
- Download diberi konteks hubungan dokumen dengan Manajemen Klaster 1 dan dukungan seluruh pelayanan.

## Arsitektur Media Sosial
- Kartu visual lengkap `Ikuti Kami di Media Sosial` **tetap berada di halaman `informasi.html`**.
- Tidak dipindahkan menjadi blok besar di Beranda karena Beranda sudah memiliki akses sosial melalui ikon topbar dan harus memprioritaskan layanan utama, CKG, pengumuman, berita, serta CTA pendaftaran/kontak.
- Informasi menjadi pusat galeri, edukasi, program, dokumen, dan kanal sosial; sehingga kartu sosial visual lebih kontekstual di sana.
- Tahap aktif saat ini: WhatsApp, Facebook, YouTube.
- Instagram menunggu aset final yang konsisten dengan keluarga desain yang sudah ada.
- Tidak membuat item menu utama baru untuk Media Sosial.

## Status QC
- [x] Struktur navbar 4 menu
- [x] Dropdown Pelayanan Klaster 1–5
- [x] Handler caret dropdown aktif
- [x] Penghapusan Manajemen Puskesmas sebagai item navbar tersendiri
- [x] Navigasi kembali ke Pelayanan pada halaman layanan
- [x] Script lama dipreservasi sebagai `script-original.js`
- [x] Audit awal hub Pelayanan
- [x] Normalisasi Dasar Hukum & Referensi
- [x] Responsive layout header Klaster 1–5
- [x] Koreksi materi & korelasi ekosistem Informasi
- [x] Keputusan arsitektur media sosial: pusat visual di Informasi
- [ ] Konsolidasi penuh pengendali navigasi agar satu sumber saja
- [ ] Audit konsistensi setiap kartu layanan Klaster 2–5 secara menyeluruh
- [ ] Review cache-busting semua HTML agar versi `script.js` selalu terbaru
- [ ] QC visual final seluruh Pelayanan pada production/mobile live
- [ ] Audit dan QC Beranda setelah Pelayanan stabil

## Aturan Kerja
1. `main` diperlakukan sebagai branch produksi dan tidak diedit langsung.
2. Perubahan dilakukan melalui branch terpisah.
3. Perubahan besar melalui Pull Request dan review.
4. Jangan menghapus atau mengganti file sebelum diverifikasi penggunaannya.
5. Setelah perubahan, lakukan testing dan pemeriksaan regresi.
6. Update checkpoint setelah milestone penting.
7. Jangan menyimpan data pasien, kredensial, API key, token, atau rahasia lain di repository publik.

## Next Step
Fokus berikutnya: **QC detail layanan Klaster 2**, kemudian Klaster 3–5, tanpa mengubah isi klinis yang sudah tervalidasi. Setelah seluruh detail konsisten, lakukan QC visual production terakhir lalu finalisasi Beranda.
