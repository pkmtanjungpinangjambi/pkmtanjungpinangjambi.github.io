# CHECKPOINT — KLASTER 3 STAGE 2 RAW 55 MAPPING v0.3

Tanggal: 31 Agustus 2026  
Issue: #162 — Klaster 3 Tahap 2 — Validasi Skrining Dewasa/PTM 2026  
Parent checkpoint: `CHECKPOINT-KLASTER-3-STAGE2-VALIDATION-v0.2-2026-08-31.md`  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Status
Audit seluruh Raw Registry 55 untuk menentukan pemetaan primer, komponen CKG lintas-klaster, dan row yang masih membutuhkan governance/SOP. Belum coding RME dan belum merge ke `main`.

## Temuan penting
1. Raw Registry memang berisi **55 instrumen**, termasuk **AD-8 INA sebagai nomor 52**. Catatan lama yang menyebut AD-8 tidak ada di Raw 55 dikoreksi.
2. Raw name tetap dipertahankan; tidak membuat SCR baru.
3. CKG 2026 adalah gateway layanan skrining menurut siklus hidup. Komponen CKG dapat lintas-klaster tanpa membuat duplikasi registry.
4. Untuk TB, malaria, dan skrining penyakit menular, primary pathway tetap Klaster 4; bila komponen yang sama dipakai sebagai bagian CKG dewasa/anak, integrasi dilakukan melalui shared data/reference, bukan membuat SCR baru.

## Mapping Raw 55 — preliminary governance map

| No | Nama Raw Registry | Pemetaan Primer | Hubungan Klaster 3/CKG | Status |
|---:|---|---|---|---|
| 1 | Skrining Gejala TBC dan Penyakit Pernapasan Lainnya | Klaster 4 | CKG dewasa memuat TB; gunakan sebagai komponen lintas-klaster/shared assessment, hindari duplikasi | CROSS-CLUSTER / REVIEW IMPLEMENTASI |
| 2 | Skrining Perilaku Merokok pada Anak Usia Sekolah dan Remaja | Klaster 2 | CKG sekolah; bukan default Klaster 3 dewasa | OUTSIDE K3 |
| 3 | Skrining Kekerasan pada Perempuan (WAST) | Klaster 2 | Jalur perlindungan/kesehatan ibu-perempuan; bukan default K3 | OUTSIDE K3 |
| 4 | Skrining PUMA | Klaster 3 | Komponen PPOK CKG; usia dewasa sesuai paket CKG, PPOK mulai usia 40 | LOCKED-CONDITIONAL |
| 5 | Skrining Lansia Sederhana (SKILAS) | Klaster 3 | Core geriatri CKG ≥60 | LOCKED — PHASE 1 |
| 6 | Skrining ADL dengan Instrumen Indeks Barthel Modifikasi | Klaster 3 | Core geriatri CKG ≥60 | LOCKED — PHASE 1 |
| 7 | Skrining Mini COG | Klaster 3 | Cascade bila ada gangguan kognitif | CONDITIONAL |
| 8 | Skrining Rapuh / Frailty Syndrome | Klaster 3 | Cascade bila ada gangguan SKILAS | CONDITIONAL |
| 9 | Skrining Abbreviated Mental Test | Klaster 3 | Bukan default cascade 2026; perlu keputusan owner/PJ | REVIEW KHUSUS |
| 10 | Skrining SPPB | Klaster 3 | Cascade bila gangguan mobilitas | CONDITIONAL |
| 11 | Skrining Short-Form MNA | Klaster 3 | Cascade bila gangguan nutrisi | CONDITIONAL |
| 12 | Skrining GDS-4 | Klaster 3 | Cascade bila gejala depresi | CONDITIONAL |
| 13 | Skrining Thalasemia | Klaster 2 | Tidak menjadi paket default K3 | OUTSIDE K3 |
| 14 | Skrining Obesitas | Klaster 3 | Status gizi dalam gateway CKG dewasa/lansia | LOCKED |
| 15 | Skrining Diabetes Melitus | Klaster 3 | Gula darah dalam gateway CKG; follow-up terpisah bila sakit | LOCKED |
| 16 | Skrining Hipertensi | Klaster 3 | Tekanan darah dalam gateway CKG; monitoring penyakit visit-based | LOCKED |
| 17 | Skrining Kesehatan Penglihatan | Klaster 3 | Mata dalam gateway CKG; >40 katarak follow-up sesuai alur | LOCKED |
| 18 | Skrining Kanker Kolorektal | Klaster 3 | Usia ≥45; APCS → cascade sesuai risiko | LOCKED-CONDITIONAL |
| 19 | Skrining Layak Hamil | Klaster 2 | Bukan default K3 | OUTSIDE K3 |
| 20 | Skrining Malaria | Klaster 4 | Penyakit menular; bukan default K3 | OUTSIDE K3 |
| 21 | Skrining Risiko Kanker Payudara | Klaster 3 | Perempuan ≥30 dalam paket CKG | LOCKED |
| 22 | SDQ Usia ≥6–<11 | Klaster 2 | CKG sekolah/anak; bukan K3 | OUTSIDE K3 |
| 23 | SDQ ≥11–<18 | Klaster 2 | CKG sekolah/remaja; bukan K3 | OUTSIDE K3 |
| 24 | Skrining Anemia | Klaster 2 / program terkait | Sasaran dan momen perlu ditentukan dari SOP; bukan default K3 | OUTSIDE K3 / REVIEW |
| 25 | Skrining Pre Eklamsia | Klaster 2 | Kehamilan/ANC | OUTSIDE K3 |
| 26 | Skrining Self-Reporting Questionnaire-29 | Klaster 3 | Domain kesehatan jiwa; instrumen tidak ditetapkan sebagai default CKG 2026 | REVIEW |
| 27 | Skrining Risiko Kanker Paru | Klaster 3 | Usia ≥45 + risk assessment | LOCKED-CONDITIONAL |
| 28 | Skrining Risiko Penyakit Jantung | Klaster 3 | ≥40 + hipertensi dan/atau DM | LOCKED-CONDITIONAL |
| 29 | Skrining Risiko Stroke | Klaster 3 | ≥40 + hipertensi dan/atau DM | LOCKED-CONDITIONAL |
| 30 | Skrining Penapisan Kehamilan Pasien KB | Klaster 2 | Konteks pelayanan KB/kehamilan | OUTSIDE K3 |
| 31 | Skrining Gigi & Mulut Balita | Klaster 2 | CKG balita | OUTSIDE K3 |
| 32 | Skrining Gigi & Mulut Anak Sekolah & Remaja | Klaster 2 | CKG sekolah | OUTSIDE K3 |
| 33 | Skrining Imunisasi Anak Sekolah & Remaja | Klaster 2 | CKG sekolah/siklus hidup | OUTSIDE K3 |
| 34 | Skrining Kebugaran - Dewasa | Klaster 3 | Aktivitas fisik CKG; tes kebugaran 6 bulanan bila trigger terpenuhi | CONDITIONAL |
| 35 | Skrining WHO - ASSIST V3.1 | Klaster 3 / lintas perilaku | Belum dibuktikan sebagai instrumen default CKG 2026 | REVIEW |
| 36 | Skrining Gigi Dewasa | Klaster 3 | Gigi-mulut dalam gateway CKG dewasa | LOCKED |
| 37 | Skrining Gigi Lansia | Klaster 3 | Gigi-mulut untuk lansia; harus dipetakan bersama gateway CKG ≥60 | LOCKED-CONDITIONAL |
| 38 | Skrining Risiko Kanker Serviks | Klaster 3 | Perempuan ≥30 + menikah/pernah hubungan seksual; interval mengikuti hasil sebelumnya | LOCKED-CONDITIONAL |
| 39 | Skrining Indra Pendengaran | Klaster 3 | Telinga dalam gateway CKG | LOCKED |
| 40 | Skrining Imunisasi Dewasa | Klaster 3 | Schedule/catch-up, bukan annual universal | LOCKED-EVENT |
| 41 | Skrining SDIDTK | Klaster 2 | Anak | OUTSIDE K3 |
| 42 | SHK (Skrining Hipotiroid Kongenital) | Klaster 2 | Bayi baru lahir | OUTSIDE K3 |
| 43 | Skrining Penyakit Jantung Bawaan (PJB) | Klaster 2 | Bayi/anak sesuai siklus hidup | OUTSIDE K3 |
| 44 | Skrining Kelainan Empedu Bayi | Klaster 2 | Bayi | OUTSIDE K3 |
| 45 | Skrining Kesehatan Jiwa Dewasa dan Lansia (PHQ-4) | Klaster 3 | Evidence nasional tersedia; implementasi lokal menunggu SOP/otorisasi aktif | NATIONAL-EVIDENCE / LOCAL-SOP PENDING |
| 46 | Skrining Mini MindHEAR Youth Scale V.1 | Klaster 2 | Anak/remaja | OUTSIDE K3 |
| 47 | Skrining Kesehatan Jiwa Ibu Hamil dan Nifas (EPDS) | Klaster 2 | Ibu hamil/nifas | OUTSIDE K3 |
| 48 | Skrining Sirosis / Fibrosis Hati | Klaster 3 | Hepatitis B/C dan/atau >40 + DM/obesitas sentral/dislipidemia | LOCKED-CONDITIONAL |
| 49 | Skrining Faktor Risiko | Lintas-klaster / governance review | Nama terlalu generik; jangan dianggap instrumen CKG tunggal sebelum sumber/SOP ditemukan | REVIEW |
| 50 | Skrining Perkembangan Anak | Klaster 2 | Anak | OUTSIDE K3 |
| 51 | Skrining Fungsi Ginjal | Klaster 3 | ≥40 + hipertensi dan/atau DM | LOCKED-CONDITIONAL |
| 52 | Skrining AD-8 INA | Klaster 3 | **Memang ada di Raw 55**; dipakai sebagai cascade kognitif bersama Mini-Cog bila ada gangguan | CONDITIONAL / CORRECTED |
| 53 | Skrining Calon Pengantin | Klaster 3 / Catin pathway | Komponen dewasa/Catin pada CKG; momentum event/pre-marital, bukan annual universal | EVENT-BASED |
| 54 | Skrining TBC Balita dan Anak Pra Sekolah | Klaster 4 | Penyakit menular; CKG balita dapat memakai shared TB assessment | CROSS-CLUSTER / OUTSIDE K3 PRIMARY |
| 55 | Skrining Hiperplasia Adrenal Kongenital (HAK) | Klaster 2 | Bayi baru lahir | OUTSIDE K3 |

## Keputusan Klaster 3 untuk langkah berikutnya
### Core / locked
SCR-005, 006, 014, 015, 016, 017, 021, 036, 039, 040.

### Locked-conditional
SCR-004, 018, 027, 028, 029, 037, 038, 048, 051, serta SCR-052 AD-8 sebagai cascade yang memang sudah ada di raw.

### Conditional / review
SCR-007, 008, 009, 010, 011, 012, 026, 034, 035, 045, 049.

### Event-based
SCR-040 imunisasi dewasa dan SCR-053 Catin, dengan momentum pelayanan berbeda.

### Cross-cluster shared assessment
SCR-001 dan SCR-054 TB anak/pernapasan serta komponen lain yang secara clinical pathway primer berada di Klaster 4 tetapi dapat digunakan dalam CKG.

## Koreksi terhadap checkpoint sebelumnya
- **AD-8 bukan guidance delta yang tidak ada di Raw 55.** Raw Registry 55 menunjukkan nomor 52 adalah `Skrining AD-8 INA`.
- Karena itu keputusan yang benar: **tidak membuat SCR baru**, tetapi mempertahankan SCR-052 dan menghubungkannya sebagai cascade kognitif sesuai guidance.
- Guidance delta tetap berlaku untuk **IADL Lawton** dan **SARC-CalF** karena keduanya memang tidak tercantum dalam Raw Registry 55.

## Rule engine implication
`Pasien → usia → status/riwayat CKG → gateway CKG → komponen age/risk/conditional → hasil → cascade → treatment/education/referral → follow-up → indicator`.

Untuk komponen lintas-klaster, gunakan shared clinical data/reference bila memungkinkan; jangan menggandakan instrumen hanya karena muncul pada lebih dari satu pathway.

## Evidence utama
- Raw Registry 55 dari Library proyek. Nama dan nomor instrumen dipertahankan sesuai source registry. 
- Kepmenkes HK.01.07/Menkes/84/2026: CKG terintegrasi dengan pelayanan Puskesmas, mencakup dewasa 18–59 dan lansia ≥60 serta paket pemeriksaan sesuai siklus hidup. citeturn116473search25turn116473search1
- Permenkes 19/2024: Penyelenggaraan Puskesmas, status berlaku. citeturn116473search0
- Permenkes 3/2026: imunisasi rutin mengikuti siklus hidup, termasuk dewasa dan lansia, serta catch-up immunization. citeturn715177search4
- Juknis CKG 2026 menunjukkan PPOK memakai skor PUMA, kanker usus memakai APCS, dan tindak lanjut berbasis hasil/risk. citeturn715177search12

## Next gate
1. Validasi owner/PJ dan SOP lokal untuk row REVIEW dan NATIONAL-EVIDENCE / LOCAL-SOP PENDING.
2. Susun Master Screening Matrix v0.5 dengan seluruh row Klaster 3 yang relevan, termasuk SCR-004, 037, 052, 053 dan cross-cluster flags.
3. Tentukan indikator/monev yang benar-benar terhubung dengan data RME.
4. Baru desain rule engine final dan UI RME Klaster 3.

## Git safety
- Checkpoint hanya disimpan pada branch `checkpoint/klaster3-stage2-matrix-2026-08-31`.
- `main` tidak diubah.
- Belum merge.
