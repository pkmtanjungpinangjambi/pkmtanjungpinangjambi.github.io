# CHECKPOINT — ARSITEKTUR DATA 5 KLASTER

Tanggal: 4 September 2026

## Keputusan arsitektur
- Puskesmas diposisikan sebagai satu sistem pelayanan berbasis 5 klaster.
- Database mengikuti klaster masing-masing; tidak ada menu database publik yang berdiri sendiri.
- Data publik hanya memuat metadata/modul layanan.
- Data pasien, NIK, rekam medis, dan PHI/PII tidak boleh dimasukkan ke repository publik.

## Implementasi tahap 2
- `data/klaster-config.js` menjadi kontrak metadata lima klaster.
- `klaster-data-ui.js` menampilkan Pusat Data Klaster secara aman di `pelayanan.html`.
- `script.js` memuat UI tersebut hanya pada `pelayanan.html`.
- Tampilan memisahkan `Domain data` dan `Operasional & mutu`.

## Arah tahap berikutnya
Beranda akan mengambil ringkasan lintas klaster dari sumber data publik yang terkurasi, sedangkan database operasional nantinya harus berada di backend terautentikasi dengan otorisasi, audit log, dan pemisahan data sensitif.
