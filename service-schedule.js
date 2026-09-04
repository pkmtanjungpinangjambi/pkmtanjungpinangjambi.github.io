(function () {
  'use strict';

  function getSchedules() {
    return window.SERVICE_SCHEDULES || { operatingHours: [], registration: {}, services: [] };
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function renderServiceSchedule(target) {
    var root = typeof target === 'string' ? document.querySelector(target) : target;
    if (!root) return;
    var data = getSchedules();
    root.innerHTML = data.services.filter(function (service) { return service.active; }).map(function (service) {
      var rows = service.schedules.map(function (item) {
        return '<div class="service-schedule-row"><span>' + escapeHtml(item.day) + '</span><strong>' + escapeHtml(item.time) + '</strong></div>';
      }).join('');
      var special = (service.special || []).map(function (item) {
        return '<li>' + escapeHtml(item) + '</li>';
      }).join('');
      return '<article class="service-schedule-card"><div class="service-schedule-kicker">' + escapeHtml(service.category) + '</div><h3>' + escapeHtml(service.title) + '</h3>' + rows + (special ? '<div class="service-schedule-special"><strong>Layanan khusus</strong><ul>' + special + '</ul></div>' : '') + (service.note ? '<p class="service-schedule-note">' + escapeHtml(service.note) + '</p>' : '') + '</article>';
    }).join('');
  }

  window.ServiceSchedule = { getSchedules: getSchedules, renderServiceSchedule: renderServiceSchedule };
})();
