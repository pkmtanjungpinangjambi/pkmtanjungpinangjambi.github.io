/* Home quick-access target — UPTD Puskesmas Tanjung Pinang Kota Jambi */
(function () {
  'use strict';

  if (!document.body) return;
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const cells = document.querySelectorAll('.info-bar .info-cell');
  if (!cells.length) return;

  const target = Array.from(cells).find((cell) => {
    const title = cell.querySelector('strong');
    return title?.textContent.trim() === 'Mobile JKN';
  });

  if (!target || target.dataset.immunizationTargetReady === '1') return;

  target.dataset.immunizationTargetReady = '1';
  target.innerHTML = `
    <span class="info-ic" aria-hidden="true">💉</span>
    <div>
      <strong>Jenis &amp; Jadwal Imunisasi</strong>
      <a href="pelayanan-imunisasi.html">Lihat jadwal lengkap →</a>
    </div>`;
})();
