# Arsitektur Pelayanan Berbasis 5 Klaster

## Prinsip
Puskesmas dipandang sebagai satu sistem pelayanan dengan lima klaster. Database mengikuti klaster dan modul pelayanan; tidak ada database pasien publik.

### Lima klaster
1. Klaster 1 — Manajemen
2. Klaster 2 — Ibu & Anak
3. Klaster 3 — Dewasa & Lansia
4. Klaster 4 — Penyakit Menular
5. Klaster 5 — Lintas Klaster

## Posyandu
Posyandu bukan klaster Puskesmas. Posyandu merupakan jejaring pelayanan kesehatan primer berbasis masyarakat. Pada arsitektur aplikasi, pengelolaan dan pembinaan jejaring Posyandu berada pada fungsi Manajemen Jejaring Klaster 1, sedangkan kegiatan Posyandu dapat ditautkan ke Klaster 2 dan Klaster 3 sesuai sasaran siklus hidup.

```text
PUSKESMAS
│
├── Klaster 1 — Manajemen
│   └── Manajemen Jejaring
│       ├── Posyandu / UKBM
│       └── Pustu / jejaring lain
│
├── Klaster 2 — Ibu & Anak
├── Klaster 3 — Dewasa & Lansia
├── Klaster 4 — Penyakit Menular
└── Klaster 5 — Lintas Klaster
```

## Alur data
`KLASTER → DATA → OPERASIONAL → MONEV → MUTU → EVIDENCE`

Untuk jejaring: `KLASTER 1 (MANAJEMEN) → JEJARING → KEGIATAN → SASARAN KLASTER → DATA/PWS → MONEV`.

Semua data individual yang dapat mengidentifikasi pasien harus berada di backend terproteksi dan tidak disimpan di repository publik.
