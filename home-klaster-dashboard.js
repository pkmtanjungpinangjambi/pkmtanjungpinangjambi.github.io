/* Public dashboard: five service clusters + schedule + referral network. No patient/PHI data. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const loadScript = (src, ready, failMessage) => {
    if (ready()) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => ready() || undefined;
    script.onerror = () => console.warn(failMessage);
    document.head.appendChild(script);
  };

  const loadAllSources = (done) => {
    const tryDone = () => {
      if (Array.isArray(window.KLASTER_CONFIG)) {
        done({
          config: window.KLASTER_CONFIG,
          schedule: window.JADWAL_PUBLIC || null,
          network: window.JEJARING_PUBLIC || null
        });
        return true;
      }
      return false;
    };

    if (tryDone()) return;
    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (tryDone() || attempts >= 30) window.clearInterval(interval);
    }, 100);

    if (!Array.isArray(window.KLASTER_CONFIG)) {
      loadScript('data/klaster-config.js?v=20260904', tryDone, '[PKM] Konfigurasi klaster gagal dimuat.');
    }
    if (!window.JADWAL_PUBLIC) {
      loadScript('data/jadwal-public.js?v=20260904', () => !!window.JADWAL_PUBLIC, '[PKM] Sumber jadwal publik gagal dimuat.');
    }
    if (!window.JEJARING_PUBLIC) {
      loadScript('data/jejaring-public.js?v=20260904', () => !!window.JEJARING_PUBLIC, '[PKM] Sumber jejaring publik gagal dimuat.');
    }
  };

  function style() {
    if (document.getElementById('home-klaster-dashboard-style')) return;
    const s = document.createElement('style');
    s.id = 'home-klaster-dashboard-style';
    s.textContent = `
      .home-klaster-dashboard{margin:34px auto 0;padding:24px;border:1px solid #dbe9e3;border-radius:22px;background:linear-gradient(180deg,#fbfefd,#f2f8f5);box-shadow:0 10px 30px rgba(0,59,45,.07)}
      .home-klaster-head{text-align:center;max-width:780px;margin:0 auto 18px}
      .home-klaster-kicker{margin:0;color:#0b5d49;font-size:.74rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
      .home-klaster-title{margin:5px 0 7px;color:#183b33;font-size:clamp(1.3rem,2.8vw,1.9rem);font-weight:900}
      .home-klaster-intro{margin:0;color:#64736d;font-size:.86rem;line-height:1.7}
      .home-klaster-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
      .home-klaster-card{display:block;padding:16px 14px;border:1px solid #dfeae6;border-radius:16px;background:#fff;color:inherit;text-decoration:none;box-shadow:0 6px 16px rgba(0,59,45,.05);transition:transform .2s,box-shadow .2s,border-color .2s}
      .home-klaster-card:hover{transform:translateY(-4px);border-color:#0b5d49;box-shadow:0 12px 24px rgba(0,59,45,.10)}
      .home-klaster-code{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:#eef7f4;color:#0b5d49;font-weight:900;font-size:.78rem}
      .home-klaster-card h3{margin:10px 0 5px;color:#183b33;font-size:.92rem;line-height:1.3}
      .home-klaster-card p{margin:0;color:#6c7772;font-size:.75rem;line-height:1.5}
      .home-klaster-modules{margin-top:9px;color:#0b5d49;font-size:.7rem;font-weight:800;line-height:1.45}
      .home-klaster-panels{display:grid;grid-template-columns:1.15fr .85fr;gap:12px;margin-top:14px}
      .home-klaster-panel{padding:15px;border:1px solid #dfe9e5;border-radius:16px;background:#fff}
      .home-klaster-panel h3{margin:0 0 4px;color:#183b33;font-size:.95rem}
      .home-klaster-panel-note{margin:0 0 10px;color:#718078;font-size:.72rem;line-height:1.5}
      .home-klaster-schedule{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .home-klaster-schedule-card{padding:11px;border:1px solid #e2ebe7;border-radius:12px;background:#f8fbfa}
      .home-klaster-schedule-card strong{display:block;color:#0b5d49;font-size:.76rem}
      .home-klaster-schedule-card span{display:block;margin-top:4px;color:#68756f;font-size:.72rem;line-height:1.45}
      .home-klaster-activity{display:block;padding:11px;border:1px solid #e2ebe7;border-radius:12px;text-decoration:none;color:inherit;background:#fff;margin-top:8px}
      .home-klaster-activity strong{display:block;color:#0b5d49;font-size:.77rem}
      .home-klaster-activity span{display:block;margin-top:4px;color:#68756f;font-size:.71rem;line-height:1.5}
      .home-klaster-badge{display:inline-flex;margin-top:6px;padding:4px 7px;border-radius:999px;background:#eef7f4;color:#0b5d49;border:1px solid #d8ebe5;font-size:.65rem;font-weight:800}
      .home-klaster-network{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .home-klaster-network-card{padding:12px;border:1px solid #e2ebe7;border-radius:12px;background:#f8fbfa}
      .home-klaster-network-card strong{display:block;color:#0b5d49;font-size:.78rem}
      .home-klaster-network-card span{display:block;margin-top:4px;color:#68756f;font-size:.71rem;line-height:1.5}
      .home-klaster-foot{display:flex;justify-content:center;margin-top:17px}
      .home-klaster-cta{display:inline-flex;align-items:center;gap:7px;padding:10px 15px;border-radius:999px;background:#0b5d49;color:#fff;text-decoration:none;font-size:.8rem;font-weight:900}
      @media(max-width:1050px){.home-klaster-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.home-klaster-panels{grid-template-columns:1fr}}
      @media(max-width:650px){.home-klaster-dashboard{padding:18px 14px}.home-klaster-grid{grid-template-columns:1fr 1fr}.home-klaster-schedule{grid-template-columns:1fr}.home-klaster-network{grid-template-columns:1fr}.home-klaster-card{padding:14px 12px}}
      @media(max-width:420px){.home-klaster-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  const text = (value) => String(value ?? '');

  function render({ config, schedule, network }) {
    if (document.getElementById('home-klaster-dashboard')) return;
    const main = document.querySelector('main');
    if (!main) return;

    const anchor = main.querySelector('.hero-home') || main.firstElementChild;
    const section = document.createElement('section');
    section.id = 'home-klaster-dashboard';
    section.className = 'home-klaster-dashboard';

    const head = document.createElement('div');
    head.className = 'home-klaster-head';
    head.innerHTML = '<p class="home-klaster-kicker">PUSKESMAS · 5 KLASTER</p><h2 class="home-klaster-title">Pelayanan Terintegrasi dalam Satu Pintu</h2><p class="home-klaster-intro">Pilih klaster sesuai kebutuhan. Informasi pelayanan, jadwal, skrining, tindak lanjut, jejaring, dan mutu mengikuti struktur layanan masing-masing.</p>';

    const grid = document.createElement('div');
    grid.className = 'home-klaster-grid';
    config.forEach((cluster) => {
      const a = document.createElement('a');
      a.className = 'home-klaster-card';
      a.href = `pelayanan.html#${encodeURIComponent(cluster.id)}`;
      a.setAttribute('aria-label', `Buka ${cluster.code} ${cluster.name}`);

      const code = document.createElement('span');
      code.className = 'home-klaster-code';
      code.textContent = text(cluster.code);
      const h = document.createElement('h3');
      h.textContent = text(cluster.name);
      const p = document.createElement('p');
      p.textContent = text(cluster.scope);
      const modules = document.createElement('div');
      modules.className = 'home-klaster-modules';
      const dataModules = Array.isArray(cluster.dataModules) ? cluster.dataModules : [];
      modules.textContent = dataModules.slice(0, 3).join(' · ') + (dataModules.length > 3 ? ' …' : '');

      a.append(code, h, p, modules);
      grid.appendChild(a);
    });

    const panels = document.createElement('div');
    panels.className = 'home-klaster-panels';

    const schedulePanel = document.createElement('section');
    schedulePanel.className = 'home-klaster-panel';
    schedulePanel.innerHTML = '<h3>🗓️ Jadwal & Kegiatan</h3><p class="home-klaster-panel-note">Ringkasan jadwal berasal dari satu sumber publik yang sama untuk menjaga konsistensi.</p>';
    const scheduleGrid = document.createElement('div');
    scheduleGrid.className = 'home-klaster-schedule';
    const hours = Array.isArray(schedule?.serviceHours) ? schedule.serviceHours : [];
    hours.slice(0, 3).forEach((item) => {
      const card = document.createElement('div');
      card.className = 'home-klaster-schedule-card';
      const strong = document.createElement('strong'); strong.textContent = text(item.day);
      const span = document.createElement('span'); span.textContent = text(item.time);
      card.append(strong, span); scheduleGrid.appendChild(card);
    });
    schedulePanel.appendChild(scheduleGrid);

    const activities = Array.isArray(schedule?.activities) ? schedule.activities : [];
    activities.slice(0, 3).forEach((activity) => {
      const a = document.createElement('a');
      a.className = 'home-klaster-activity';
      a.href = activity.detailUrl || 'jadwal.html';
      const strong = document.createElement('strong'); strong.textContent = text(activity.title);
      const span = document.createElement('span'); span.textContent = text(activity.schedule);
      const badge = document.createElement('span');
      badge.className = 'home-klaster-badge';
      badge.textContent = activity.managementClusterId === 'klaster-1'
        ? 'Dikelola: Klaster 1'
        : 'Kegiatan Puskesmas';
      a.append(strong, span, badge);
      schedulePanel.appendChild(a);
    });

    const networkPanel = document.createElement('section');
    networkPanel.className = 'home-klaster-panel';
    networkPanel.innerHTML = '<h3>🤝 Jejaring Pelayanan</h3><p class="home-klaster-panel-note">Jejaring bukan klaster. Pengelolaan jejaring berada pada fungsi Klaster 1, sedangkan layanan mengikuti sasaran klaster terkait.</p>';
    const networkGrid = document.createElement('div');
    networkGrid.className = 'home-klaster-network';
    const networks = Array.isArray(network?.networks) ? network.networks : [];
    networks.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'home-klaster-network-card';
      const strong = document.createElement('strong'); strong.textContent = text(item.type);
      const span = document.createElement('span');
      const serviceIds = Array.isArray(item.serviceClusterIds) ? item.serviceClusterIds : [];
      const targets = serviceIds.map((id) => id === 'klaster-2' ? 'K2 Ibu & Anak' : id === 'klaster-3' ? 'K3 Dewasa & Lansia' : id).join(' · ');
      span.textContent = targets ? `Dikelola K1 · Sasaran: ${targets}` : 'Dikelola melalui Manajemen Jejaring K1';
      card.append(strong, span);
      networkGrid.appendChild(card);
    });
    networkPanel.appendChild(networkGrid);

    panels.append(schedulePanel, networkPanel);
    const foot = document.createElement('div');
    foot.className = 'home-klaster-foot';
    foot.innerHTML = '<a class="home-klaster-cta" href="pelayanan.html">Lihat Seluruh Pelayanan →</a>';

    section.append(head, grid, panels, foot);
    if (anchor?.classList.contains('hero-home')) anchor.insertAdjacentElement('afterend', section);
    else main.prepend(section);
  }

  loadAllSources((sources) => {
    style();
    render(sources);
  });
})();
