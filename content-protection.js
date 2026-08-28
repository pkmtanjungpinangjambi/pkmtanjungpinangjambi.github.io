/*
 * Content Protection — UPTD Puskesmas Tanjung Pinang Kota Jambi
 *
 * This is a deterrent layer only. It cannot make public web assets impossible
 * to copy because browsers must receive HTML/CSS/JS/media to render the site.
 * Do not place secrets or patient data in frontend code.
 */
(function () {
  'use strict';

  const editableSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

  function isEditable(target) {
    return !!(target && target.closest && target.closest(editableSelector));
  }

  function wireMaternalServiceLink() {
    const path = window.location.pathname || '';
    if (!path.endsWith('pelayanan.html')) return;

    const cluster = document.querySelector('details.cluster-2');
    if (!cluster) return;

    const targetText = 'Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas';
    const items = cluster.querySelectorAll('.service-link');

    items.forEach(function (item) {
      const title = item.querySelector('strong');
      if (!title || title.textContent.trim() !== targetText) return;
      if (item.closest('a')) return;

      const link = document.createElement('a');
      link.className = item.className;
      link.href = 'pelayanan-ibu-hamil-bersalin-nifas.html';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      link.setAttribute('aria-label', 'Buka Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas');
      link.innerHTML = item.innerHTML;
      item.replaceWith(link);
    });
  }

  function wireChildServiceLink() {
    const path = window.location.pathname || '';
    if (!path.endsWith('pelayanan.html')) return;

    const cluster = document.querySelector('details.cluster-2');
    if (!cluster) return;

    const targetText = 'Pelayanan Anak';
    const items = cluster.querySelectorAll('.service-link');

    items.forEach(function (item) {
      const title = item.querySelector('strong');
      if (!title || title.textContent.trim() !== targetText) return;
      if (item.closest('a')) return;

      const link = document.createElement('a');
      link.className = item.className;
      link.href = 'pelayanan-anak.html';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      link.setAttribute('aria-label', 'Buka Pelayanan Anak');
      link.innerHTML = item.innerHTML;
      item.replaceWith(link);
    });
  }

  function installStyle() {
    if (document.getElementById('content-protection-style')) return;

    const style = document.createElement('style');
    style.id = 'content-protection-style';
    style.textContent = `
      body.content-protected,
      body.content-protected * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }

      body.content-protected input,
      body.content-protected textarea,
      body.content-protected select,
      body.content-protected [contenteditable="true"],
      body.content-protected [contenteditable=""] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        user-select: text !important;
      }

      body.content-protected img,
      body.content-protected video {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add('content-protected');
  }

  function blockEvent(event) {
    if (!isEditable(event.target)) {
      event.preventDefault();
    }
  }

  document.addEventListener('copy', blockEvent, true);
  document.addEventListener('cut', blockEvent, true);

  document.addEventListener('contextmenu', function (event) {
    if (!isEditable(event.target)) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener('dragstart', function (event) {
    if (!isEditable(event.target)) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener('keydown', function (event) {
    if (isEditable(event.target)) return;

    const key = String(event.key || '').toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;

    const blocked =
      (modifier && ['c', 'x', 'u', 's'].includes(key)) ||
      (modifier && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      event.key === 'F12';

    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      installStyle();
      wireMaternalServiceLink();
      wireChildServiceLink();
    }, { once: true });
  } else {
    installStyle();
    wireMaternalServiceLink();
    wireChildServiceLink();
  }
})();
