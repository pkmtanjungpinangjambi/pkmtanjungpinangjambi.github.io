# CHECKPOINT — RME INTEGRATION ARCHITECTURE v0.3 — SITB ACCOUNT

Tanggal: 31 Agustus 2026
Branch: `checkpoint/klaster3-stage2-matrix-2026-08-31`
Issue utama: #162

## Status
User confirmed UPTD Puskesmas Tanjung Pinang memiliki akun SITB yang dapat digunakan oleh petugas.

Dokumen ini mengunci SITB sebagai target integrasi domain TB dalam arsitektur RME, tanpa menyimpan username, password, token, client secret, atau kredensial lain.

## Temuan yang dikunci
1. SITB memiliki dokumentasi/manual pengguna publik pada `https://sumatera.sitb.id/sitb2024/manual/`.
2. FAQ SITB menegaskan adanya lingkungan training dan input data asli; data real tidak boleh dimasukkan ke lingkungan training.
3. SATUSEHAT menyediakan pola interoperabilitas TB untuk sistem RME, sehingga domain TB dapat dirancang sebagai adapter/integration module.
4. SITB tidak boleh ditiru sebagai aplikasi lokal kedua; RME kita menyimpan clinical record yang diperlukan dan integration layer menangani pertukaran data sesuai kanal resmi.

## Arsitektur
`RME Core → Integration Hub → SATUSEHAT`
`                         └→ SITB (TB adapter)`

## Prinsip keamanan
- Kredensial SITB tidak dimasukkan ke GitHub, source code, checkpoint, database test, atau frontend.
- Credential/API secret harus berada pada server-side secret manager/environment variable.
- Tahap awal memakai akun/lingkungan training atau sandbox bila disediakan; data pasien nyata hanya setelah otorisasi dan prosedur resmi terpenuhi.
- Jangan melakukan reverse engineering atau scraping halaman login SITB.
- Semua transaksi produksi harus melalui mekanisme/API/kanal resmi yang diizinkan pengelola SITB/Kemenkes.

## Implikasi database
RME Core perlu menyiapkan identifier cross-system secara terpisah, misalnya:
- local_patient_id
- NIK (dengan kontrol akses ketat)
- SATUSEHAT/IHS number
- BPJS identifier/status bila relevan
- SITB patient/case identifier bila mekanisme resmi menyediakan

Tidak boleh menggabungkan identifier hanya karena formatnya mirip.

## Next gate
1. Audit dokumentasi teknis SITB: apakah ada API/integrasi resmi yang dapat digunakan oleh RME.
2. Petakan field TB RME ke kebutuhan SITB/SATUSEHAT.
3. Pisahkan `TB screening`, `TB presumptive`, `TB diagnosis`, `TB treatment`, dan `TB outcome`.
4. Bangun mock adapter tanpa kredensial terlebih dahulu.
5. Setelah governance dan akses teknis jelas, baru uji koneksi pada environment yang aman.

## Evidence
- SITB FAQ publik: `https://sumatera.sitb.id/sitb2024/faq/umum`
- SATUSEHAT FHIR/interoperability documentation.

## Git safety
- `main` tidak disentuh.
- Checkpoint dibuat pada branch khusus.
- Belum ada coding integrasi produksi.
