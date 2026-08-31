# CHECKPOINT — RME INTEGRATION ARCHITECTURE v0.1

Tanggal: 31 Agustus 2026
Repository: `pkmtanjungpinangjambi/pkmtanjungpinangjambi.github.io`
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur

Proyek RME mandiri tetap boleh dan akan dikembangkan sebagai sistem internal/prototipe Puskesmas Tanjung Pinang, tetapi sejak awal harus dirancang sebagai **interoperable RME**, bukan aplikasi yang terisolasi.

### Sistem yang harus diakomodasi

1. **SATUSEHAT Platform** — jalur interoperabilitas nasional untuk RME, menggunakan HL7 FHIR/HTTPS REST API. Sistem RME mandiri wajib didaftarkan dan diverifikasi sebelum digunakan untuk integrasi produksi.
2. **Aplikasi Sehat Indonesiaku (ASIK)** — kanal pencatatan layanan primer, terutama luar gedung. RME harus dirancang agar workflow CKG/ILP tidak menghasilkan input ganda; kebutuhan direct integration/API ASIK harus diverifikasi terhadap kapabilitas resmi saat implementasi.
3. **BPJS Kesehatan** — jalur integrasi JKN/FKTP harus dipisahkan dari SATUSEHAT. RME perlu menyediakan adapter untuk layanan BPJS yang secara resmi tersedia/diotorisasi untuk FKTP, termasuk kebutuhan antrean dan PCare; layanan lain hanya diaktifkan bila sesuai hak akses/kontrak teknis.
4. **ePuskesmas Kota Jambi** — sistem existing tidak dihapus atau diganggu. Selama masa pengembangan, ePuskesmas tetap diperlakukan sebagai sistem existing/operasional; sinkronisasi atau coexistence ditentukan setelah audit kemampuan integrasinya.

## Arsitektur target

```text
                         PUSKESMAS DIGITAL
                                |
             +------------------+------------------+
             |                  |                  |
             v                  v                  v
        PUBLIC WEB          RME CORE          ANALYTICS/QUALITY
                                |
                       INTEGRATION LAYER
                                |
          +---------------------+---------------------+
          |                     |                     |
          v                     v                     v
    SATUSEHAT/FHIR             ASIK             BPJS HEALTH
          |                     |                     |
          +---------------------+---------------------+
                                |
                         Existing ePuskesmas
                         (coexistence/audit)
```

## Prinsip data

- Internal RME menjadi **system of record untuk sistem kita**, tetapi data nasional yang wajib dikirim mengikuti kanal resmi masing-masing.
- Hindari membuat dua data klinis yang sama secara manual.
- Gunakan satu identitas pasien internal dan mapping ke **SATUSEHAT Patient/IHS**.
- Pisahkan data klinis, data pembiayaan/JKN, dan data pelaporan program.
- Jangan menaruh credential SATUSEHAT/BPJS di frontend atau repository.
- Semua integrasi menggunakan backend/service layer, audit log, retry queue, monitoring, dan secret management.
- Tidak menggunakan data pasien nyata dalam development/sandbox kecuali melalui mekanisme resmi dan akses yang sah.

## Dampak terhadap Master Screening Matrix

Master Screening Matrix tetap menjadi sumber **clinical governance / eligibility logic**. Rule engine RME hanya menerjemahkan matrix; ia tidak boleh mengarang clinical guidance baru.

```text
Master Screening Matrix
        -> Eligibility / Trigger
        -> RME Form / Questionnaire
        -> Clinical Result
        -> Follow-up / Referral
        -> Mapping interoperability
             -> SATUSEHAT FHIR
             -> BPJS channel
             -> ASIK workflow/API bila tersedia
```

## Tahapan implementasi

### Phase 0 — Discovery/Compliance
- Audit sistem ePuskesmas yang sudah berjalan.
- Inventarisasi kebutuhan SATUSEHAT.
- Inventarisasi kanal BPJS FKTP yang memang diperlukan Puskesmas.
- Verifikasi kemampuan/ketersediaan integrasi ASIK yang resmi.

### Phase 1 — RME Core
- Patient
- Encounter
- Practitioner/Organization
- Screening/QuestionnaireResponse
- Observation
- Condition
- Medication
- CarePlan/Follow-up
- Referral
- Audit trail dan role-based access

### Phase 2 — Integration adapters
- SATUSEHAT FHIR adapter
- BPJS adapter
- ASIK adapter bila jalur resmi tersedia
- ePuskesmas coexistence connector hanya setelah audit

### Phase 3 — Sandbox & certification
- SATUSEHAT sandbox testing
- BPJS development/testing sesuai akses resmi
- Security testing
- Data validation
- Interoperability mapping

### Phase 4 — Pilot
- Data sintetis/test patients
- Pilot terbatas
- Rekonsiliasi dengan sistem existing
- Governance approval sebelum produksi

## Guardrail

- Tidak menggantikan ePuskesmas secara sepihak.
- Tidak menyimpan credential nasional di client-side.
- Tidak mengirim data nyata ke endpoint nasional sebelum registrasi, otorisasi, dan sandbox testing selesai.
- Tidak menjadikan website publik sebagai RME.
- Tidak merge ke `main` hanya karena fitur integrasi selesai; wajib QC dan review.

## Evidence resmi yang menjadi acuan

- SATUSEHAT Platform: sistem RME mandiri dapat dikembangkan oleh fasyankes sendiri dan wajib didaftarkan/terverifikasi.
- SATUSEHAT menggunakan HL7 FHIR dan HTTPS REST API untuk interoperabilitas.
- SATUSEHAT Mobile menampilkan RME yang telah dikirim fasyankes terintegrasi.
- ASIK adalah kanal pencatatan layanan primer dan menyediakan fitur CKG; dokumentasi Kemenkes menjelaskan RME jangka panjang perlu mengadopsi modul layanan PKG/CKG dan terintegrasi SATUSEHAT.
- BPJS Mobile JKN mengandalkan integrasi FKTP dengan Aplikasi Antrean Faskes dan PCare untuk pendaftaran pelayanan.

## Status

**ARCHITECTURE LOCKED — IMPLEMENTATION NOT STARTED**

Next gate: audit coexistence ePuskesmas + detail technical requirements SATUSEHAT/BPJS/ASIK sebelum coding integrator.
