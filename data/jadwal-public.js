/**
 * Sumber jadwal publik Puskesmas.
 * Hanya berisi informasi layanan publik — tanpa data pasien/PHI/PII.
 *
 * Posyandu dicatat sebagai jejaring yang dikelola melalui Klaster 1,
 * sedangkan sasaran kegiatan dapat terhubung ke Klaster 2 dan Klaster 3.
 * Jadwal imunisasi mengikuti ketentuan Kementerian Kesehatan yang berlaku.
 */
window.JADWAL_PUBLIC = Object.freeze({
  updatedAt: '2026-09-06',
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
  immunization: {
    sourceTitle: 'Jadwal Imunisasi Rutin Lengkap & BIAS',
    sourceUrl: 'https://ayosehat.kemkes.go.id/1000-hari-pertama-kehidupan/seputar-imunisasi',
    legalBasis: 'Keputusan Menteri Kesehatan Nomor HK.01.07/Menkes/35/2025',
    infantBaduta: [
      { age: '0 bulan', vaccine: 'Hepatitis B (HB0)' },
      { age: '1 bulan', vaccine: 'BCG, Polio Tetes 1 (bOPV 1)' },
      { age: '2 bulan', vaccine: 'DPT-HB-Hib 1, Polio Tetes 2 (bOPV 2), PCV 1, Rotavirus 1' },
      { age: '3 bulan', vaccine: 'DPT-HB-Hib 2, Polio Tetes 3 (bOPV 3), PCV 2, Rotavirus 2' },
      { age: '4 bulan', vaccine: 'DPT-HB-Hib 3, Polio Tetes 4 (bOPV 4), Polio Suntik (IPV 1), Rotavirus 3' },
      { age: '9 bulan', vaccine: 'Campak Rubela 1, Polio Suntik (IPV 2)' },
      { age: '10 bulan', vaccine: 'Japanese Ensefalitis (JE) di wilayah endemis JE' },
      { age: '12 bulan', vaccine: 'PCV 3' },
      { age: '18 bulan', vaccine: 'DPT-HB-Hib 4, Campak Rubela 2' }
    ],
    bias: [
      { target: 'Kelas 1 SD / usia 7 tahun', vaccine: 'Campak Rubela', month: 'Agustus' },
      { target: 'Kelas 1 SD / usia 7 tahun', vaccine: 'DT', month: 'November' },
      { target: 'Kelas 2 SD / usia 8 tahun', vaccine: 'Td', month: 'November' },
      { target: 'Kelas 5 SD / usia 11 tahun', vaccine: 'HPV', month: 'Agustus' },
      { target: 'Kelas 5 SD / usia 11 tahun', vaccine: 'Td', month: 'November' },
      { target: 'Kelas 6 SD / usia 12 tahun', vaccine: 'HPV', month: 'Agustus' },
      { target: 'Kelas 9 SMP / usia 15 tahun', vaccine: 'HPV', month: 'Agustus' }
    ],
    note: 'Jadwal dosis mengikuti jenis vaksin dan sasaran. BIAS dilaksanakan setiap tahun; tanggal/sesi lokal Puskesmas diumumkan setelah ditetapkan.'
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
      title: 'Jadwal Imunisasi Program',
      schedule: 'Bayi/baduta: 0 bln HB0; 1 bln BCG+OPV1; 2 bln DPT-HB-Hib1+OPV2+PCV1+RV1; 3 bln DPT-HB-Hib2+OPV3+PCV2+RV2; 4 bln DPT-HB-Hib3+OPV4+IPV1+RV3; 9 bln MR1+IPV2; 10 bln JE*; 12 bln PCV3; 18 bln DPT-HB-Hib4+MR2. BIAS: K1 MR (Agu) + DT (Nov); K2 Td (Nov); K5 HPV (Agu) + Td (Nov); K6 HPV (Agu); K9 HPV (Agu).',
      status: 'terjadwal-menurut-program',
      detailUrl: 'pelayanan-imunisasi.html',
      note: '* JE untuk wilayah endemis JE. Jadwal dosis mengikuti sasaran dan ketentuan program; tanggal/sesi lokal Puskesmas diumumkan setelah ditetapkan.'
    }
  ]
});
