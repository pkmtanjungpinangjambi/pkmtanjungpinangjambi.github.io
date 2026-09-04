/* Beranda culture module v4 — existing Library asset: BerAKHLAK + 5S. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const TARGET = 'profil.html#motto-tata-nilai';

  const addStyle = () => {
    if (document.getElementById('home-culture-v4-style')) return;
    const style = document.createElement('style');
    style.id = 'home-culture-v4-style';
    style.textContent = `
      .home-culture-v4{margin:18px auto 10px}
      .culture-shell{display:grid;grid-template-columns:1fr 1.05fr;gap:18px;align-items:stretch;padding:20px;border:1px solid #dce9e4;border-radius:22px;background:linear-gradient(135deg,#f8fcfa,#eef7f3);box-shadow:0 12px 30px rgba(0,59,45,.06)}
      .culture-copy{padding:5px 4px;display:flex;flex-direction:column;justify-content:center}
      .culture-kicker{margin:0 0 5px;color:#0b5d49;font-size:.7rem;font-weight:950;letter-spacing:.09em;text-transform:uppercase}
      .culture-title{margin:0;color:#183b33;font-size:clamp(1.3rem,2.8vw,1.9rem);font-weight:950;line-height:1.18}
      .culture-sub{margin:8px 0 14px;color:#65756e;font-size:.83rem;line-height:1.6;max-width:610px}
      .culture-links{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .culture-link{display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #d9e8e2;border-radius:15px;background:#fff;text-decoration:none;color:inherit;transition:transform .2s,box-shadow .2s,border-color .2s}
      .culture-link:hover,.culture-link:focus-visible{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,59,45,.08);border-color:#0b5d49;outline:none}
      .culture-icon{width:38px;height:38px;flex:0 0 38px;display:grid;place-items:center;border-radius:11px;background:#f0f7f4;font-weight:950;font-size:.88rem;color:#0b5d49}
      .culture-link strong{display:block;color:#183b33;font-size:.78rem;line-height:1.2}
      .culture-link span{display:block;color:#77837e;font-size:.65rem;line-height:1.4;margin-top:3px}
      .culture-art-link{display:block;position:relative;min-height:300px;border-radius:18px;overflow:hidden;background:#fff;border:1px solid #dce9e4;box-shadow:0 10px 24px rgba(0,59,45,.05);text-decoration:none}
      .culture-art-link:focus-visible{outline:3px solid rgba(11,93,73,.3);outline-offset:3px}
      .culture-art-image{display:block;width:100%;height:100%;min-height:300px;object-fit:cover;object-position:center;background:#f3f8f5}
      .culture-art-overlay{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:13px;background:rgba(255,255,255,.92);box-shadow:0 8px 20px rgba(0,59,45,.12);backdrop-filter:blur(4px)}
      .culture-art-overlay strong{color:#183b33;font-size:.76rem}
      .culture-art-overlay span{color:#0b5d49;font-size:.68rem;font-weight:900;white-space:nowrap}
      .culture-mini{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:11px;border-top:1px dashed #d6e5df}
      .culture-mini span{color:#68766f;font-size:.67rem;line-height:1.4}
      .culture-mini a{color:#0b5d49;font-size:.68rem;font-weight:900;text-decoration:none;white-space:nowrap}
      .leader-badges .culture-badge-link{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid #d8ebe5;border-radius:999px;padding:5px 10px;font-size:.74rem;font-weight:900;color:#0b5d49;text-decoration:none}
      .leader-badges .culture-badge-link:hover{border-color:#0b5d49;transform:translateY(-1px)}
      @media(max-width:860px){.culture-shell{grid-template-columns:1fr}.culture-art-link{min-height:260px}.culture-art-image{min-height:260px}}
      @media(max-width:520px){.culture-links{grid-template-columns:1fr}.culture-art-link,.culture-art-image{min-height:220px}.culture-art-overlay{display:block}.culture-art-overlay span{display:block;margin-top:4px}}
    `;
    document.head.appendChild(style);
  };

  const normalizeLeader = () => {
    const box = document.querySelector('.leader-badges');
    if (!box || box.dataset.cultureReady === '1') return;
    box.dataset.cultureReady = '1';
    box.innerHTML = '';

    const make = (emoji, label, text) => {
      const a = document.createElement('a');
      a.className = 'culture-badge-link';
      a.href = TARGET;
      a.title = text;
      a.textContent = `${emoji} ${label}`;
      return a;
    };

    box.append(
      make('🛡️', 'BerAKHLAK', 'Lihat Tata Nilai BerAKHLAK di Profil'),
      make('😊', '5S', 'Lihat Motto 5S di Profil')
    );
  };

  const render = () => {
    if (document.getElementById('home-culture-v4')) return;
    const main = document.querySelector('main');
    if (!main) return;

    normalizeLeader();

    const section = document.createElement('section');
    section.id = 'home-culture-v4';
    section.className = 'container home-culture-v4';

    const shell = document.createElement('div');
    shell.className = 'culture-shell';

    const copy = document.createElement('div');
    copy.className = 'culture-copy';

    const kicker = document.createElement('p');
    kicker.className = 'culture-kicker';
    kicker.textContent = 'IDENTITAS BUDAYA PELAYANAN';

    const title = document.createElement('h2');
    title.className = 'culture-title';
    title.textContent = 'BerAKHLAK dalam pelayanan, 5S dalam setiap pertemuan.';

    const sub = document.createElement('p');
    sub.className = 'culture-sub';
    sub.textContent = 'Nilai BerAKHLAK memberi arah perilaku profesional, sedangkan 5S menjadi budaya komunikasi yang ramah, sopan, dan dekat dengan masyarakat.';

    const links = document.createElement('div');
    links.className = 'culture-links';

    const items = [
      ['🛡️', 'BerAKHLAK', '7 nilai ASN', 'Tata Nilai BerAKHLAK'],
      ['😊', '5S', 'Senyum · Sapa · Salam · Sopan · Santun', 'Motto 5S']
    ];
    items.forEach(([icon, label, desc, titleText]) => {
      const a = document.createElement('a');
      a.className = 'culture-link';
      a.href = TARGET;
      a.title = `Buka ${titleText}`;
      const iconEl = document.createElement('span');
      iconEl.className = 'culture-icon';
      iconEl.textContent = icon;
      const textWrap = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = label;
      const small = document.createElement('span');
      small.textContent = desc;
      textWrap.append(strong, small);
      a.append(iconEl, textWrap);
      links.appendChild(a);
    });

    const mini = document.createElement('div');
    mini.className = 'culture-mini';
    const miniText = document.createElement('span');
    miniText.textContent = 'Profil adalah sumber detail tata nilai dan motto.';
    const miniLink = document.createElement('a');
    miniLink.href = TARGET;
    miniLink.textContent = 'Buka Motto & Tata Nilai →';
    mini.append(miniText, miniLink);

    copy.append(kicker, title, sub, links, mini);

    const art = document.createElement('a');
    art.className = 'culture-art-link';
    art.href = TARGET;
    art.setAttribute('aria-label', 'Buka Motto dan Tata Nilai: BerAKHLAK dan 5S');

    const image = document.createElement('img');
    image.className = 'culture-art-image';
    image.src = 'assets/culture/berakhlak-5s.svg';
    image.alt = 'BerAKHLAK dan 5S — budaya pelayanan UPTD Puskesmas Tanjung Pinang';
    image.loading = 'lazy';
    image.decoding = 'async';

    const overlay = document.createElement('div');
    overlay.className = 'culture-art-overlay';
    const overlayTitle = document.createElement('strong');
    overlayTitle.textContent = 'BerAKHLAK + 5S';
    const overlayLink = document.createElement('span');
    overlayLink.textContent = 'Lihat Motto & Tata Nilai →';
    overlay.append(overlayTitle, overlayLink);

    art.append(image, overlay);
    shell.append(copy, art);
    section.appendChild(shell);

    const dashboard = document.getElementById('home-v4');
    const infoBar = main.querySelector('.info-bar');
    if (dashboard) dashboard.insertAdjacentElement('afterend', section);
    else if (infoBar) infoBar.insertAdjacentElement('afterend', section);
    else main.insertBefore(section, main.firstElementChild);
  };

  addStyle();
  render();
})();
