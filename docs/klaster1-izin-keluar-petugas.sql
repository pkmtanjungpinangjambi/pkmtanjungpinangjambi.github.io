-- Supabase migration reference for Klaster 1 — Manajemen
-- Table created in project pguspipnuyqmrnzirekm on 2026-09-14.
create table if not exists public.klaster1_izin_keluar_petugas (
  id uuid primary key default gen_random_uuid(),
  tanggal date not null default current_date,
  nama_petugas text not null,
  unit_kerja text,
  jam_keluar time not null,
  jam_kembali time,
  keperluan text not null,
  tujuan text,
  status text not null default 'menunggu' check (status in ('menunggu','disetujui','ditolak','selesai')),
  disetujui_oleh uuid,
  waktu_persetujuan timestamptz,
  catatan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_klaster1_izin_tanggal on public.klaster1_izin_keluar_petugas (tanggal desc);
create index if not exists idx_klaster1_izin_status on public.klaster1_izin_keluar_petugas (status);
alter table public.klaster1_izin_keluar_petugas enable row level security;
