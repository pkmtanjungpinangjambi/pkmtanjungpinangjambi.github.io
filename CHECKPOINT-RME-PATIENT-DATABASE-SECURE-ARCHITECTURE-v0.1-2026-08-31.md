# CHECKPOINT — RME PATIENT DATABASE SECURE ARCHITECTURE v0.1

Tanggal: 31 Agustus 2026  
Issue: #162 — RME / Clinical Integration Architecture  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur

Database pasien menjadi komponen inti dan paling sensitif dalam RME. RME tidak menggunakan database website publik, GitHub, atau spreadsheet sebagai penyimpanan pasien produksi.

Prinsip utama: **one patient master, one clinical record, many authorized integrations**.

## Patient Master

Gunakan identifier internal sebagai primary key teknis (`patient_id`/UUID), bukan NIK sebagai primary key.

Simpan identifier eksternal secara terpisah:
- NIK Dukcapil
- Nomor IHS SATUSEHAT
- Nomor/identifier BPJS bila diperlukan
- Nomor rekam medis/eRM lokal
- Identifier program: SITB, SIHEPI, SIMKESWA, dan sistem lain sesuai kebutuhan dan kewenangan

SATUSEHAT IHS diperlakukan sebagai identifier interoperabilitas nasional. IHS diperoleh melalui Master Patient Index dan dapat disimpan di sistem internal fasyankes.

## Struktur data konseptual

1. `patient`
   - patient_id (UUID)
   - status aktif/nonaktif
   - nama legal
   - tanggal lahir
   - jenis kelamin
   - status hidup/meninggal
   - metadata audit

2. `patient_identifier`
   - identifier_id
   - patient_id
   - system/type
   - value terenkripsi atau tokenized sesuai kebutuhan
   - verified_at
   - verification_source

3. `patient_contact`
   - nomor telepon
   - email bila diperlukan
   - alamat
   - preferred contact

4. `consent`
   - patient_id
   - tujuan penggunaan/pertukaran data
   - status
   - tanggal berlaku
   - sumber/peristiwa persetujuan

5. `encounter`
   - encounter_id
   - patient_id
   - tanggal/waktu
   - jenis pelayanan
   - unit/klaster
   - tenaga kesehatan
   - status

6. `clinical_observation`
   - encounter_id
   - kode/terminologi
   - nilai/unit
   - tanggal/waktu
   - source

7. `condition`
   - patient_id / encounter_id
   - diagnosis/kondisi
   - status
   - onset
   - source

8. `procedure` / `medication` / `care_plan` / `referral`
   - mengikuti model klinis canonical dan kebutuhan interoperabilitas

9. `integration_mapping`
   - patient_id
   - system tujuan
   - external_id
   - mapping status
   - last_sync

10. `audit_log`
    - actor
    - waktu
    - patient_id/resource
    - action
    - success/failure
    - source/IP/device metadata seperlunya

## Pemisahan data sensitif

- NIK tidak dipakai sebagai primary key teknis.
- Secret/token/API credential tidak disimpan di source code atau GitHub.
- Data kesehatan dipisahkan dari data aplikasi publik.
- Log aplikasi tidak boleh mencatat NIK penuh atau isi klinis sensitif kecuali benar-benar diperlukan.
- Reporting/analytics menggunakan data teragregasi atau pseudonymized sejauh memungkinkan.

## Keamanan minimum

- TLS untuk semua koneksi jaringan.
- Encryption at rest untuk database dan backup yang memuat data sensitif.
- Role-Based Access Control (RBAC) + least privilege.
- MFA untuk akun administratif dan akses berisiko tinggi bila tersedia.
- Audit trail append-only / tamper-evident.
- Backup terenkripsi, off-host, dan restore test berkala.
- Network segmentation; database tidak diekspos langsung ke internet.
- Secret management di environment/server secret store.
- Dependency/security scanning dan vulnerability assessment sebelum production.

## Interoperabilitas

RME menyimpan canonical clinical data. Sistem eksternal menggunakan adapter/integration service, bukan mengubah langsung database inti.

Target adapter:
- SATUSEHAT (HL7 FHIR)
- ASIK / IndonesiaKu — API/channel harus diverifikasi sebelum implementasi
- BPJS Kesehatan — kanal resmi sesuai kewenangan
- SITB
- SIHEPI
- SIMKESWA
- SISRUTE

Untuk SATUSEHAT, Patient memakai IHS dari Master Patient Index dan identifier tersebut dapat disimpan pada sistem internal fasyankes.

## Environment separation

`DEV → TEST/SANDBOX → PILOT → PRODUCTION`

Development hanya menggunakan data sintetis/de-identified. Data pasien nyata tidak boleh digunakan untuk demo/testing biasa.

## Governance

RME mandiri harus diperlakukan sebagai sistem resmi hanya setelah memenuhi proses registrasi/verifikasi dan persyaratan keamanan/interoperabilitas yang berlaku. Permenkes 24/2022 dan UU PDP menjadi baseline legal/governance; detail implementasi mengikuti regulasi dan pedoman teknis terbaru.

## Non-goals

- Tidak membuat database produksi di GitHub.
- Tidak mengimpor data pasien nyata untuk tahap prototype.
- Tidak menggantikan ePuskesmas pada tahap awal.
- Tidak membuat copy penuh database sistem program nasional.
- Tidak membuat integrasi produksi sebelum kontrak/API resmi diverifikasi.

## Next gate

1. Finalisasi canonical Patient + Encounter data model.
2. Buat identifier mapping matrix.
3. Buat RBAC matrix.
4. Buat audit/security control matrix.
5. Buat mock integration adapters.
6. Setelah itu baru RME Core prototype.

## Evidence baseline

- Permenkes No. 24 Tahun 2022 tentang Rekam Medis.
- UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.
- SATUSEHAT Platform: FHIR, Patient/MPI, dan registrasi RME mandiri.

## Git safety

- `main` tidak disentuh langsung.
- Checkpoint hanya pada branch khusus.
- Tidak ada credential atau data pasien nyata pada repository.
