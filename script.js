/*
 * Header bootstrap — UPTD Puskesmas Tanjung Pinang Kota Jambi
 * Ensures every leaf page has the master header shell before the full
 * navigation/content bootstrap runs. The complete legacy bootstrap is kept
 * intact in script-master.js and loaded immediately after these guards.
 */
(function () {
  'use strict';

  function installResponsiveHeaderGuard() {
    if (document.getElementById('p1-responsive-header-guard')) return;

    const style = document.createElement('style');
    style.id = 'p1-responsive-header-guard';
    style.textContent = `
      @media (max-width: 1024px) {
        .site-header .nav-wrap { position: relative !important; }
        .site-header .nav-wrap .nav-toggle {
          display: grid !important; place-items: center !important;
          width: 44px !important; height: 44px !important;
          min-width: 44px !important; min-height: 44px !important;
          flex: 0 0 44px !important; margin-left: auto !important;
          position: relative !important; z-index: 80 !important; cursor: pointer !important;
        }
        .site-header .nav-wrap .nav {
          display: none !important; position: absolute !important;
          left: 18px !important; right: 18px !important; top: calc(100% + 8px) !important;
          z-index: 70 !important; flex-direction: column !important;
          align-items: stretch !important; gap: 4px !important; padding: 8px !important;
          background: #fff !important; border: 1px solid var(--line) !important;
          border-radius: 15px !important; box-shadow: var(--shadow) !important;
        }
        .site-header .nav-wrap .nav.open { display: flex !important; }
        .site-header .nav-wrap .nav a { width: 100% !important; }
        .site-header .nav-wrap .nav-item-dropdown { width: 100% !important; flex-wrap: wrap !important; }
        .site-header .nav-wrap .dropdown-menu {
          position: static !important; width: calc(100% - 10px) !important;
          min-width: 0 !important; margin: 2px 0 0 10px !important; box-shadow: none !important;
        }
        .site-header .nav-wrap .nav-item-dropdown.open .dropdown-menu {
          display: flex !important; flex-direction: column !important; gap: 2px !important;
        }
      }
      @media (max-width: 600px) {
        html, body { max-width: 100% !important; overflow-x: clip !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureMasterTopbar() {
    const existing = document.querySelector('.topbar');
    let topbar = existing;
    if (!topbar) {
      topbar = document.createElement('div');
      topbar.className = 'topbar';
      const header = document.querySelector('.site-header');
      if (header?.parentNode) header.parentNode.insertBefore(topbar, header);
      else document.body.insertBefore(topbar, document.body.firstChild || null);
    }
    let inner = topbar.querySelector('.topbar-inner');
    if (!inner) {
      inner = document.createElement('div');
      inner.className = 'container topbar-inner';
      topbar.replaceChildren(inner);
    }
    inner.innerHTML = `
<span>📍 Jl. Taruma Negara No. 50, Kel. Tanjung Pinang, Kec. Jambi Timur, Kota Jambi</span>
<span><a href="tel:07417555394">📞 (0741) 7555394</a> · <a href="mailto:pkmtanjungpinang18jambi@gmail.com">✉️ Email</a></span>
<span class="topbar-social"><a href="https://www.instagram.com/pkm.tanjungpinang.jambi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="#fff" stroke="none"/></svg></a><a href="https://web.facebook.com/kiki.ayu.98229" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z"/></svg></a><a href="https://wa.me/6282180622274" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg width="13" height="13" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C30 8.3 22.6 3 16 3zm5.9 15.1c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4-.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.6-.2-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1 .6.3.8 1.1 2.6 1.2 2.8.1.2.1.4 0 .6-.3.6-.7 1.2-1 1.5-.2.2-.4.5-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1l1.2-1.4c.3-.3.5-.2.9-.1l2.5 1.2c.4.2.6.3.7.5.1.2.1.9-.2 1.8z"/></svg></a></span>`;
  }

  function ensureMobileToggle() {
    const navWrap = document.querySelector('.site-header .nav-wrap');
    const nav = navWrap?.querySelector('.nav');
    if (!navWrap || !nav || navWrap.querySelector('.nav-toggle')) return;
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Buka menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    navWrap.insertBefore(toggle, nav);
  }

  function loadHomeImmunizationTarget() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file !== 'index.html' && file !== '') return;
    if (document.getElementById('home-immunization-target-script')) return;
    const script = document.createElement('script');
    script.id = 'home-immunization-target-script';
    script.src = 'home-imunisasi-target.js?v=20260913-1';
    script.defer = true;
    document.head.appendChild(script);
  }

  function ensureKlaster1Menu() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file !== 'pelayanan.html') return;
    const cluster = document.querySelector('details.cluster-1');
    const grid = cluster?.querySelector('.service-grid');
    if (!cluster || !grid || grid.dataset.master10Applied === '1') return;

    const rename = (oldText, newText, href) => {
      const item = Array.from(grid.querySelectorAll('.service-link')).find(link => {
        const strong = link.querySelector('strong');
        return strong && strong.textContent.trim() === oldText;
      });
      if (!item) return;
      const strong = item.querySelector('strong');
      strong.textContent = newText;
      if (href) item.href = href;
    };

    rename('Manajemen Puskesmas', 'MANAJEMEN INTI / PERENCANAAN', 'manajemen-puskesmas.html#manajemen-puskesmas');
    rename('Mutu & Keselamatan Pasien', 'MANAJEMEN MUTU DAN KESELAMATAN', 'manajemen-puskesmas.html#mutu-keselamatan');
    rename('Manajemen Jejaring', 'MANAJEMEN JEJARING DAN JARINGAN PUSKESMAS', 'manajemen-puskesmas.html#jejaring');
    rename('Manajemen Sumber Daya', 'MANAJEMEN SDM DAN SISTEM INFORMASI', 'manajemen-puskesmas.html#sumber-daya');
    rename('Pemberdayaan Masyarakat', 'UPAYA KESEHATAN MASYARAKAT (UKM)', 'manajemen-puskesmas.html#pemberdayaan');

    const existing = new Set(Array.from(grid.querySelectorAll('.service-link strong')).map(el => el.textContent.trim().toLowerCase()));
    const additions = [
      ['MANAJEMEN ARSIP', 'manajemen-puskesmas.html#ketatausahaan', 'Ruang pengelolaan arsip dan dokumentasi ketatausahaan.'],
      ['UPAYA KESEHATAN PERORANGAN (UKP)', 'manajemen-puskesmas.html#manajemen-puskesmas', 'Lapisan koordinasi pelayanan perseorangan dalam penyelenggaraan Puskesmas.'],
      ['MANAJEMEN SARANA, PRASARANA & PERBEKALAN KESEHATAN', 'manajemen-puskesmas.html#sumber-daya', 'Pengelolaan sarana, prasarana, obat, dan perbekalan kesehatan.'],
      ['MANAJEMEN KEUANGAN DAN ASET', 'manajemen-puskesmas.html#keuangan-aset', 'Pengelolaan pembiayaan dan aset Puskesmas.']
    ];

    let index = grid.querySelectorAll('.service-link').length + 1;
    additions.forEach(([title, href, desc]) => {
      if (existing.has(title.toLowerCase())) return;
      const link = document.createElement('a');
      link.className = 'service-link';
      link.href = href;
      link.innerHTML = `<span class="service-index">${String(index).padStart(2, '0')}</span><div><strong>${title}</strong><span>${desc}</span></div>`;
      grid.appendChild(link);
      index += 1;
    });

    const structureItem = Array.from(grid.querySelectorAll('.service-link')).find(link => {
      const strong = link.querySelector('strong');
      return strong && strong.textContent.trim() === 'Struktur Organisasi';
    });
    if (structureItem) structureItem.querySelector('strong').textContent = 'Struktur Organisasi (Pendukung)';
    grid.dataset.master10Applied = '1';
  }

  function ensureMasterShell() {
    if (!document.body) return;
    installResponsiveHeaderGuard();
    ensureMasterTopbar();
    ensureMobileToggle();
    loadHomeImmunizationTarget();
    ensureKlaster1Menu();
  }

  function loadLegacyBootstrap() {
    if (window.__PKM_MASTER_BOOTSTRAP_LOADED) return;
    window.__PKM_MASTER_BOOTSTRAP_LOADED = true;
    const script = document.createElement('script');
    script.src = 'script-master.js?v=20260909-header-fallback';
    script.defer = true;
    document.head.appendChild(script);
  }

  ensureMasterShell();
  loadLegacyBootstrap();
})();