# CHECKPOINT — BACKEND PENDING & BERANDA V3

Tanggal: 4 September 2026
Branch: `feat/klaster-data-architecture-20260904`

## Backend — pending
- Supabase project sudah terhubung dan PostgreSQL 17 aktif.
- Migration foundation `create_pkm_core_foundation` sudah berhasil diterapkan.
- Tabel foundation: `pkm_core.cluster`, `pkm_core.region`, `pkm_core.network_unit`, `pkm_core.network_service_cluster`.
- RLS belum diaktifkan. Supabase Security Advisor memberi peringatan critical karena empat tabel tersebut masih `rls_enabled=false`.
- RLS/policy ditunda sampai desain role dan policy akses final; jangan membuka akses tulis publik.
- Jangan memasukkan secret key ke GitHub atau browser.

## Arsitektur yang dikunci
- Puskesmas = 5 klaster: K1 Manajemen, K2 Ibu & Anak, K3 Dewasa & Lansia, K4 Penyakit Menular, K5 Lintas Klaster.
- Database mengikuti klaster.
- Posyandu/Pustu bukan klaster tambahan.
- Pengelolaan jejaring berada pada K1; kegiatan jejaring dapat melayani sasaran K2/K3/K4/K5 sesuai kebutuhan.

## Beranda V3
- Hero utama tetap menjadi identitas/ILP dan pimpinan.
- Setelah ringkasan jam pelayanan, Beranda menampilkan pusat akses `Temukan Layanan dengan Cepat`.
- Quick access: Jadwal Pelayanan, Imunisasi, Posyandu & Pustu, Pendaftaran.
- Lima kartu klaster menjadi navigasi utama menuju detail pelayanan.
- Panel Jadwal/Kegiatan dan Jejaring membaca sumber publik yang sama.
- Detail operasional tetap berada di halaman/modul terkait; Beranda hanya ringkasan.
- Tidak menampilkan pasien, NIK, rekam medis, atau data klinis individual.

## Implementasi
- `home-klaster-dashboard.js` diperbarui menjadi V3 dan ditempatkan setelah `.info-bar` agar hero tidak terlalu padat.
- Data dashboard tetap bersumber dari `data/klaster-config.js`, `data/jadwal-public.js`, dan `data/jejaring-public.js`.

## Verifikasi
- Perubahan telah dibuat pada branch pengembangan PR #197.
- Verifikasi deployment/runtime harus dilakukan setelah CI/preview tersedia.
