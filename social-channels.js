/* Social media cards — informasi.html only */
(function () {
  'use strict';

  const channels = [
    {
      key: 'instagram',
      label: 'Instagram',
      title: 'Follow Us',
      subtitle: 'Lihat kegiatan dan informasi terbaru',
      button: 'Ikuti Kami',
      href: 'https://www.instagram.com/pkm.tanjungpinang.jambi',
      src: 'assets/social/ig.svg?v=20260904-3',
      alt: 'Instagram UPTD Puskesmas Tanjung Pinang Kota Jambi'
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      title: 'Chat with Us',
      subtitle: 'Konsultasi dan informasi layanan',
      button: 'Chat Sekarang',
      href: 'https://wa.me/6282180622274',
      src: 'assets/social/wa.svg?v=20260904-3',
      alt: 'WhatsApp UPTD Puskesmas Tanjung Pinang Kota Jambi'
    },
    {
      key: 'facebook',
      label: 'Facebook',
      title: 'Follow Us',
      subtitle: 'Berita dan pengumuman resmi',
      button: 'Ikuti Kami',
      href: 'https://web.facebook.com/kiki.ayu.98229',
      src: 'assets/social/fb.svg?v=20260904-3',
      alt: 'Facebook UPTD Puskesmas Tanjung Pinang Kota Jambi'
    },
    {
      key: 'youtube',
      label: 'YouTube',
      title: 'Watch Us',
      subtitle: 'Video edukasi dan dokumentasi',
      button: 'Tonton Sekarang',
      href: 'https://www.youtube.com/@puskesmastanjungpinangkota7276',
      src: 'assets/social/yutu.svg?v=20260904-3',
      alt: 'YouTube UPTD Puskesmas Tanjung Pinang Kota Jambi'
    }
  ];

  function installStyle() {
    if (document.getElementById('social-channels-style')) return;
    const style = document.createElement('style');
    style.id = 'social-channels-style';
    style.textContent = `
      .social-channels{margin:32px 0 8px;padding:26px;border:1px solid var(--line,#dbe8e3);border-radius:22px;background:linear-gradient(180deg,#fbfefd 0%,#f3faf7 100%);box-shadow:0 12px 32px rgba(0,59,45,.08)}
      .social-channels-heading{text-align:center;max-width:780px;margin:0 auto 22px}
      .social-channels-kicker{margin:0 0 6px;color:var(--green-700,#14745b);font-size:.76rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .social-channels-heading h2{margin:0 0 7px;color:var(--green-900,#073f31);font-size:clamp(1.25rem,2vw,1.65rem)}
      .social-channels-heading p:last-child{margin:0;color:var(--muted,#61736d);font-size:.9rem;line-height:1.55}
      .social-channels-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
      .social-channel-card{display:flex;flex-direction:column;overflow:hidden;min-width:0;border-radius:18px;background:#fff;border:1px solid rgba(0,0,0,.08);box-shadow:0 10px 24px rgba(0,0,0,.10);text-decoration:none;transition:transform .22s ease,box-shadow .22s ease}
      .social-channel-card:hover,.social-channel-card:focus-visible{transform:translateY(-4px);box-shadow:0 16px 34px rgba(0,0,0,.16)}
      .social-channel-card:focus-visible{outline:3px solid rgba(20,116,91,.28);outline-offset:3px}
      .social-channel-media{display:block;width:100%;aspect-ratio:750/380;overflow:hidden;background:#eef5f1}
      .social-channel-media img{display:block;width:100%;height:100%;object-fit:cover}
      .social-channel-copy{display:flex;flex:1;flex-direction:column;padding:15px 16px 16px}
      .social-channel-label{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:5px}
      .social-channel-label strong{font-size:1rem;color:var(--green-900,#073f31)}
      .social-channel-label span{font-size:.72rem;font-weight:900;color:var(--muted,#61736d);text-transform:uppercase;letter-spacing:.05em}
      .social-channel-copy p{margin:0;color:var(--muted,#61736d);font-size:.82rem;line-height:1.5}
      .social-channel-button{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:auto;padding:10px 12px;border-radius:11px;font-size:.78rem;font-weight:900;color:#fff;text-align:center}
      .social-channel-button:after{content:'→';font-size:1rem;line-height:1}
      .social-channel-card.instagram .social-channel-button{background:linear-gradient(135deg,#f58529,#c51b91)}
      .social-channel-card.whatsapp .social-channel-button{background:linear-gradient(135deg,#11b96b,#079447)}
      .social-channel-card.facebook .social-channel-button{background:linear-gradient(135deg,#1877f2,#1458b8)}
      .social-channel-card.youtube .social-channel-button{background:linear-gradient(135deg,#ff3838,#d70000)}
      @media(max-width:1000px){.social-channels-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:600px){.social-channels{padding:18px 14px;border-radius:16px}.social-channels-grid{grid-template-columns:1fr;gap:12px}.social-channel-media{aspect-ratio:750/380}.social-channel-copy{padding:13px 14px 14px}}
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
        <h2 id="social-channels-title">Ikuti Media Sosial Kami</h2>
        <p>Dapatkan informasi terbaru, kegiatan, edukasi kesehatan, dan layanan kami melalui media sosial resmi.</p>
      </div>
      <div class="social-channels-grid">
        ${channels.map(channel => `
          <a class="social-channel-card ${channel.key}" href="${channel.href}" target="_blank" rel="noopener noreferrer" aria-label="${channel.button} ${channel.label} UPTD Puskesmas Tanjung Pinang Kota Jambi">
            <span class="social-channel-media">
              <img src="${channel.src}" alt="${channel.alt}" loading="lazy" width="750" height="380">
            </span>
            <span class="social-channel-copy">
              <span class="social-channel-label"><strong>${channel.label}</strong><span>${channel.title}</span></span>
              <p>${channel.subtitle}</p>
              <span class="social-channel-button">${channel.button}</span>
            </span>
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
