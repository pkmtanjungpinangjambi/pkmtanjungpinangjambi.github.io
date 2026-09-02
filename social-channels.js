/* Social media cards — informasi.html only */
(function () {
  'use strict';

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
        <a class="social-channel-card" href="https://wa.me/6282180622274" target="_blank" rel="noopener noreferrer" aria-label="Hubungi Puskesmas Tanjung Pinang Jambi melalui WhatsApp"><img src="assets/social/wa.webp?v=20260902-3" alt="WhatsApp Puskesmas Tanjung Pinang Jambi" loading="lazy" width="750" height="380"></a>
        <a class="social-channel-card" href="https://web.facebook.com/kiki.ayu.98229" target="_blank" rel="noopener noreferrer" aria-label="Ikuti Puskesmas Tanjung Pinang Jambi di Facebook"><img src="assets/social/fb.webp?v=20260902-3" alt="Facebook Puskesmas Tanjung Pinang Jambi" loading="lazy" width="750" height="383"></a>
        <a class="social-channel-card" href="https://www.youtube.com/@puskesmastanjungpinangkota7276" target="_blank" rel="noopener noreferrer" aria-label="Ikuti Puskesmas Tanjung Pinang Jambi di YouTube"><img src="assets/social/yutu.webp?v=20260902-3" alt="YouTube Puskesmas Tanjung Pinang Jambi" loading="lazy" width="748" height="399"></a>
      </div>
    `;

    if (note) note.insertAdjacentElement('afterend', section);
    else host.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
})();
