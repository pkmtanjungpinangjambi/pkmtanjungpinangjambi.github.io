# PROJECT RULES

## 1. Branch
- Jangan mengubah `main` secara langsung.
- Setiap pekerjaan menggunakan branch khusus.
- Gunakan nama branch yang jelas, misalnya `feature/...`, `fix/...`, atau `chore/...`.

## 2. Analisis sebelum perubahan
- Baca struktur repository terlebih dahulu.
- Identifikasi file aktif sebelum mengubah atau menghapus file.
- Jangan berasumsi bahwa file lama tidak digunakan.

## 3. Perubahan kode
- Ubah hanya bagian yang diperlukan.
- Jangan menghapus fitur yang sudah berjalan tanpa alasan yang jelas.
- Hindari perubahan besar dalam satu commit.
- Pertahankan kompatibilitas mobile dan desktop.

## 4. Testing
Setelah perubahan:
- Periksa HTML.
- Periksa CSS.
- Periksa JavaScript.
- Periksa link dan asset.
- Periksa responsive/mobile.
- Periksa kemungkinan regresi.
- Pastikan halaman utama tetap dapat digunakan.

## 5. Commit
Gunakan commit message yang jelas dan spesifik.

Contoh:
- `feat: add service information section`
- `fix: repair mobile navigation`
- `style: improve hero section`
- `chore: update project checkpoint`

## 6. Pull Request
- Perubahan fitur penting harus melalui Pull Request.
- Jelaskan apa yang berubah.
- Jelaskan file yang terdampak.
- Jelaskan testing yang dilakukan.
- Jangan merge sebelum review.

## 7. Claude / AI coding agents
- Baca `CHECKPOINT.md` sebelum bekerja.
- Jangan mengubah `main` secara langsung.
- Jangan menghapus file tanpa verifikasi.
- Jangan membuat keputusan besar tentang arsitektur tanpa review.
- Setelah pekerjaan selesai, buat commit dan Pull Request.

## 8. Keamanan
- Jangan menyimpan password.
- Jangan menyimpan API key.
- Jangan menyimpan access token.
- Jangan menyimpan credential.
- Jangan memasukkan data pasien atau data pribadi sensitif ke repository publik.

## 9. Data pasien
Website publik dan sistem data pasien harus dipisahkan.

Repository website tidak boleh menjadi tempat penyimpanan:
- rekam medis
- NIK pasien
- nomor telepon pasien
- hasil pemeriksaan pasien
- data diagnosis
- credential sistem kesehatan

## 10. Media
- Optimalkan ukuran gambar dan video.
- Jangan mengganti asset yang masih digunakan tanpa pemeriksaan.
- Hindari duplikasi asset yang tidak diperlukan.

## 11. Quality Control
Setiap perubahan harus melewati:

ANALISIS
→ PERENCANAAN
→ BRANCH
→ IMPLEMENTASI
→ TESTING
→ REVIEW
→ PULL REQUEST
→ QC
→ MERGE

## 12. Prinsip utama
Lebih baik perubahan kecil yang aman daripada perubahan besar yang sulit dilacak.
