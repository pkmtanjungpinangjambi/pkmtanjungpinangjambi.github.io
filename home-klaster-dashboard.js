/* Public home dashboard v3 — five clusters, quick actions, schedule and network. No patient/PHI data. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const loadScript = (src, ready, failMessage) => {
    if (ready()) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => ready();
    script.onerror = () => console.warn(failMessage);
    document.head.appendChild(script);
  };

  const loadSources = (done) => {
    const ready = () => Array.isArray(window.KLASTER_CONFIG);
    const finish = () => {
      if (!ready()) return false;
      done({
        config: window.KLASTER_CONFIG,
        schedule: window.JADWAL_PUBLIC || null,
        network: window.JEJARING_PUBLIC || null
      });
      return true;
    };

    if (finish()) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (finish() || attempts >= 40) window.clearInterval(timer);
    }, 100);

    loadScript('data/klaster-config.js?v=20260904', finish, '[PKM] Konfigurasi klaster gagal dimuat.');
    loadScript('data/jadwal-public.js?v=20260904', () => !!window.JADWAL_PUBLIC, '[PKM] Sumber jadwal gagal dimuat.');
    loadScript('data/jejaring-public.js?v=20260904', () => !!window.JEJARING_PUBLIC, '[PKM] Sumber jejaring gagal dimuat.');
  };

  const safe = (v) => String(v ?? '');
  const clusterUrl = (id) => `pelayanan.html#${encodeURIComponent(id)}`;

  function installStyle() {
    if (document.getElementById('home-dashboard-v3-style')) return;
    const style = document.createElement('style');
    style.id = 'home-dashboard-v3-style';
    style.textContent = `
      .home-v3{margin:30px auto 10px}
      .home-v3-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:16px}
      .home-v3-kicker{margin:0 0 4px;color:#0b5d49;font-size:.72rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .home-v3-title{margin:0;color:#183b33;font-size:clamp(1.35rem,3vw,2rem);font-weight:950;letter-spacing:-.02em}
      .home-v3-sub{margin:5px 0 0;color:#687770;font-size:.82rem;line-height:1.55;max-width:720px}
      .home-v3-more{display:inline-flex;align-items:center;gap:6px;padding:9px 13px;border:1px solid #cfe4dc;border-radius:999px;background:#fff;color:#0b5d49;text-decoration:none;font-size:.75rem;font-weight:900;white-space:nowrap}
      .home-v3-actions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}
      .home-v3-action{display:flex;align-items:center;gap:10px;min-height:58px;padding:11px 12px;border-radius:15px;background:#fff;border:1px solid #dfeae6;box-shadow:0 6px 18px rgba(0,59,45,.055);text-decoration:none;color:inherit}
      .home-v3-action:hover{transform:translateY(-2px);border-color:#0b5d49;box-shadow:0 10px 24px rgba(0,59,45,.09)}
      .home-v3-action-icon{width:34px;height:34px;flex:0 0 34px;border-radius:10px;display:grid;place-items:center;background:#eef7f4;font-size:1rem}
      .home-v3-action strong{display:block;color:#183b33;font-size:.78rem;line-height:1.25}
      .home-v3-action span{display:block;margin-top:2px;color:#738079;font-size:.67rem;line-height:1.35}
      .home-v3-clusters{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
      .home-v3-cluster{position:relative;display:block;min-height:152px;padding:16px 14px 13px;border:1px solid #dfeae6;border-radius:17px;background:#fff;color:inherit;text-decoration:none;overflow:hidden;box-shadow:0 7px 20px rgba(0,59,45,.055);transition:transform .2s,box-shadow .2s,border-color .2s}
      .home-v3-cluster:hover{transform:translateY(-4px);border-color:#0b5d49;box-shadow:0 14px 28px rgba(0,59,45,.11)}
      .home-v3-cluster::after{content:'';position:absolute;right:-22px;bottom:-28px;width:86px;height:86px;border-radius:50%;background:#f1f8f5}
      .home-v3-code{position:relative;z-index:1;display:inline-grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#0b5d49;color:#fff;font-size:.72rem;font-weight:950}
      .home-v3-cluster h3{position:relative;z-index:1;margin:12px 0 5px;color:#183b33;font-size:.88rem;line-height:1.3}
      .home-v3-cluster p{position:relative;z-index:1;margin:0;color:#6b7772;font-size:.69rem;line-height:1.45}
      .home-v3-module{position:relative;z-index:1;margin-top:8px;color:#0b5d49;font-size:.65rem;font-weight:900;line-height:1.4}
      .home-v3-panels{display:grid;grid-template-columns:1.15fr .85fr;gap:12px;margin-top:12px}
      .home-v3-panel{background:#fff;border:1px solid #dfeae6;border-radius:17px;padding:16px;box-shadow:0 7px 20px rgba(0,59,45,.05)}
      .home-v3-panel-head{display:flex;align-items:start;justify-content:space-between;gap:10px;margin-bottom:10px}
      .home-v3-panel-head h3{margin:0;color:#183b33;font-size:.95rem}
      .home-v3-panel-head span{color:#718079;font-size:.68rem}
      .home-v3-schedule-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .home-v3-hours{padding:10px;border:1px solid #e4ece9;border-radius:12px;background:#f8fbfa}
      .home-v3-hours strong{display:block;color:#0b5d49;font-size:.72rem}
      .home-v3-hours span{display:block;margin-top:3px;color:#69756f;font-size:.68rem;line-height:1.4}
      .home-v3-event{display:block;padding:10px;border:1px solid #e4ece9;border-radius:12px;background:#f8fbfa;text-decoration:none;margin-top:8px}
      .home-v3-event strong{display:block;color:#0b5d49;font-size:.73rem}
      .home-v3-event span{display:block;margin-top:3px;color:#69756f;font-size:.67rem;line-height:1.4}
      .home-v3-network-card{padding:11px;border:1px solid #e4ece9;border-radius:12px;background:#f8fbfa;margin-top:8px}
      .home-v3-network-card:first-child{margin-top:0}
      .home-v3-network-top{display:flex;justify-content:space-between;gap:8px;align-items:center}
      .home-v3-network-top strong{color:#0b5d49;font-size:.75rem}
      .home-v3-network-count{padding:4px 7px;border-radius:999px;background:#fff;border:1px solid #d8ebe5;color:#0b5d49;font-size:.62rem;font-weight:900}
      .home-v3-network-card span{display:block;margin-top:4px;color:#69756f;font-size:.67rem;line-height:1.45}
      .home-v3-note{margin-top:10px;padding:9px 10px;border-left:3px solid #0b5d49;background:#f4f9f7;border-radius:0 9px 9px 0;color:#68766f;font-size:.65rem;line-height:1.5}
      @media(max-width:1050px){.home-v3-clusters{grid-template-columns:repeat(3,minmax(0,1fr))}.home-v3-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.home-v3-panels{grid-template-columns:1fr}}
      @media(max-width:650px){.home-v3{margin-top:22px}.home-v3-head{display:block}.home-v3-more{margin-top:10px}.home-v3-actions{grid-template-columns:1fr 1fr}.home-v3-clusters{grid-template-columns:1fr 1fr}.home-v3-schedule-grid{grid-template-columns:1fr}.home-v3-cluster{min-height:138px}}
      @media(max-width:420px){.home-v3-actions,.home-v3-clusters{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function render({ config, schedule, network }) {
    if (document.getElementById('home-v3')) return;
    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.id = 'home-v3';
    section.className = 'container home-v3';

    const head = document.createElement('div');
    head.className = 'home-v3-head';
    head.innerHTML = `
      <div><p class="home-v3-kicker">PUSKESMAS TANJUNG PINANG · ILP</p>
      <h2 class="home-v3-title">Temukan Layanan dengan Cepat</h2>
      <p class="home-v3-sub">Lima klaster adalah struktur utama pelayanan. Pilih kebutuhan Anda, lalu masuk ke detail layanan, jadwal, dan informasi yang relevan.</p></div>
      <a class="home-v3-more" href="pelayanan.html">Semua pelayanan →</a>`;

    const actions = document.createElement('div');
    actions.className = 'home-v3-actions';
    const actionItems = [
      ['📅', 'Jadwal Pelayanan', 'Jam & kegiatan terbaru', 'jadwal.html'],
      ['💉', 'Imunisasi', 'Bagian Klaster 2', 'pelayanan-imunisasi.html'],
      ['🤝', 'Posyandu & Pustu', 'Jejaring Klaster 1', 'jejaring-puskesmas.html'],
      ['📝', 'Pendaftaran', 'Mobile JKN & onsite', 'jadwal.html']
    ];
    actionItems.forEach(([icon, title, desc, href]) => {
      const a = document.createElement('a'); a.className = 'home-v3-action'; a.href = href;
      const i = document.createElement('span'); i.className = 'home-v3-action-icon'; i.textContent = icon;
      const wrap = document.createElement('div'); wrap.innerHTML = `<strong>${title}</strong><span>${desc}</span>`;
      a.append(i, wrap); actions.appendChild(a);
    });

    const clusters = document.createElement('div');
    clusters.className = 'home-v3-clusters';
    config.forEach((cluster) => {
      const a = document.createElement('a'); a.className = 'home-v3-cluster'; a.href = clusterUrl(cluster.id);
      const code = document.createElement('span'); code.className = 'home-v3-code'; code.textContent = safe(cluster.code);
      const h = document.createElement('h3'); h.textContent = safe(cluster.name);
      const p = document.createElement('p'); p.textContent = safe(cluster.scope);
      const m = document.createElement('div'); m.className = 'home-v3-module';
      const mods = Array.isArray(cluster.dataModules) ? cluster.dataModules : [];
      m.textContent = mods.slice(0, 3).join(' · ') + (mods.length > 3 ? ' …' : '');
      a.append(code, h, p, m); clusters.appendChild(a);
    });

    const panels = document.createElement('div'); panels.className = 'home-v3-panels';

    const schedulePanel = document.createElement('section'); schedulePanel.className = 'home-v3-panel';
    const scheduleHead = document.createElement('div'); scheduleHead.className = 'home-v3-panel-head';
    scheduleHead.innerHTML = '<div><h3>🗓️ Jadwal & Kegiatan</h3><span>Satu sumber data untuk Beranda dan halaman Jadwal</span></div><a class="home-v3-more" href="jadwal.html">Lihat →</a>';
    schedulePanel.appendChild(scheduleHead);
    const hoursGrid = document.createElement('div'); hoursGrid.className = 'home-v3-schedule-grid';
    const hours = Array.isArray(schedule?.serviceHours) ? schedule.serviceHours : [];
    hours.slice(0, 3).forEach((item) => {
      const card = document.createElement('div'); card.className = 'home-v3-hours';
      card.innerHTML = `<strong>${safe(item.day)}</strong><span>${safe(item.time)}</span>`;
      hoursGrid.appendChild(card);
    });
    schedulePanel.appendChild(hoursGrid);
    const activities = Array.isArray(schedule?.activities) ? schedule.activities : [];
    activities.slice(0, 2).forEach((activity) => {
      const a = document.createElement('a'); a.className = 'home-v3-event'; a.href = activity.detailUrl || 'jadwal.html';
      const owner = activity.managementClusterId === 'klaster-1' ? 'Dikelola Klaster 1' : 'Kegiatan Puskesmas';
      a.innerHTML = `<strong>${safe(activity.title)}</strong><span>${safe(activity.schedule)} · ${owner}</span>`;
      schedulePanel.appendChild(a);
    });

    const networkPanel = document.createElement('section'); networkPanel.className = 'home-v3-panel';
    const networkHead = document.createElement('div'); networkHead.className = 'home-v3-panel-head';
    networkHead.innerHTML = '<div><h3>🤝 Jejaring</h3><span>Bagian dari Manajemen Klaster 1</span></div><a class="home-v3-more" href="jejaring-puskesmas.html">Detail →</a>';
    networkPanel.appendChild(networkHead);
    const networks = Array.isArray(network?.networks) ? network.networks : [];
    networks.forEach((item) => {
      const card = document.createElement('article'); card.className = 'home-v3-network-card';
      const targets = (Array.isArray(item.serviceClusterIds) ? item.serviceClusterIds : []).map((id) => ({'klaster-2':'K2 Ibu & Anak','klaster-3':'K3 Dewasa & Lansia','klaster-4':'K4 Penyakit Menular','klaster-5':'K5 Lintas Klaster'}[id] || id));
      card.innerHTML = `<div class="home-v3-network-top"><strong>${safe(item.type)}</strong><span class="home-v3-network-count">${safe(item.countLabel || '')}</span></div><span>Dikelola K1 · ${targets.length ? `sasaran ${targets.join(' · ')}` : 'Manajemen Jejaring'}</span>`;
      networkPanel.appendChild(card);
    });
    const note = document.createElement('p'); note.className = 'home-v3-note';
    note.textContent = 'Data publik hanya metadata. Data pasien dan data klinis individual tidak ditampilkan di Beranda.';
    networkPanel.appendChild(note);

    panels.append(schedulePanel, networkPanel);
    section.append(head, actions, clusters, panels);

    const infoBar = main.querySelector('.info-bar');
    const firstInjected = main.querySelector('#home-klaster-dashboard');
    if (firstInjected) {
      firstInjected.remove();
    }
    if (infoBar) infoBar.insertAdjacentElement('afterend', section);
    else main.insertBefore(section, main.firstElementChild);
  }

  loadSources((sources) => { installStyle(); render(sources); });
})();
