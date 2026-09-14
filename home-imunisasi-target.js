/* Home quick-access targets — UPTD Puskesmas Tanjung Pinang Kota Jambi */
(function () {
  'use strict';
  if (!document.body) return;
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const cells = document.querySelectorAll('.info-bar .info-cell');
  const immunizationTarget = Array.from(cells).find((cell) => cell.querySelector('strong')?.textContent.trim() === 'Mobile JKN');
  if (immunizationTarget && immunizationTarget.dataset.immunizationTargetReady !== '1') {
    immunizationTarget.dataset.immunizationTargetReady = '1';
    immunizationTarget.innerHTML = '<span class="info-ic" aria-hidden="true">💉</span><div><strong>Jenis &amp; Jadwal Imunisasi</strong><a href="pelayanan-imunisasi.html">Lihat jadwal lengkap →</a></div>';
  }

  const grid = document.querySelector('#menu-utama .icon-grid');
  if (!grid || grid.querySelector('[data-home-izin-keluar]')) return;
  const card = document.createElement('a');
  card.className = 'icon-card home-izin-card';
  card.dataset.homeIzinKeluar = '1';
  card.href = 'izin-keluar-petugas.html';
  card.title = 'Izin Keluar Petugas — Klaster 1 Manajemen';
  card.innerHTML = '<div class="icon-card-img" aria-hidden="true"><span style="font-size:52px;line-height:1">🚪</span></div><span class="icon-card-label">Izin Keluar Petugas</span>';
  grid.appendChild(card);
})();
