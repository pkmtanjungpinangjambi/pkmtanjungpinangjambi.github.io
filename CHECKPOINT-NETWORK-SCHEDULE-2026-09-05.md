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
- Seluruh 41 Posyandu memiliki `coverage_text` untuk cakupan wilayah kerja publik.
- Tidak ada nama pasien, NIK, No. eRM, nomor HP pasien, TB/BB, atau data klinis yang dimasukkan.

## Jadwal publik
- 41 jadwal Posyandu September 2026 ditautkan ke master `network_unit`.
- Status `PUBLISHED` dan `public_visible = true`.
- Publik membaca curated view `pkm_api.public_schedule` melalui thin view `public.public_schedule`.
- `public.public_schedule` hanya mengekspos kolom operasional yang aman untuk publik.

## Website
- PR #210 menghubungkan `jadwal-posyandu-ui.js` ke Supabase public API sebagai source utama.
- Dataset repository tetap menjadi fallback agar UI tetap tersedia saat API tidak terjangkau.
- Rendering data API menggunakan DOM API.

## Verifikasi
- `pkm_core.schedule`: 41 jadwal publik Posyandu September 2026.
- `pkm_api.public_schedule`: 41 baris untuk September 2026.
- 41/41 master Posyandu memiliki `coverage_text`.
- RLS aktif pada tabel operasional.
- Security advisor Supabase: 0 finding.

## Status GitHub
- PR #195 merged — Hub Jadwal Publik.
- PR #197 merged — Arsitektur Klaster 1–5 + database foundation.
- PR #196 closed/obsolete.
- PR #209 open — regulatory taxonomy + network governance.
- PR #210 open — website public schedule → Supabase.

## Berikutnya
- Merge PR #209 dan #210 melalui review/protection workflow.
- Setelah frontend live, tambahkan service module dan pemetaan layanan ke K2–K5 secara bertahap setelah verifikasi program/PJ.
- Bangun dashboard internal per klaster.