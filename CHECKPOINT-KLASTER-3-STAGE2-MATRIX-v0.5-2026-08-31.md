# CHECKPOINT — KLASTER 3 STAGE 2 MATRIX v0.5

Tanggal: 31 Agustus 2026  
Issue: #162  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`  
Parent: `CHECKPOINT-KLASTER-3-STAGE2-RAW55-MAPPING-v0.3-2026-08-31`

## Status
**MASTER SCREENING MATRIX KLASTER 3 v0.5 — BUILD GATE COMPLETE**

Matrix v0.5 telah disusun sebagai baseline governance untuk menurunkan rule engine RME. Belum merupakan SOP klinis final dan belum digunakan untuk mengubah workflow produksi.

## Yang berhasil dikunci

1. Raw Registry tetap 55 instrumen dan nama/ID tidak diubah.
2. CKG 2026 menjadi gateway berdasarkan siklus hidup; CKG dewasa/lansia dilakukan tahunan.
3. Screening, diagnosis, treatment, dan monitoring dipisahkan.
4. Momentum dibedakan menjadi annual/age-based, risk-based, conditional, event/schedule-based, dan assessment/program-based.
5. SCR-004 PUMA, SCR-037 Gigi Lansia, SCR-052 AD-8 INA, dan SCR-053 Catin kini terpetakan ke Klaster 3.
6. SCR-052 AD-8 dikoreksi sebagai instrumen existing Raw 55, bukan guidance delta baru.
7. SCR-049 Faktor Risiko tetap REVIEW karena definisi instrumen belum spesifik.
8. TB lintas-klaster menggunakan shared assessment/reference; primary pathway penyakit menular tetap Klaster 4.
9. Indikator operasional RME diberi label `OPERATIONAL-CANDIDATE`, bukan diklaim sebagai indikator nasional.
10. SOP lokal cukup untuk mengunci arsitektur pelayanan, tetapi belum cukup untuk hard-code seluruh instrumen individual.

## Koreksi penting

- Risiko jantung, stroke, dan fungsi ginjal: **≥40 tahun + hipertensi dan/atau DM**, bukan universal usia ≥40.
- PPOK: mulai **≥40 tahun**.
- Kanker payudara: perempuan **≥30 tahun**.
- Kanker serviks: perempuan **≥30 tahun yang telah menikah/pernah hubungan seksual**, interval mengikuti hasil sebelumnya.
- Kanker paru dan kanker usus: mulai **≥45 tahun**.
- Catin adalah event-based/pre-marital; lansia tidak mendapat komponen Catin.
- Imunisasi dewasa adalah schedule/catch-up based, bukan annual universal.

## Local service-standard alignment

SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026 menetapkan Klaster 3 sebagai Dewasa dan Lansia. Standar CKG lokal memuat alur: pendaftaran → verifikasi identitas → skrining awal → pemeriksaan sesuai kelompok usia → edukasi hasil → rujukan/tindak lanjut bila diperlukan → pulang. Pengawasan CKG dilakukan oleh Kepala Puskesmas, PJ Program CKG, Tim Mutu, dan PJ Klaster.

Regulasi lokal digunakan untuk governance dan standar pelayanan. Clinical algorithm tetap mengikuti pedoman nasional yang berlaku, terutama KMK HK.01.07/Menkes/84/2026.

## Artefak utama

- `MASTER-SCREENING-MATRIX-KLASTER-3-v0.5-2026-08-31.md`
- `CHECKPOINT-KLASTER-3-STAGE2-RAW55-MAPPING-v0.3-2026-08-31.md`
- `CHECKPOINT-KLASTER-3-STAGE2-VALIDATION-v0.2-2026-08-31.md`
- `CHECKPOINT-KLASTER-3-STAGE2-SOP-INDICATOR-GATE-v0.4-2026-08-31.md`

## Git safety

- `main` tidak disentuh langsung.
- Semua pekerjaan berada pada branch checkpoint.
- Branch checkpoint belum boleh di-merge sebelum governance review dan QC selesai.
- `main` dan checkpoint branch sempat divergen karena merge PR #161 masuk ke main; penyelesaian divergensi ditunda sampai matrix final agar tidak terjadi merge prematur.

## Next gate

**NEXT = Governance Review / final row lock**

Fokus:
1. Review row `REVIEW` dan `LOCAL-SOP PENDING`.
2. Pastikan owner/PJ menerima instrumen dan trigger masing-masing.
3. Validasi definisi indikator operasional dengan Tim Mutu.
4. Setelah disetujui, freeze Matrix v0.5.
5. Baru turunkan menjadi rule engine JSON dan UI RME.

## Prinsip penghentian sementara

Tidak ada coding rule engine sampai Matrix disetujui secara governance. Ini mencegah website membuat keputusan klinis dari asumsi yang belum disahkan.

## Evidence

- KMK HK.01.07/Menkes/84/2026 tentang Petunjuk Teknis Cek Kesehatan Gratis.
- KMK HK.01.07/MENKES/2015/2023 tentang Petunjuk Teknis Integrasi Pelayanan Kesehatan Primer.
- Permenkes No. 3 Tahun 2026 tentang Penanggulangan Penyakit.
- SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026 tentang Standar Pelayanan.
