# CHECKPOINT — RME BPJS CORE PRIORITY v0.3

Tanggal: 31 Agustus 2026
Issue: #162
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`

## Keputusan arsitektur
- BPJS Kesehatan menjadi prioritas integrasi eksternal pertama untuk RME Puskesmas Tanjung Pinang.
- DVLP BPJS diperlakukan sebagai environment development/test, bukan database/core system BPJS.
- RME Core tetap menjadi clinical source of record internal kita.
- BPJS integration layer dipisahkan menjadi adapter/service tersendiri.
- Service BPJS yang perlu dipetakan bertahap: PCare, Antrean FKTP, dan VClaim/layanan terkait sesuai hak akses dan kebutuhan resmi.
- Endpoint development/UAT/production harus dipisahkan.
- Credential/secret BPJS tidak boleh disimpan di source code atau repository.

## Prinsip workflow
Input pasien dan encounter dilakukan di RME Core. Data yang dibutuhkan BPJS dikirim melalui adapter resmi; petugas tidak mengulang input yang sama secara manual bila interoperabilitas tersedia.

## Batasan
- Tidak menganggap DVLP sebagai akses ke database internal BPJS.
- Tidak menguji endpoint production memakai data pasien nyata selama fase development.
- Tidak membangun tiruan PCare/VClaim/Antrean sebagai pengganti sistem BPJS.

## Evidence
- BPJS Kesehatan menjelaskan bahwa pendaftaran pelayanan FKTP melalui Mobile JKN terintegrasi dengan Aplikasi Antrean Faskes dan PCare.
- Dokumentasi teknis bridging menunjukkan pemisahan endpoint DVLP dan production.

## Next gate
1. Audit hak akses BPJS yang benar-benar dimiliki Puskesmas.
2. Petakan service PCare/Antrean/VClaim yang relevan untuk FKTP.
3. Buat BPJS Interoperability Matrix.
4. Turunkan mapping ke Canonical Data Model.
5. Bangun mock adapter di environment development.

## Git safety
- `main` tidak diubah langsung.
- Belum ada koneksi production.
- Tidak ada credential BPJS di repository.
