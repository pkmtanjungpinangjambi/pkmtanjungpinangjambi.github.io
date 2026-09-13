/* Beranda featured public services — UPTD Puskesmas Tanjung Pinang Kota Jambi */
(function () {
  'use strict';

  if (!document.body) return;
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const cells = Array.from(document.querySelectorAll('.info-bar .info-cell'));
  if (cells.length < 4) return;

  const featured = [
    { icon: '📅', title: 'Jadwal Pelayanan', href: 'jadwal.html', text: 'Lihat jadwal pelayanan lengkap →' },
    { icon: '💉', title: 'Jenis & Jadwal Imunisasi', href: 'pelayanan-imunisasi.html', text: 'Lihat jadwal imunisasi →' },
    { icon: '🏘️', title: 'Jadwal Posyandu', href: 'jadwal.html#posyandu-public', text: 'Lihat jadwal posyandu →' },
    { icon: '💰', title: 'Tarif Pelayanan', href: 'tarif.html', text: 'Lihat tarif pelayanan →' }
  ];

  featured.forEach((item, index) => {
    const cell = cells[index];
    if (!cell || cell.dataset.featuredServiceReady === '1') return;

    cell.dataset.featuredServiceReady = '1';
    cell.innerHTML = `
      <span class="info-ic" aria-hidden="true">${item.icon}</span>
      <div>
        <strong>${item.title}</strong>
        <a href="${item.href}">${item.text}</a>
      </div>`;
  });
})();
