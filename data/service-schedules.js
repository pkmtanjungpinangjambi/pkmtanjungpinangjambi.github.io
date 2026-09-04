window.SERVICE_SCHEDULES = {
  operatingHours: [
    { days: 'Senin–Kamis', time: '07.15–13.45 WIB', status: 'open' },
    { days: 'Jumat', time: '07.15–10.30 WIB', status: 'open' },
    { days: 'Sabtu', time: '07.15–13.30 WIB', status: 'open' },
    { days: 'Minggu & Hari Libur Nasional', time: 'Tutup', status: 'closed' }
  ],
  registration: {
    mobileJkn: '12.30 WIB',
    direct: '13.30 WIB'
  },
  services: [
    {
      id: 'imunisasi',
      title: 'Pelayanan Imunisasi',
      category: 'Klaster 2',
      active: true,
      schedules: [
        { day: 'Selasa', time: '08.00–12.00 WIB' },
        { day: 'Kamis', time: '08.00–12.00 WIB' }
      ],
      special: ['Hepatitis B bayi 0–7 hari — setiap hari'],
      note: 'Bayi/balita sehat, membawa Buku KIA dan fotokopi Kartu Keluarga.'
    }
  ]
};
