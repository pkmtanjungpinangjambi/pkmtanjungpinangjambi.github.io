# CHECKPOINT — NAVIGASI 4 MENU UTAMA

Tanggal: 29 Agustus 2026

## Keputusan arsitektur terbaru
- Website mempertahankan tepat **4 menu utama** pada navigasi utama:
  1. Beranda
  2. Profil
  3. Pelayanan
  4. Informasi
- CTA seperti WhatsApp/Pendaftaran tidak dihitung sebagai menu utama.
- **Manajemen Puskesmas** tidak menjadi menu utama tersendiri.
- **Manajemen Puskesmas** ditempatkan sebagai bagian/submenu dari **Pelayanan → Klaster 1 — Manajemen**.
- Pelayanan tetap menjadi induk **Klaster 1–5**.
- Struktur submenu/detail Pelayanan lainnya belum ditata ulang pada checkpoint ini; akan dibahas setelah 4-menu utama stabil.

## Arah navigasi
Pelayanan
└── Klaster 1 — Manajemen
    └── Manajemen Puskesmas

Pelayanan
├── Klaster 1 — Manajemen
├── Klaster 2 — Ibu & Anak
├── Klaster 3 — Dewasa & Lansia
├── Klaster 4 — Penanggulangan Penyakit Menular
└── Klaster 5 — Lintas Klaster

## Prinsip lanjutan
- Jangan menambah menu utama baru di luar empat menu tersebut tanpa keputusan arsitektur baru.
- Jadwal, Tarif, Persyaratan, Alur, dan Layanan Online tetap diposisikan sebagai bagian dari ekosistem masing-masing klaster; detail submenu akan dibahas terpisah.
- Main tetap tidak diubah langsung.
- PR #138 belum di-merge.
- Implementasi sitewide untuk 4-menu utama dilakukan sekarang secara terarah; tata ulang detail submenu ditahan untuk tahap berikutnya.

## Baseline
- Main baseline: `66f9007af46f90a64d4d41acffc497b4eef18b0c`
- Branch kerja: `feature/manajemen-puskesmas-cluster-1-clean`
- PR: #138
