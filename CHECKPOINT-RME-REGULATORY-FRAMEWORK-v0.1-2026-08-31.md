# CHECKPOINT — RME REGULATORY FRAMEWORK v0.1

Tanggal: 31 Agustus 2026
Issue: #162
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur
RME mandiri Puskesmas boleh dikembangkan, tetapi harus sejak desain awal mengikuti kerangka Rekam Medis Elektronik nasional, interoperabilitas SATUSEHAT, perlindungan data, serta kebutuhan integrasi program/JKN.

## Regulasi inti
1. Permenkes No. 24 Tahun 2022 tentang Rekam Medis — berstatus berlaku; mewajibkan fasyankes termasuk Puskesmas menyelenggarakan RME.
2. UU No. 17 Tahun 2023 tentang Kesehatan — termasuk mandat pengelolaan data rekam medis dalam kerangka kesehatan nasional.
3. UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi — data kesehatan merupakan data pribadi spesifik.
4. Permenkes No. 18 Tahun 2022 tentang Penyelenggaraan Satu Data Bidang Kesehatan melalui Sistem Informasi Kesehatan — prinsip standar data, metadata, interoperabilitas, kode referensi/data induk.
5. KMK HK.01.07/MENKES/1423/2022 tentang Pedoman Variabel dan Metadata pada Penyelenggaraan RME.
6. SE HK.02.01/MENKES/1030/2023 tentang Penyelenggaraan RME di Fasyankes dan pembinaan/pengawasan.
7. Kebijakan dan dokumentasi SATUSEHAT: RME mandiri wajib didaftarkan dan diverifikasi; fasyankes perlu memastikan sistem RME terverifikasi untuk memperoleh jalur integrasi produksi.

## Requirement yang diturunkan ke desain
- RME memiliki dokumentasi administratif dan klinis.
- Data klinis harus dapat ditelusuri, dijaga integritasnya, dan hanya dapat diubah oleh pihak berhak.
- Hak akses ditetapkan oleh pimpinan fasyankes melalui kebijakan/SOP; sekurang-kurangnya dibedakan untuk input, perbaikan, dan melihat data.
- Perbaikan data mengikuti kontrol waktu/otorisasi; perubahan terlambat memerlukan persetujuan sesuai Permenkes 24/2022.
- Kerahasiaan tetap berlaku meskipun pasien telah meninggal.
- Retensi RME: minimal 25 tahun sejak kunjungan terakhir, dengan ketentuan pemusnahan mengikuti regulasi.
- Integrasi harus FHIR-ready dan menggunakan terminologi/referensi yang sesuai SATUSEHAT.
- Credential integrasi tidak berada di source code/repository.
- Audit trail, backup/recovery, least privilege, dan security testing adalah requirement desain, bukan fitur tambahan belakangan.

## Arsitektur data
`Patient Master → Encounter → Clinical Data → Integration Layer → SATUSEHAT / BPJS / SITB / SIHEPI / SIMKESWA / SISRUTE / ASIK`

## BPJS priority
BPJS menjadi integration spine pertama karena workflow FKTP; DVLP dipakai untuk development/test. RME Core bukan database BPJS dan tidak meniru PCare/VClaim/Antrean.

## SATUSEHAT
SATUSEHAT menggunakan HL7 FHIR untuk standar data/API. RME mandiri harus melalui proses registrasi dan verifikasi sebelum digunakan sebagai sistem RME yang terhubung secara resmi.

## Governance gate
Belum boleh ada data pasien nyata pada development. Belum ada koneksi production. Canonical Data Model harus diturunkan setelah regulatory framework ini dikunci.

## Next gate
1. Bangun Canonical Data Model v0.1 berdasarkan Permenkes 24/2022 + KMK 1423/2022.
2. Buat IAM/RBAC matrix.
3. Buat BPJS Interoperability Matrix.
4. Petakan FHIR resources untuk Patient, Encounter, Observation, Condition, Medication, ServiceRequest/Referral dan resource terkait.
5. Rancang audit log, retention, backup, disaster recovery, dan consent/privacy controls.
6. Baru buat RME Core prototype dengan synthetic data.

## Git safety
- `main` tidak diubah langsung.
- Tidak ada credential atau data pasien di repository.
- Checkpoint branch belum di-merge.
