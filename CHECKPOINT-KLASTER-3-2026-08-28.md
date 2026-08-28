# CHECKPOINT KLASTER 3 — 28 Agustus 2026

## Status
- Branch: `feature/klaster-3-dewasa`
- Base: `main`
- Klaster 2 adalah master implementation pattern.
- `main` tidak diedit langsung.

## Klaster 3 — 5 layanan
1. Pelayanan Kesehatan Usia Dewasa — `pelayanan-kesehatan-dewasa.html`
2. Pelayanan Kesehatan Lansia — `pelayanan-kesehatan-lansia.html`
3. Pelayanan Keluarga Berencana (KB) — `pelayanan-kb.html`
4. Pelayanan Calon Pengantin (Caten) — `pelayanan-catin.html`
5. Pelayanan UBM — `pelayanan-ubm.html`

## Routing
`content-protection.js` mempertahankan pola `wireServiceLink()` dari Klaster 2 dan memperluasnya ke `details.cluster-3`. Kelima kartu Klaster 3 diarahkan ke halaman detail masing-masing.

## Konten
Setiap halaman detail memiliki accordion layanan, tombol kembali ke Klaster 3, dan bagian `Dasar Hukum & Referensi` di bagian akhir.

## QC
- Placeholder sementara dihapus.
- Tidak ada perubahan langsung ke `main`.
- Branch tetap dimulai dari commit `fe5f0ad` yang saat ini menjadi `main`.
- Preview/deployment harus diperiksa sebelum merge.
- Jangan merge tanpa review visual dan navigasi.
