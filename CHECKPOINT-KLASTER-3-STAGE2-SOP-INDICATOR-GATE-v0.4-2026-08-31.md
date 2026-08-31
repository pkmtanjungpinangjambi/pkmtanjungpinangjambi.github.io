# CHECKPOINT — KLASTER 3 STAGE 2 SOP + INDICATOR GATE v0.4

Tanggal: 31 Agustus 2026  
Issue: #162 — Klaster 3 Tahap 2 — Validasi Skrining Dewasa/PTM 2026  
Parent: `CHECKPOINT-KLASTER-3-STAGE2-RAW55-MAPPING-v0.3-2026-08-31.md`  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Status
Gate validasi SOP lokal dan indikator. Belum coding RME, belum mengubah halaman website, belum merge ke `main`.

## Bukti lokal yang berhasil diverifikasi
Dokumen `SK Kepala UPTD Puskesmas Tanjung Pinang Nomor 39 Tahun 2026 tentang Standar Pelayanan` menetapkan Klaster 3 sebagai **Klaster Usia Dewasa dan Lanjut Usia**.

Untuk pelayanan dewasa, standar lokal mencantumkan anamnesis/pemeriksaan awal, TB/BB/lingkar perut/suhu, pemeriksaan dokter, laboratorium, resep, konseling, serta dukungan UBM, gizi, sanitasi dan DOT. Peralatan yang disebut antara lain tensimeter, stetoskop, termometer, timbangan, alat ukur tinggi badan, POCT/peralatan laboratorium.

Untuk pelayanan lansia, standar lokal juga menetapkan alur pemeriksaan, laboratorium, resep, konseling, dan tindak lanjut.

Untuk pelayanan CKG, standar lokal menetapkan alur:
`Pendaftaran -> Verifikasi Identitas -> Skrining Awal -> Pemeriksaan sesuai kelompok usia -> Edukasi hasil -> Rujukan/Tindak Lanjut bila diperlukan -> Pulang`.

Standar lokal CKG juga mencantumkan pengawasan oleh Kepala Puskesmas, Penanggung Jawab Program CKG, Tim Mutu, dan PJ Klaster melalui monitoring dan evaluasi berkala; evaluasi kinerja dilakukan melalui Lokakarya Mini Bulanan, Rapat Tinjauan Manajemen 2 kali/tahun, pengawasan Kepala Puskesmas, dan survei kepuasan masyarakat.

## Keputusan SOP gate
1. **Architecture LOCKED:** pelayanan Klaster 3 Dewasa/Lansia dan CKG memang merupakan bagian resmi dari standar pelayanan UPTD Puskesmas Tanjung Pinang.
2. **Row-level SOP NOT YET LOCKED:** dokumen Standar Pelayanan 2026 belum cukup untuk menetapkan SOP rinci setiap instrumen Raw 55 (misalnya frekuensi spesifik, versi instrumen, threshold klinis, dan detail cascade) bila detail tersebut tidak tercantum di pedoman/SOP aktif.
3. **No hard-code beyond evidence:** RME hanya boleh mengotomatisasi rule yang sudah memiliki evidence nasional + keputusan governance/SOP lokal yang memadai.
4. **Local implementation gate:** row berstatus `REVIEW` atau `NATIONAL-EVIDENCE / LOCAL-SOP PENDING` tetap ditahan sampai SOP/otorisasi aktif diverifikasi.

## Indicator framework
### A. Indikator program/eksternal — evidence-supported
- Cakupan lansia yang mendapatkan skrining kesehatan sesuai standar.
- Cakupan pelaksanaan CKG sesuai kelompok sasaran/ketentuan program.

### B. Indikator operasional RME — CANDIDATE, belum governance-locked
- Persentase peserta eligible yang menyelesaikan paket CKG.
- Kelengkapan field wajib pada encounter CKG.
- Persentase trigger positif yang memiliki cascade/tindak lanjut tercatat.
- Persentase rujukan yang memiliki status tindak lanjut/rujuk balik.
- Persentase data skrining yang dapat ditelusuri ke tanggal, petugas, hasil, dan tindak lanjut.

Indikator operasional di atas **bukan indikator nasional yang otomatis berlaku**; statusnya hanya kandidat desain RME sampai ditetapkan oleh PJ/Tim Mutu.

## Current row implications
- SCR-014, 015, 016, 017, 036, 039: gateway CKG dapat dipertahankan.
- SCR-018, 021, 027, 028, 029, 037, 038, 048, 051: tetap conditional/age/risk gated.
- SCR-004 PUMA: dipertahankan sebagai komponen PPOK conditional.
- SCR-040 Imunisasi: event/schedule based.
- SCR-045 PHQ-4: national evidence tersedia, local SOP pending.
- SCR-026 SRQ-29 dan SCR-035 WHO-ASSIST: review.
- SCR-049 Faktor Risiko: review karena label generik.
- SCR-052 AD-8 INA: existing raw instrument; conditional cascade kognitif, tidak membuat SCR baru.
- SCR-053 Catin: event-based/pre-marital pathway, tidak annual universal.
- SCR-001/SCR-054 TB: primary Klaster 4/shared CKG component, hindari duplikasi registry.

## Sources
- SK Kepala UPTD Puskesmas Tanjung Pinang No. 39 Tahun 2026, Standar Pelayanan (Library: `1.a.Ak SK STANDAR PELAYANAN 2026.pdf`).
- KMK HK.01.07/Menkes/84/2026 — Petunjuk Teknis Cek Kesehatan Gratis: https://jdih.kemkes.go.id/storage/documents/pdfs/2026kepmenkes084.pdf
- Permenkes No. 12 Tahun 2025 — Renstra Kementerian Kesehatan 2025–2029: https://jdih.kemkes.go.id/storage/documents/pdfs/2025permenkes012.pdf

## Next gate
1. Verifikasi SOP/IK/versi instrumen lokal untuk row `REVIEW` dan `LOCAL-SOP PENDING`.
2. Finalisasi indikator yang benar-benar akan menjadi field/dashboard RME.
3. Gabungkan hasil ini ke Master Screening Matrix v0.5.
4. Lakukan architecture review sebelum rule engine dan UI RME dibuat.

## Git safety
- Hanya dokumentasi checkpoint pada branch khusus.
- `main` tidak diubah.
- Belum merge.
