/* Public schedule renderer — Supabase first, repository dataset fallback. */
(function () {
  'use strict';

  const SUPABASE_URL = 'https://pguspipnuyqmrnzirekm.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_jLOp7eqVR5o_Fb0IVHOS9Q_V3xEh3vW';
  const DEFAULT_SOURCE = Array.isArray(window.POSYANDU_SCHEDULE_2026)
    ? window.POSYANDU_SCHEDULE_2026
    : [];

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function text(value) {
    return String(value ?? '');
  }

  function formatDateId(dateIso) {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric'
    }).format(new Date(dateIso));
  }

  function formatTimeId(dateIso) {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(dateIso));
  }

  function apiRowToPublicRow(row) {
    return {
      kelurahan: text(row.region_name),
      posyandu: text(row.network_name).replace(/^Posyandu\s+/i, ''),
      tanggal: Number(formatDateId(row.start_at)),
      jam: formatTimeId(row.start_at),
      rtPosyandu: text(row.location).replace(/^RT\s*/i, ''),
      wilayahKerja: text(row.coverage_text),
      _networkType: text(row.network_type),
      _rawId: text(row.id)
    };
  }

  function createText(tag, value, className) {
    const el = document.createElement(tag);
    el.textContent = text(value);
    if (className) el.className = className;
    return el;
  }

  async function fetchPublicSchedule() {
    const endpoint = new URL('/rest/v1/public_schedule', SUPABASE_URL);
    endpoint.searchParams.set(
      'select',
      'id,title,category,location,start_at,end_at,recurrence_text,cluster_code,cluster_name,network_type,network_name,region_name,coverage_text,module_code,module_name'
    );
    endpoint.searchParams.set('category', 'eq.POSYANDU');
    endpoint.searchParams.append('start_at', 'gte.2026-09-01T00:00:00+07:00');
    endpoint.searchParams.append('start_at', 'lt.2026-10-01T00:00:00+07:00');
    endpoint.searchParams.set('order', 'start_at.asc');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(endpoint.toString(), {
        method: 'GET',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          Accept: 'application/json'
        },
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);

      const rows = await response.json();
      if (!Array.isArray(rows)) throw new Error('Format respons Supabase tidak valid');

      return rows
        .filter((row) => row && row.network_type === 'POSYANDU' && row.network_name && row.start_at && row.region_name)
        .map(apiRowToPublicRow);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  ready(function () {
    const root = document.getElementById('posyandu-public');
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
      .schedule-toolbar select{width:100%;padding:11px 12px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);font:inherit;font-size:.83rem;outline:none}
      .schedule-toolbar select:focus{border-color:var(--green-500);box-shadow:0 0 0 3px rgba(14,122,90,.1)}
      .schedule-reset{align-self:end;padding:11px 15px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--green-800);font-weight:800;cursor:pointer}
      .schedule-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:16px;background:#fff}
      .public-schedule table{width:100%;border-collapse:collapse;min-width:720px}
      .public-schedule th,.public-schedule td{padding:13px 14px;text-align:left;border-bottom:1px solid #edf2ef;font-size:.82rem;vertical-align:top}
      .public-schedule th{background:#f6faf8;color:var(--green-900);font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;position:sticky;top:0;z-index:1}
      .public-schedule tr:last-child td{border-bottom:0}
      .posyandu-name{font-weight:900;color:var(--ink)}
      .date-pill{display:inline-flex;padding:5px 9px;border-radius:999px;background:#e9f7f0;border:1px solid #cdeade;color:var(--green-900);font-weight:900}
      .schedule-empty{padding:24px;text-align:center;color:var(--muted);font-size:.86rem}
      .schedule-note{margin:13px 0 0;color:var(--muted);font-size:.73rem;line-height:1.6}
      .schedule-source{display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:.72rem;font-weight:800;color:var(--green-800)}
      @media(max-width:720px){.public-schedule{padding:18px}.public-schedule-head{align-items:flex-start}.schedule-count{min-width:46px;height:46px;font-size:1rem}.schedule-toolbar{grid-template-columns:1fr}.schedule-reset{width:100%}}
    `;
    document.head.appendChild(style);

    const sourceRows = [];
    const shell = document.createElement('div');
    shell.className = 'public-schedule';

    const head = document.createElement('div');
    head.className = 'public-schedule-head';
    const headCopy = document.createElement('div');
    headCopy.appendChild(createText('span', 'Jadwal layanan masyarakat', 'kicker'));
    headCopy.appendChild(createText('h2', 'Jadwal Posyandu 2026'));
    headCopy.appendChild(createText('p', 'Pilih kelurahan atau tanggal untuk menemukan jadwal dengan cepat. Informasi ini hanya menampilkan data operasional yang aman untuk publik.'));
    const count = createText('div', '0', 'schedule-count');
    count.setAttribute('aria-label', 'Jumlah jadwal');
    head.append(headCopy, count);

    const toolbar = document.createElement('div');
    toolbar.className = 'schedule-toolbar';
    const kelLabel = createText('label', 'Kelurahan');
    const kelSelect = document.createElement('select');
    kelSelect.setAttribute('aria-label', 'Filter kelurahan');
    kelLabel.appendChild(kelSelect);
    const dayLabel = createText('label', 'Tanggal');
    const daySelect = document.createElement('select');
    daySelect.setAttribute('aria-label', 'Filter tanggal');
    dayLabel.appendChild(daySelect);
    const reset = createText('button', 'Reset filter', 'schedule-reset');
    reset.type = 'button';
    toolbar.append(kelLabel, dayLabel, reset);

    const wrap = document.createElement('div');
    wrap.className = 'schedule-table-wrap';
    const table = document.createElement('table');
    table.setAttribute('aria-describedby', 'schedule-note');
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    ['Posyandu', 'Kelurahan', 'Tanggal', 'Jam', 'RT Lokasi', 'Wilayah Kerja'].forEach((label) => headRow.appendChild(createText('th', label)));
    thead.appendChild(headRow);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    wrap.appendChild(table);

    const note = createText('p', 'Catatan: tanggal pada dataset master dicatat sebagai tanggal pelaksanaan bulanan. Konfirmasi perubahan jadwal sebelum datang melalui kanal resmi Puskesmas.', 'schedule-note');
    note.id = 'schedule-note';
    const sourceNote = createText('div', '◷ Memuat jadwal dari server publik Puskesmas…', 'schedule-source');
    shell.append(head, toolbar, wrap, note, sourceNote);
    root.replaceChildren(shell);

    function setOptions() {
      kelSelect.replaceChildren();
      const allKel = createText('option', 'Semua kelurahan');
      allKel.value = '';
      kelSelect.appendChild(allKel);
      [...new Set(sourceRows.map((item) => item.kelurahan).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'id'))
        .forEach((kel) => {
          const option = createText('option', kel);
          option.value = kel;
          kelSelect.appendChild(option);
        });

      daySelect.replaceChildren();
      const allDay = createText('option', 'Semua tanggal');
      allDay.value = '';
      daySelect.appendChild(allDay);
      [...new Set(sourceRows.map((item) => Number(item.tanggal)).filter(Number.isFinite))]
        .sort((a, b) => a - b)
        .forEach((day) => {
          const option = createText('option', `Tanggal ${day}`);
          option.value = String(day);
          daySelect.appendChild(option);
        });
    }

    function render() {
      const kel = kelSelect.value;
      const day = daySelect.value;
      const filtered = sourceRows
        .filter((item) => (!kel || item.kelurahan === kel) && (!day || String(item.tanggal) === day))
        .sort((a, b) => Number(a.tanggal) - Number(b.tanggal) || a.kelurahan.localeCompare(b.kelurahan, 'id') || a.posyandu.localeCompare(b.posyandu, 'id'));

      count.textContent = String(filtered.length);
      tbody.replaceChildren();
      if (!filtered.length) {
        const row = document.createElement('tr');
        const cell = createText('td', 'Belum ada jadwal yang cocok dengan filter.', 'schedule-empty');
        cell.colSpan = 6;
        row.appendChild(cell);
        tbody.appendChild(row);
        return;
      }

      filtered.forEach((item) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.appendChild(createText('span', item.posyandu, 'posyandu-name'));
        row.appendChild(nameCell);
        row.appendChild(createText('td', item.kelurahan));
        const dateCell = document.createElement('td');
        dateCell.appendChild(createText('span', String(item.tanggal), 'date-pill'));
        row.appendChild(dateCell);
        row.appendChild(createText('td', `${item.jam} WIB`));
        row.appendChild(createText('td', `RT ${item.rtPosyandu || '-'}`));
        row.appendChild(createText('td', item.wilayahKerja || '-'));
        tbody.appendChild(row);
      });
    }

    kelSelect.addEventListener('change', render);
    daySelect.addEventListener('change', render);
    reset.addEventListener('click', () => {
      kelSelect.value = '';
      daySelect.value = '';
      render();
    });

    sourceRows.push(...DEFAULT_SOURCE);
    setOptions();
    render();

    fetchPublicSchedule()
      .then((liveRows) => {
        if (liveRows.length === 0) throw new Error('Supabase mengembalikan 0 jadwal');
        sourceRows.splice(0, sourceRows.length, ...liveRows);
        setOptions();
        render();
        sourceNote.textContent = '● Sumber aktif: Supabase public API Puskesmas';
      })
      .catch((error) => {
        sourceNote.textContent = '◷ Sumber cadangan: dataset repository; server publik belum dapat dihubungi.';
        console.warn('Public schedule API fallback:', error);
      });
  });
})();
