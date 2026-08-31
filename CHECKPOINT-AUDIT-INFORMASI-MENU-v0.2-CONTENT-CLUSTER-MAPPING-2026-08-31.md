# CHECKPOINT — AUDIT MENU INFORMASI v0.2

Tanggal: 31 Agustus 2026
Repository: `pkmtanjungpinangjambi/pkmtanjungpinangjambi.github.io`
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`
Base branch produksi: `main`
Issue utama: #162
Parent checkpoint: `CHECKPOINT-AUDIT-INFORMASI-MENU-v0.1-2026-08-31.md`

## 1. Tujuan

Audit lanjutan terhadap enam blok Menu Informasi: Pengumuman, Berita & Kegiatan, Galeri Foto & Video, Edukasi, Program & Inovasi, dan Informasi ILP. Audit mencakup struktur informasi, hubungan ke klaster, link/anchor, status content governance, dan kesiapan sebagai knowledge base pelayanan.

## 2. Prinsip yang dikunci

- Menu Informasi adalah **public knowledge layer**, bukan tempat menyimpan data klinis pasien.
- Konten yang berkaitan dengan pelayanan harus dapat ditelusuri ke klaster/program pemilik.
- Informasi klinis/regulatif harus mempunyai sumber resmi dan status review.
- Konten tidak boleh menjadi duplikat yang membingungkan dengan Menu Pelayanan.
- Link yang salah/broken harus diperbaiki sebelum polishing visual.
- Setiap konten dinamis perlu metadata minimal: kategori/klaster, tanggal publikasi, tanggal review bila relevan, dan sumber.

## 3. Audit enam blok

### A. Pengumuman — status: RESTRUCTURE / CROSS-CLUSTER

Kondisi sekarang:
- Pengumuman berada di homepage pada anchor `#pengumuman`.
- Data contoh saat audit: IKM Triwulan II 2026; CKG Sekolah 2026; penemuan pasien TB.

Temuan:
1. Belum ada model kategori/label klaster.
2. Pengumuman spesifik program dan pengumuman umum bercampur.
3. Belum ada arsip pengumuman khusus; dropdown mengarah kembali ke homepage.

Koneksi klaster:
- IKM → Klaster 1 / governance mutu.
- CKG Sekolah → Klaster 2.
- TB → Klaster 4.
- Pengumuman umum → cross-cluster.

Rencana:
- Pertahankan sebagai cross-cluster feed.
- Tambahkan metadata `klaster`, `program`, `tanggal`, `status`.
- Siapkan halaman/arsip pengumuman bila jumlah konten bertambah.

### B. Berita & Kegiatan — status: RESTRUCTURE / CROSS-CLUSTER

Kondisi sekarang:
- Berita berada di homepage pada anchor `#berita`.
- Contoh yang terlihat: HUT RI, skrining dini PTM.
- Tombol "Lihat semua" diarahkan ke Instagram.

Temuan:
1. Berita belum memiliki halaman arsip/internal canonical page.
2. Informasi berita bercampur dengan media sosial sebagai sumber arsip.
3. Belum ada tag klaster/program.
4. Berita klinis membutuhkan sumber/referensi bila memuat klaim kesehatan.

Koneksi klaster:
- HUT RI/kegiatan umum → cross-cluster.
- Skrining PTM → Klaster 3 bila isi berfokus dewasa/lansia; dapat diberi tag CKG/PTM sesuai konten.

Rencana:
- Gunakan feed berita internal sebagai sumber utama.
- Instagram menjadi kanal sosial pendukung, bukan satu-satunya arsip.
- Tambahkan tag klaster dan tipe konten: kegiatan, layanan, edukasi, capaian, pengumuman.

### C. Galeri Foto & Video — status: FIX TECHNICAL + RESTRUCTURE

Kondisi sekarang:
- `informasi.html` memuat filter Semua / Foto / Video dan konten dari Google Drive.
- Homepage mengarahkan kartu galeri ke `informasi.html#foto` dan `informasi.html#video`.

Temuan teknis:
- Anchor `#foto` dan `#video` belum tersedia pada target `informasi.html`, sehingga link tersebut tidak memberikan navigasi yang diharapkan.

Temuan arsitektur:
1. Galeri belum mempunyai metadata klaster/program.
2. Pengelompokan hanya berdasarkan media (foto/video), belum konteks pelayanan.
3. Sumber Google Drive baik untuk operasional upload, tetapi metadata publik tetap perlu dikendalikan.

Koneksi klaster:
- Cross-cluster; item individual diberi tag Klaster 1–5/program.

Rencana:
- Tambahkan anchor/filter kanonik atau ubah link homepage agar langsung menuju target yang benar.
- Tambahkan metadata `klaster`, `program`, `tanggal`, `kegiatan` pada data galeri.
- Jangan menampilkan metadata internal atau data pasien.

### D. Edukasi — status: UNDERDEVELOPED / CLUSTER-INDEX NEEDED

Kondisi sekarang:
- Hanya empat kartu utama: TB, Ayo CKG, Video Edukasi, Instagram Resmi.
- TB diberi narasi bahwa pengobatan gratis di Puskesmas.
- CKG diarahkan ke Ayo CKG.

Temuan:
1. Materi terlalu sedikit untuk menjadi knowledge base.
2. Tidak ada klasifikasi berdasarkan klaster/siklus hidup.
3. Tidak ada `sumber`, `tanggal review`, atau `terakhir diperbarui` untuk materi kesehatan.
4. Edukasi saat ini lebih mirip landing page daripada perpustakaan materi.
5. Instagram digunakan sebagai sumber konten; perlu tetap ada versi konten yang canonical di website untuk materi penting.

Koneksi klaster:
- TB → Klaster 4.
- CKG Sekolah → Klaster 2.
- Materi dewasa/lansia → Klaster 3.
- Materi umum/rujukan lintas layanan → cross-cluster atau Klaster 5 sesuai konteks.

Rencana:
- Bentuk knowledge base: `Topik → Sasaran → Klaster → Isi singkat → Kapan mencari pertolongan → Sumber resmi → Tanggal review`.
- Materi klinis tidak boleh diterbitkan tanpa evidence/source governance.

### E. Program & Inovasi — status: P1 CONTENT CORRECTION

Kondisi sekarang:
- Empat kartu: 5 Klaster Pelayanan, SEHATI & 5S, ILP, Survei Kepuasan Masyarakat.

Temuan kritis:
1. Deskripsi "5 Klaster Pelayanan" masih menggambarkan susunan lama dan tidak sinkron dengan struktur 5 klaster pada `pelayanan.html`.
2. Kartu IKM mengarah ke `profil.html#klaster1`, yang bukan target kanonik hasil audit.
3. Program & Inovasi masih terlalu generik dan belum menunjukkan program/inovasi nyata per klaster.
4. Capaian IKM bercampur dengan program/inovasi; secara informasi lebih tepat dipisah sebagai `Mutu & Capaian` atau diberi kategori.

Koneksi klaster:
- SEHATI & 5S → Klaster 1 / governance budaya layanan, tetapi berdampak lintas klaster.
- ILP → semua klaster.
- IKM → Klaster 1 / mutu, dengan dampak cross-cluster.
- Program/inovasi individual → tag klaster pemilik.

Rencana:
- Koreksi deskripsi 5 klaster mengikuti struktur canonical `pelayanan.html`.
- Perbaiki target IKM.
- Pisahkan atau kategorikan `Program`, `Inovasi`, `Mutu & Capaian`.

### F. Informasi ILP — status: UNDERDEVELOPED / CROSS-CLUSTER LANDING PAGE

Kondisi sekarang:
- Informasi ILP terutama berada pada hero homepage dengan anchor `#ilp`.
- Narasi menekankan ILP dan tagline pelayanan.
- Dropdown Informasi mengarah ke anchor homepage, bukan halaman ILP khusus.

Temuan:
1. Belum ada landing page ILP canonical.
2. Belum ada visual/struktur yang menjelaskan hubungan 5 klaster secara operasional.
3. Belum ada peta `klaster → sasaran → layanan → sistem informasi terkait`.
4. Belum ada penjelasan yang menghubungkan ILP dengan CKG, pelayanan lintas siklus hidup, dan jejaring/rujukan.

Koneksi klaster:
- ILP = **ALL CLUSTERS / cross-cluster**, bukan satu klaster.

Rencana:
- Buat halaman `informasi-ilp.html` atau struktur setara.
- Materi minimal: konsep ILP, 5 klaster, siklus hidup, integrasi layanan, jejaring/rujukan, dan tautan menuju masing-masing klaster.
- Hubungkan ke Menu Pelayanan tanpa menduplikasi isi pelayanan.

## 4. Prioritas koreksi

### P0 — broken / misleading navigation
1. `informasi.html#foto` / `#video`.
2. `program.html` → `profil.html#klaster1`.

### P1 — misleading content
1. Deskripsi 5 klaster di `program.html` tidak sinkron dengan struktur canonical.
2. IKM ditempatkan dalam Program & Inovasi tanpa kategori yang jelas.
3. Pengumuman/berita/edukasi belum memiliki governance metadata.

### P2 — information architecture
1. Buat canonical archive untuk pengumuman dan berita bila diperlukan.
2. Tambahkan tag Klaster 1–5/program.
3. Buat landing page ILP khusus.
4. Transformasi Edukasi menjadi knowledge base.

### P3 — quality polish
1. Normalisasi typography/reference display.
2. Normalisasi card/metadata.
3. Pastikan semua media mempunyai alt text dan metadata yang konsisten.

## 5. Canonical cross-linking model

`Pelayanan` = sumber utama struktur layanan.

`Informasi` = informasi pendukung/berita/edukasi/media/program.

Setiap konten Informasi yang berkaitan dengan layanan harus dapat kembali ke:
- Klaster pemilik;
- layanan spesifik bila ada;
- sumber resmi bila memuat informasi klinis/regulatif.

## 6. Content status taxonomy

- `LOCKED` — telah diverifikasi.
- `PROVISIONAL` — masih perlu review lokal.
- `REVIEW` — evidence/owner belum cukup.
- `ARCHIVED` — tidak lagi aktif tetapi dipertahankan sebagai arsip.

## 7. Non-goals

- Belum mengubah UI/HTML produksi pada checkpoint ini.
- Belum memindahkan seluruh konten ke database/CMS.
- Belum memasukkan data pasien.
- Belum menghubungkan RME produksi.

## 8. Next gate

1. Audit `informasi.html`, `program.html`, `edukasi.html`, dan section informasi pada `index.html` terhadap seluruh link/anchor.
2. Susun `INFORMATION CONTENT MATRIX v0.1` dengan kolom: item, tipe, klaster, owner, source, publish date, review date, canonical URL, status.
3. Tentukan struktur landing page ILP.
4. Baru buat perubahan HTML dalam branch kerja terpisah dari checkpoint.

## Evidence baseline

- Source repository `main` pada saat audit.
- `pelayanan.html` sebagai struktur canonical 5 klaster.
- `informasi.html`, `edukasi.html`, `program.html`, `index.html`, `download.html`, `kontak.html`.

## Git safety

- `main` tidak diubah langsung.
- Audit dan checkpoint disimpan di branch khusus.
- Tidak ada credential atau data pasien dalam repository.
