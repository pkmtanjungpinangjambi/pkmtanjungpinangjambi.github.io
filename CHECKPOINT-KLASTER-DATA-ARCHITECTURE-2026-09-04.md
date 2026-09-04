# CHECKPOINT — ARSITEKTUR DATA 5 KLASTER

Tanggal: 4 September 2026

## Keputusan arsitektur
- Puskesmas diposisikan sebagai satu sistem pelayanan berbasis 5 klaster.
- Database mengikuti klaster masing-masing; tidak ada menu database publik yang berdiri sendiri.
- Data publik hanya memuat metadata/modul layanan.
- Data pasien, NIK, rekam medis, dan PHI/PII tidak boleh dimasukkan ke repository publik.

## Posyandu dan jejaring
- Posyandu **bukan klaster Puskesmas**.
- Fungsi pengelolaan/pembinaan jejaring Posyandu ditempatkan pada **Klaster 1 — Manajemen Jejaring**.
- Kegiatan Posyandu dapat terhubung ke **Klaster 2 — Ibu & Anak** dan **Klaster 3 — Dewasa & Lansia** sesuai sasaran siklus hidup.
- Pustu/jejaring lain mengikuti pola yang sama: dikelola sebagai jejaring dan ditautkan ke klaster layanan yang relevan.
- Konsep ini mengikuti Juknis ILP KMK HK.01.07/MENKES/2015/2023 dan kerangka penyelenggaraan Puskesmas pada Permenkes 19 Tahun 2024.

## Implementasi
- `data/klaster-config.js` menjadi kontrak metadata lima klaster.
- Klaster 1 secara eksplisit memuat `Manajemen Jejaring` serta `Posyandu & UKBM`.
- `data/jadwal-public.js` menggunakan relasi `managementClusterId` dan `serviceClusterIds` untuk jejaring/kegiatan.
- `data/jejaring-public.js` menjadi kontrak publik untuk Posyandu dan Pustu tanpa PII/PHI.
- `home-klaster-dashboard.js` menampilkan ringkasan lima klaster, jadwal/kegiatan, serta jejaring pada Beranda dan menunggu ketiga sumber data tersedia sebelum render.
- `klaster-data-ui.js` menampilkan Pusat Data Klaster di halaman Pelayanan dan pintasan ke halaman Jejaring.
- `jejaring-puskesmas.html` menjadi rumah informasi publik untuk Posyandu/Pustu.
- Dashboard dan UI klaster hanya membaca metadata publik; data individual tidak dirender.

## Prinsip jadwal
- Jadwal umum Puskesmas disimpan satu kali pada sumber jadwal publik.
- Jadwal imunisasi terhubung ke Klaster 2.
- Kegiatan Posyandu dikelola melalui fungsi Klaster 1, tetapi sasaran kegiatan dapat berada di Klaster 2/3.
- Tanggal/sesi lokal yang belum terverifikasi tidak ditebak dan tidak dipublikasikan sebagai tanggal pasti.

## Keamanan data
- Repository publik tidak menyimpan pasien, NIK, nomor rekam medis, hasil pemeriksaan individual, identitas kader, atau PHI/PII.
- Database operasional nantinya harus berada pada backend terautentikasi/terotorisasi dengan role-based access control, audit log, validasi input, dan pemisahan data sensitif.

## Verifikasi
- Validasi sintaks/runtime lokal belum dapat dilakukan karena lingkungan eksekusi tidak dapat menyelesaikan DNS GitHub.
- GitHub Actions belum mengembalikan workflow run untuk commit terbaru pada saat checkpoint ini dibuat.
- Vercel menunjukkan deployment preview sedang dalam proses build pada komentar PR; akses live deployment dari konektor Vercel memerlukan otorisasi ulang scope tim.

## Arah tahap berikutnya
- Hubungkan halaman Jadwal secara langsung ke sumber jadwal publik.
- Pastikan Beranda, Pelayanan, halaman Jejaring, dan detail layanan membaca struktur klaster yang sama.
- Bangun modul database operasional terproteksi untuk kebutuhan internal, kemudian sambungkan PWS/Monev dan indikator agregat tanpa mengekspos data individual.
