# CHECKPOINT — RME INTEGRATION ARCHITECTURE v0.2 / SITB

Tanggal: 31 Agustus 2026  
Issue: #162  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Status
Arsitektur integrasi RME diperluas untuk mencakup **SATUSEHAT, ASIK, BPJS Kesehatan, dan SITB**. Belum coding integrasi produksi dan belum merge ke `main`.

## Keputusan arsitektur

### 1. RME Puskesmas kita
RME yang sedang dirancang tetap dapat dikembangkan sebagai sistem mandiri/prototipe, tetapi sejak awal harus **interoperable** dan tidak membuat silo data.

### 2. Integration Hub
Gunakan lapisan adapter/integration hub terpisah dari clinical core:

`RME Core -> Integration Hub -> SATUSEHAT / ASIK / BPJS / SITB`

Tujuannya agar perubahan API eksternal tidak memaksa perubahan pada clinical workflow internal.

### 3. SATUSEHAT
SATUSEHAT menjadi target interoperabilitas utama nasional. Dokumentasi SATUSEHAT menyediakan registrasi sistem RME mandiri, API authentication, dan use case TB berbasis FHIR.

### 4. ASIK / SATUSEHAT IndonesiaKu
ASIK/SSI diposisikan sebagai ekosistem layanan primer/CKG yang perlu diakomodasi. **Direct API integration belum dikunci** sebelum dokumentasi teknis resmi yang relevan untuk sistem RME mandiri diverifikasi.

### 5. BPJS Kesehatan
BPJS menjadi adapter terpisah untuk kebutuhan JKN/FKTP, misalnya verifikasi kepesertaan dan workflow pelayanan/antrean sesuai kanal resmi yang tersedia bagi fasyankes. Jangan mencampurkan model data BPJS dengan clinical data model.

### 6. SITB
SITB ditambahkan sebagai **integration target resmi untuk domain TB**.

Dokumentasi SATUSEHAT Tuberkulosis menunjukkan bahwa RME dapat mengirim/mengelola alur TB mulai dari identitas pasien, encounter, anamnesis, pemeriksaan fisik, klasifikasi terduga TB, register, episode perawatan, pemeriksaan penunjang, diagnosis, pengobatan, follow-up, sampai hasil akhir/penutupan kasus. Resource FHIR yang disebut mencakup Patient, Encounter, Condition, Observation, QuestionnaireResponse, EpisodeOfCare, ServiceRequest, Specimen, ImagingStudy, DiagnosticReport, Procedure, Immunization, CarePlan, MedicationRequest, MedicationDispense, dan lainnya.

Kemenkes juga menyatakan pada 15 Juni 2026 bahwa integrasi **SATUSEHAT IndonesiaKu CKG dan SITB telah berjalan sejak April 2026**.

SITB primary pathway tetap berada di domain program TB/penanggulangan penyakit menular, tetapi RME kita harus mampu menjadi sumber data klinis yang konsisten untuk interoperability.

## Arsitektur konseptual

```text
                  RME Puskesmas Tanjung Pinang
                              |
                        Clinical Core
                              |
                     Screening / Encounter
                              |
                       Integration Hub
          _________________ / | \ __________________
         /                   |                     \
        v                    v                      v
  SATUSEHAT/SSP            ASIK/SSI              BPJS
        |                    |                     |
        |                    |                     |
        +--------------------+---------------------+
                             |
                             v
                           SITB
                     (TB interoperability)
```

## Aturan penting
- Jangan membuat database pasien kedua hanya untuk SITB.
- Jangan membuat modul TB yang menggandakan seluruh sistem SITB tanpa kebutuhan klinis.
- Simpan mapping `local_patient_id <-> IHS/SATUSEHAT identifier <-> external identifiers` secara aman.
- Clinical terminology dan coding harus disiapkan untuk interoperabilitas nasional.
- Semua integrasi eksternal harus server-to-server; credential/API secret tidak pernah diletakkan di frontend.
- Data individual tetap internal, berwenang, dan audit-able.
- Integrasi produksi hanya dilakukan setelah registrasi, approval, sandbox test, dan governance terpenuhi.

## Implikasi ke Master Screening Matrix
TB tidak lagi dipandang hanya sebagai cross-cluster note. Matrix harus memiliki field interoperabilitas:
- `integration_targets`
- `external_use_case`
- `fhir_resources`
- `external_identifier`
- `sync_direction`
- `sync_status`
- `last_sync_at`
- `error_log_ref`

Untuk CKG TB, shared assessment tetap digunakan; primary program pathway berada di Klaster 4.

## Roadmap
1. Freeze clinical matrix.
2. Design RME Core.
3. Design Integration Hub.
4. SATUSEHAT sandbox.
5. SITB interoperability design.
6. ASIK/SSI interface verification.
7. BPJS interface verification.
8. End-to-end test with synthetic patients only.
9. Governance/security review.
10. Production onboarding bila seluruh persyaratan terpenuhi.

## Evidence utama
- Kemenkes RI, 15 Juni 2026: integrasi SATUSEHAT IndonesiaKu CKG dengan SITB berjalan sejak April 2026.
- SATUSEHAT Platform — Playbook Tuberkulosis: use case dan resource FHIR untuk interoperabilitas TB.
- SATUSEHAT Platform — registrasi sistem RME mandiri dan akses API production.
- SITB: aplikasi pencatatan/pelaporan TB lintas fasyankes.

## Git safety
- `main` tidak disentuh langsung.
- Checkpoint berada di branch khusus.
- Belum ada coding integrasi produksi.
- Belum merge.

## Next gate
**Design RME Core + Integration Hub v0.1**, dengan TB/SITB sebagai salah satu use case prioritas setelah clinical matrix final.
