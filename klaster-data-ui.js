/* Public-safe Klaster Data Hub UI. No patient/PHI data is rendered here. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'pelayanan.html') return;

  const loadConfig = (onReady) => {
    if (Array.isArray(window.KLASTER_CONFIG)) return onReady(window.KLASTER_CONFIG);
    const script = document.createElement('script');
    script.src = 'data/klaster-config.js?v=20260904';
    script.defer = true;
    script.onload = () => {
      if (Array.isArray(window.KLASTER_CONFIG)) onReady(window.KLASTER_CONFIG);
    };
    script.onerror = () => console.warn('[PKM] Klaster config gagal dimuat.');
    document.head.appendChild(script);
  };

  const esc = (value) => String(value ?? '');

  function installStyle() {
    if (document.getElementById('klaster-data-hub-style')) return;
    const style = document.createElement('style');
    style.id = 'klaster-data-hub-style';
    style.textContent = `
      .klaster-data-hub{margin-top:18px;padding:16px;border:1px solid #d7e8e1;border-radius:16px;background:linear-gradient(180deg,#fbfefd,#f3f9f6)}
      .klaster-data-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}
      .klaster-data-kicker{margin:0;color:#0b5d49;font-size:.72rem;font-weight:900;letter-spacing:.05em;text-transform:uppercase}
      .klaster-data-title{margin:3px 0 0;color:#183b33;font-size:1rem;font-weight:900}
      .klaster-data-note{margin:2px 0 0;color:#6c7772;font-size:.74rem;line-height:1.5;text-align:right}
      .klaster-data-groups{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .klaster-data-group{padding:12px;border:1px solid #deebe6;border-radius:12px;background:#fff}
      .klaster-data-group h4{margin:0 0 8px;color:#0b5d49;font-size:.77rem}
      .klaster-data-chips{display:flex;flex-wrap:wrap;gap:7px}
      .klaster-data-chip{display:inline-flex;align-items:center;gap:5px;padding:6px 9px;border-radius:999px;background:#eef7f4;border:1px solid #d8ebe5;color:#0b5d49;font-size:.72rem;font-weight:800}
      .klaster-data-chip::before{content:'•';font-size:.9rem;line-height:1}
      .klaster-data-chip.ops{background:#f7f8f4;border-color:#e7ead9;color:#59611d}
      .klaster-data-foot{margin:11px 0 0;padding-top:10px;border-top:1px dashed #d9e6e1;color:#6c7772;font-size:.72rem;line-height:1.55}
      .klaster-data-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
      .klaster-data-action{display:inline-flex;align-items:center;padding:8px 11px;border-radius:999px;background:#eef7f4;color:#0b5d49;border:1px solid #d8ebe5;font-size:.72rem;font-weight:800;text-decoration:none}
      .klaster-data-action:hover{background:#dff0ea}
      @media(max-width:700px){.klaster-data-head{display:block}.klaster-data-note{text-align:left;margin-top:5px}.klaster-data-groups{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function makeChip(text, ops) {
    const chip = document.createElement('span');
    chip.className = `klaster-data-chip${ops ? ' ops' : ''}`;
    chip.textContent = esc(text);
    return chip;
  }

  function render(config) {
    installStyle();

    config.forEach((cluster) => {
      const root = document.getElementById(cluster.id);
      if (!root || root.querySelector('.klaster-data-hub')) return;
      const body = root.querySelector('.cluster-body');
      if (!body) return;

      const hub = document.createElement('section');
      hub.className = 'klaster-data-hub';
      hub.setAttribute('aria-label', `Pusat Data ${cluster.code} ${cluster.name}`);

      const head = document.createElement('div');
      head.className = 'klaster-data-head';

      const headingWrap = document.createElement('div');
      const kicker = document.createElement('p');
      kicker.className = 'klaster-data-kicker';
      kicker.textContent = `${cluster.code} · DATA KLASTER`;
      const title = document.createElement('h3');
      title.className = 'klaster-data-title';
      title.textContent = `Pusat Data Klaster ${cluster.code}`;
      headingWrap.append(kicker, title);

      const note = document.createElement('p');
      note.className = 'klaster-data-note';
      note.textContent = 'Metadata publik • tanpa data pasien';
      head.append(headingWrap, note);

      const groups = document.createElement('div');
      groups.className = 'klaster-data-groups';

      const dataGroup = document.createElement('div');
      dataGroup.className = 'klaster-data-group';
      const dataTitle = document.createElement('h4');
      dataTitle.textContent = 'Domain data';
      const dataChips = document.createElement('div');
      dataChips.className = 'klaster-data-chips';
      (cluster.dataModules || []).forEach((module) => dataChips.appendChild(makeChip(module, false)));
      dataGroup.append(dataTitle, dataChips);

      const opsGroup = document.createElement('div');
      opsGroup.className = 'klaster-data-group';
      const opsTitle = document.createElement('h4');
      opsTitle.textContent = 'Operasional & mutu';
      const opsChips = document.createElement('div');
      opsChips.className = 'klaster-data-chips';
      (cluster.operationalModules || []).forEach((module) => opsChips.appendChild(makeChip(module, true)));
      opsGroup.append(opsTitle, opsChips);

      groups.append(dataGroup, opsGroup);

      const foot = document.createElement('p');
      foot.className = 'klaster-data-foot';
      foot.textContent = `${cluster.scope}. Struktur ini menjadi kontrak navigasi dan pengelompokan data; database operasional terautentikasi akan diintegrasikan terpisah.`;

      hub.append(head, groups, foot);

      if (cluster.id === 'klaster-1') {
        const actions = document.createElement('div');
        actions.className = 'klaster-data-actions';
        const networkLink = document.createElement('a');
        networkLink.className = 'klaster-data-action';
        networkLink.href = 'jejaring-puskesmas.html';
        networkLink.textContent = '🤝 Buka Data Jejaring Posyandu & Pustu →';
        networkLink.setAttribute('aria-label', 'Buka Data Jejaring Posyandu dan Puskesmas Pembantu');
        actions.appendChild(networkLink);
        hub.appendChild(actions);
      }

      body.appendChild(hub);
    });
  }

  loadConfig(render);
})();
