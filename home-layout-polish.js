/* Beranda layout polish — move the five-cluster dashboard below the service catalogue and emphasize leadership. */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  let observer = null;
  let timer = null;
  let attempts = 0;

  function ensureLeaderStyle() {
    const leader = document.querySelector('.hero-home .leader-wrap');
    if (!leader || document.getElementById('home-leader-spirit-style')) return;

    leader.classList.add('leader-spirit');
    const style = document.createElement('style');
    style.id = 'home-leader-spirit-style';
    style.textContent = `
      .hero-home .leader-wrap.leader-spirit{transform:translateY(-10px)}
      .hero-home .leader-wrap.leader-spirit .leader-card-v2{box-shadow:0 18px 42px rgba(0,59,45,.16);border-top:3px solid var(--green-700)}
      .hero-home .leader-wrap.leader-spirit .leader-script{font-size:1.12rem;font-weight:700;color:var(--green-900)}
      @media(max-width:1080px){.hero-home .leader-wrap.leader-spirit{transform:none}}
    `;
    document.head.appendChild(style);
  }

  function moveClusterDashboard() {
    const main = document.querySelector('main');
    const dashboard = document.getElementById('home-v4');
    if (!main || !dashboard) return false;

    const serviceSection = Array.from(main.querySelectorAll('section.band.section'))
      .find((section) => section.querySelector('.cards-svc'));
    if (!serviceSection) return false;

    if (dashboard.previousElementSibling !== serviceSection) {
      serviceSection.insertAdjacentElement('afterend', dashboard);
    }
    dashboard.setAttribute('data-home-layout-position', 'after-service-catalogue');
    return true;
  }

  function cleanup() {
    if (observer) observer.disconnect();
    if (timer) window.clearInterval(timer);
  }

  function init() {
    ensureLeaderStyle();
    if (moveClusterDashboard()) {
      cleanup();
      return;
    }

    const main = document.querySelector('main');
    if (!main) return;

    observer = new MutationObserver(() => {
      ensureLeaderStyle();
      if (moveClusterDashboard()) cleanup();
    });
    observer.observe(main, { childList: true, subtree: true });

    timer = window.setInterval(() => {
      attempts += 1;
      ensureLeaderStyle();
      if (moveClusterDashboard() || attempts >= 80) cleanup();
    }, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
