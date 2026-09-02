/* Social media cards — informasi.html only */
(function () {
  'use strict';

  const channels = [
    {
      key: 'instagram',
      label: 'Instagram',
      title: 'Follow Us',
      subtitle: 'Lihat kegiatan dan informasi terbaru',
      href: 'https://www.instagram.com/pkm.tanjungpinang.jambi',
      className: 'instagram',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="8" width="48" height="48" rx="14" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="32" cy="32" r="11" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="47" cy="17" r="4" fill="currentColor"/></svg>'
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      title: 'Chat with Us',
      subtitle: 'Konsultasi dan informasi layanan',
      href: 'https://wa.me/6282180622274',
      className: 'whatsapp',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8a24 24 0 0 0-20.5 36.5L8 56l11.8-3.4A24 24 0 1 0 32 8Z" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 22c1.2 6.7 6.1 12.7 13.2 16 2 .9 4.1.4 5.1-1.5l1.4-2.6-6.5-3.1-2 2.5c-2.7-1.4-5-3.4-6.6-6l2.4-2-3.2-6.2H25c-.8 0-1.2.9-1 1.9Z" fill="currentColor" stroke="none"/></svg>'
    },
    {
      key: 'facebook',
      label: 'Facebook',
      title: 'Follow Us',
      subtitle: 'Berita dan pengumuman resmi',
      href: 'https://web.facebook.com/kiki.ayu.98229',
      className: 'facebook',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M38 14h10v-9H38c-9 0-14 6-14 15v7h-9v10h9v22h11V37h10l2-10H35v-6c0-4 1-7 3-7Z" fill="currentColor"/></svg>'
    },
    {
      key: 'youtube',
      label: 'YouTube',
      title: 'Watch Us',
      subtitle: 'Video edukasi dan dokumentasi',
      href: 'https://www.youtube.com/@puskesmastanjungpinangkota7276',
      className: 'youtube',
      icon: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="15" width="52" height="34" rx="11" fill="currentColor"/><path d="m27 24 16 8-16 8Z" fill="#fff"/></svg>'
    }
  ];

  function installStyle() {
    if (document.getElementById('social-channels-style')) return;
    const style = document.createElement('style');
    style.id = 'social-channels-style';
    style.textContent = `
      .social-channels{margin:32px 0 8px;padding:26px;border:1px solid var(--line,#dbe8e3);border-radius:22px;background:linear-gradient(180deg,#fbfefd 0%,#f3faf7 100%);box-shadow:0 12px 32px rgba(0,59,45,.08)}
      .social-channels-heading{text-align:center;max-width:760px;margin:0 auto 22px}
      .social-channels-kicker{margin:0 0 6px;color:var(--green-700,#14745b);font-size:.76rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .social-channels-heading h2{margin:0 0 7px;color:var(--green-900,#073f31);font-size:clamp(1.25rem,2vw,1.65rem)}
      .social-channels-heading p:last-child{margin:0;color:var(--muted,#61736d);font-size:.9rem;line-height:1.55}
      .social-channels-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
      .social-channel-card{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:220px;padding:0;border-radius:18px;text-decoration:none;background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 10px 24px rgba(0,0,0,.10);transition:transform .22s ease,box-shadow .22s ease}
      .social-channel-card:hover,.social-channel-card:focus-visible{transform:translateY(-4px);box-shadow:0 16px 34px rgba(0,0,0,.16)}
      .social-channel-card:focus-visible{outline:3px solid rgba(20,116,91,.28);outline-offset:3px}
      .social-channel-art{position:relative;display:grid;place-items:center;height:132px;padding:18px;color:#fff;overflow:hidden}
      .social-channel-art:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 15%,rgba(255,255,255,.36),transparent 28%),linear-gradient(135deg,rgba(255,255,255,.18),transparent 44%)}
      .social-channel-art:after{content:"";position:absolute;width:140px;height:140px;border-radius:50%;right:-48px;bottom:-68px;background:rgba(255,255,255,.12)}
      .social-channel-icon{position:relative;z-index:2;width:74px;height:74px;padding:14px;border-radius:20px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);box-shadow:inset 0 2px 2px rgba(255,255,255,.35),0 10px 20px rgba(0,0,0,.18);display:grid;place-items:center}
      .social-channel-icon svg{width:100%;height:100%;display:block;color:#fff;filter:drop-shadow(0 3px 3px rgba(0,0,0,.18))}
      .social-channel-copy{padding:15px 16px 16px;display:flex;flex:1;flex-direction:column}
      .social-channel-copy strong{font-size:1rem;color:var(--green-900,#073f31);margin-bottom:3px}
      .social-channel-copy span{font-size:.82rem;color:var(--muted,#61736d);line-height:1.45}
      .social-channel-cta{margin-top:auto;padding-top:12px;font-size:.78rem;font-weight:900;color:#fff;text-align:center}
      .social-channel-card.instagram .social-channel-art{background:linear-gradient(135deg,#f58529,#dd2a7b 50%,#8134af)}
      .social-channel-card.whatsapp .social-channel-art{background:linear-gradient(135deg,#11b96b,#079447)}
      .social-channel-card.facebook .social-channel-art{background:linear-gradient(135deg,#1877f2,#1458b8)}
      .social-channel-card.youtube .social-channel-art{background:linear-gradient(135deg,#ff3838,#d70000)}
      .social-channel-card.instagram .social-channel-cta{background:linear-gradient(135deg,#f58529,#c51b91)}
      .social-channel-card.whatsapp .social-channel-cta{background:linear-gradient(135deg,#11b96b,#079447)}
      .social-channel-card.facebook .social-channel-cta{background:linear-gradient(135deg,#1877f2,#1458b8)}
      .social-channel-card.youtube .social-channel-cta{background:linear-gradient(135deg,#ff3838,#d70000)}
      @media(max-width:1000px){.social-channels-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:600px){.social-channels{padding:18px 14px;border-radius:16px}.social-channels-grid{grid-template-columns:1fr;gap:12px}.social-channel-card{min-height:205px}.social-channel-art{height:120px}}
    `;
    document.head.appendChild(style);
  }

  function render() {
    if (document.getElementById('social-channels')) return;
    const note = document.querySelector('.galeri-note');
    const host = note ? note.parentElement : (document.querySelector('.page-content .container') || document.querySelector('main .container') || document.querySelector('main'));
    if (!host) return;

    const section = document.createElement('section');
    section.id = 'social-channels';
    section.className = 'social-channels';
    section.setAttribute('aria-labelledby','social-channels-title');
    section.innerHTML = `
      <div class="social-channels-heading">
        <p class="social-channels-kicker">Terhubung Bersama Kami</p>
        <h2 id="social-channels-title">Ikuti Kami di Media Sosial</h2>
        <p>Ikuti informasi, edukasi, dan kegiatan terbaru Puskesmas Tanjung Pinang Jambi.</p>
      </div>
      <div class="social-channels-grid">
        ${channels.map(channel => `
          <a class="social-channel-card ${channel.className}" href="${channel.href}" target="_blank" rel="noopener noreferrer" aria-label="${channel.title} ${channel.label} Puskesmas Tanjung Pinang Jambi">
            <div class="social-channel-art">
              <div class="social-channel-icon">${channel.icon}</div>
            </div>
            <div class="social-channel-copy">
              <strong>${channel.label}</strong>
              <span>${channel.title} — ${channel.subtitle}</span>
              <div class="social-channel-cta">${channel.title} →</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    if (note) note.insertAdjacentElement('afterend', section);
    else host.appendChild(section);
    installStyle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once:true });
  else render();
})();
