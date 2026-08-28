# CHECKPOINT KLASTER 3 — 28 Agustus 2026

## Status
- Branch: `feature/klaster-3-dewasa`
- Base: `main`
- Klaster 2 remains the master implementation pattern.
- `main` must not be edited directly.

## Klaster 3 — 5 layanan
1. Pelayanan Kesehatan Usia Dewasa — `pelayanan-kesehatan-dewasa.html`
2. Pelayanan Kesehatan Lansia — `pelayanan-kesehatan-lansia.html`
3. Pelayanan Keluarga Berencana (KB) — `pelayanan-kb.html`
4. Pelayanan Calon Pengantin (Caten) — `pelayanan-catin.html`
5. Pelayanan UBM — `pelayanan-ubm.html`

## Routing
`content-protection.js` memakai pola `wireServiceLink()` dari Klaster 2 dan diperluas untuk `details.cluster-3`, sehingga kartu layanan Klaster 3 menjadi tautan ke halaman detail masing-masing.

## Konten
Setiap halaman detail memiliki accordion layanan, tombol kembali ke Klaster 3, serta bagian `Dasar Hukum & Referensi` di bagian akhir.

## QC
- Placeholder sementara dihapus.
- Branch harus tetap sinkron dengan `main` sebelum merge.
- Preview/deployment harus diperiksa sebelum merge.
- Jangan merge ke `main` tanpa review visual dan navigasi.
