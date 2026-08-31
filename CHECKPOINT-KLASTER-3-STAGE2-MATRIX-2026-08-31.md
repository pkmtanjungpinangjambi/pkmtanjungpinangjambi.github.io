# CHECKPOINT — KLASTER 3 STAGE 2 MASTER SCREENING MATRIX 2026

Tanggal: 31 Agustus 2026
Issue: #162 — Klaster 3 Tahap 2 — Validasi Skrining Dewasa/PTM 2026
Base branch asal: `fix/klaster3-regulatory-2026-08-31`
Checkpoint branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Status
Row-level validation v0.1. Belum masuk coding RME. Belum merge ke `main`.

## Arsitektur yang dikunci
1. CKG dewasa/lansia menjadi gateway skrining tahunan.
2. CKG dewasa/lansia dilaksanakan 1 kali per tahun.
3. Skrining PTM, skrining lansia, dan skrining kesehatan jiwa tidak diperlakukan sebagai paket tahunan terpisah; bila datang untuk skrining tersebut, jalurnya adalah CKG lengkap.
4. Frekuensi follow-up/monitoring penyakit tidak boleh disamakan dengan frekuensi CKG.
5. Kategori momentum: `annual/age-based`, `risk-based`, `conditional/triggered`, `visit/clinical-indication based`, `event/schedule based`, `program/assessment based`.
6. Raw Registry 55 tetap terkunci; tidak membuat SCR baru tanpa governance decision.

## Koreksi penting dari Juknis CKG 2026
- Risiko stroke, penyakit jantung, dan penyakit ginjal mulai usia 40 tahun **pada penyandang hipertensi dan/atau diabetes melitus**, bukan universal untuk semua usia 40+.
- Kanker paru dan kanker usus mulai usia **45 tahun**.
- Kanker payudara: perempuan mulai usia 30 tahun.
- Kanker leher rahim: perempuan mulai usia 30 tahun yang telah menikah atau pernah melakukan hubungan seksual, dengan interval pemeriksaan mengikuti hasil tahun sebelumnya.
- Gigi periodontal mulai usia 25 tahun di dalam pemeriksaan gigi dan mulut.
- Mata: skrining katarak dilanjutkan pada usia >40 tahun.

## Master Screening Matrix — Row Lock v0.1

| ID | Skrining | Sasaran | Trigger | Frekuensi | Instrumen/Metode | Output | Cascade/Tindak lanjut | Indikator | Status |
|---|---|---|---|---|---|---|---|---|---|
| SCR-014 | Obesitas | Dewasa/lansia | CKG gateway | Annual CKG | TB, BB, IMT, lingkar perut | Status gizi/obesitas | Edukasi, konseling gizi/aktivitas, tata laksana sesuai hasil | Pending: indikator lokal | LOCKED |
| SCR-015 | Diabetes Melitus | Dewasa/lansia | CKG gateway | Annual CKG; follow-up sesuai hasil | GDS; usia >=40 dapat GDP | Normal/prediabetes/DM sesuai algoritme | Ulang pemeriksaan pada hari sama bila trigger; tata laksana/monitoring sesuai hasil | Pending: indikator lokal | LOCKED |
| SCR-016 | Hipertensi | Dewasa/lansia | CKG gateway | Annual CKG; monitoring pasien sakit tetap visit-based | Tensimeter | Normal/prehipertensi/HT sesuai algoritme | Ulang 2x bila pengukuran awal >=140/90; tata laksana/rujuk sesuai derajat | Pending: indikator lokal | LOCKED |
| SCR-017 | Kesehatan Penglihatan | Dewasa/lansia | CKG gateway; cataract age trigger >40 | Annual CKG | Visus + pinhole; >40 skrining katarak | Normal/gangguan penglihatan | Pinhole/refraksi/lanjutan sesuai hasil; rujuk bila tidak dapat ditangani | Pending: indikator lokal | LOCKED |
| SCR-018 | Kanker Kolorektal/Usus | Dewasa >=45 | CKG + age gate | Annual CKG assessment; tindak lanjut sesuai risiko/hasil | APCS; risiko tinggi -> colok dubur + FOBT | Risiko APCS normal/rendah/tinggi | Pemeriksaan lanjutan/rujuk sesuai hasil dan risiko | Pending: indikator lokal | LOCKED |
| SCR-021 | Risiko Kanker Payudara | Perempuan >=30 | CKG + sex/age gate | Annual CKG context; cascade mengikuti hasil | SADANIS; USG payudara di fasyankes mampu | Normal/benjolan/curiga; USG normal/kista/simplex/non-simplex | Edukasi; USG bila perlu; rujuk FPKTL bila indikasi | Pending: indikator lokal | LOCKED |
| SCR-026 | SRQ-29 | Dewasa/lansia sesuai pathway keswa | Mental-health pathway; instrumen raw belum dibuktikan sebagai default CKG | Pending SOP aktif | SRQ-29 belum ditetapkan default oleh Juknis CKG 2026 | Pending | Gunakan instrumen/algoritme yang ditetapkan SOP aktif | Pending | REVIEW |
| SCR-027 | Risiko Kanker Paru | Dewasa >=45 | CKG + age/risk | Annual CKG assessment | Kuesioner risiko; X-ray dada bagi peserta berisiko di faskes mampu | Risiko kanker paru | Anamnesis/kuesioner; X-ray bila berisiko; tindak lanjut/rujuk sesuai hasil | Pending: indikator lokal | LOCKED* |
| SCR-028 | Risiko Penyakit Jantung | >=40 + hipertensi dan/atau DM | CKG + age + clinical condition | Annual CKG bila eligible; monitoring klinis tetap visit-based | EKG | Hasil/temuan EKG | Evaluasi klinis, tata laksana/rujuk sesuai hasil | Pending: indikator lokal | LOCKED* |
| SCR-029 | Risiko Stroke | >=40 + hipertensi dan/atau DM | CKG + age + clinical condition | Annual CKG bila eligible | Profil lipid | Profil lipid/risk finding | Evaluasi faktor risiko kardiovaskular dan tindak lanjut sesuai hasil | Pending: indikator lokal | LOCKED* |
| SCR-034 | Kebugaran Dewasa | Dewasa/lansia sesuai program/pathway | Activity-related/program assessment | Assessment; bukan annual default sebelum SOP lokal dikunci | Kuesioner/tes kebugaran sesuai instrumen aktif | Status kebugaran | Edukasi aktivitas; tes kebugaran 6 bulanan disebut pada algoritme CKG setelah aktivitas fisik kurang | Pending instrumen lokal | REVIEW/CONDITIONAL |
| SCR-035 | WHO-ASSIST V3.1 | Dewasa/lansia sesuai indikasi | Risk/behavior based | Tidak annual universal | WHO-ASSIST belum ditetapkan sebagai instrumen default CKG 2026 | Pending | Ikuti SOP/pedoman aktif dan hasil skrining perilaku | Pending | REVIEW |
| SCR-036 | Gigi Dewasa | Dewasa/lansia | CKG gateway | Annual CKG context | Pemeriksaan karies, gigi goyang/hilang; periodontal mulai usia 25 | Status gigi/mulut | Tata laksana di Puskesmas/FPKTP dan rujuk bila perlu | Pending: indikator lokal | LOCKED |
| SCR-038 | Risiko Kanker Serviks | Perempuan >=30, menikah/pernah hubungan seksual | CKG + sex/age/sexual-history gate + prior result | Interval berdasarkan hasil sebelumnya; bukan annual universal | Inspekulo + HPV DNA/IVA sesuai kapasitas dan riwayat hasil | HPV/IVA/inspekulo status | Interval 10 tahun/3 tahun/1 tahun sesuai hasil tertentu; ablasi/rujuk sesuai lesi | Pending: indikator lokal | LOCKED |
| SCR-039 | Indra Pendengaran | Dewasa/lansia | CKG gateway | Annual CKG context | Otoskop + tes bisik modifikasi/aplikasi | Normal/curiga gangguan | Otoskopi/penala dan rujuk bila ditemukan gangguan | Pending: indikator lokal | LOCKED |
| SCR-040 | Imunisasi Dewasa | Dewasa/lansia | Jadwal/catch-up/event | Schedule-based | Verifikasi status imunisasi + jenis antigen/jadwal | Status lengkap/tidak lengkap/need dose | Imunisasi rutin/catch-up/tambahan sesuai ketentuan | Pending indikator program | LOCKED |
| SCR-045 | PHQ-4 | Dewasa/lansia sesuai pathway keswa | Mental-health pathway; instrumen raw belum dibuktikan sebagai default CKG | Pending SOP aktif | PHQ-4 belum ditetapkan default oleh Juknis CKG 2026 | Pending | Gunakan instrumen/algoritme SOP aktif | Pending | REVIEW |
| SCR-048 | Fibrosis/Sirosis Hati | Dewasa/lansia dengan trigger/faktor risiko hati | Risk-based | CKG assessment; follow-up sesuai hasil | Kuesioner risiko; SGOT + trombosit; APRI | Faktor risiko hati/APRI | Faktor risiko positif -> lab sesuai faktor risiko; APRI >0,5 rujuk; APRI <0,5 edukasi + CKG tahun depan | Pending: indikator lokal | LOCKED |
| SCR-051 | Fungsi Ginjal | >=40 + hipertensi dan/atau DM | CKG + age + clinical condition | Annual CKG bila eligible; monitoring CKD tetap visit-based | Ureum/kreatinin untuk eLFG dan/atau rasio albumin-kreatinin urin | eLFG/ACR/temuan ginjal | Tindak lanjut sesuai hasil penyakit ginjal dan standar klinis | Pending: indikator lokal | LOCKED* |

`*` LOCKED untuk klasifikasi/gateway, tetapi threshold/algoritme tindak lanjut detail harus tetap mengikuti SOP/pedoman aktif dan tidak di-hard-code melebihi evidence.

## Row yang belum boleh di-hard-code sebagai instrumen default CKG
- SCR-026 SRQ-29
- SCR-035 WHO-ASSIST V3.1
- SCR-045 PHQ-4
- SCR-034 Kebugaran Dewasa (instrumen/frekuensi lokal perlu SOP aktif)

Catatan: Juknis CKG 2026 memang memuat domain kesehatan jiwa dan aktivitas fisik. Namun dokumen tersebut tidak menjadikan empat nama instrumen raw di atas sebagai default instrumen RME Puskesmas. Karena itu status tetap REVIEW/CONDITIONAL.

## Rule Engine baseline

`Pasien -> usia -> riwayat CKG -> eligibility CKG -> paket usia -> hasil -> trigger/cascade -> tatalaksana/edukasi/rujuk -> follow-up -> indikator`

Untuk lansia, baseline Tahap 1 tetap:
`SKILAS + ADL -> Mini-Cog/AD-8 atau SPPB atau MNA-SF atau GDS-4 sesuai gangguan -> IADL Lawton seluruh lansia -> frailty/SARC-CalF bila gangguan SKILAS.`

## Guardrails
- Jangan membuat semua row menjadi "setiap kunjungan".
- Jangan membuat semua row menjadi "1x/tahun" hanya karena CKG annual.
- Jangan membuat modul skrining PTM berdiri sendiri yang menduplikasi CKG.
- Pisahkan screening, diagnosis, treatment, dan monitoring.
- Jangan menambah SCR baru tanpa governance decision.
- Data individual RME tetap internal dan berwenang.

## Sumber utama
1. KMK HK.01.07/Menkes/84/2026 — Petunjuk Teknis Cek Kesehatan Gratis.
2. KMK HK.01.07/MENKES/2015/2023 — Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer.
3. Permenkes No. 3 Tahun 2026 — Penanggulangan Penyakit, termasuk imunisasi program/rutin/catch-up dan siklus hidup.

## Next step setelah checkpoint
1. Validasi kolom `indikator` dan `SOP aktif` untuk setiap row.
2. Validasi instrumen raw 55 yang belum terpetakan.
3. Finalisasi Master Screening Matrix v0.5.
4. Baru desain rule engine RME dan UI Klaster 3.

## Git safety
- `main` tidak diedit langsung pada checkpoint ini.
- Checkpoint disimpan pada branch khusus.
- Belum merge.
