# INFORMATION CONTENT MATRIX v0.1

Tanggal: 31 Agustus 2026
Repository: `pkmtanjungpinangjambi/pkmtanjungpinangjambi.github.io`
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`
Issue utama: #162

## Tujuan

Menjadi registry canonical untuk seluruh konten Menu Informasi agar setiap materi dapat ditelusuri ke klaster/program, owner, sumber, tanggal publikasi/review, dan URL canonical sebelum perubahan HTML dilakukan.

## Kolom standar

| ID | Konten | Tipe | Klaster/Program | Owner | Source | Publish | Review | Canonical URL | Status | Action |
|---|---|---|---|---|---|---|---|---|---|---|
| INF-001 | Pengumuman IKM Triwulan II 2026 | Pengumuman | C1 / Mutu | Tim Mutu/Pengelola informasi | Dokumen/hasil IKM resmi Puskesmas | 2026-08-21 | Required | `index.html#pengumuman` | PROVISIONAL | Tambah tag + arsip |
| INF-002 | CKG Sekolah 2026 | Pengumuman | C2 / CKG Sekolah | PJ CKG / Klaster 2 | Ayo CKG + pedoman resmi | 2026-08-20 | Required | `index.html#pengumuman` | PROVISIONAL | Hubungkan ke layanan CKG/Klaster 2 |
| INF-003 | Penemuan Pasien TB — Obat Gratis | Pengumuman | C4 / TB | PJ TB / Klaster 4 | Pedoman TB + kebijakan program | 2026-07-28 | Required | `index.html#pengumuman` | PROVISIONAL | Hubungkan ke pelayanan TB |
| INF-004 | HUT RI ke-81, layanan kesehatan gratis | Berita | Cross-cluster | Pengelola informasi | Dokumentasi kegiatan | 2026-08-17 | Optional | `index.html#berita` | PROVISIONAL | Tambah kategori kegiatan |
| INF-005 | Pentingnya skrining dini PTM | Berita/Edukasi | C3 / PTM | PJ PTM/Klaster 3 | Pedoman PTM resmi | 2026-08-05 | Required | `index.html#berita` | REVIEW | Validasi isi + sumber + link C3 |
| INF-006 | Foto kegiatan | Galeri | Cross-cluster | Pengelola informasi | Google Drive Puskesmas | Dynamic | Required | `informasi.html` | PROVISIONAL | Tambah metadata klaster/program |
| INF-007 | Video kegiatan | Galeri | Cross-cluster | Pengelola informasi | Google Drive/YouTube resmi | Dynamic | Required | `informasi.html` / `index.html#video-galeri` | PROVISIONAL | Perbaiki anchor + metadata |
| INF-008 | Tuberkulosis (TB) | Edukasi | C4 / TB | PJ TB | Pedoman TB/Kemenkes | Current | Required | `edukasi.html` | REVIEW | Tambah sumber, tanggal review, gejala/tindak lanjut yang tervalidasi |
| INF-009 | Ayo CKG | Edukasi | C2/C3 + cross-lifecycle | PJ CKG | AyoCKG/Kemenkes | Current | Required | `edukasi.html` | PROVISIONAL | Pecah berdasarkan sasaran usia/klaster |
| INF-010 | Video Edukasi | Edukasi/Media | Cross-cluster | Pengelola informasi | YouTube resmi | Dynamic | Required | `edukasi.html` | PROVISIONAL | Hubungkan ke kategori/topik |
| INF-011 | Instagram Resmi | Media sosial | Cross-cluster | Pengelola informasi | Instagram resmi | Dynamic | Required | `edukasi.html` | LOCKED | Sosial sebagai kanal pendukung, bukan source clinical utama |
| INF-012 | 5 Klaster Pelayanan | Program/Orientasi layanan | C1–C5 | Manajemen Puskesmas | `pelayanan.html` | Current | Required | `program.html` | REVIEW | Koreksi narasi agar sama dengan struktur canonical |
| INF-013 | SEHATI & 5S | Program/Budaya layanan | C1 + cross-cluster | Manajemen/Mutu | Kebijakan/tata nilai lokal | Current | Required | `program.html` | PROVISIONAL | Tegaskan owner + evidence |
| INF-014 | Integrasi Layanan Primer (ILP) | Informasi strategis | C1–C5 | Manajemen Puskesmas | Pedoman ILP + regulasi nasional | Current | Required | `informasi-ilp.html` | REVIEW | Buat landing page canonical |
| INF-015 | Survei Kepuasan Masyarakat | Mutu & capaian | C1 + cross-cluster | Tim Mutu | Hasil IKM resmi | 2026-08-21 | Required | `program.html`/future `mutu.html` | PROVISIONAL | Pisahkan dari Program/Inovasi atau beri kategori |
| INF-016 | Maklumat Pelayanan | Governance document | C1 | Manajemen | Dokumen resmi Puskesmas | Current | Required | `download.html` | LOCKED | Pertahankan sebagai dokumen download |
| INF-017 | Standar Pelayanan | Governance document | C1 + C2–C5 | Manajemen | Dokumen standar pelayanan lokal | Current | Required | `download.html` | LOCKED | Jadikan sumber konteks pelayanan |
| INF-018 | Mekanisme Konsultasi & Pengaduan | Public service | C1 + cross-cluster | Pengelola pengaduan | SOP/mekanisme lokal | Current | Required | `kontak.html#pengaduan` | PROVISIONAL | Satukan sebagai canonical grievance page/anchor |
| INF-019 | Portal BPJS / Skrining BPJS | Portal eksternal | Cross-cluster / JKN | Admin/Manajemen | BPJS Kesehatan | Current | Required | `kontak.html#tautan-terkait` | PROVISIONAL | Verifikasi URL + label fungsi |
| INF-020 | AyoCKG | Portal eksternal | C2/C3 | PJ CKG | Kemenkes | Current | Required | `kontak.html#tautan-terkait` | LOCKED | Pertahankan sebagai portal publik |
| INF-021 | SP4N-LAPOR! | Pengaduan eksternal | C1 + cross-cluster | Pengelola pengaduan | Pemerintah | Current | Required | `kontak.html` | LOCKED | Pertahankan |
| INF-022 | SIPPN KemenPANRB | Standar pelayanan eksternal | C1 | Manajemen | KemenPANRB | Current | Required | `kontak.html#tautan-terkait` | PROVISIONAL | Verifikasi canonical URL |

## Klaster mapping rule

- C1 = Manajemen, governance, mutu, administrasi, pengaduan.
- C2 = Ibu & Anak.
- C3 = Dewasa & Lansia.
- C4 = Penyakit Menular.
- C5 = Lintas Klaster.
- Cross-cluster digunakan untuk informasi yang memang tidak memiliki satu owner klaster tunggal.

## Content governance rule

### LOCKED
Konten/legal/operasional sudah diverifikasi dan dapat dipertahankan.

### PROVISIONAL
Konten dapat tampil, tetapi memerlukan metadata atau verifikasi lokal tambahan.

### REVIEW
Konten klinis/struktur/link memiliki risiko salah atau belum cukup evidence; jangan dijadikan sumber final sebelum review.

### ARCHIVED
Konten tidak aktif tetapi dipertahankan sebagai arsip.

## Link rule

1. Setiap konten harus memiliki satu URL canonical.
2. Anchor yang digunakan dari homepage wajib benar-benar ada.
3. Link ke sosial media tidak menggantikan canonical archive website untuk informasi penting.
4. Link eksternal harus diverifikasi sebelum dipakai sebagai link resmi.
5. Struktur klaster selalu mengacu ke `pelayanan.html`, bukan narasi lama di halaman lain.

## Clinical content rule

Materi edukasi/berita yang mengandung informasi klinis harus mempunyai sumber dan tanggal review. Website tidak boleh membuat diagnosis atau keputusan terapi otomatis tanpa dasar klinis/SOP yang sesuai.

## Next gate

1. Fix P0 links/anchors.
2. Correct `program.html` 5-cluster narrative and IKM link.
3. Create canonical ILP landing page.
4. Normalize information submenu to remove duplication.
5. Extend Edukasi into a searchable/filterable knowledge base.
6. Add content metadata model to dynamic gallery/news/announcement system when implementation is planned.
