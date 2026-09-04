/**
 * Sumber jadwal publik Puskesmas.
 * Hanya berisi informasi layanan publik — tanpa data pasien/PHI/PII.
 *
 * Posyandu dicatat sebagai jejaring yang dikelola melalui Klaster 1,
 * sedangkan sasaran kegiatan dapat terhubung ke Klaster 2 dan Klaster 3.
 */
window.JADWAL_PUBLIC = Object.freeze({
  updatedAt: '2026-09-04',
  serviceHours: [
    { day: 'Senin–Kamis', time: '07.15–13.45 WIB', cluster: 'all' },
    { day: 'Jumat', time: '07.15–10.30 WIB', cluster: 'all' },
    { day: 'Sabtu', time: '07.15–13.30 WIB', cluster: 'all' },
    { day: 'Minggu & Hari Libur Nasional', time: 'Tutup', cluster: 'all' }
  ],
  registration: {
    mobileJkn: 'Ditutup 12.30 WIB',
    onsite: 'Ditutup 13.30 WIB'
  },
  activities: [
    {
      id: 'posyandu',
      managementClusterId: 'klaster-1',
      serviceClusterIds: ['klaster-2', 'klaster-3'],
      category: 'Jejaring Posyandu',
      title: 'Kegiatan Posyandu',
      schedule: 'Mengikuti jadwal Posyandu masing-masing wilayah/kelurahan',
      status: 'menunggu-jadwal-lokal',
      detailUrl: 'pelayanan.html#klaster-1',
      note: 'Posyandu merupakan jejaring pelayanan; tanggal/sesi lokal dipublikasikan setelah ditetapkan Puskesmas/wilayah terkait.'
    },
    {
      id: 'imunisasi-program',
      managementClusterId: 'klaster-1',
      serviceClusterIds: ['klaster-2'],
      category: 'Imunisasi',
      title: 'Pelayanan Imunisasi Program',
      schedule: 'Mengikuti jadwal program dan ketentuan Kementerian Kesehatan yang berlaku',
      status: 'terjadwal-menurut-program',
      detailUrl: 'pelayanan-imunisasi.html',
      note: 'Tanggal/sesi lokal dipublikasikan setelah ditetapkan Puskesmas.'
    }
  ]
});
