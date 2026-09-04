/* Public schedule UI: one public source, with explicit network-management mapping. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'jadwal.html') return;

  function loadSource(done) {
    if (window.JADWAL_PUBLIC) return done(window.JADWAL_PUBLIC);
    const script = document.createElement('script');
    script.src = 'data/jadwal-public.js?v=20260904';
    script.defer = true;
    script.onload = () => {
      if (window.JADWAL_PUBLIC) done(window.JADWAL_PUBLIC);
    };
    script.onerror = () => console.warn('[PKM] Sumber jadwal publik gagal dimuat.');
    document.head.appendChild(script);
  }

  const labelCluster = (id) => ({
    'klaster-1': 'Klaster 1 — Manajemen',
    'klaster-2': 'Klaster 2 — Ibu & Anak',
    'klaster-3': 'Klaster 3 — Dewasa & Lansia',
    'klaster-4': 'Klaster 4 — Penyakit Menular',
    'klaster-5': 'Klaster 5 — Lintas Klaster'
  }[id] || id);

  function addStyle() {
    if (document.getElementById('jadwal-integrated-style')) return;
    const style = document.createElement('style');
    style.id = 'jadwal-integrated-style';
    style.textContent = `
      .schedule-source{margin-top:20px;padding:18px;border:1px solid #d7e8e1;border-radius:16px;background:#f7fbf9}
      .schedule-source h2{margin:0;color:#0b5d49;font-size:1.05rem}
      .schedule-source p{color:#66736d;font-size:.8rem;line-height:1.6}
      .schedule-activity-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:13px}
      .schedule-activity{display:block;padding:13px;border:1px solid #dfe9e5;border-radius:12px;background:#fff;text-decoration:none;color:inherit}
      .schedule-activity strong{display:block;color:#0b5d49;font-size:.84rem}
      .schedule-activity span{display:block;margin-top:5px;color:#68756f;font-size:.75rem;line-height:1.5}
      .schedule-cluster{display:inline-flex;margin-top:8px;padding:4px 8px;border-radius:999px;background:#eef7f4;color:#0b5d49;border:1px solid #d8ebe5;font-size:.68rem;font-weight:800}
      .schedule-service-clusters{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
      .schedule-service-clusters .schedule-cluster{margin-top:0}
      @media(max-width:680px){.schedule-activity-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function render(source) {
    addStyle();
    const container = document.querySelector('.schedule');
    if (!container || document.getElementById('schedule-source')) return;

    const section = document.createElement('section');
    section.id = 'schedule-source';
    section.className = 'schedule-source';

    const title = document.createElement('h2');
    title.textContent = 'Jadwal Terintegrasi Berbasis Klaster';
    section.appendChild(title);

    const intro = document.createElement('p');
    intro.textContent = `Satu sumber jadwal digunakan untuk menghubungkan Beranda, Pelayanan, jejaring, dan kegiatan per klaster. Pembaruan publik terakhir: ${source.updatedAt}.`;
    section.appendChild(intro);

    const grid = document.createElement('div');
    grid.className = 'schedule-activity-grid';

    (source.activities || []).forEach((activity) => {
      const link = document.createElement('a');
      link.className = 'schedule-activity';
      link.href = activity.detailUrl || 'pelayanan.html';
      link.setAttribute('aria-label', `Buka ${activity.title}`);

      const titleEl = document.createElement('strong');
      titleEl.textContent = activity.title || 'Kegiatan pelayanan';
      link.appendChild(titleEl);

      const detail = document.createElement('span');
      detail.textContent = activity.schedule || 'Mengikuti ketentuan/program yang berlaku';
      link.appendChild(detail);

      if (activity.managementClusterId) {
        const management = document.createElement('span');
        management.className = 'schedule-cluster';
        management.textContent = `Dikelola: ${labelCluster(activity.managementClusterId)}`;
        link.appendChild(management);
      }

      const serviceIds = Array.isArray(activity.serviceClusterIds) ? activity.serviceClusterIds : [];
      if (serviceIds.length) {
        const serviceWrap = document.createElement('span');
        serviceWrap.className = 'schedule-service-clusters';
        serviceIds.forEach((id) => {
          const badge = document.createElement('span');
          badge.className = 'schedule-cluster';
          badge.textContent = `Sasaran: ${labelCluster(id)}`;
          serviceWrap.appendChild(badge);
        });
        link.appendChild(serviceWrap);
      }

      grid.appendChild(link);
    });

    section.appendChild(grid);

    const note = document.createElement('p');
    note.style.marginBottom = '0';
    note.textContent = 'Catatan: tanggal/sesi lokal yang belum ditetapkan tidak ditampilkan sebagai tanggal pasti. Informasi publik diperbarui setelah jadwal resmi ditetapkan.';
    section.appendChild(note);

    container.insertAdjacentElement('afterend', section);
  }

  loadSource(render);
})();
