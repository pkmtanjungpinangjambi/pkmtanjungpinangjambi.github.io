/* Galeri otomatis dari Google Drive (via Apps Script Web App) */
const DRIVE_API_URL = 'https://script.google.com/macros/s/AKfycbxI6dxAOs7Hq47xEaCEvEBP3LiaTWv9WJM7hYAIMirg0arfqcVEandfsqO_k4sCmDKt/exec';

(function () {
  'use strict';

  const grid = document.getElementById('galeri-grid');
  const status = document.getElementById('galeri-status');
  const beranda = document.getElementById('gt-foto-img');
  if (!grid && !beranda) return;

  const CACHE_KEY = 'pkm-gallery-cache-v1';
  const CACHE_TTL = 120000;
  const FETCH_TIMEOUT = 8000;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function thumb(id, w) {
    return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w' + w;
  }

  function normalizeData(d) {
    return {
      foto: Array.isArray(d && d.foto) ? d.foto.filter(function (item) { return item && item.id; }) : [],
      video: Array.isArray(d && d.video) ? d.video.filter(function (item) { return item && item.id; }) : []
    };
  }

  function cardFoto(it) {
    return '<a class="galeri-card" href="https://drive.google.com/uc?export=view&id=' + it.id +
      '" target="_blank" rel="noopener noreferrer" title="Lihat ukuran penuh">' +
      '<img src="' + thumb(it.id, 800) + '" alt="' + esc(it.name) + '" loading="lazy" decoding="async">' +
      '</a>';
  }

  function cardVideo(it) {
    return '<div class="galeri-card"><div class="galeri-video-frame">' +
      '<iframe src="https://drive.google.com/file/d/' + it.id + '/preview" title="' + esc(it.name) +
      '" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>' +
      '</div></div>';
  }

  let DATA = { foto: [], video: [] };

  function applyHashFilter() {
    const hash = (location.hash || '').replace('#', '');
    if (hash !== 'foto' && hash !== 'video') return;
    const button = document.querySelector('[data-galeri-filter="' + hash + '"]');
    if (button) button.click();
  }

  function render(filter) {
    if (!grid) return;
    let items = [];
    if (filter === 'foto') items = DATA.foto.map(cardFoto);
    else if (filter === 'video') items = DATA.video.map(cardVideo);
    else items = DATA.foto.map(cardFoto).concat(DATA.video.map(cardVideo));
    grid.innerHTML = items.length
      ? items.join('')
      : '<div class="galeri-empty">Belum ada konten. Unggah foto/video ke folder Google Drive Puskesmas.</div>';
  }

  function updateHomepagePreview() {
    const gtF = document.getElementById('gt-foto-img');
    const gtV = document.getElementById('gt-video-img');
    if (gtF && DATA.foto.length) {
      gtF.src = thumb(DATA.foto[0].id, 640);
      gtF.style.display = 'block';
    }
    if (gtV && DATA.video.length) {
      gtV.src = thumb(DATA.video[0].id, 640);
      gtV.style.display = 'block';
    }
  }

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      if (!cached || !cached.data || !Number.isFinite(cached.savedAt)) return null;
      if (Date.now() - cached.savedAt > CACHE_TTL) return null;
      return { data: normalizeData(cached.data), savedAt: cached.savedAt };
    } catch (_error) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: data }));
    } catch (_error) {
      // Storage can be disabled or unavailable; gallery still works online.
    }
  }

  function fetchFresh(hasCachedData) {
    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT);

    fetch(DRIVE_API_URL, { cache: 'no-store', signal: controller.signal })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        DATA = normalizeData(payload);
        writeCache(DATA);
        render('semua');
        updateHomepagePreview();
        applyHashFilter();
        if (status) status.textContent = 'Diperbarui otomatis dari Google Drive resmi Puskesmas.';
      })
      .catch(function (error) {
        if (hasCachedData) {
          if (status) status.textContent = 'Menampilkan data terakhir; pembaruan online belum tersedia.';
          return;
        }
        if (status) status.textContent = error && error.name === 'AbortError'
          ? 'Galeri belum merespons. Silakan coba lagi beberapa saat.'
          : 'Gagal memuat galeri: ' + (error && error.message ? error.message : 'koneksi bermasalah');
        if (grid) grid.innerHTML = '<div class="galeri-empty">Galeri belum dapat dimuat. Silakan coba lagi beberapa saat.</div>';
      })
      .finally(function () {
        clearTimeout(timer);
      });
  }

  if (!DRIVE_API_URL) {
    if (status) status.textContent = 'Galeri sedang disiapkan. Hubungkan Apps Script terlebih dahulu (lihat docs/cara-deploy-galeri.md).';
    if (grid) grid.innerHTML = '<div class="galeri-empty">Galeri akan terisi otomatis dari Google Drive.</div>';
    return;
  }

  const cached = readCache();
  if (cached) {
    DATA = cached.data;
    render('semua');
    updateHomepagePreview();
    applyHashFilter();
    if (status) status.textContent = 'Menampilkan data terakhir sambil memeriksa pembaruan…';
  }

  fetchFresh(Boolean(cached));

  document.querySelectorAll('[data-galeri-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-galeri-filter]').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      render(btn.dataset.galeriFilter);
    });
  });
})();

/* Beranda — loader modul 10 ikon menu. Guarded to homepage only. */
(function () {
  'use strict';
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;
  if (document.querySelector('script[data-home-menu-icons="1"]')) return;
  const script = document.createElement('script');
  script.src = './home-menu-icons.js?v=20260906-icons1';
  script.defer = true;
  script.dataset.homeMenuIcons = '1';
  document.head.appendChild(script);
})();
