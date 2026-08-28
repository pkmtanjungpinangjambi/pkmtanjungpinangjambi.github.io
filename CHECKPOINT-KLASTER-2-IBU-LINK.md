# Checkpoint — Koneksi Klaster 2 ke Layanan Kesehatan Ibu

Tanggal: 28 Agustus 2026
Branch: `feature/klaster-2-integrate-ibu-service`

## Status
- `main` tidak diubah.
- `pelayanan.html` tidak diubah.
- Ditambahkan perilaku JavaScript yang mengubah item `01. Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas` menjadi tautan ke `pelayanan-ibu-hamil-bersalin-nifas.html` saat halaman `pelayanan.html` dibuka.
- Halaman detail sudah memiliki tombol `Kembali ke Klaster 2` yang mengarah ke `pelayanan.html#klaster-2`.

## Quality control
- Diff terhadap `main`: hanya `content-protection.js` yang berubah sebelum checkpoint ini.
- Tidak ada data pasien, credential, API key, atau secret yang ditambahkan.
- Perubahan dibatasi pada halaman `pelayanan.html` melalui deteksi pathname sehingga fungsi proteksi konten tetap dipertahankan.
