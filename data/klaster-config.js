/**
 * Kontrak struktur data publik untuk 5 Klaster Pelayanan Puskesmas.
 * Metadata saja — tidak mengandung data pasien/rekam medis.
 *
 * Posyandu bukan klaster Puskesmas. Posyandu diposisikan sebagai
 * jejaring yang dikelola/dibina melalui Klaster 1 (Manajemen Jejaring),
 * sementara kegiatan Posyandu dapat melayani sasaran pada Klaster 2 dan 3.
 */
window.KLASTER_CONFIG = Object.freeze([
  {
    id: 'klaster-1', code: 'K1', name: 'Manajemen',
    scope: 'Ketatausahaan, tata kelola, SDM, mutu, jejaring, pemberdayaan, dan pembinaan Posyandu/UKBM',
    dataModules: ['Administrasi', 'SDM', 'Sarana & Prasarana', 'Mutu & Keselamatan', 'Manajemen Jejaring', 'Posyandu & UKBM', 'Pemberdayaan'],
    operationalModules: ['Jadwal', 'PWS/Jejaring', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-2', code: 'K2', name: 'Ibu & Anak',
    scope: 'Pelayanan kesehatan ibu, bayi, balita, anak, remaja, dan imunisasi',
    dataModules: ['Ibu Hamil', 'ANC', 'Triple Eliminasi', 'SIHEPI', 'Bayi & Balita', 'Anak & Remaja', 'Imunisasi'],
    operationalModules: ['Jadwal', 'Jadwal Imunisasi', 'Skrining', 'Tindak Lanjut', 'Monev', 'Indikator', 'Evidence']
  },
  {
    id: 'klaster-3', code: 'K3', name: 'Dewasa & Lansia',
    scope: 'Pelayanan kesehatan usia dewasa dan lansia serta skrining dan tindak lanjut',
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
    scope: 'Pelayanan penunjang dan layanan/program yang mendukung lebih dari satu klaster',
    dataModules: ['Promosi Kesehatan', 'Gizi', 'Kesehatan Lingkungan', 'Kegawatdaruratan', 'Program Prioritas'],
    operationalModules: ['Jadwal', 'Rujukan/Koordinasi', 'Monev', 'Indikator', 'Evidence']
  }
]);

/* Home-only culture bootstrap: this data file is already loaded by the public dashboard. */
(function(){
  if (!document || !document.head) return;
  if (window.__PKM_HOME_CULTURE_BOOTSTRAPPED) return;
  if (!/\/index\.html$|\/$/.test(window.location.pathname)) return;
  window.__PKM_HOME_CULTURE_BOOTSTRAPPED = true;
  var s = document.createElement('script');
  s.src = 'home-culture-v4.js?v=20260904-asset1';
  s.defer = true;
  document.head.appendChild(s);
})();
