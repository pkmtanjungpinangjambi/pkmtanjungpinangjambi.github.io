# CHECKPOINT — NETWORK MASTER + PUBLIC SCHEDULE
Tanggal: 5 September 2026

## Arsitektur final
- K1 = Manajemen dan fungsi pengelolaan/pembinaan jejaring.
- Jejaring bukan eksklusif milik K1; satu network unit dapat memiliki relasi layanan ke beberapa klaster melalui `network_service_cluster`.
- K4 = Penanggulangan Penyakit Menular & Kesehatan Lingkungan.
- K5 = Dukungan Pelayanan Lintas Klaster.

## Master jejaring
- 41 Posyandu 2026 dimasukkan sebagai `network_unit` bertipe `POSYANDU`.
- 3 Pustu dari Profil UPTD Puskesmas Tanjung Pinang 2025 dimasukkan sebagai `network_unit` bertipe `PUSTU`.
- Seluruh 44 jejaring dikelola/dibina melalui `management_cluster_id = K1`.
- Wilayah terhubung ke 5 kelurahan kerja.
- Tidak ada nama pasien, NIK, No. eRM, nomor HP pasien, TB/BB, atau data klinis yang dimasukkan.

## Jadwal publik
- 41 jadwal Posyandu September 2026 ditautkan ke master `network_unit`.
- Status `PUBLISHED` dan `public_visible = true`.
- Sumber jadwal: master Jadwal Pelaksanaan Posyandu Tahun 2026.
- Publik hanya membaca curated view `pkm_api.public_schedule`.

## Verifikasi
- `pkm_core.schedule`: 41 jadwal publik Posyandu untuk September 2026.
- `pkm_api.public_schedule`: 41 baris tersedia untuk konsumsi website.
- RLS aktif pada tabel operasional.
- `anon` tidak mendapat akses langsung ke tabel `pkm_core`.

## Berikutnya
- Hubungkan `jadwal.html` dan kartu jadwal Beranda ke `pkm_api.public_schedule`.
- Tambahkan service module dan pemetaan layanan ke K2-K5 secara bertahap setelah verifikasi program/PJ.
- Bangun dashboard internal per klaster.