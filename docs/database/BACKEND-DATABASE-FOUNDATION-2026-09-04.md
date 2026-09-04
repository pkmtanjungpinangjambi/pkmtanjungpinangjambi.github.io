# BACKEND DATABASE FOUNDATION — 4 September 2026

## Status
Blueprint backend terproteksi sudah disiapkan. Database live belum terhubung karena repository saat ini belum memiliki kredensial/backend produksi.

## Migration
1. `001-core-schema.sql` — core master dan operasional.
2. `002-auth-rls.sql` — autentikasi mapping, role, dan Row Level Security.
3. `003-public-api-views.sql` — curated public views.

## Boundary
- Website publik hanya boleh membaca curated `pkm_api` views.
- `anon` tidak mendapat SELECT langsung ke `pkm_core`.
- Operasional internal memakai role `SUPERADMIN`, `ADMIN`, `MANAGER`, `STAFF`, `VIEWER`.
- Data pasien/PII/PHI tidak dimasukkan ke repository publik maupun public API views.

## Relasi inti
`KLASTER → JEJARING → KEGIATAN/JADWAL → SASARAN → PWS/MONEV → MUTU/EVIDENCE`

## Jejaring
Posyandu dan Pustu bukan klaster tambahan. Pengelolaannya berada pada Klaster 1 — Manajemen Jejaring; kegiatan dapat ditautkan ke sasaran klaster yang relevan.

## Next
Backend resmi dipilih, migration dijalankan di database development, lalu API publik diintegrasikan ke Beranda/Jadwal/Jejaring sebelum dashboard internal per klaster dibangun.
