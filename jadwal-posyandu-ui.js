/* Public schedule renderer — no patient-level data. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  ready(function () {
    const root = document.getElementById('posyandu-public');
    const source = Array.isArray(window.POSYANDU_SCHEDULE_2026) ? window.POSYANDU_SCHEDULE_2026 : [];
    if (!root) return;

    const style = document.createElement('style');
    style.textContent = `
      .public-schedule{margin-top:28px;padding:24px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(150deg,#f5fbf8,#fff);box-shadow:var(--shadow)}
      .public-schedule-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;margin-bottom:18px}
      .public-schedule-head h2{margin:5px 0 8px;color:var(--ink);font-size:clamp(1.35rem,2.6vw,1.9rem)}
      .public-schedule-head p{margin:0;max-width:700px;color:var(--muted);font-size:.88rem;line-height:1.6}
      .schedule-count{display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;border-radius:16px;background:var(--green-950);color:#fff;font-size:1.15rem;font-weight:900}
      .schedule-toolbar{display:grid;grid-template-columns:1fr 1fr auto;gap:10px;margin-bottom:18px}
      .schedule-toolbar label{display:grid;gap:6px;font-size:.73rem;font-weight:800;color:var(--green-900)}
      .schedule-toolbar select,.schedule-toolbar input{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);font:inherit;font-size:.83rem;outline:none}
      .schedule-toolbar select:focus,.schedule-toolbar input:focus{border-color:var(--green-500);box-shadow:0 0 0 3px rgba(14,122,90,.1)}
      .schedule-reset{align-self:end;padding:11px 15px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--green-800);font-weight:800;cursor:pointer}
      .schedule-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:16px;background:#fff}
      .public-schedule table{width:100%;border-collapse:collapse;min-width:720px}
      .public-schedule th,.public-schedule td{padding:13px 14px;text-align:left;border-bottom:1px solid #edf2ef;font-size:.82rem;vertical-align:top}
      .public-schedule th{background:#f6faf8;color:var(--green-900);font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;position:sticky;top:0;z-index:1}
      .public-schedule tr:last-child td{border-bottom:0}
      .posyandu-name{font-weight:900;color:var(--ink)}
      .posyandu-meta{display:block;margin-top:3px;color:var(--muted);font-size:.74rem}
      .date-pill{display:inline-flex;padding:5px 9px;border-radius:999px;background:#e9f7f0;border:1px solid #cdeade;color:var(--green-900);font-weight:900}
      .schedule-empty{padding:24px;text-align:center;color:var(--muted);font-size:.86rem}
      .schedule-note{margin:13px 0 0;color:var(--muted);font-size:.73rem;line-height:1.6}
      @media(max-width:720px){
        .public-schedule{padding:18px}
        .public-schedule-head{align-items:flex-start}
        .schedule-count{min-width:46px;height:46px;font-size:1rem}
        .schedule-toolbar{grid-template-columns:1fr}
        .schedule-reset{width:100%}
      }
    `;
    document.head.appendChild(style);

    const unique = (key) => [...new Set(source.map((item) => item[key]).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), 'id'));
    const kelurahan = unique('kelurahan');
    const options = ['<option value="">Semua kelurahan</option>', ...kelurahan.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)].join('');

    root.innerHTML = `
      <div class="public-schedule">
        <div class="public-schedule-head">
          <div>
            <span class="kicker">Jadwal layanan masyarakat</span>
            <h2>Jadwal Posyandu 2026</h2>
            <p>Pilih kelurahan atau tanggal untuk menemukan jadwal dengan cepat. Informasi ini hanya menampilkan data operasional yang aman untuk publik.</p>
          </div>
          <div class="schedule-count" id="schedule-count" aria-label="Jumlah jadwal">0</div>
        </div>
        <div class="schedule-toolbar">
          <label>Kelurahan<select id="schedule-kelurahan">${options}</select></label>
          <label>Tanggal<select id="schedule-tanggal"><option value="">Semua tanggal</option>${Array.from({ length: 20 }, (_, i) => `<option value="${i + 5}">Tanggal ${i + 5}</option>`).join('')}</select></label>
          <button class="schedule-reset" id="schedule-reset" type="button">Reset filter</button>
        </div>
        <div class="schedule-table-wrap">
          <table aria-describedby="schedule-note">
            <thead><tr><th>Posyandu</th><th>Kelurahan</th><th>Tanggal</th><th>Jam</th><th>RT Lokasi</th><th>Wilayah Kerja</th></tr></thead>
            <tbody id="schedule-body"></tbody>
          </table>
        </div>
        <p class="schedule-note" id="schedule-note">Catatan: tanggal pada dataset master dicatat sebagai tanggal pelaksanaan bulanan. Konfirmasi perubahan jadwal sebelum datang melalui kanal resmi Puskesmas.</p>
      </div>`;

    const $ = (id) => document.getElementById(id);
    const selectKel = $('schedule-kelurahan');
    const selectTanggal = $('schedule-tanggal');
    const body = $('schedule-body');
    const count = $('schedule-count');

    function render() {
      const kel = selectKel.value;
      const day = selectTanggal.value;
      const filtered = source
        .filter((item) => (!kel || item.kelurahan === kel) && (!day || String(item.tanggal) === day))
        .sort((a, b) => Number(a.tanggal) - Number(b.tanggal) || a.kelurahan.localeCompare(b.kelurahan, 'id') || a.posyandu.localeCompare(b.posyandu, 'id'));

      count.textContent = String(filtered.length);
      if (!filtered.length) {
        body.innerHTML = '<tr><td colspan="6" class="schedule-empty">Belum ada jadwal yang cocok dengan filter.</td></tr>';
        return;
      }

      body.innerHTML = filtered.map((item) => `
        <tr>
          <td><span class="posyandu-name">${escapeHtml(item.posyandu)}</span></td>
          <td>${escapeHtml(item.kelurahan)}</td>
          <td><span class="date-pill">${escapeHtml(String(item.tanggal))}</span></td>
          <td>${escapeHtml(item.jam)} WIB</td>
          <td>RT ${escapeHtml(item.rtPosyandu || '-')}</td>
          <td>${escapeHtml(item.wilayahKerja || '-')}</td>
        </tr>`).join('');
    }

    function escapeHtml(value) {
      return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    selectKel.addEventListener('change', render);
    selectTanggal.addEventListener('change', render);
    $('schedule-reset').addEventListener('click', function () {
      selectKel.value = '';
      selectTanggal.value = '';
      render();
    });

    render();
  });
})();
