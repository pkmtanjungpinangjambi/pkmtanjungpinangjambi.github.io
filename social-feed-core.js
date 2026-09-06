/* Social feed disabled in favor of icon-only official channels. */
(function () {
  'use strict';

  const channels = [
    { key:'instagram', label:'Instagram', href:'https://www.instagram.com/pkm.tanjungpinang.jambi', src:'assets/social/ig.svg?v=20260906-1' },
    { key:'facebook', label:'Facebook', href:'https://web.facebook.com/kiki.ayu.98229', src:'assets/social/fb.svg?v=20260906-1' },
    { key:'youtube', label:'YouTube', href:'https://www.youtube.com/@puskesmastanjungpinangkota7276', src:'assets/social/yutu.svg?v=20260906-1' },
    { key:'whatsapp', label:'WhatsApp', href:'https://wa.me/6282180622274', src:'assets/social/wa.svg?v=20260906-1' }
  ];

  const grid = document.getElementById('social-feed-grid');
  if (!grid) return;

  const host = grid.parentElement || grid;
  const style = document.createElement('style');
  style.textContent = `
    .social-icon-only-links{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:16px}
    .social-icon-only-link{display:inline-grid;place-items:center;width:42px;height:42px;padding:8px;border:1px solid var(--line,#dbe8e3);border-radius:12px;background:#fff;box-shadow:0 6px 16px rgba(0,59,45,.08);text-decoration:none}
    .social-icon-only-link img{display:block;width:100%;height:100%;object-fit:contain}
    .social-icon-only-link:focus-visible{outline:3px solid rgba(20,116,91,.22);outline-offset:2px}
  `;
  document.head.appendChild(style);

  grid.replaceChildren();
  const links = document.createElement('div');
  links.className = 'social-icon-only-links';
  links.setAttribute('aria-label','Kanal resmi Puskesmas');
  links.innerHTML = channels.map(c => `
    <a class="social-icon-only-link ${c.key}" href="${c.href}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${c.label} resmi" title="${c.label}">
      <img src="${c.src}" alt="${c.label} resmi" width="24" height="24" loading="lazy">
    </a>
  `).join('');
  host.appendChild(links);

  const status = document.getElementById('social-feed-status');
  if (status) status.textContent = 'Kanal resmi tersedia melalui ikon.';
})();
