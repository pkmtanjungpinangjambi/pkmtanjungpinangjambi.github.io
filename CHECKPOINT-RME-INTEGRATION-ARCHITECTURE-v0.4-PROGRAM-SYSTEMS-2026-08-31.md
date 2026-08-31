# CHECKPOINT — RME INTEGRATION ARCHITECTURE v0.4

Tanggal: 31 Agustus 2026  
Scope: RME Puskesmas Tanjung Pinang — interoperabilitas nasional/program  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur
RME yang dikembangkan internal tidak menyalin atau menggantikan aplikasi program pemerintah. RME menjadi clinical system/core; integrasi dilakukan melalui adapter/API resmi atau mekanisme pertukaran resmi masing-masing sistem.

## Integration endpoints
1. **SATUSEHAT** — national interoperability platform; target utama RME, standard HL7 FHIR.
2. **ASIK / SATUSEHAT IndonesiaKu** — program/layanan primer dan CKG; perlu dipetakan sesuai mekanisme resmi yang tersedia, tidak mengasumsikan public API.
3. **BPJS Kesehatan** — JKN/FKTP workflows; integration scope ditentukan dari kanal resmi BPJS dan hak akses fasyankes.
4. **SITB** — TB program system; domain-specific endpoint; RME TB module harus mampu memetakan screening → terduga → pemeriksaan → diagnosis → pengobatan → follow-up → outcome.
5. **SIHEPI** — hepatitis/PISP program reporting; endpoint domain hepatitis/infeksi saluran pencernaan. Jangan menduplikasi sistem program; siapkan mapping data dan adapter bila kanal integrasi resmi tersedia.
6. **SIMKESWA** — mental-health program information system; RME menyimpan clinical encounter/result yang relevan dan menyiapkan adapter/reporting mapping bila kanal resmi tersedia.
7. **SISRUTE / SATUSEHAT Rujukan** — referral endpoint; RME harus menghasilkan referral package/resume yang dapat dipetakan ke sistem rujukan resmi. SISRUTE dirancang agar dapat diintegrasikan dengan aplikasi fasyankes.

## Prinsip data
- **System of clinical record:** RME internal (subject to official registration/compliance before production use).
- **National exchange:** SATUSEHAT.
- **Program reporting:** SIHEPI, SIMKESWA, SITB, dan sistem program lain sesuai kewajiban.
- **Referral:** SISRUTE/SATUSEHAT Rujukan.
- **JKN:** BPJS official channels.
- Hindari double entry dengan canonical data model + outbound adapter.

## Security / governance
- Tidak menyimpan username, password, API key, client secret, token, atau credential dalam GitHub/source code.
- Credentials hanya pada server-side secret manager/environment configuration.
- Development/testing memakai mock/sandbox/training endpoint bila tersedia.
- Data pasien nyata tidak boleh masuk ke repository publik atau environment development tanpa governance/authorization yang sesuai.

## Evidence snapshot
- Kemenkes menjelaskan SIMKESWA sebagai aplikasi web untuk pengumpulan, pemrosesan, analisis, monitoring, dan evaluasi kesehatan jiwa; skrining jiwa digital tersedia melalui SIMKESWA dan SATUSEHAT Mobile.
- SIHEPI merupakan sistem pelaporan hepatitis/PISP; terdapat contoh integrasi SIHEPI dengan catatan elektronik fasilitas kesehatan.
- SISRUTE/SATUSEHAT Rujukan menyatakan sistem mudah diintegrasikan dengan aplikasi fasilitas kesehatan.
- Materi arsitektur ILP Kemenkes sebelumnya memetakan SITB, SIHEPI, SIMKESWA, SISRUTE, SIKDA, dan sistem program lain sebagai existing systems yang perlu diintegrasikan/diadopsi melalui API/standar metadata.

## Dampak pada Matrix 55
Raw Registry 55 tetap dipertahankan. Sistem program menjadi `integration endpoint`, bukan SCR baru. Clinical mapping tetap berasal dari Matrix dan pedoman/SOP aktif.

## Next gate
1. Buat **RME Interoperability Matrix v0.1**: endpoint → owner → tujuan → data outbound → inbound → identifier → protocol/API → environment → auth → error handling → audit.
2. Audit manual/dokumentasi resmi setiap endpoint.
3. Desain canonical patient/encounter model.
4. Bangun mock adapters.
5. Baru lakukan prototyping RME Core.

## Catatan khusus
Karena akses akun nyata SITB/SIHEPI/SIMKESWA/SISRUTE merupakan kredensial operasional, proyek tidak akan mencoba login otomatis atau menyimpan credential. Hanya dokumentasi teknis dan sandbox/training resmi yang digunakan pada fase development.
