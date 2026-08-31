# CHECKPOINT — RME CORE / ONE-INPUT INTEGRATION-FIRST v0.5

Tanggal: 31 Agustus 2026  
Issue: #162  
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur utama

Proyek RME mandiri Puskesmas Tanjung Pinang diarahkan untuk mengurangi duplikasi input antar-aplikasi. Prinsip utama: **capture once, reuse many times**.

RME tidak dirancang sebagai aplikasi silo atau pengganti sistem program pemerintah secara langsung. RME menjadi **clinical core + canonical data layer + integration hub**, sedangkan sistem nasional/program tetap menjadi endpoint sesuai kewenangan dan kanal integrasi resmi.

## Target ekosistem integrasi

- SATUSEHAT — interoperabilitas RME nasional, HL7 FHIR/REST API.
- ASIK / IndonesiaKu — layanan primer/program; kanal API atau mekanisme resmi harus diverifikasi sebelum implementasi.
- BPJS Kesehatan — workflow JKN/FKTP sesuai kanal resmi yang tersedia bagi fasyankes.
- SITB — domain TB.
- SIHEPI — domain hepatitis.
- SIMKESWA — domain kesehatan jiwa.
- SISRUTE — domain rujukan.
- ePuskesmas existing — sistem yang sudah berjalan; coexistence/integration/replacement baru diputuskan setelah audit teknis dan governance.

## Prinsip data

1. Satu master Patient/identitas internal dengan mapping identifier eksternal.
2. Satu Encounter/episode pelayanan sebagai sumber konteks klinis.
3. Clinical data disimpan sebagai canonical record sebelum dipetakan ke format endpoint.
4. Setiap adapter menyimpan `external_system`, `external_id`, `sync_status`, `last_attempt`, `last_success`, dan `error_message` tanpa menyimpan secret.
5. Kredensial, client secret, token, password, dan API key tidak boleh masuk Git/source code.
6. Ada audit trail untuk create/update/send/retry/failure.
7. Queue/retry diperlukan agar kegagalan endpoint tidak menghentikan pelayanan klinis.
8. Tidak ada duplikasi input manual bila data sudah tersedia secara canonical dan endpoint mendukung pertukaran otomatis/resmi.

## Clinical governance

- Master Screening Matrix tetap menjadi sumber rule/eligibility, bukan database program eksternal.
- Screening, diagnosis, treatment, dan monitoring tetap dipisahkan.
- Rule engine tidak boleh mengarang clinical guidance di luar pedoman/SOP aktif.
- Data individual pasien tidak boleh masuk GitHub/public website.

## Requirement baru yang dikunci

**RME harus dirancang sejak awal untuk interoperabilitas; integrasi bukan fitur tambahan di akhir proyek.**

Motivasi proyek selaras dengan konteks nasional: dokumentasi SATUSEHAT menyebut lebih dari 400 aplikasi kesehatan pemerintah belum saling terintegrasi dan data yang sama dikumpulkan oleh aplikasi berbeda. SATUSEHAT menggunakan HL7 FHIR sebagai standar interoperabilitas dan menyediakan jalur untuk Sistem RME Mandiri yang harus didaftarkan/terverifikasi.

## Next gate

1. RME Interoperability Matrix v0.1.
2. Canonical Data Model v0.1.
3. Identifier/Mapping Model.
4. Integration Adapter Contract.
5. Mock environment dan test data sintetis.
6. Baru RME Core prototype.

## Git safety

- `main` tidak diubah langsung.
- Belum ada data pasien nyata yang digunakan.
- Belum ada koneksi produksi ke SATUSEHAT, BPJS, SITB, SIHEPI, SIMKESWA, SISRUTE, atau ASIK.
- Semua perubahan dokumentasi checkpoint berada pada branch khusus.
