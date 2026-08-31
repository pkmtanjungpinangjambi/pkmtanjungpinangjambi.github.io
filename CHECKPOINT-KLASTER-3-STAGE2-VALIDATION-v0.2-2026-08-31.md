# CHECKPOINT — KLASTER 3 STAGE 2 VALIDATION v0.2

Tanggal: 31 Agustus 2026
Issue: #162 — Klaster 3 Tahap 2 — Validasi Skrining Dewasa/PTM 2026
Parent checkpoint: `CHECKPOINT-KLASTER-3-STAGE2-MATRIX-2026-08-31.md`
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Status
Row-level validation diperbarui berdasarkan pembacaan Juknis CKG 2026. Belum coding RME dan belum merge ke `main`.

## Evidence yang berhasil dikunci
1. CKG diberikan 1 kali per tahun dan terintegrasi dengan pelayanan Puskesmas/FKTP. Skrining Lansia dan skrining kesehatan jiwa tidak diperlakukan sebagai paket skrining terpisah; bila dilakukan sebagai skrining tersebut, jalurnya CKG lengkap.
2. Paket dewasa mencakup merokok, aktivitas fisik, status gizi, tekanan darah, gula darah, risiko stroke, penyakit jantung, penyakit ginjal, TB, PPOK, kanker, mata, telinga, gigi-mulut, kesehatan jiwa, hepatitis B/C, fibrosis/sirosis, Catin, dan kulit.
3. Risiko stroke, penyakit jantung, dan penyakit ginjal mulai usia 40 tahun pada penyandang hipertensi dan/atau DM.
4. PPOK mulai usia 40 tahun.
5. Kanker payudara perempuan mulai usia 30 tahun.
6. Kanker leher rahim perempuan mulai usia 30 tahun yang telah menikah atau pernah melakukan hubungan seksual.
7. Kanker paru dan kanker usus mulai usia 45 tahun.
8. Fibrosis/sirosis hati ditujukan pada penyandang Hepatitis B dan/atau Hepatitis C dan/atau usia >40 tahun dengan DM dan/atau obesitas sentral dan/atau dislipidemia.
9. Metode dewasa yang eksplisit: status gizi menggunakan TB, BB, IMT, lingkar perut; tekanan darah dengan pengukuran ulang bila pengukuran pertama >=140/90; GDS menggunakan glukometer dan usia >=40 dapat dilakukan GDP; risiko stroke menggunakan profil lipid; penyakit jantung menggunakan EKG; fungsi ginjal memakai ureum-kreatinin untuk eLFG dan/atau ACR urin; TB memakai kuesioner, X-ray pada faskes mampu, dan dahak bagi terduga; PPOK memakai PUMA PPOK; kanker payudara memakai SADANIS dan USG bila tersedia; kanker serviks memakai riwayat hasil, inspekulo, DNA HPV/IVA sesuai alur; kanker paru memakai kuesioner risiko dan X-ray bagi peserta berisiko; kanker usus memakai APCS dan colok dubur/FOBT pada risiko tinggi; mata memakai visus + pinhole dan >40 dilanjutkan skrining katarak; telinga memakai otoskop + tes bisik modifikasi/aplikasi; kesehatan jiwa menggunakan kuesioner mandiri pada SSM/WA Chatbot; fibrosis/sirosis memakai kuesioner risiko lalu SGOT + trombosit untuk APRI.
10. Imunisasi dewasa bukan annual universal; mengikuti jenis antigen dan jadwal imunisasi, termasuk catch-up sesuai ketentuan program.
11. Untuk aktivitas fisik, kuesioner digunakan pada CKG; bila partisipasi aktivitas fisik kurang, tindak lanjut mencakup edukasi dan pemeriksaan kebugaran setiap 6 bulan.
12. Lansia mengikuti pemeriksaan dewasa dengan tambahan ADL + SKILAS; hasil SKILAS menentukan Mini-Cog/AD-8, SPPB, MNA-SF, atau GDS-4, serta IADL Lawton pada seluruh lansia dan frailty/SARC-CalF bila ada gangguan SKILAS.

## Perubahan status row
- `SCR-028 Risiko Penyakit Jantung`: **LOCKED-CONDITIONAL** — trigger >=40 tahun + hipertensi dan/atau DM; EKG.
- `SCR-029 Risiko Stroke`: **LOCKED-CONDITIONAL** — trigger >=40 tahun + hipertensi dan/atau DM; profil lipid.
- `SCR-051 Fungsi Ginjal`: **LOCKED-CONDITIONAL** — trigger >=40 tahun + hipertensi dan/atau DM; ureum-kreatinin/eLFG dan/atau ACR.
- `SCR-027 Risiko Kanker Paru`: **LOCKED-CONDITIONAL** — age gate >=45 dan risk assessment sebelum X-ray.
- `SCR-018 Kanker Kolorektal/Usus`: **LOCKED-CONDITIONAL** — age gate >=45; APCS, kemudian colok dubur + FOBT bila APCS risiko tinggi.
- `SCR-048 Fibrosis/Sirosis Hati`: **LOCKED-CONDITIONAL** — hepatitis B/C dan/atau usia >40 dengan DM/obesitas sentral/dislipidemia; APRI setelah SGOT+trombosit.
- `SCR-034 Kebugaran Dewasa`: **CONDITIONAL** — bukan annual default; terkait hasil aktivitas fisik kurang dan pemeriksaan kebugaran 6 bulanan.
- `SCR-045 PHQ-4`: **NATIONAL-EVIDENCE / LOCAL-SOP PENDING** — pemberitahuan Kemenkes 10 Februari 2025 menetapkan PHQ-4 untuk dewasa dan lansia dalam PKG/CKG; tetap perlu verifikasi SOP aktif Puskesmas sebelum hard-code lokal.
- `SCR-026 SRQ-29`: **REVIEW** — tidak ditemukan dasar Juknis CKG 2026 yang menyebut SRQ-29 sebagai instrumen default dewasa/lansia.
- `SCR-035 WHO-ASSIST V3.1`: **REVIEW** — tidak ditemukan dasar Juknis CKG 2026 yang menetapkannya sebagai instrumen default CKG.

## Guardrail teknis
- `CKG = gateway`, bukan modul skrining PTM yang berdiri sendiri.
- `Annual` melekat pada paket CKG; follow-up dan monitoring penyakit dapat memiliki frekuensi berbeda.
- Jangan hard-code threshold klinis di luar yang eksplisit dalam pedoman aktif.
- Jangan membuat instrumen raw 55 baru.
- Status `NATIONAL-EVIDENCE / LOCAL-SOP PENDING` berarti evidence nasional sudah ditemukan, tetapi implementasi lokal tetap menunggu SOP/otorisasi aktif.

## Sumber evidence utama
- Kepmenkes HK.01.07/Menkes/84/2026, Juknis Cek Kesehatan Gratis, JDIH Kemenkes.
- Permenkes No. 3 Tahun 2026 tentang Penanggulangan Penyakit.
- Pemberitahuan perubahan instrumen skrining kesehatan jiwa Nomor KJ.02.05/B.III/92/2025 tanggal 10 Februari 2025 (PHQ-4 untuk dewasa dan lansia).

## Next step
1. Cocokkan seluruh row raw 55 dengan matrix, termasuk row di luar SCR-014 s.d. SCR-051.
2. Verifikasi SOP aktif Puskesmas untuk instrumen yang berstatus REVIEW atau NATIONAL-EVIDENCE / LOCAL-SOP PENDING.
3. Isi kolom indikator dan sumber data setelah governance lokal ditetapkan.
4. Finalisasi Master Screening Matrix v0.5.
5. Baru bangun rule engine dan UI RME Klaster 3.

## Git safety
- Perubahan hanya pada branch checkpoint.
- `main` tidak disentuh.
- Belum merge.
