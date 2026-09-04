# Database Operasional — Arsitektur v0.1

Dokumen ini menjelaskan blueprint database operasional untuk UPTD Puskesmas Tanjung Pinang. Database belum dianggap live sampai backend/database production dipilih dan migration dijalankan pada lingkungan terproteksi.

## Prinsip utama

- Puskesmas adalah satu sistem dengan **5 klaster**.
- Data operasional mengikuti klaster; tidak dibuat sebagai "database umum" tanpa konteks layanan.
- **Klaster 1** mengelola fungsi manajemen, mutu, jejaring, Posyandu, Pustu, dan pemberdayaan.
- Posyandu/Pustu **bukan klaster tambahan**; keduanya memiliki relasi ke klaster sasaran layanan.
- Jadwal disimpan sekali dan memiliki relasi ke klaster, modul layanan, dan/atau jejaring.
- PWS/Monev menyimpan **data agregat**, bukan hasil pemeriksaan pasien individual.
- Data pasien/rekam medis disiapkan pada lapisan privat terpisah dan tidak ditempatkan dalam repository publik ini.

## Entitas inti

`cluster` → master K1–K5.

`region` → hierarki wilayah kerja seperti kelurahan/RW/RT bila sudah diverifikasi.

`network_unit` → Posyandu, Pustu, FKTP, UKBM, atau jejaring lain. Setiap unit memiliki `management_cluster_id` dan dapat memiliki banyak `service_cluster_id`.

`service_module` → modul/layanan yang berada di dalam klaster.

`schedule` → jadwal publik/operasional yang dapat mengarah ke klaster, jejaring, dan modul layanan.

`activity` + `activity_target_cluster` → kegiatan lapangan dan klaster sasaran. Ini penting untuk kegiatan Posyandu karena pengelolaannya berada pada K1 tetapi sasaran dapat berasal dari K2/K3.

`indicator` + `indicator_observation` → indikator dan pengamatan agregat untuk PWS/Monev.

`evidence` → dokumen/bukti mutu yang dapat dikaitkan ke klaster.

`pkm_private.audit_log` → audit trail operasi backend.

## Relasi kunci

```text
PUSKESMAS
  └── K1..K5
       └── service_module

K1 — Manajemen Jejaring
  ├── Posyandu
  └── Pustu
       │
       ├── target K2 (Ibu & Anak)
       ├── target K3 (Dewasa & Lansia)
       └── target klaster lain sesuai layanan

Kegiatan/Jadwal
  ├── cluster
  ├── network_unit
  └── service_module

Kegiatan
  └── target cluster → PWS/Monev agregat → Evidence
```

## Data yang sengaja tidak ada di repository publik

NIK, nama pasien, nomor rekam medis, alamat pasien, diagnosis individual, hasil laboratorium, hasil skrining individu, data anak/ibu yang dapat diidentifikasi, serta identitas kader yang tidak diperlukan untuk tampilan publik.

Untuk production, kontrol minimal yang harus diterapkan adalah autentikasi, RBAC, pembatasan akses database, RLS bila stack mendukung, enkripsi/tokenisasi untuk identitas sensitif, audit log, backup, retensi data, rate limiting API, validasi input server-side, dan pemisahan data publik vs privat.

## File SQL

Migration awal: `docs/database/001-core-schema.sql`.

File SQL tersebut merupakan **blueprint**, bukan migration yang sudah dijalankan pada database live.
