/**
 * Kontrak struktur data publik untuk 5 Klaster Pelayanan Puskesmas.
 * Metadata saja — tidak mengandung data pasien/rekam medis.
 */
window.KLASTER_CONFIG = Object.freeze([
  {
    id: 'klaster-1', code: 'K1', name: 'Manajemen',
    scope: 'Ketatausahaan, tata kelola, SDM, mutu, jejaring, dan pemberdayaan',
    dataModules: ['Administrasi', 'SDM', 'Sarana & Prasarana', 'Mutu & Keselamatan', 'Jejaring', 'Pemberdayaan'],
    operationalModules: ['Jadwal', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-2', code: 'K2', name: 'Ibu & Anak',
    scope: 'Pelayanan kesehatan ibu, bayi, balita, anak, dan imunisasi',
    dataModules: ['Ibu Hamil', 'ANC', 'Triple Eliminasi', 'SIHEPI', 'Bayi & Balita', 'Imunisasi'],
    operationalModules: ['Jadwal', 'Jadwal Imunisasi', 'Skrining', 'Tindak Lanjut', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-3', code: 'K3', name: 'Dewasa & Lansia',
    scope: 'Pelayanan dewasa, penyakit tidak menular, kesehatan jiwa, dan lansia',
    dataModules: ['Dewasa', 'Lansia', 'Hipertensi', 'Diabetes', 'Kesehatan Jiwa', 'Skrining CKG'],
    operationalModules: ['Jadwal', 'Skrining', 'Risiko', 'Tindak Lanjut', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-4', code: 'K4', name: 'Penyakit Menular',
    scope: 'Pencegahan, penemuan, tata laksana, dan pemantauan penyakit menular',
    dataModules: ['TB', 'HIV', 'Diare', 'ISPA', 'Penyakit Tular Vektor', 'Penyakit Menular Lain'],
    operationalModules: ['Surveilans', 'Jadwal', 'Tindak Lanjut', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-5', code: 'K5', name: 'Lintas Klaster',
    scope: 'Program dan layanan yang mendukung lebih dari satu klaster',
    dataModules: ['Promosi Kesehatan', 'Gizi', 'Kesehatan Lingkungan', 'Kegawatdaruratan', 'Program Prioritas'],
    operationalModules: ['Jadwal', 'Rujukan/Koordinasi', 'Monev', 'Indikator', 'Evidence']
  }
]);
