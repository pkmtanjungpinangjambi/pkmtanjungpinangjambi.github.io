# CHECKPOINT — BACKEND DATABASE FOUNDATION

Tanggal: 4 September 2026
Branch: `feat/klaster-data-architecture-20260904`

## Keputusan
- Puskesmas tetap dipandang sebagai satu sistem berbasis Klaster 1–5.
- Database operasional mengikuti klaster dan jejaring, bukan dibuat sebagai database publik terpisah.
- Posyandu/Pustu adalah jejaring; pengelolaan/pembinaan berada pada fungsi Klaster 1.
- Data pasien, NIK, rekam medis, hasil pemeriksaan individual, dan PHI/PII tidak berada di repository publik.

## Database foundation
- `docs/database/001-core-schema.sql`: core PostgreSQL schema.
- `docs/database/002-auth-rls.sql`: role-based access dan Row Level Security.
- `docs/database/003-public-api-views.sql`: curated public API views.
- `docs/database/BACKEND-DATABASE-FOUNDATION-2026-09-04.md`: ringkasan boundary dan migration order.

## Security model
- Public website membaca curated views saja.
- `anon` tidak mendapat SELECT langsung ke tabel `pkm_core`.
- Internal roles: `SUPERADMIN`, `ADMIN`, `MANAGER`, `STAFF`, `VIEWER`.
- Audit log berada pada schema `pkm_private`.
- Domain klinis/patient harus dipisahkan dari master, jadwal, jejaring, dan indikator agregat.

## Status implementasi
Blueprint sudah dibuat di repository; **database live belum terhubung** dan migration belum dijalankan ke lingkungan produksi.

## Tahap berikutnya
1. Pilih/aktifkan backend resmi (Supabase/Neon/PostgreSQL managed).
2. Jalankan migration di development.
3. Seed master wilayah dan jejaring berdasarkan sumber resmi terverifikasi.
4. Integrasikan API publik ke Beranda, Jadwal, dan Jejaring.
5. Bangun dashboard internal per klaster.
6. Baru setelah security review, rancang domain data klinis terpisah.
