/*
 * Beranda — blok "Sedang Relevan" dinamis.
 * Menampilkan fokus layanan spesifik yang dapat berubah tanpa mengubah navigasi utama.
 */
(function () {
  'use strict';

  const relevantItems = [
    { icon: '🩺', tag: 'FOKUS LAYANAN', title: 'Skrining Kesehatan Gratis (CKG)', text: 'Informasi layanan skrining kesehatan gratis dan akses layanan terkait bagi masyarakat.', href: 'pelayanan-ckg.html', cta: 'Lihat layanan →' },
    { icon: '💉', tag: 'PENCEGAHAN', title: 'Imunisasi Anak', text: 'Jadwal, sasaran, dan informasi pelayanan imunisasi di Puskesmas Tanjung Pinang.', href: 'pelayanan-imunisasi.html', cta: 'Lihat layanan →' },
    { icon: '🦠', tag: 'PENYAKIT MENULAR', title: 'Tuberkulosis (TB)', text: 'Kenali gejala, pemeriksaan, dan akses pengobatan TB tanpa biaya obat.', href: 'pelayanan-tuberkulosis.html', cta: 'Info TB →' },
    { icon: '🤰', tag: 'IBU & ANAK', title: 'Kesehatan Ibu Hamil', text: 'ANC dan pelayanan terpadu untuk menjaga kesehatan ibu dan bayi sejak awal kehamilan.', href: 'pelayanan-ibu-hamil-bersalin-nifas.html', cta: 'Lihat layanan →' },
    { icon: '🫀', tag: 'DEWASA', title: 'Skrining Penyakit Tidak Menular', text: 'Pemeriksaan dan pencegahan dini hipertensi, diabetes, dan risiko kesehatan lainnya.', href: 'pelayanan-kesehatan-dewasa.html', cta: 'Lihat layanan →' }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function addStyles() {
    if (document.getElementById('home-relevant-style')) return;
    const style = document.createElement('style');
    style.id = 'home-relevant-style';
    style.textContent = `
      #home-most-searched.home-relevant{padding:38px 0 44px;background:linear-gradient(180deg,#f8fcfa,#ffffff);border-top:1px solid rgba(11,122,75,.08);border-bottom:1px solid rgba(11,122,75,.08)}
      #home-most-searched.home-relevant .relevant-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}
      #home-most-searched.home-relevant .relevant-kicker{display:inline-flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;background:#fff5e8;color:#9a5b00;font-size:.72rem;font-weight:900;letter-spacing:.05em;text-transform:uppercase;border:1px solid #f1dfbf}
      #home-most-searched.home-relevant h2{margin:9px 0 5px;color:var(--green-950);font-size:clamp(1.5rem,3vw,2.05rem);line-height:1.15}
      #home-most-searched.home-relevant .relevant-sub{margin:0;color:var(--muted);font-size:.84rem;line-height:1.5}
      #home-most-searched.home-relevant .relevant-window{position:relative;overflow:hidden;border-radius:22px;box-shadow:0 16px 38px rgba(0,59,45,.08);background:#fff;border:1px solid var(--line)}
      #home-most-searched.home-relevant .relevant-track{display:flex;transform:translateX(0);transition:transform .65s cubic-bezier(.2,.7,.2,1)}
      #home-most-searched.home-relevant .relevant-slide{min-width:100%;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:22px;padding:22px 24px;background:linear-gradient(135deg,#ffffff 0%,#f4fbf7 58%,#edf8f2 100%)}
      #home-most-searched.home-relevant .relevant-icon{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(145deg,#eaf8f1,#ffffff);border:1px solid rgba(11,122,75,.11);font-size:1.85rem;box-shadow:0 10px 22px rgba(0,59,45,.08)}
      #home-most-searched.home-relevant .relevant-copy{min-width:0}
      #home-most-searched.home-relevant .relevant-tag{font-size:.64rem;font-weight:900;letter-spacing:.08em;color:var(--green-700)}
      #home-most-searched.home-relevant .relevant-title{margin:4px 0 5px;font-size:1.08rem;font-weight:900;line-height:1.25;color:var(--green-950)}
      #home-most-searched.home-relevant .relevant-text{margin:0;max-width:760px;color:#586d66;font-size:.8rem;line-height:1.55}
      #home-most-searched.home-relevant .relevant-cta{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;padding:9px 14px;border-radius:999px;background:var(--green-950);color:#fff;text-decoration:none;font-size:.74rem;font-weight:900;transition:transform .2s ease,box-shadow .2s ease}
      #home-most-searched.home-relevant .relevant-cta:hover,#home-most-searched.home-relevant .relevant-cta:focus-visible{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,59,45,.18);outline:none}
      #home-most-searched.home-relevant .relevant-controls{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:12px}
      #home-most-searched.home-relevant .relevant-dots{display:flex;align-items:center;gap:6px}
      #home-most-searched.home-relevant .relevant-dot{width:7px;height:7px;padding:0;border:0;border-radius:50%;background:#c9ddd5;cursor:pointer;transition:width .2s ease,background .2s ease}
      #home-most-searched.home-relevant .relevant-dot.is-active{width:20px;border-radius:999px;background:var(--green-700)}
      #home-most-searched.home-relevant .relevant-nav{display:flex;gap:6px}
      #home-most-searched.home-relevant .relevant-nav button{width:34px;height:34px;padding:0;border-radius:10px;border:1px solid var(--line);background:#fff;color:var(--green-900);font-size:.9rem;font-weight:900;cursor:pointer}
      #home-most-searched.home-relevant .relevant-nav button:hover,#home-most-searched.home-relevant .relevant-nav button:focus-visible{background:var(--green-100);outline:none}
      @media(max-width:700px){
        #home-most-searched.home-relevant{padding:32px 0 38px}
        #home-most-searched.home-relevant .relevant-head{display:block}
        #home-most-searched.home-relevant .relevant-slide{grid-template-columns:auto 1fr;gap:14px;padding:18px}
        #home-most-searched.home-relevant .relevant-cta{grid-column:2;justify-self:start;margin-top:2px}
      }
      @media(max-width:480px){
        #home-most-searched.home-relevant .relevant-icon{width:54px;height:54px;border-radius:15px;font-size:1.5rem}
        #home-most-searched.home-relevant .relevant-title{font-size:.98rem}
        #home-most-searched.home-relevant .relevant-text{font-size:.74rem}
      }
      @media(prefers-reduced-motion:reduce){#home-most-searched.home-relevant .relevant-track{transition:none}}
    `;
    document.head.appendChild(style);
  }

  function buildSection(section) {
    section.classList.add('home-relevant');
    section.setAttribute('aria-labelledby', 'home-relevant-title');
    const slides = relevantItems.map(function (item) {
      return '<article class="relevant-slide"><span class="relevant-icon" aria-hidden="true">' + escapeHtml(item.icon) + '</span><div class="relevant-copy"><span class="relevant-tag">' + escapeHtml(item.tag) + '</span><h2 class="relevant-title">' + escapeHtml(item.title) + '</h2><p class="relevant-text">' + escapeHtml(item.text) + '</p></div><a class="relevant-cta" href="' + escapeHtml(item.href) + '">' + escapeHtml(item.cta) + '</a></article>';
    }).join('');

    section.innerHTML = '<div class="container"><div class="relevant-head"><div><span class="relevant-kicker">⚡ Sedang Relevan</span><h2 id="home-relevant-title">Fokus Layanan Saat Ini</h2><p class="relevant-sub">Topik layanan yang sedang kami prioritaskan atau informasikan kepada masyarakat.</p></div></div><div class="relevant-window" role="region" aria-roledescription="carousel" aria-label="Fokus layanan saat ini"><div class="relevant-track">' + slides + '</div></div><div class="relevant-controls"><div class="relevant-dots" aria-label="Pilihan topik"></div><div class="relevant-nav"><button type="button" class="relevant-prev" aria-label="Topik sebelumnya">‹</button><button type="button" class="relevant-next" aria-label="Topik berikutnya">›</button></div></div></div>';
  }

  function initCarousel(section) {
    const track = section.querySelector('.relevant-track');
    const dots = section.querySelector('.relevant-dots');
    const previous = section.querySelector('.relevant-prev');
    const next = section.querySelector('.relevant-next');
    if (!track || !dots || !previous || !next) return;

    let index = 0;
    let timer = null;

    relevantItems.forEach(function (_, itemIndex) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'relevant-dot' + (itemIndex === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Tampilkan topik ' + (itemIndex + 1));
      dot.addEventListener('click', function () { goTo(itemIndex, true); });
      dots.appendChild(dot);
    });

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      Array.from(dots.children).forEach(function (dot, dotIndex) { dot.classList.toggle('is-active', dotIndex === index); });
    }

    function goTo(nextIndex, manual) {
      index = (nextIndex + relevantItems.length) % relevantItems.length;
      render();
      if (manual) restart();
    }

    function restart() {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(function () { goTo(index + 1, false); }, 6500);
    }

    previous.addEventListener('click', function () { goTo(index - 1, true); });
    next.addEventListener('click', function () { goTo(index + 1, true); });

    const windowEl = section.querySelector('.relevant-window');
    if (windowEl) {
      windowEl.addEventListener('mouseenter', function () { if (timer) window.clearInterval(timer); });
      windowEl.addEventListener('mouseleave', restart);
      windowEl.addEventListener('focusin', function () { if (timer) window.clearInterval(timer); });
      windowEl.addEventListener('focusout', function (event) { if (!windowEl.contains(event.relatedTarget)) restart(); });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) window.clearInterval(timer); }
      else restart();
    });

    render();
    restart();
  }

  function init() {
    const section = document.getElementById('home-most-searched');
    if (!section) return;
    addStyles();
    buildSection(section);
    initCarousel(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
