# MASTER SCREENING MATRIX — KLASTER 3 DEWASA & LANSIA v0.5

Tanggal: 31 Agustus 2026  
Issue: #162 — Klaster 3 Tahap 2 — Validasi Skrining Dewasa/PTM 2026  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## 1. Status

**v0.5 = matrix build gate, bukan clinical SOP final.**

- Raw Registry 55 tetap terkunci.
- Klaster 3 mencakup Dewasa dan Lansia.
- CKG menjadi gateway pemeriksaan siklus hidup; bukan kumpulan modul skrining tahunan yang berdiri sendiri.
- Frekuensi screening, follow-up, dan monitoring penyakit dipisahkan.
- `main` tidak diubah.
- Belum ada coding rule engine RME.

## 2. Evidence governance yang dikunci

### Sumber klinis utama
1. KMK HK.01.07/Menkes/84/2026 tentang Petunjuk Teknis Cek Kesehatan Gratis — berlaku.
2. KMK HK.01.07/MENKES/2015/2023 tentang Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer.
3. Permenkes No. 3 Tahun 2026 tentang Penanggulangan Penyakit — termasuk kerangka imunisasi siklus hidup/catch-up.
4. SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026 tentang Standar Pelayanan — konteks governance, alur pelayanan, sarana, kompetensi, pengawasan, dan evaluasi lokal.

### Governance rule
Untuk algoritme klinis, gunakan pedoman teknis terbaru yang berlaku. Regulasi lokal digunakan untuk memastikan pelayanan memang menjadi bagian dari struktur/standar UPTD, bukan untuk menggantikan pedoman klinis nasional.

## 3. Arsitektur Rule Engine

`Pasien → usia → status/riwayat CKG → eligibility → paket kelompok usia → komponen age/risk/conditional → hasil → cascade → edukasi/tatalaksana/rujuk → follow-up → indikator`

### Gateway
- Dewasa 18–59 tahun: CKG menurut kelompok usia 18–29, 30–39, 40–59.
- Lansia ≥60 tahun: seluruh pemeriksaan dewasa kecuali Catin + tambahan geriatri.
- CKG adalah pemeriksaan tahunan; hal tersebut tidak menjadikan seluruh follow-up penyakit sebagai annual.

## 4. Matrix row Klaster 3 — keputusan v0.5

| ID | Raw screening | Sasaran | Trigger / gate | Momentum | Metode utama / hubungan guidance | Output | Cascade / tindak lanjut | Status |
|---|---|---|---|---|---|---|---|---|
| SCR-004 | Skrining PUMA | Dewasa/lansia sesuai CKG | CKG; PPOK mulai ≥40 | Annual CKG context + follow-up hasil | PUMA; spirometri bila diperlukan/tersedia sesuai algoritme | Risiko PPOK / hasil pemeriksaan | Edukasi; spirometri/rujuk sesuai hasil | LOCKED-CONDITIONAL |
| SCR-005 | SKILAS | Lansia ≥60 | CKG lansia | Annual core | SKILAS | 6 domain kapasitas intrinsik | Gangguan domain → cascade geriatri | LOCKED |
| SCR-006 | ADL Barthel Modifikasi | Lansia ≥60 | CKG lansia | Annual core | ADL | Status fungsi/kemandirian | Tindak lanjut sesuai ketergantungan | LOCKED |
| SCR-007 | Mini-Cog | Lansia ≥60 | Gangguan kognitif dari assessment geriatri | Conditional | Mini-Cog | Hasil kognitif | Bersama AD-8 sesuai cascade | CONDITIONAL |
| SCR-008 | Frailty Syndrome | Lansia ≥60 | Gangguan SKILAS / kebutuhan asesmen | Conditional | Instrumen frailty sesuai guidance/SOP | Status frailty | Edukasi, aktivitas, gizi, dan tindak lanjut | CONDITIONAL |
| SCR-009 | Abbreviated Mental Test | Lansia | Owner/PJ menetapkan kebutuhan | Review | AMT | Hasil kognitif | Jangan aktifkan default bila bertentangan dengan cascade 2026 | REVIEW KHUSUS |
| SCR-010 | SPPB | Lansia ≥60 | Gangguan mobilitas | Conditional | SPPB | Status mobilitas | Intervensi/rujuk sesuai hasil | CONDITIONAL |
| SCR-011 | Short-Form MNA | Lansia ≥60 | Gangguan nutrisi | Conditional | MNA-SF | Risiko nutrisi | Konseling/intervensi gizi | CONDITIONAL |
| SCR-012 | GDS-4 | Lansia ≥60 | Gejala depresi | Conditional | GDS-4 | Hasil gejala depresi | Jalur kesehatan jiwa sesuai SOP | CONDITIONAL |
| SCR-014 | Obesitas | Dewasa/lansia | CKG gateway | Annual CKG | TB, BB, IMT, lingkar perut | Status gizi/obesitas | Edukasi, gizi, aktivitas, tindak lanjut | LOCKED |
| SCR-015 | Diabetes Melitus | Dewasa/lansia | CKG gateway | Annual CKG; follow-up penyakit terpisah | GDS; pada ≥40 dapat dilakukan GDP sesuai algoritme | Status glukosa | Pemeriksaan ulang/cascade dan tata laksana sesuai hasil | LOCKED |
| SCR-016 | Hipertensi | Dewasa/lansia | CKG gateway | Annual CKG; monitoring penyakit visit-based | Pengukuran tekanan darah | Status tekanan darah | Pengukuran ulang bila trigger; tindak lanjut sesuai standar | LOCKED |
| SCR-017 | Kesehatan Penglihatan | Dewasa/lansia | CKG; >40 cataract pathway | Annual CKG | Visus + pinhole; >40 skrining katarak | Status penglihatan | Tindak lanjut/rujuk sesuai hasil | LOCKED |
| SCR-018 | Kanker Kolorektal | Dewasa ≥45 | Age gate + CKG | Annual CKG context | APCS; risiko tinggi → colok dubur + FOBT | Risiko kanker usus | Rujuk/lanjut sesuai hasil | LOCKED-CONDITIONAL |
| SCR-021 | Risiko Kanker Payudara | Perempuan ≥30 | Sex + age + CKG | Annual CKG context | SADANIS; USG bila tersedia/indikasi | Temuan payudara | Edukasi/USG/rujuk sesuai hasil | LOCKED-CONDITIONAL |
| SCR-026 | SRQ-29 | Dewasa/lansia | Mental-health pathway | SOP dependent | SRQ-29 belum dibuktikan default CKG 2026 | Pending | Gunakan instrumen yang ditetapkan SOP aktif | REVIEW |
| SCR-027 | Risiko Kanker Paru | Dewasa ≥45 | Age + risk assessment | Annual CKG context | Kuesioner risiko; X-ray bagi peserta berisiko sesuai kapasitas | Risiko kanker paru | X-ray/rujuk sesuai hasil | LOCKED-CONDITIONAL |
| SCR-028 | Risiko Penyakit Jantung | ≥40 + hipertensi dan/atau DM | Age + clinical condition | Annual CKG bila eligible | EKG | Temuan/risk finding | Evaluasi dan tindak lanjut klinis | LOCKED-CONDITIONAL |
| SCR-029 | Risiko Stroke | ≥40 + hipertensi dan/atau DM | Age + clinical condition | Annual CKG bila eligible | Profil lipid | Profil lipid/risk finding | Intervensi faktor risiko/tindak lanjut | LOCKED-CONDITIONAL |
| SCR-034 | Kebugaran Dewasa | Dewasa/lansia sesuai program | Aktivitas fisik kurang / program | Assessment-based | Kuesioner aktivitas + tes kebugaran sesuai instrumen aktif | Status aktivitas/kebugaran | Edukasi; tes kebugaran 6 bulanan bila trigger terpenuhi | CONDITIONAL |
| SCR-035 | WHO-ASSIST V3.1 | Dewasa/lansia sesuai indikasi | Risk/behavior based | Conditional | WHO-ASSIST | Risiko penggunaan zat | Konseling/rujuk sesuai SOP | REVIEW |
| SCR-036 | Gigi Dewasa | Dewasa/lansia | CKG gateway | Annual CKG context | Pemeriksaan gigi-mulut; periodontal mulai ≥25 sesuai guidance | Status gigi-mulut | Tata laksana/rujuk | LOCKED |
| SCR-037 | Gigi Lansia | Lansia ≥60 | CKG lansia | Annual CKG context + indication | Pemeriksaan gigi-mulut lansia | Status oral health | Tata laksana/rujuk | LOCKED-CONDITIONAL |
| SCR-038 | Risiko Kanker Serviks | Perempuan ≥30, menikah/pernah hubungan seksual | Sex + age + sexual history + prior result | Interval mengikuti hasil sebelumnya | Inspekulo + HPV DNA/IVA sesuai alur | Status skrining | Interval dan rujukan sesuai hasil | LOCKED-CONDITIONAL |
| SCR-039 | Indra Pendengaran | Dewasa/lansia | CKG gateway | Annual CKG context | Otoskop + tes bisik modifikasi/aplikasi | Status pendengaran | Pemeriksaan lanjutan/rujuk | LOCKED |
| SCR-040 | Imunisasi Dewasa | Dewasa/lansia | Status imunisasi + schedule/catch-up | Event/schedule based | Verifikasi riwayat + antigen/jadwal | Status imunisasi | Pemberian dose/catch-up sesuai ketentuan | LOCKED-EVENT |
| SCR-045 | PHQ-4 | Dewasa/lansia | Mental-health pathway | SOP dependent | Evidence nasional ada; default lokal menunggu SOP aktif | Pending | Algoritme keswa sesuai SOP aktif | NATIONAL-EVIDENCE / LOCAL-SOP PENDING |
| SCR-048 | Sirosis/Fibrosis Hati | Dewasa/lansia dengan faktor risiko | HBV/HCV dan/atau >40 + DM/obesitas sentral/dislipidemia | Risk-based / CKG context | Kuesioner risiko → SGOT + trombosit → APRI | Risiko fibrosis | Tindak lanjut berdasarkan hasil/APRI | LOCKED-CONDITIONAL |
| SCR-049 | Faktor Risiko | Lintas sasaran | Definisi item belum spesifik | Governance dependent | Nama terlalu generik | Pending | Jangan jadikan satu instrumen CKG universal | REVIEW |
| SCR-051 | Fungsi Ginjal | ≥40 + hipertensi dan/atau DM | Age + clinical condition | Annual CKG bila eligible; CKD monitoring terpisah | Ureum/kreatinin untuk eLFG dan/atau ACR | eLFG/ACR/temuan ginjal | Tindak lanjut sesuai penyakit ginjal | LOCKED-CONDITIONAL |
| SCR-052 | AD-8 INA | Lansia | Gangguan kognitif pada cascade | Conditional | AD-8 sebagai assessment kognitif bersama Mini-Cog | Hasil informan kognitif | Tindak lanjut keswa/geriatri sesuai hasil | CONDITIONAL / CORRECTED |
| SCR-053 | Calon Pengantin | Catin laki-laki/perempuan | Menjelang pernikahan | Event-based | Pemeriksaan kesehatan reproduksi + komponen Catin | Status kesehatan Catin | Intervensi/rujuk sesuai temuan | LOCKED-EVENT |

## 5. Cross-cluster shared assessment

| Raw ID | Primary pathway | Hubungan dengan Klaster 3 |
|---|---|---|
| SCR-001 | Klaster 4 — penyakit menular/TB | TB merupakan domain dalam CKG dewasa; bila dipakai pada CKG gunakan shared data/reference, bukan duplikasi SCR |
| SCR-054 | Klaster 4 — TB anak | Shared component untuk CKG anak; bukan primary Klaster 3 |

## 6. Row di luar Klaster 3

SCR-002, 003, 013, 019, 020, 022–025, 030–033, 041–044, 046–047, 050, 055 → primary pathway di luar Klaster 3 berdasarkan kelompok sasaran/instrumen. Raw registry tetap dipertahankan dan tidak dihapus.

## 7. Indikator RME — dua level

### A. Indikator nasional/program
Hanya digunakan bila sumber program menyatakan indikator tersebut. Matrix tidak menciptakan indikator nasional baru.

### B. Indikator operasional RME — kandidat, bukan indikator nasional
1. **Cakupan CKG tahunan:** peserta eligible yang menyelesaikan gateway CKG / peserta eligible yang terdaftar.
2. **Kelengkapan data CKG:** encounter CKG dengan seluruh field wajib sesuai kelompok usia / seluruh encounter CKG.
3. **Ketepatan cascade:** temuan yang memenuhi trigger dan memiliki asesmen/tindak lanjut tercatat / temuan yang memenuhi trigger.
4. **Follow-up terdokumentasi:** temuan abnormal dengan outcome tindak lanjut tercatat / seluruh temuan abnormal yang memerlukan follow-up.
5. **Rujukan terdokumentasi:** kasus yang memerlukan rujukan dengan status rujukan tercatat / seluruh kasus yang memerlukan rujukan.

Semua indikator di atas harus diberi label `OPERATIONAL-CANDIDATE` sampai owner/PJ, Tim Mutu, dan governance menetapkan definisi serta target resminya.

## 8. Local SOP / service standard gate

SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026 mengatur bahwa Klaster 3 mencakup Dewasa dan Lansia. Standar pelayanan lokal menggambarkan alur dewasa/lansia melalui pendaftaran, anamnesis/pemeriksaan awal, dokter, laboratorium/konseling, serta produk berupa catatan medis dan hasil laboratorium. Untuk layanan CKG, alurnya secara eksplisit: pendaftaran → verifikasi identitas → skrining awal → pemeriksaan sesuai kelompok usia → edukasi hasil → rujukan/tindak lanjut bila diperlukan → pulang.

Dokumen lokal belum menyediakan SOP instrumen individual untuk seluruh Raw 55. Karena itu status row tetap dibedakan antara `LOCKED`, `LOCKED-CONDITIONAL`, `CONDITIONAL`, `REVIEW`, dan `LOCAL-SOP PENDING`.

## 9. Guardrails final v0.5

- Jangan membuat semua skrining menjadi setiap kunjungan.
- Jangan membuat semua instrumen menjadi annual universal.
- Jangan menduplikasi PTM sebagai modul terpisah di luar gateway CKG.
- Screening ≠ diagnosis ≠ treatment ≠ monitoring.
- Jangan menghapus nama/ID Raw 55.
- Jangan membuat SCR baru hanya karena guidance menyebut asesmen tambahan.
- Untuk guidance delta seperti IADL Lawton dan SARC-CalF, integrasi menunggu keputusan governance.
- AD-8 **sudah ada** sebagai SCR-052; tidak dibuat ulang.
- Data individual RME tetap internal dan berbasis kewenangan/hak akses.
- Threshold klinis/tata laksana rinci harus mengikuti pedoman/SOP aktif, bukan dibuat oleh website.

## 10. Gate berikutnya

1. Review owner/PJ program untuk seluruh row `REVIEW` dan `LOCAL-SOP PENDING`.
2. Validasi target/definisi indikator operasional dengan Tim Mutu.
3. Buat versi final Matrix v0.5 setelah governance review.
4. Baru turunkan matrix menjadi JSON/rule engine.
5. Baru implementasi UI RME Klaster 3 dan lakukan testing.

## 11. Evidence utama

- KMK HK.01.07/Menkes/84/2026 — CKG, kelompok usia, domain pemeriksaan, age/risk trigger, dan algoritme tindak lanjut. 
- KMK HK.01.07/MENKES/2015/2023 — integrasi pelayanan primer dan pelayanan Catin/lansia.
- Permenkes No. 3 Tahun 2026 — kerangka penanggulangan penyakit dan imunisasi siklus hidup.
- SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026 — standar lokal dan governance pelayanan.

**Catatan:** Matrix v0.5 adalah artefak governance/analysis untuk menyiapkan RME, bukan pengganti pedoman klinis atau SOP tenaga kesehatan.
