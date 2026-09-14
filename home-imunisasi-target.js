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
})();
