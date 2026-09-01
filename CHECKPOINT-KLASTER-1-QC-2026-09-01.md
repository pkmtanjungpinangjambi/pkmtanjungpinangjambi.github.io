# CHECKPOINT — KLASTER 1 QC — 2026-09-01

## Baseline
- Produksi: `main`
- Klaster 1: `manajemen-puskesmas.html`
- Hub: `pelayanan.html`

## QC selesai
- Navbar tetap 4 menu: Beranda | Profil | Pelayanan | Informasi.
- Dropdown Pelayanan mencakup Klaster 1–5.
- Panah/caret dropdown sudah memiliki handler langsung setelah navbar dibangun.
- Pesan intro Klaster 1 dinormalisasi agar tidak lagi menyatakan Pelayanan hanya Klaster 2–5.
- Label referensi pada blok `admin-ref` dinormalisasi menjadi `Dasar Hukum & Referensi` atau `Referensi` sesuai fungsi blok.
- Tidak ada perubahan pada isi klinis.

## Perubahan teknis
- Perubahan berada pada branch `chore/klaster-1-qc-2026-09-01`.
- File yang disentuh: `script.js`.
- Tidak mengubah `manajemen-puskesmas.html` secara langsung.

## QC lanjutan
- Syntax check dilakukan melalui validasi JavaScript/CI.
- Visual production/mobile tetap memerlukan browser live setelah deployment bila akses runtime tersedia.

## Next
Lanjut audit konsistensi detail Klaster 2 setelah Klaster 1 ini digabungkan ke `main`.
