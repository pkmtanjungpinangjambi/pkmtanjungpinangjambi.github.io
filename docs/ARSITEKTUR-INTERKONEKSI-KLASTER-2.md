# ARSITEKTUR INTERKONEKSI KLASTER 2 — IBU & ANAK

Tanggal: 30 Agustus 2026
Status: Blueprint review — belum menjadi standar final sebelum disetujui tim
Branch: `feature/klaster-2-ecosystem`

## 1. Tujuan

Dokumen ini menjadi blueprint hubungan antar-komponen Klaster 2 agar website tidak berkembang sebagai kumpulan halaman yang berdiri sendiri. Satu layanan harus dapat ditelusuri dari sasaran, proses, pelaksana, SOP, aplikasi, data, indikator, risiko, mutu, tindak lanjut, hingga evidence.

## 2. Prinsip inti

- **Klaster = struktur pelayanan utama.**
- **UKP + UKM = dimensi pelayanan** yang berjalan di dalam klaster.
- **SOP = berada dekat dengan proses/pelaksana** yang menjalankan pelayanan.
- **Aplikasi = alat pencatatan/pelaporan/dukungan**, dikelola secara tata kelola melalui Klaster 1, tetapi dapat digunakan di Klaster 2–5 sesuai fungsi.
- **Data = keluaran proses pelayanan dan sumber perencanaan.**
- **Monev = membaca target, capaian, gap, penyebab, dan tindak lanjut.**
- **Manajemen risiko = lapisan lintas proses**, bukan hanya milik Klaster 1.
- **Mutu + keselamatan = hasil pengukuran dan perbaikan berkelanjutan.**
- **Evidence = bukti bahwa proses benar-benar dilaksanakan.**
- **Privasi = data individu/rekam medis/register risiko internal tidak dipublikasikan.**

## 3. Model hubungan utama

```text
SASARAN SIKLUS HIDUP
        ↓
PELAYANAN KLASTER 2
        ↓
   UKP + UKM
        ↓
 SOP + SDM + KOMPETENSI
        ↓
 APLIKASI / PENCATATAN
        ↓
       DATA
        ↓
 INDIKATOR / PWS
        ↓
 MONEV + RISIKO
        ↓
 MUTU + KESELAMATAN
        ↓
 AUDIT / EVALUASI
        ↓
 RTL / PERBAIKAN
        ↓
 EVIDENCE
        ↓
 PERENCANAAN / INTERVENSI
        ↓
 KEMBALI KE SASARAN
```

## 4. Entitas layanan sebagai pusat relasi

Setiap layanan Klaster 2 sebaiknya memiliki identitas relasional minimum:

- `service_id`
- nama layanan
- kelompok sasaran
- klaster utama
- relasi UKP/UKM
- process owner
- pelaksana/kompetensi
- SOP/pedoman terkait
- aplikasi terkait
- data yang dihasilkan
- indikator
- risiko
- tindak lanjut
- evidence
- rujukan/jejaring
- dasar hukum

Tidak semua metadata harus ditampilkan ke publik. Sebagian menjadi data internal/administratif.

## 5. Contoh relasi: Triple Eliminasi + Hepatitis B

```text
IBU HAMIL
  ↓
ANC
  ↓
TRIPLE ELIMINASI
(HIV • SIFILIS • HBsAg)
  ↓
HASIL
  ├── NEGATIF → edukasi + tindak lanjut sesuai alur
  └── REAKTIF → asesmen/tatalaksana + rujukan/tindak lanjut
                         ↓
                      SIHEPI
                         ↓
                    DATA KASUS
                         ↓
                    PEMANTAUAN
                         ↓
              IBU → PERSALINAN → BAYI
                         ↓
                 TINDAK LANJUT BAYI
                         ↓
                  DATA / MONEV / MUTU
```

Catatan: website publik hanya memberikan informasi layanan, alur umum, panduan, dan akses ke sistem resmi. Data individual tetap berada pada sistem pelayanan yang berwenang.

## 6. Contoh relasi lintas aplikasi

### RME / ePuskesmas

- Tata kelola: Klaster 1 / manajemen sistem informasi.
- Pelaksanaan: lintas Klaster 1–5 sesuai pelayanan.
- Output: rekam/pencatatan pelayanan dan data pendukung yang berwenang.

### SIHEPI

- Tata kelola: tercatat dalam Application Registry Klaster 1.
- Pelaksanaan: terutama Klaster 2 untuk hepatitis B/triple eliminasi sesuai kewenangan dan alur resmi.
- Output: pencatatan/pelaporan program dan tindak lanjut terkait.

### ASIK

- Tata kelola: Application Registry Klaster 1.
- Pelaksanaan: dapat lintas klaster sesuai fungsi dan kebijakan sistem.

### e-PPGBM

- Tata kelola: Application Registry Klaster 1.
- Pelaksanaan: sangat relevan dengan Klaster 2 untuk data gizi sasaran ibu/anak, sesuai mekanisme program.

### PIS-PK

- Tata kelola: lintas klaster/UKM.
- Pelaksanaan: terutama kegiatan berbasis keluarga/wilayah dan dapat memberi konteks terhadap sasaran Klaster 2.

### SITB

- Tata kelola: Application Registry Klaster 1.
- Pelaksanaan: utama Klaster 4, tetapi dapat berhubungan dengan Klaster 2 bila sasaran/rujukannya terkait ibu/anak.

### SIMKESWA

- Tata kelola: Application Registry Klaster 1.
- Pelaksanaan: lintas siklus hidup sesuai kebutuhan kesehatan jiwa.

## 7. SOP dan Process Owner

SOP pelayanan berada pada proses/klaster pelaksana. Klaster 1 mengendalikan tata kelola dokumen (status, revisi, distribusi, pengendalian), tetapi tidak mengambil alih kepemilikan proses operasional dari klaster pelaksana.

Contoh:

| Proses | Process Owner | Tata Kelola Dokumen |
|---|---|---|
| ANC | Klaster 2 | Klaster 1 |
| Triple Eliminasi | Klaster 2 | Klaster 1 |
| Imunisasi | Klaster 2 | Klaster 1 |
| Tumbuh Kembang | Klaster 2 | Klaster 1 |
| Pemeriksaan laboratorium terkait | Unit/klaster pelaksana | Klaster 1 |
| Pelayanan obat | Farmasi / proses terkait | Klaster 1 |

## 8. Risiko, Monev, dan Mutu

Risiko dicatat dan dikendalikan pada proses yang bersangkutan. Manajemen risiko terhubung ke mutu dan Monev.

```text
TARGET
 ↓
CAPAIAN
 ↓
GAP
 ↓
ANALISIS PENYEBAB
 ↓
RISIKO / TEMUAN
 ↓
TINDAKAN KOREKTIF / PREVENTIF
 ↓
UKUR ULANG
 ↓
MUTU
```

## 9. Evidence / kesiapan akreditasi

Untuk setiap layanan, evidence dapat dikelompokkan secara internal menjadi:

- Regulasi/dasar hukum
- SOP/pedoman
- SDM & kompetensi
- Sarana/prasarana
- Rekaman pelaksanaan
- Indikator & hasil pengukuran
- Audit/supervisi
- Risiko/insiden (bila relevan)
- RTL dan bukti perbaikan
- Evaluasi ulang

Dokumen ini menggunakan klasifikasi evidence sebagai konsep arsitektur. Pemenuhan elemen penilaian tetap harus diverifikasi terhadap instrumen akreditasi yang berlaku.

## 10. Lapisan publik vs internal

### Publik
- Sasaran layanan
- Informasi layanan
- Persyaratan
- Jadwal
- Tarif
- Alur
- Kanal layanan/pendaftaran
- Edukasi
- Dasar hukum/referensi
- Capaian agregat yang telah disetujui

### Internal
- Identitas pasien/NIK
- Rekam medis
- Register risiko rinci
- Hak akses aplikasi
- Bukti audit internal yang tidak untuk publik
- Data individu program
- Kredensial/login aplikasi

## 11. Implikasi ke website

Hub Klaster 2 tetap menjadi pintu masuk publik. Interkoneksi internal tidak harus tampil sebagai puluhan submenu. Yang terlihat oleh masyarakat cukup navigasi sederhana, sedangkan relasi antar-SOP, aplikasi, data, indikator, risiko, mutu, dan evidence menjadi struktur metadata/knowledge layer.

Struktur publik yang disarankan:

```text
KLASTER 2 — IBU & ANAK
├── Sasaran
├── Layanan
├── Alur
├── Jadwal
├── Tarif
├── Persyaratan
├── Layanan Online
├── UKP + UKM
├── Jejaring
└── Dasar Hukum
```

Struktur knowledge layer/internal:

```text
LAYANAN
├── Process Owner
├── SDM
├── SOP
├── Aplikasi
├── Data
├── Indikator
├── Monev
├── Risiko
├── Mutu
├── Evidence
└── RTL
```

## 12. Sumber acuan utama

- Permenkes Nomor 19 Tahun 2024 tentang Penyelenggaraan Pusat Kesehatan Masyarakat.
- Permenkes Nomor 34 Tahun 2022 tentang Akreditasi.
- Kepmenkes HK.01.07/MENKES/165/2023 tentang Standar Akreditasi Puskesmas.
- Kepmenkes HK.01.07/MENKES/2015/2023 tentang Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer.
- SK Kepala UPTD Puskesmas Tanjung Pinang Nomor 39 Tahun 2026 tentang Standar Pelayanan.
- Dokumen lokal `1.a.Ak SK STANDAR PELAYANAN 2026.pdf`.

## 13. Status desain

Blueprint ini adalah dasar diskusi dan belum mengubah pembagian kewenangan resmi, SOP, atau sistem aplikasi yang berlaku di Puskesmas. Setiap implementasi teknis harus mengikuti regulasi terbaru, kebijakan Dinas Kesehatan Kota Jambi, kewenangan klinis, keamanan informasi, dan SOP internal.
