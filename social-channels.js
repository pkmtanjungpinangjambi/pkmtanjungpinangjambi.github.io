/* Social media cards — informasi.html only */
(function () {
  'use strict';

  function installStyle() {
    if (document.getElementById('social-channels-style')) return;
    const style = document.createElement('style');
    style.id = 'social-channels-style';
    style.textContent = `
      .social-channels { margin: 32px 0 8px; padding: 24px; border: 1px solid var(--line, #dbe8e3); border-radius: 20px; background: linear-gradient(180deg, #fbfefd 0%, #f4faf7 100%); box-shadow: 0 10px 28px rgba(0,59,45,.07); }
      .social-channels-heading { text-align: center; max-width: 760px; margin: 0 auto 18px; }
      .social-channels-kicker { margin: 0 0 6px; color: var(--green-700, #14745b); font-size: .76rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
      .social-channels-heading h2 { margin: 0 0 7px; color: var(--green-900, #073f31); font-size: clamp(1.2rem, 2vw, 1.55rem); }
      .social-channels-heading p:last-child { margin: 0; color: var(--muted, #61736d); font-size: .88rem; line-height: 1.55; }
      .social-channels-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: stretch; }
      .social-channel-card { display: block; overflow: hidden; border-radius: 16px; text-decoration: none; background: transparent; transition: transform .2s ease, filter .2s ease; }
      .social-channel-card:hover, .social-channel-card:focus-visible { transform: translateY(-3px); filter: brightness(1.02); }
      .social-channel-card img { display: block; width: 100%; height: auto; border: 0; }
      .social-channel-card:focus-visible { outline: 3px solid rgba(20,116,91,.28); outline-offset: 3px; }
      @media (max-width: 900px) { .social-channels-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 600px) { .social-channels { padding: 18px 14px; border-radius: 16px; } .social-channels-grid { grid-template-columns: 1fr; gap: 12px; } }
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
    section.setAttribute('aria-labelledby', 'social-channels-title');
    section.innerHTML = `
      <div class="social-channels-heading">
        <p class="social-channels-kicker">Terhubung Bersama Kami</p>
        <h2 id="social-channels-title">Ikuti Kami di Media Sosial</h2>
        <p>Ikuti informasi, edukasi, dan kegiatan terbaru Puskesmas Tanjung Pinang Jambi.</p>
      </div>
      <div class="social-channels-grid">
        <a class="social-channel-card" href="https://wa.me/6282180622274" target="_blank" rel="noopener noreferrer" aria-label="Hubungi Puskesmas Tanjung Pinang Jambi melalui WhatsApp">
          <img src="assets/social/wa.webp?v=20260902-2" alt="WhatsApp Puskesmas Tanjung Pinang Jambi" loading="lazy">
        </a>
        <a class="social-channel-card" href="https://web.facebook.com/kiki.ayu.98229" target="_blank" rel="noopener noreferrer" aria-label="Ikuti Puskesmas Tanjung Pinang Jambi di Facebook">
          <img src="assets/social/fb.webp?v=20260902-2" alt="Facebook Puskesmas Tanjung Pinang Jambi" loading="lazy">
        </a>
        <a class="social-channel-card" href="https://www.youtube.com/@puskesmastanjungpinangkota7276" target="_blank" rel="noopener noreferrer" aria-label="Ikuti Puskesmas Tanjung Pinang Jambi di YouTube">
          <img src="assets/social/yutu.webp?v=20260902-2" alt="YouTube Puskesmas Tanjung Pinang Jambi" loading="lazy">
        </a>
      </div>
    `;

    if (note) note.insertAdjacentElement('afterend', section);
    else host.appendChild(section);
    installStyle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
})();
