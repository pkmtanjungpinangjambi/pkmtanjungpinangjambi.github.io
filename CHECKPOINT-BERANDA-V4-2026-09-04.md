# CHECKPOINT — BERANDA V4

Tanggal: 4 September 2026
Branch: `feat/klaster-data-architecture-20260904`

## Backend — tetap pending
- Supabase project sudah terhubung.
- Foundation PostgreSQL sudah dibuat.
- RLS/policy tetap ditunda sampai role dan policy akses final.
- Secret key tidak boleh masuk repository atau browser.

## Arsitektur layanan
- Puskesmas = 5 klaster: K1 Manajemen, K2 Ibu & Anak, K3 Dewasa & Lansia, K4 Penyakit Menular, K5 Lintas Klaster.
- Database mengikuti masing-masing klaster.
- Posyandu/Pustu bukan klaster tambahan.
- Pengelolaan jejaring berada pada K1 dan kegiatan dapat dikaitkan ke klaster sasaran.

## Beranda V4
- Hero utama tetap dipertahankan sebagai identitas/ILP/pimpinan.
- Dashboard ditempatkan sesudah ringkasan jam pelayanan agar hero tidak terlalu padat.
- Quick Access: Jadwal, Imunisasi, Posyandu & Pustu, Pendaftaran.
- Lima kartu klaster menjadi pintu utama menuju detail pelayanan.
- Panel Jadwal & Kegiatan dan Jejaring mengambil sumber publik yang sama.
- Beranda hanya menampilkan metadata/ringkasan, bukan data pasien.

## Hardening UI
- Dashboard memakai `textContent` untuk data yang berasal dari sumber publik; tidak merender nilai sumber data mentah melalui `innerHTML`.
- Loader menunggu `KLASTER_CONFIG`, `JADWAL_PUBLIC`, dan `JEJARING_PUBLIC` sebelum render.
- Cache-busting dashboard dinaikkan dari V3 ke `home-klaster-dashboard.js?v=20260904-v4`.
- Desain responsif untuk desktop, tablet, dan mobile.

## File utama
- `home-klaster-dashboard.js` — dashboard V4.
- `script.js` — loader cache-busting V4.
- `data/klaster-config.js` — kontrak 5 klaster.
- `data/jadwal-public.js` — sumber jadwal publik.
- `data/jejaring-public.js` — sumber jejaring publik.

## Verifikasi
- Perubahan tersimpan pada PR #197.
- CI/runtime preview tetap perlu diverifikasi setelah GitHub/Vercel menyediakan hasil build terbaru.
- Tidak ada klaim deployment production dari checkpoint ini.
