# CHECKPOINT — RME CYBER RISK REGISTER v0.2

Tanggal: 31 Agustus 2026  
Project: RME Puskesmas Tanjung Pinang  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Prinsip
Tidak ada angka probabilitas serangan yang dapat dipertanggungjawabkan tanpa threat model, exposure, konfigurasi, telemetry, dan hasil security assessment. Risiko inherent database pasien ditetapkan **HIGH** karena memuat data kesehatan dan identifier penting.

## Risiko prioritas
| Risiko | Dampak | Prioritas | Kontrol desain |
|---|---|---|---|
| Credential theft / account takeover | Akses data pasien | Critical | MFA, RBAC, rate limiting, session control, audit |
| Database exposed ke internet | Kebocoran massal | Critical | DB private network, firewall, no direct public access |
| Vulnerable web/API | Data exfiltration / RCE | Critical | secure coding, dependency scanning, WAF, patching, SAST/DAST |
| Ransomware | Hilang/tidak tersedia data | Critical | immutable/offline backup, restore test, segmentation |
| Insider misuse | Kebocoran/alterasi data | High | least privilege, audit trail, break-glass logging |
| API credential leak | Akses sistem nasional | Critical | server-side secrets, secret manager, rotation, never Git |
| Misconfiguration cloud | Exposure data | High | hardened baseline, IAM review, network policy |
| Supply-chain dependency | Compromise aplikasi | High | pinned dependencies, SBOM, update policy, scanning |

## Development rule
- Development menggunakan synthetic/de-identified data.
- Tidak ada NIK/data pasien nyata di GitHub.
- Tidak ada credential SATUSEHAT, BPJS, SITB, SIHEPI, SIMKESWA, SISRUTE, atau ASIK di source code.
- Production integration hanya setelah registration/verification dan security assessment yang diwajibkan.

## Production minimum baseline
1. TLS end-to-end.
2. Encryption at rest.
3. MFA untuk privileged users.
4. RBAC + least privilege.
5. Audit log tamper-resistant.
6. Database private; application tier separated.
7. Centralized monitoring/alerting.
8. Backup encrypted + immutable/offline copy + restore drills.
9. Vulnerability/patch management.
10. Independent security assessment / penetration test sebelum production.
11. Incident response and breach notification procedure.
12. Secrets management and key rotation.

## Architecture position
`RME Core -> Integration Hub -> SATUSEHAT / ASIK / BPJS / SITB / SIHEPI / SIMKESWA / SISRUTE`

Each external integration uses an adapter. External credentials are isolated from clinical database credentials.

## Next gate
Create a detailed threat model for Patient, Authentication, Encounter, Clinical Data, Integration Hub, and Audit Log before coding the production database.

## Safety
`main` tidak disentuh. Belum ada data pasien nyata dan belum ada koneksi produksi.
