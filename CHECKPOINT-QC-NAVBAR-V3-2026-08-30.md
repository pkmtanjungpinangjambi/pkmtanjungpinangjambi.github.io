# CHECKPOINT — QC NAVBAR V3

Tanggal: 30 Agustus 2026
Status: READY FOR REVIEW

## Keputusan final
- Navbar utama: Beranda, Profil, Pelayanan, Informasi.
- Dropdown Pelayanan: hanya Klaster 1–5.
- Manajemen Puskesmas tidak ditampilkan sebagai item navbar maupun item dropdown tersendiri.
- Klaster 1 — Manajemen menjadi pintu masuk manajemen.
- Halaman `manajemen-puskesmas.html` tetap dipertahankan sebagai konten Klaster 1.

## Perbaikan v3
- `content-protection.js` dinaikkan ke `NAV_VERSION = 2026-08-30-v3`.
- Normalisasi navbar tetap memaksa struktur 4 menu.
- Guard/MutationObserver mempertahankan struktur tersebut bila DOM lama muncul kembali.
- Halaman Manajemen Puskesmas mendapat tombol **← Kembali ke Pelayanan · Semua Klaster** menuju `pelayanan.html#klaster-1`.
- Tipografi Dasar Hukum/Referensi tetap regular/medium.

## Baseline
- Branch dibuat dari `main` terbaru: `02ded78156ee18ad5c69d36e6e14e3774f49d2e6`.
- `main` tidak diubah langsung.
- Patch dibatasi pada kontrol navigasi dan jalur kembali.
