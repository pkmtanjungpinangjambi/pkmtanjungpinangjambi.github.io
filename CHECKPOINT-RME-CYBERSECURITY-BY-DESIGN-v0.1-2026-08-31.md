# CHECKPOINT — RME CYBERSECURITY BY DESIGN v0.1

Tanggal: 31 Agustus 2026
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`
Parent architecture: `CHECKPOINT-RME-CORE-ONE-INPUT-INTEGRATION-FIRST-v0.5-2026-08-31`

## Status
Security is a first-class architecture requirement for the planned independent RME prototype. No production patient data and no production credentials are permitted in the development repository.

## Core principles
1. Confidentiality, integrity, and availability (CIA) are mandatory design goals for RME.
2. Health information is specific personal data under UU 27/2022 and must receive heightened protection.
3. RME must support least-privilege role-based access, strong authentication, auditability, secure backup/recovery, encryption in transit and at rest, secure secret management, patching, monitoring, and incident response.
4. Integration credentials/tokens for SATUSEHAT, BPJS, ASIK/IndonesiaKu, SITB, SIHEPI, SIMKESWA, and SISRUTE must never be stored in GitHub/source code.
5. Development/test data must be synthetic or de-identified unless formally authorized for a controlled environment.
6. Integration adapters must be isolated from the clinical core so one compromised endpoint does not expose the whole system.
7. The RME prototype must not be declared production-ready merely because functional tests pass.

## Regulatory alignment
- Permenkes 24/2022: RME must ensure security, confidentiality, integrity, availability, and digital/integrated management; Puskesmas are included as facilities required to implement RME.
- Kepmenkes HK.01.07/Menkes/1423/2022: guideline for variables and metadata in RME remains an active reference.
- UU 27/2022 PDP: health information is specific personal data; processing must follow protection, accountability, confidentiality, and purpose/necessity principles.
- SATUSEHAT: independent RME systems must be registered and verified; SATUSEHAT registration includes a security survey.

## Minimum security architecture
- Identity and Access Management (IAM): unique user account, role-based permissions, session control, MFA where supported.
- Application security: OWASP-aligned secure coding, server-side authorization, input validation, CSRF/XSS/SQLi protection, rate limiting, secure headers.
- Data security: TLS for transit, encryption at rest, key rotation/management, backup encryption.
- Audit trail: login, patient access, view, create, update, export, integration, and administrative actions; immutable/append-only audit strategy where feasible.
- Infrastructure: segmented network, private database, restricted admin endpoints, firewall/WAF where applicable, monitoring and alerting.
- Secrets: environment/secret manager only; never hard-code API keys, passwords, client secrets, or tokens.
- Resilience: automated backups, tested restore, RPO/RTO targets to be defined before production.
- SDLC: threat modeling, dependency scanning, SAST/DAST where applicable, code review, penetration testing before production, incident response runbook.

## Security maturity gate
### Prototype/dev
Synthetic data only; no production integration; secrets isolated; basic RBAC; audit logs; automated tests.

### Controlled pilot
Security review complete; formal access matrix; encrypted backups; monitoring; vulnerability assessment; recovery test; integration sandbox/training only where available.

### Production candidate
Institutional governance approval; SATUSEHAT RME registration/verification; security survey; formal SOP; operational monitoring; incident response; periodic security testing; documented backup/DR; compliance review for each external integration.

## Decision
The cyber-security concern is valid and becomes a central workstream, not a reason to abandon the RME idea. We will build security into the architecture from day one and keep the prototype isolated from production systems until the required governance and verification gates are passed.

## Next gate
`RME INTEROPERABILITY MATRIX v0.1` + `CANONICAL DATA MODEL v0.1` with security classifications and access roles per data entity.
