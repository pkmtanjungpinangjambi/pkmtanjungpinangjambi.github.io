/*
 * Header bootstrap — UPTD Puskesmas Tanjung Pinang Kota Jambi
 * Ensures every leaf page has the master header shell before the full
 * navigation/content bootstrap runs. The complete legacy bootstrap is kept
 * intact in script-master.js and loaded immediately after these guards.
 */
(function () {
  'use strict';

  function ensureMasterTopbar() {
    const existing = document.querySelector('.topbar');
    let topbar = existing;

    if (!topbar) {
      topbar = document.createElement('div');
      topbar.className = 'topbar';
      const header = document.querySelector('.site-header');
      if (header?.parentNode) {
        header.parentNode.insertBefore(topbar, header);
      } else {
        document.body.insertBefore(topbar, document.body.firstChild || null);
      }
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
<span class="topbar-social"><a href="https://www.instagram.com/pkm.tanjungpinang.jambi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="#fff" stroke="none"/></svg></a><a href="https://web.facebook.com/kiki.ayu.98229" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z"/></svg></a><a href="https://wa.me/6282180622274" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg width="13" height="13" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C30 8.3 22.6 3 16 3zm5.9 15.1c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.6-.2-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1 .6.3.8 1.1 2.6 1.2 2.8.1.2.1.4 0 .6-.3.6-.7 1.2-1 1.5-.2.2-.4.5-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1l1.2-1.4c.3-.3.5-.2.9-.1l2.5 1.2c.4.2.6.3.7.5.1.2.1.9-.2 1.8z"/></svg></a></span>`;
  }

  function ensureMobileToggle() {
    const navWrap = document.querySelector('.site-header .nav-wrap');
    const nav = navWrap?.querySelector('.nav');
    if (!navWrap || !nav) return;
    if (navWrap.querySelector('.nav-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Buka menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    navWrap.insertBefore(toggle, nav);
  }

  function ensureMasterShell() {
    if (!document.body) return;
    ensureMasterTopbar();
    ensureMobileToggle();
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
