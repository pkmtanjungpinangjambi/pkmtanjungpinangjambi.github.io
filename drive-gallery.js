/* Galeri otomatis dari Google Drive (via Apps Script Web App) */
const DRIVE_API_URL = ''; // <- ISI URL Web App yang berakhiran /exec setelah deploy Apps Script

(function () {
  const grid = document.getElementById('galeri-grid');
  const status = document.getElementById('galeri-status');
  if (!grid) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
  function thumb(id, w) { return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + w; }

  function cardFoto(it) {
    return '<a class="galeri-card" href="https://drive.google.com/uc?export=view&id=' + it.id +
      '" target="_blank" rel="noopener noreferrer" title="Lihat ukuran penuh">' +
      '<img src="' + thumb(it.id, 800) + '" alt="' + esc(it.name) + '" loading="lazy">' +
      '<span class="galeri-caption">' + esc(it.name) + '</span></a>';
  }

  function cardVideo(it) {
    return '<div class="galeri-card"><div class="galeri-video-frame">' +
      '<iframe src="https://drive.google.com/file/d/' + it.id + '/preview" title="' + esc(it.name) +
      '" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe></div>' +
      '<span class="galeri-caption">' + esc(it.name) + '</span></div>';
  }

  let DATA = null;

  function render(filter) {
    if (!DATA) return;
    let items = [];
    if (filter === 'foto') items = DATA.foto.map(cardFoto);
    else if (filter === 'video') items = DATA.video.map(cardVideo);
    else items = DATA.foto.map(cardFoto).concat(DATA.video.map(cardVideo));
    grid.innerHTML = items.length ? items.join('') : '<div class="galeri-empty">Belum ada konten. Unggah foto/video ke folder Google Drive Puskesmas.</div>';
  }

  if (!DRIVE_API_URL) {
    status.textContent = 'Galeri sedang disiapkan. Hubungkan Apps Script terlebih dahulu (lihat docs/cara-deploy-galeri.md).';
    grid.innerHTML = '<div class="galeri-empty">Galeri akan terisi otomatis dari Google Drive.</div>';
    return;
  }

  fetch(DRIVE_API_URL, { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (d) {
      DATA = d;
      render('semua');
      status.textContent = 'Diperbarui otomatis dari Google Drive resmi Puskesmas.';
    })
    .catch(function (e) {
      status.textContent = 'Gagal memuat galeri: ' + e.message;
    });

  document.querySelectorAll('[data-galeri-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-galeri-filter]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.dataset.galeriFilter);
    });
  });
})();