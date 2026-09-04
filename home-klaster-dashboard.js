/* Public home dashboard v4 — five clusters, quick actions, schedule and network. No patient/PHI data. */
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
    const ready = () => Array.isArray(window.KLASTER_CONFIG) && !!window.JADWAL_PUBLIC && !!window.JEJARING_PUBLIC;
    const finish = () => {
      if (!ready()) return false;
      done({
        config: window.KLASTER_CONFIG,
        schedule: window.JADWAL_PUBLIC,
        network: window.JEJARING_PUBLIC
      });
      return true;
    };

    if (finish()) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (finish() || attempts >= 50) window.clearInterval(timer);
    }, 100);

    loadScript('data/klaster-config.js?v=20260904', finish, '[PKM] Konfigurasi klaster gagal dimuat.');
    loadScript('data/jadwal-public.js?v=20260904', finish, '[PKM] Sumber jadwal gagal dimuat.');
    loadScript('data/jejaring-public.js?v=20260904', finish, '[PKM] Sumber jejaring gagal dimuat.');
  };

  const safe = (value) => String(value ?? '');
  const clusterUrl = (id) => `pelayanan.html#${encodeURIComponent(id)}`;
  const appendText = (parent, tagName, className, value) => {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    el.textContent = safe(value);
    parent.appendChild(el);
    return el;
  };

  function installStyle() {
    if (document.getElementById('home-dashboard-v4-style')) return;
    const style = document.createElement('style');
    style.id = 'home-dashboard-v4-style';
    style.textContent = `
      .home-v4{margin:28px auto 10px}
      .home-v4-shell{position:relative;padding:22px;border:1px solid #dbe9e4;border-radius:24px;background:linear-gradient(145deg,#fbfefd 0%,#f1f8f5 100%);box-shadow:0 12px 34px rgba(0,59,45,.075);overflow:hidden}
      .home-v4-shell::before{content:'';position:absolute;inset:auto -80px -90px auto;width:230px;height:230px;border-radius:50%;background:#e7f4ef;pointer-events:none}
      .home-v4-shell::after{content:'';position:absolute;inset:-90px auto auto -90px;width:200px;height:200px;border-radius:50%;border:30px solid rgba(11,93,73,.035);pointer-events:none}
      .home-v4-head{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:15px}
      .home-v4-kicker{margin:0 0 4px;color:#0b5d49;font-size:.7rem;font-weight:950;letter-spacing:.1em;text-transform:uppercase}
      .home-v4-title{margin:0;color:#183b33;font-size:clamp(1.35rem,3vw,2rem);font-weight:950;letter-spacing:-.03em}
      .home-v4-sub{margin:6px 0 0;color:#687770;font-size:.82rem;line-height:1.6;max-width:730px}
      .home-v4-more{display:inline-flex;align-items:center;gap:7px;flex:0 0 auto;padding:9px 13px;border:1px solid #cfe4dc;border-radius:999px;background:rgba(255,255,255,.92);color:#0b5d49;text-decoration:none;font-size:.75rem;font-weight:900;white-space:nowrap}
      .home-v4-more:hover{border-color:#0b5d49;background:#fff}
      .home-v4-actions{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:18px}
      .home-v4-action{display:flex;align-items:center;gap:10px;min-height:62px;padding:11px 12px;border:1px solid #dfeae6;border-radius:16px;background:#fff;color:inherit;text-decoration:none;box-shadow:0 6px 18px rgba(0,59,45,.045);transition:transform .2s,box-shadow .2s,border-color .2s}
      .home-v4-action:hover,.home-v4-action:focus-visible{transform:translateY(-3px);border-color:#0b5d49;box-shadow:0 12px 26px rgba(0,59,45,.1);outline:none}
      .home-v4-action-primary{border-color:#bddfd4;background:linear-gradient(150deg,#fff,#f2fbf7)}
      .home-v4-action-icon{width:38px;height:38px;flex:0 0 38px;border-radius:12px;display:grid;place-items:center;background:#eaf6f1;font-size:1.05rem}
      .home-v4-action strong{display:block;color:#183b33;font-size:.79rem;line-height:1.25}
      .home-v4-action span{display:block;margin-top:3px;color:#738079;font-size:.66rem;line-height:1.4}
      .home-v4-section-label{position:relative;z-index:1;display:flex;align-items:center;gap:9px;margin:0 0 10px;color:#4e625b;font-size:.67rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .home-v4-section-label::after{content:'';height:1px;flex:1;background:#dce9e4}
      .home-v4-clusters{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
      .home-v4-cluster{position:relative;display:block;min-height:158px;padding:15px 14px 13px;border:1px solid #dfeae6;border-radius:17px;background:#fff;color:inherit;text-decoration:none;overflow:hidden;box-shadow:0 7px 20px rgba(0,59,45,.045);transition:transform .2s,box-shadow .2s,border-color .2s}
      .home-v4-cluster::after{content:'';position:absolute;right:-30px;bottom:-36px;width:105px;height:105px;border-radius:50%;background:#f0f8f4}
      .home-v4-cluster:hover,.home-v4-cluster:focus-visible{transform:translateY(-4px);border-color:#0b5d49;box-shadow:0 15px 30px rgba(0,59,45,.105);outline:none}
      .home-v4-cluster-code{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;height:30px;padding:0 9px;border-radius:9px;background:#0b5d49;color:#fff;font-size:.68rem;font-weight:950;letter-spacing:.02em}
      .home-v4-cluster h3{position:relative;z-index:1;margin:12px 0 5px;color:#183b33;font-size:.88rem;line-height:1.3}
      .home-v4-cluster p{position:relative;z-index:1;margin:0;color:#6b7772;font-size:.68rem;line-height:1.5}
      .home-v4-module{position:relative;z-index:1;margin-top:8px;color:#0b5d49;font-size:.64rem;font-weight:900;line-height:1.45}
      .home-v4-arrow{position:absolute;z-index:2;right:12px;bottom:10px;color:#0b5d49;font-size:.9rem;font-weight:950}
      .home-v4-panels{position:relative;z-index:1;display:grid;grid-template-columns:1.18fr .82fr;gap:12px;margin-top:17px}
      .home-v4-panel{background:#fff;border:1px solid #dfeae6;border-radius:17px;padding:16px;box-shadow:0 7px 20px rgba(0,59,45,.045)}
      .home-v4-panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px}
      .home-v4-panel-title{margin:0;color:#183b33;font-size:.95rem}
      .home-v4-panel-note{margin:4px 0 0;color:#718079;font-size:.67rem;line-height:1.45}
      .home-v4-link{color:#0b5d49;font-size:.7rem;font-weight:900;text-decoration:none;white-space:nowrap}
      .home-v4-hours{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .home-v4-hour{padding:10px;border:1px solid #e2ebe7;border-radius:12px;background:#f8fbfa}
      .home-v4-hour strong{display:block;color:#0b5d49;font-size:.71rem}
      .home-v4-hour span{display:block;margin-top:3px;color:#69756f;font-size:.66rem;line-height:1.45}
      .home-v4-event{display:block;padding:10px;border:1px solid #e2ebe7;border-radius:12px;background:#f8fbfa;text-decoration:none;margin-top:8px}
      .home-v4-event strong{display:block;color:#183b33;font-size:.73rem;line-height:1.35}
      .home-v4-event span{display:block;margin-top:3px;color:#69756f;font-size:.66rem;line-height:1.4}
      .home-v4-network{padding:11px;border:1px solid #e2ebe7;border-radius:12px;background:#f8fbfa;margin-top:8px}
      .home-v4-network:first-child{margin-top:0}
      .home-v4-network-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
      .home-v4-network-top strong{color:#0b5d49;font-size:.75rem}
      .home-v4-network-count{padding:4px 7px;border:1px solid #d8ebe5;border-radius:999px;background:#fff;color:#0b5d49;font-size:.6rem;font-weight:900;white-space:nowrap}
      .home-v4-network span{display:block;margin-top:4px;color:#69756f;font-size:.66rem;line-height:1.45}
      .home-v4-note{margin-top:10px;padding:9px 10px;border-left:3px solid #0b5d49;border-radius:0 9px 9px 0;background:#f4f9f7;color:#68766f;font-size:.63rem;line-height:1.5}
      @media(max-width:1050px){.home-v4-clusters{grid-template-columns:repeat(3,minmax(0,1fr))}.home-v4-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.home-v4-panels{grid-template-columns:1fr}}
      @media(max-width:650px){.home-v4{margin-top:20px}.home-v4-shell{padding:17px 13px;border-radius:20px}.home-v4-head{display:block}.home-v4-actions{grid-template-columns:1fr 1fr;gap:8px}.home-v4-clusters{grid-template-columns:1fr 1fr;gap:8px}.home-v4-hours{grid-template-columns:1fr}.home-v4-cluster{min-height:144px;padding:14px 12px 12px}}
      @media(max-width:420px){.home-v4-actions,.home-v4-clusters{grid-template-columns:1fr}.home-v4-more{width:100%;justify-content:center}.home-v4-cluster{min-height:0}}
    `;
    document.head.appendChild(style);
  }

  function render({ config, schedule, network }) {
    if (document.getElementById('home-v4')) return;
    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.id = 'home-v4';
    section.className = 'container home-v4';

    const shell = document.createElement('div');
    shell.className = 'home-v4-shell';

    const head = document.createElement('div');
    head.className = 'home-v4-head';
    const headCopy = document.createElement('div');
    appendText(headCopy, 'p', 'home-v4-kicker', 'Puskesmas Tanjung Pinang · ILP');
    appendText(headCopy, 'h2', 'home-v4-title', 'Temukan Layanan dengan Cepat');
    appendText(headCopy, 'p', 'home-v4-sub', 'Lima klaster adalah struktur utama pelayanan. Pilih kebutuhan Anda untuk masuk langsung ke informasi yang relevan.');
    const allLink = document.createElement('a');
    allLink.className = 'home-v4-more';
    allLink.href = 'pelayanan.html';
    allLink.textContent = 'Semua pelayanan →';
    head.append(headCopy, allLink);

    const actions = document.createElement('div');
    actions.className = 'home-v4-actions';
    const actionItems = [
      ['📅', 'Jadwal Pelayanan', 'Jam & kegiatan terbaru', 'jadwal.html', false],
      ['💉', 'Imunisasi', 'Bagian Klaster 2', 'pelayanan-imunisasi.html', false],
      ['🤝', 'Posyandu & Pustu', 'Jejaring Klaster 1', 'jejaring-puskesmas.html', false],
      ['📝', 'Pendaftaran', 'Mobile JKN & onsite', 'jadwal.html', true]
    ];
    actionItems.forEach(([icon, title, desc, href, primary]) => {
      const a = document.createElement('a');
      a.className = `home-v4-action${primary ? ' home-v4-action-primary' : ''}`;
      a.href = href;
      const iconEl = document.createElement('span');
      iconEl.className = 'home-v4-action-icon';
      iconEl.textContent = icon;
      const copy = document.createElement('div');
      appendText(copy, 'strong', null, title);
      appendText(copy, 'span', null, desc);
      a.append(iconEl, copy);
      actions.appendChild(a);
    });

    const label = document.createElement('p');
    label.className = 'home-v4-section-label';
    label.textContent = 'Lima Klaster Pelayanan';

    const clusters = document.createElement('div');
    clusters.className = 'home-v4-clusters';
    config.slice(0, 5).forEach((cluster) => {
      const a = document.createElement('a');
      a.className = 'home-v4-cluster';
      a.href = clusterUrl(cluster.id);
      a.setAttribute('aria-label', `Buka ${safe(cluster.code)} ${safe(cluster.name)}`);
      appendText(a, 'span', 'home-v4-cluster-code', cluster.code);
      appendText(a, 'h3', null, cluster.name);
      appendText(a, 'p', null, cluster.scope);
      const mods = Array.isArray(cluster.dataModules) ? cluster.dataModules : [];
      appendText(a, 'div', 'home-v4-module', mods.slice(0, 3).join(' · ') + (mods.length > 3 ? ' …' : ''));
      appendText(a, 'span', 'home-v4-arrow', '→');
      clusters.appendChild(a);
    });

    const panels = document.createElement('div');
    panels.className = 'home-v4-panels';

    const schedulePanel = document.createElement('section');
    schedulePanel.className = 'home-v4-panel';
    const scheduleHead = document.createElement('div');
    scheduleHead.className = 'home-v4-panel-head';
    const scheduleTitle = document.createElement('div');
    appendText(scheduleTitle, 'h3', 'home-v4-panel-title', '🗓️ Jadwal & Kegiatan');
    appendText(scheduleTitle, 'p', 'home-v4-panel-note', 'Satu sumber data untuk Beranda dan halaman Jadwal.');
    const scheduleLink = document.createElement('a');
    scheduleLink.className = 'home-v4-link';
    scheduleLink.href = 'jadwal.html';
    scheduleLink.textContent = 'Lihat semua →';
    scheduleHead.append(scheduleTitle, scheduleLink);
    schedulePanel.appendChild(scheduleHead);

    const hours = Array.isArray(schedule?.serviceHours) ? schedule.serviceHours : [];
    const hoursGrid = document.createElement('div');
    hoursGrid.className = 'home-v4-hours';
    hours.slice(0, 3).forEach((item) => {
      const card = document.createElement('div');
      card.className = 'home-v4-hour';
      appendText(card, 'strong', null, item.day);
      appendText(card, 'span', null, item.time);
      hoursGrid.appendChild(card);
    });
    schedulePanel.appendChild(hoursGrid);

    const activities = Array.isArray(schedule?.activities) ? schedule.activities : [];
    activities.slice(0, 2).forEach((activity) => {
      const a = document.createElement('a');
      a.className = 'home-v4-event';
      a.href = safe(activity.detailUrl) || 'jadwal.html';
      appendText(a, 'strong', null, activity.title);
      const owner = activity.managementClusterId === 'klaster-1' ? 'Dikelola Klaster 1' : 'Kegiatan Puskesmas';
      appendText(a, 'span', null, `${safe(activity.schedule)} · ${owner}`);
      schedulePanel.appendChild(a);
    });

    const networkPanel = document.createElement('section');
    networkPanel.className = 'home-v4-panel';
    const networkHead = document.createElement('div');
    networkHead.className = 'home-v4-panel-head';
    const networkTitle = document.createElement('div');
    appendText(networkTitle, 'h3', 'home-v4-panel-title', '🤝 Jejaring');
    appendText(networkTitle, 'p', 'home-v4-panel-note', 'Bagian dari Manajemen Klaster 1.');
    const networkLink = document.createElement('a');
    networkLink.className = 'home-v4-link';
    networkLink.href = 'jejaring-puskesmas.html';
    networkLink.textContent = 'Detail →';
    networkHead.append(networkTitle, networkLink);
    networkPanel.appendChild(networkHead);

    const networks = Array.isArray(network?.networks) ? network.networks : [];
    networks.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'home-v4-network';
      const top = document.createElement('div');
      top.className = 'home-v4-network-top';
      appendText(top, 'strong', null, item.type);
      appendText(top, 'span', 'home-v4-network-count', item.countLabel || 'Metadata belum diverifikasi');
      card.appendChild(top);
      const targets = (Array.isArray(item.serviceClusterIds) ? item.serviceClusterIds : []).map((id) => ({
        'klaster-2': 'K2 Ibu & Anak',
        'klaster-3': 'K3 Dewasa & Lansia',
        'klaster-4': 'K4 Penyakit Menular',
        'klaster-5': 'K5 Lintas Klaster'
      }[id] || id));
      appendText(card, 'span', null, targets.length ? `Dikelola K1 · sasaran ${targets.join(' · ')}` : 'Dikelola melalui Manajemen Jejaring K1');
      networkPanel.appendChild(card);
    });

    appendText(networkPanel, 'p', 'home-v4-note', 'Data publik hanya metadata. Data pasien dan data klinis individual tidak ditampilkan di Beranda.');

    panels.append(schedulePanel, networkPanel);
    shell.append(head, actions, label, clusters, panels);
    section.appendChild(shell);

    const infoBar = main.querySelector('.info-bar');
    const oldV3 = main.querySelector('#home-v3');
    const oldLegacy = main.querySelector('#home-klaster-dashboard');
    if (oldV3) oldV3.remove();
    if (oldLegacy) oldLegacy.remove();
    if (infoBar) infoBar.insertAdjacentElement('afterend', section);
    else main.insertBefore(section, main.firstElementChild);
  }

  loadSources((sources) => {
    installStyle();
    render(sources);
  });
})();
