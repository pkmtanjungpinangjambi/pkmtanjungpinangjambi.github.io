-- e-Bulu Kejang: secure-by-default MVP
-- Pegawai dapat INSERT dan SELECT data miliknya melalui RLS.
-- UPDATE ditutup sementara agar pegawai tidak dapat mengubah status persetujuan sendiri.
-- Jalankan sebagai migration di Supabase production setelah review.

drop policy if exists ebulu_update_own on public.klaster1_izin_keluar_petugas;

-- Pastikan kolom ownership tetap terikat ke auth.users.
alter table public.klaster1_izin_keluar_petugas
  validate constraint klaster1_izin_keluar_petugas_created_by_fkey;
