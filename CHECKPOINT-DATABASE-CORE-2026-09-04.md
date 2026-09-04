# CHECKPOINT — DATABASE CORE 5 KLASTER

Tanggal: 4 September 2026

## Status
Blueprint database operasional v0.1 sudah dibuat di `docs/database/001-core-schema.sql`. Migration **belum dijalankan** ke database production karena repository saat ini belum memiliki backend/database engine yang dipilih secara resmi.

## Struktur inti
- `pkm_core.cluster` → master Klaster 1–5.
- `pkm_core.region` → master wilayah kerja bertingkat.
- `pkm_core.network_unit` → Posyandu/Pustu/FKTP/UKBM sebagai jejaring.
- `pkm_core.network_service_cluster` → relasi jejaring ke sasaran klaster.
- `pkm_core.service_module` → modul layanan per klaster.
- `pkm_core.schedule` → jadwal terpusat yang dapat ditautkan ke klaster/jejaring/modul.
- `pkm_core.activity` + `activity_target_cluster` → kegiatan dan sasaran klaster.
- `pkm_core.indicator` + `indicator_observation` → indikator dan PWS/Monev agregat.
- `pkm_core.evidence` → evidence mutu/dokumentasi per klaster.
- `pkm_private.audit_log` → audit trail backend.

## Aturan Posyandu
Posyandu bukan klaster tambahan. Pengelolaan dan pembinaan jejaring berada pada Klaster 1 — Manajemen Jejaring; kegiatan Posyandu dapat mempunyai sasaran layanan Klaster 2 dan Klaster 3.

## Keamanan
- Tidak ada data pasien pada repository publik.
- NIK/identitas, rekam medis, hasil pemeriksaan individual, dan data sensitif wajib ditempatkan pada lapisan privat/backend.
- PWS/Monev publik hanya boleh menggunakan data agregat yang telah diverifikasi.

## Tahap berikutnya
1. Pilih stack backend/database production.
2. Jalankan migration core pada environment non-production.
3. Tambahkan RBAC/RLS, audit trail, backup, dan kebijakan retensi.
4. Bangun modul operasional per klaster.
5. Hubungkan Beranda/Jadwal hanya ke API publik yang sudah disanitasi/agregasi.
