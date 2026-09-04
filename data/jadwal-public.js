/**
 * Sumber jadwal publik Puskesmas.
 * Hanya berisi informasi layanan publik — tanpa data pasien/PHI/PII.
 *
 * Prinsip:
 * - jadwal umum Puskesmas disimpan sekali di sini;
 * - setiap kegiatan diberi klaster;
 * - jadwal program yang belum memiliki tanggal/sesi lokal dipublikasikan
 *   sebagai "sesuai ketentuan/program" dan tidak ditebak.
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
      id: 'imunisasi-program',
      clusterId: 'klaster-2',
      category: 'Imunisasi',
      title: 'Pelayanan Imunisasi Program',
      schedule: 'Mengikuti jadwal program dan ketentuan Kementerian Kesehatan yang berlaku',
      status: 'terjadwal-menurut-program',
      detailUrl: 'pelayanan-imunisasi.html',
      note: 'Tanggal/sesi lokal dipublikasikan setelah ditetapkan Puskesmas.'
    }
  ]
});
