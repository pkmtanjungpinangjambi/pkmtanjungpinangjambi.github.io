# CHECKPOINT — RME THREAT MODEL v0.1

Tanggal: 31 Agustus 2026  
Issue: #162  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`  
Status: DESIGN / SECURITY GATE — belum production

## Tujuan

Menetapkan threat model awal untuk RME Puskesmas Tanjung Pinang sebelum desain database dan coding. Model ini melindungi kerahasiaan, integritas, ketersediaan, akuntabilitas, dan interoperabilitas data pasien.

## Scope

Komponen yang dimodelkan:
1. Patient Master / Identifier Layer
2. Encounter dan clinical records
3. Screening / Questionnaire / Observation
4. Diagnosis / Medication / Care Plan / Referral
5. Authentication, RBAC, MFA, session
6. Audit log
7. Integration Hub / adapter
8. Database dan backup
9. API/application server
10. External systems: SATUSEHAT, ASIK/IndonesiaKu, BPJS, SITB, SIHEPI, SIMKESWA, SISRUTE

## Trust boundaries

```text
Internet / External User
        |
        v
Reverse Proxy / WAF
        |
        v
Application / API Layer
        |
        +----> Integration Hub ----> External Systems
        |
        v
Private Database Network
        |
        +----> Encrypted Backup / Recovery
```

Database tidak boleh diekspos langsung ke internet. Credential integrasi tidak boleh berada di browser, source code, GitHub, atau database biasa.

## Assets dan klasifikasi

| Asset | Sensitivitas | Prioritas |
|---|---|---|
| NIK / identitas pasien | Sangat tinggi | P0 |
| Data diagnosis / kondisi | Sangat tinggi | P0 |
| Hasil skrining / laboratorium | Sangat tinggi | P0 |
| Data obat / terapi | Sangat tinggi | P0 |
| BPJS / identifier program | Tinggi | P0 |
| IHS SATUSEHAT | Tinggi | P0 |
| Token/API credential | Sangat tinggi | P0 |
| Audit log | Tinggi | P0 |
| Backup database | Sangat tinggi | P0 |
| Data agregat non-identifiable | Sedang | P1 |

## Threat model (STRIDE)

| ID | Threat | Contoh kondisi | Dampak | Risiko awal | Kontrol utama |
|---|---|---|---|---|---|
| TM-01 | Spoofing | akun petugas dicuri | akses data pasien | HIGH | MFA, password policy, session control, device/risk monitoring |
| TM-02 | Spoofing | credential integrasi bocor | akses endpoint eksternal | CRITICAL | secret manager, short-lived token, rotation, server-side only |
| TM-03 | Tampering | data klinis diubah tanpa hak | keputusan klinis salah | CRITICAL | RBAC, least privilege, immutable audit, versioning, approval untuk field sensitif |
| TM-04 | Tampering | payload integrasi dimanipulasi | data eksternal tidak konsisten | HIGH | TLS, message validation, schema validation, idempotency |
| TM-05 | Repudiation | perubahan data tanpa jejak | sulit investigasi | HIGH | audit trail append-only, actor/time/source/device metadata |
| TM-06 | Information Disclosure | IDOR / broken access control | kebocoran data pasien | CRITICAL | object-level authorization, deny-by-default, access tests |
| TM-07 | Information Disclosure | database/backup bocor | kebocoran massal | CRITICAL | private DB, encryption at rest, key management, backup isolation |
| TM-08 | Information Disclosure | log berisi NIK/data klinis | kebocoran melalui log | HIGH | log minimization, masking, no secrets/PHI in application logs |
| TM-09 | DoS | API dibanjiri request | layanan tidak tersedia | HIGH | rate limit, WAF, queueing, autoscaling/capacity planning |
| TM-10 | DoS | ransomware/DB corruption | RME berhenti | CRITICAL | immutable backup, restore test, segmentation, EDR/monitoring |
| TM-11 | Elevation of Privilege | user biasa mendapat role admin | kontrol sistem runtuh | CRITICAL | centralized authorization, role separation, admin MFA, change approval |
| TM-12 | Supply-chain | dependency rentan | compromise aplikasi | HIGH | dependency pinning, SCA, patch cadence, SBOM |
| TM-13 | API abuse | endpoint integrasi dipanggil di luar hak | data/credential misuse | HIGH | scoped credentials, allowlist, outbound policy, schema validation |
| TM-14 | Insider misuse | akses pasien tanpa kebutuhan kerja | pelanggaran privasi | HIGH | least privilege, break-glass control, audit + periodic review |
| TM-15 | Data mismatch | satu pasien memiliki identifier berbeda | duplicate/incorrect linkage | HIGH | internal UUID, identity resolution, IHS/BPJS/program identifier mapping |

## Security requirements yang dikunci

### Identity & access
- Unique account per user; no shared accounts.
- RBAC + least privilege.
- MFA wajib untuk admin dan akses berisiko tinggi; target MFA bertahap untuk seluruh pengguna sesuai kesiapan operasional.
- Session timeout, revocation, lockout/rate limiting, secure cookie/token handling.
- Privileged/admin accounts terpisah dari akun kerja harian.

### Patient data
- Internal `patient_id` berbasis UUID; NIK bukan primary key.
- NIK dan identifier eksternal disimpan sebagai protected identifiers.
- Patient identity matching harus memiliki workflow resolusi duplikasi.
- Tidak menyimpan lebih banyak data daripada kebutuhan pelayanan/interoperabilitas.

### Database
- Database private network only.
- Encryption at rest dan in transit.
- Backups encrypted, isolated, and tested for restoration.
- Database account separation: application user, migration account, read-only reporting account, admin account.
- Production DB credentials tidak masuk repository.

### Audit
- Catat login, akses pasien, create/update/delete, perubahan diagnosis/obat, export, integration transmission, permission changes, dan admin actions.
- Audit log append-only / tamper-evident.
- Jangan memasukkan NIK lengkap, password, token, atau isi klinis penuh ke log aplikasi kecuali benar-benar diperlukan.

### Integration security
- Integration Hub menjadi boundary terkontrol.
- Credential disimpan di secret manager / secure runtime configuration.
- Outbound-only connection bila sesuai model integrasi.
- Validate payload dan external response.
- Idempotency untuk mencegah pengiriman ganda.
- Retry queue tidak boleh membuat duplicate clinical record.
- Setiap sistem eksternal memiliki adapter dan credential scope sendiri.

### Application security
- Secure coding mengikuti OWASP practice.
- Input validation, output encoding, authorization check pada setiap object/resource.
- CSRF protection untuk cookie-based web sessions.
- Rate limiting dan abuse detection.
- Dependency/SCA scanning dan patch management.
- Security testing: unit/security tests → DAST/SAST sesuai stack → vulnerability assessment → penetration test sebelum production.

## Environment separation

```text
DEV
  Synthetic / de-identified data only
      |
      v
TEST / STAGING
  Mock integrations + sandbox/training
      |
      v
PILOT
  Restricted real-world workflow under authorization
      |
      v
PRODUCTION
  Real patient data + approved integrations
```

No real patient data in GitHub, development fixtures, demo databases, or public hosting.

## Security gates sebelum production

1. Threat model reviewed and signed off.
2. Architecture review selesai.
3. IAM/RBAC test selesai.
4. Authorization/IDOR test selesai.
5. Secret scanning = PASS.
6. Dependency/SCA scan = PASS or documented accepted risk.
7. Backup restore test = PASS.
8. Audit trail verification = PASS.
9. External integration security review = PASS.
10. Vulnerability assessment / penetration test = completed and critical findings closed or formally accepted.
11. SATUSEHAT RME registration/verifikasi requirements satisfied before official integration.

## Regulatory alignment

- Permenkes No. 24 Tahun 2022 tentang Rekam Medis: penyelenggaraan RME harus memperhatikan keamanan dan kerahasiaan data/informasi.
- UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi: data kesehatan termasuk data pribadi yang bersifat spesifik.
- SATUSEHAT: RME mandiri wajib didaftarkan sebagai sistem RME dan melalui proses verifikasi; terdapat survei keamanan pada proses registrasi.

## Decisions

- RME boleh dikembangkan secara mandiri, tetapi security gate menjadi bagian dari SDLC.
- Database pasien tidak pernah diletakkan di repository atau public frontend.
- Integrasi nasional/program menggunakan adapter terpisah.
- Development dimulai dengan synthetic data dan mock API.
- Tidak ada integrasi production selama threat model, security controls, governance, dan registrasi/verifikasi yang dipersyaratkan belum selesai.

## Next gate

**NEXT = Canonical Data Model + IAM/RBAC Design v0.1**

Urutan setelah threat model:
1. Canonical Patient + Identifier model.
2. Encounter/Observation/Condition/Medication/Referral model.
3. Consent + audit model.
4. Role matrix.
5. Integration mapping per external system.
6. Prototype dengan synthetic data.

## Evidence

- OWASP Threat Modeling Project: threat modeling sebaiknya dilakukan sejak desain dan digunakan terus sepanjang lifecycle. https://owasp.org/www-project-threat-modeling/
- SATUSEHAT — Registrasi Sistem RME dan Sistem RME Mandiri. https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-vendor/ ; https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/regis-system-rme-mandiri/
- Permenkes No. 24 Tahun 2022 tentang Rekam Medis. https://jdih.kemkes.go.id/common/dokumen/2022permenkes024.pdf
- UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
