# CHECKPOINT — AUDIT MENU INFORMASI v0.1

Tanggal: 31 Agustus 2026
Repository: `pkmtanjungpinangjambi/pkmtanjungpinangjambi.github.io`
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`
Base branch production: `main`
Issue utama: #162

## Status
Audit awal Menu Informasi selesai. **Belum ada perubahan pada halaman produksi.** Dokumen ini hanya menyimpan temuan, usulan arsitektur informasi, dan pemetaan hubungan ke 5 klaster.

## 1. Struktur Menu Informasi yang diaudit

Menu saat ini memuat:
- Pengumuman
- Berita & Kegiatan
- Galeri Foto & Video
- Edukasi
- Program & Inovasi
- Informasi ILP
- Download
- Tarif Pelayanan
- Kontak & Lokasi

Di dalam dropdown juga terdapat kelompok tambahan "Informasi" dan "Keluhan & Pengaduan" dengan tautan yang sebagian mengulang item di atas.

## 2. Temuan utama

### A. Duplikasi/arsitektur menu
1. "Tarif Pelayanan" lebih tepat menjadi fungsi utama Menu Pelayanan, bukan bagian inti Menu Informasi. Boleh tetap diberi shortcut silang, tetapi sumber utama sebaiknya satu.
2. "Media Informasi Bergambar" mengarah ke `download.html`; secara semantik ini bercampur antara media dan dokumen unduhan. Perlu dipisahkan.
3. "Media Informasi Audio Visual" mengarah ke `informasi.html`, yang sebenarnya adalah halaman galeri. Nama menu dan target perlu diseragamkan.
4. Menu kelompok "Informasi" di dalam dropdown Informasi tidak diperlukan karena mengulang fungsi yang sudah ada.
5. Keluhan & Pengaduan lebih baik memiliki satu halaman/anchor kanonik, sedangkan kanal eksternal ditampilkan sebagai opsi.

### B. Link/anchor yang perlu diperbaiki
1. `Berita & Kegiatan` mengarah ke `index.html#berita`. Pada `index.html` elemen `id="berita"` memang ada, sehingga link ini valid.
2. Beranda memiliki kartu `Foto Kegiatan` dan `Video Kegiatan` yang mengarah ke `informasi.html#foto` dan `informasi.html#video`, tetapi `informasi.html` tidak memiliki `id="foto"` maupun `id="video"`. **Status: BROKEN ANCHOR.**
3. `Program & Inovasi` memiliki link hasil IKM ke `profil.html#klaster1`, tetapi `profil.html` tidak memiliki `id="klaster1"`. **Status: BROKEN/SEMANTICALLY WRONG LINK.** Target lebih tepat ke `pelayanan.html#klaster-1` atau halaman Manajemen Puskesmas.

### C. Konsistensi identitas kontak
Beberapa halaman masih menggunakan format alamat `Jl. Taruma Negara No.RT.12` sedangkan halaman lain menggunakan `Jl. Taruma Negara No. 50`. Perlu satu sumber identitas kanonik untuk alamat, telepon, email, dan media sosial.

Facebook juga muncul dengan target yang berbeda pada halaman tertentu. Target akun resmi perlu diverifikasi dan kemudian diseragamkan di semua halaman.

### D. Kelengkapan konten
Menu Informasi sekarang lebih banyak menjadi kumpulan tautan daripada knowledge base pelayanan. Kita perlu menambahkan hubungan eksplisit antara konten informasi dengan klaster pelayanan.

## 3. Pemetaan Menu Informasi → Klaster

| Menu | Klaster utama | Klaster terkait | Keputusan |
|---|---|---|---|
| Pengumuman | Cross-cluster | Klaster 1–5 sesuai isi | Tetap di Informasi; setiap item diberi tag klaster/program |
| Berita & Kegiatan | Cross-cluster | Klaster 1–5 | Tetap; sebaiknya arsip berita bertahap |
| Galeri Foto & Video | Cross-cluster | Klaster 1–5 | Tetap; tambah filter/tag klaster/program |
| Edukasi | Cross-cluster | Klaster 2, 3, 4, 5 terutama | Tetap; setiap materi wajib punya kategori/sasaran |
| Program & Inovasi | Cross-cluster | Klaster 1–5 | Ubah dari kartu slogan menjadi daftar program/inovasi terverifikasi + tautan klaster |
| Informasi ILP | Semua klaster | 1–5 | Jadikan halaman/landing khusus ILP, bukan hanya anchor beranda |
| Download | Klaster 1 untuk dokumen tata kelola | Semua klaster jika dokumen spesifik layanan | Pisahkan dokumen governance vs formulir/media layanan |
| Tarif Pelayanan | Pelayanan lintas klaster | 2–5 + layanan Klaster 1 | Pindahkan sumber utama ke Menu Pelayanan; beri shortcut di Informasi bila diperlukan |
| Kontak & Lokasi | Klaster 1 sebagai fungsi front office/pengaduan | Cross-cluster | Tetap di Informasi; tautkan ke pelayanan/pengaduan |
| Keluhan & Pengaduan | Klaster 1 | Cross-cluster | Satu halaman kanonik; tautkan dari semua layanan |

## 4. Usulan struktur Menu Informasi v1

### A. Informasi Publik
- Pengumuman
- Berita & Kegiatan
- Galeri Foto & Video

### B. Edukasi & Program
- Edukasi Kesehatan
- Program & Inovasi
- Informasi ILP

### C. Dokumen & Transparansi
- Download Dokumen Resmi
- Informasi Tarif → shortcut ke `tarif.html`

### D. Kontak & Pengaduan
- Kontak & Lokasi
- Mekanisme Pengaduan
- SP4N-LAPOR!

### E. Portal/Sistem Terkait
Direkomendasikan ditambah sebagai section khusus, bukan dicampur dengan konten berita:
- SATUSEHAT / SATUSEHAT Platform
- SATUSEHAT Indonesiaku (ASIK)
- BPJS Kesehatan
- SITB
- SIHEPI
- SIMKESWA
- SISRUTE

Hanya tampilkan portal publik resmi; credential, token, dan URL internal/API tidak pernah ditampilkan.

## 5. Pola tag yang disarankan

Setiap konten informasi memiliki metadata ringan:
- `cluster`: 1 / 2 / 3 / 4 / 5 / cross-cluster
- `service`: nama layanan
- `audience`: masyarakat umum / ibu / anak / dewasa / lansia / Catin / petugas
- `topic`: edukasi / program / pengumuman / kegiatan / regulasi
- `updated_at`
- `source_type`: internal / Kemenkes / Dinkes / BPJS / program resmi

Tujuan: pengguna dapat bergerak dari informasi → klaster → layanan tanpa mencari ulang.

## 6. Contoh koneksi yang diinginkan

- Edukasi TB → `pelayanan-tuberkulosis.html` → Klaster 4
- Edukasi CKG dewasa/lansia → `pelayanan-ckg.html` + Klaster 3
- Edukasi CKG sekolah → pelayanan/CKG terkait Klaster 2
- Edukasi gigi → `pelayanan-kesehatan-gigi-mulut.html` → klaster sesuai sasaran
- Informasi rujukan → SISRUTE + Klaster 5/lintas klaster
- Informasi BPJS/JKN → layanan administratif Klaster 1 + semua pelayanan yang menggunakan JKN
- Informasi IKM, maklumat, struktur organisasi → Klaster 1 / governance

## 7. Prioritas koreksi

### P1 — harus diperbaiki lebih dulu
- Broken anchor `informasi.html#foto`
- Broken anchor `informasi.html#video`
- Broken link `profil.html#klaster1`
- Duplikasi item "Informasi" / media pada dropdown
- Konsistensi alamat/telepon/email/media sosial

### P2 — perbaikan arsitektur
- Pindahkan sumber utama Tarif ke Pelayanan
- Pisahkan Download Dokumen dari Media Informasi
- Buat landing `Informasi ILP`
- Tambahkan tag klaster pada konten
- Tambahkan section Portal/Sistem Terkait

### P3 — peningkatan jangka lanjut
- Arsip berita/pengumuman dengan filter
- Filter galeri berdasarkan klaster/program
- Knowledge base edukasi berbasis sasaran dan klaster
- Metadata tanggal update dan sumber resmi

## 8. Guardrail konten

- Informasi publik tidak boleh memuat data pasien.
- Edukasi klinis harus memiliki sumber resmi/terverifikasi.
- Jangan mengubah konten website menjadi clinical decision rule tanpa dasar pedoman/SOP.
- Konten yang berubah karena regulasi harus memiliki `updated_at` dan sumber.
- Tautan eksternal harus mengarah ke portal resmi yang diverifikasi.

## 9. Status implementasi

**NO CODE CHANGE — AUDIT ONLY.**

Audit ini belum mengubah `main` maupun branch produksi.

## 10. Next gate

1. Validasi hasil audit dengan struktur 5 klaster.
2. Audit isi setiap halaman Informasi secara detail.
3. Verifikasi sumber/regulasi untuk konten edukasi dan program.
4. Buat desain Menu Informasi v1.
5. Implementasikan hanya melalui branch perubahan terpisah.
6. QC link/anchor + mobile + consistency sebelum PR.

## Evidence repository

- `index.html`: struktur dropdown Informasi, anchor Pengumuman/Berita, dan kartu Foto/Video.
- `pelayanan.html`: definisi 5 klaster dan target `#klaster-1` s.d. `#klaster-5`.
- `informasi.html`: halaman Galeri Foto & Video dan tidak ditemukan anchor `#foto`/`#video`.
- `program.html`: link IKM menuju `profil.html#klaster1`.
- `profil.html`: tidak ditemukan `id="klaster1"`.
- `download.html`: daftar dokumen publik.
- `kontak.html`: kontak, pengaduan, serta portal terkait.

## Git safety

- `main` tidak disentuh.
- Tidak ada data pasien/credential dalam audit.
- Implementasi menunggu review sebelum perubahan kode.
