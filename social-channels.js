/* Official social channels — icon-only presentation. */
(function () {
  'use strict';

  const channels = [
    { key:'instagram', label:'Instagram', href:'https://www.instagram.com/pkm.tanjungpinang.jambi', src:'assets/social/ig.svg?v=20260906-1' },
    { key:'whatsapp', label:'WhatsApp', href:'https://wa.me/6282180622274', src:'assets/social/wa.svg?v=20260906-1' },
    { key:'facebook', label:'Facebook', href:'https://web.facebook.com/kiki.ayu.98229', src:'assets/social/fb.svg?v=20260906-1' },
    { key:'youtube', label:'YouTube', href:'https://www.youtube.com/@puskesmastanjungpinangkota7276', src:'assets/social/yutu.svg?v=20260906-1' }
  ];

  function installStyle() {
    if (document.getElementById('social-channels-style')) return;
    const style = document.createElement('style');
    style.id = 'social-channels-style';
    style.textContent = `
      .social-channels-iconbar{display:flex;justify-content:center;align-items:center;gap:10px;margin:24px 0 8px}
      .social-channel-icon{display:inline-grid;place-items:center;width:42px;height:42px;padding:8px;border:1px solid var(--line,#dbe8e3);border-radius:12px;background:#fff;box-shadow:0 6px 16px rgba(0,59,45,.08);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
      .social-channel-icon:hover,.social-channel-icon:focus-visible{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,59,45,.12);border-color:#b9d8ce}
      .social-channel-icon:focus-visible{outline:3px solid rgba(20,116,91,.22);outline-offset:2px}
      .social-channel-icon img{display:block;width:100%;height:100%;object-fit:contain}
      @media(max-width:520px){.social-channels-iconbar{gap:8px;margin-top:18px}.social-channel-icon{width:38px;height:38px;padding:7px;border-radius:10px}}
    `;
    document.head.appendChild(style);
  }

  function render() {
    if (document.getElementById('social-channels-iconbar')) return;
    const host = document.querySelector('.page-content .container') || document.querySelector('main .container') || document.querySelector('main');
    if (!host) return;

    const section = document.createElement('section');
    section.id = 'social-channels-iconbar';
    section.className = 'social-channels-iconbar';
    section.setAttribute('aria-label','Kanal resmi Puskesmas');
    section.innerHTML = channels.map(channel => `
      <a class="social-channel-icon ${channel.key}" href="${channel.href}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${channel.label} resmi UPTD Puskesmas Tanjung Pinang Kota Jambi" title="${channel.label}">
        <img src="${channel.src}" alt="${channel.label} resmi UPTD Puskesmas Tanjung Pinang Kota Jambi" loading="lazy" decoding="async" width="24" height="24">
      </a>
    `).join('');

    host.appendChild(section);
    installStyle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once:true });
  else render();
})();
