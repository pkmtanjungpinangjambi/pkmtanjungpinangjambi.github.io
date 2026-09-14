(() => {
  'use strict';

  const SUPABASE_URL = 'https://pguspipnuyqmrnzirekm.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_jLOp7eqVR5o_Fb0IVHOS9Q_V3xEh3vW';
  const TABLE = 'klaster1_izin_keluar_petugas';
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
  });

  const $ = (id) => document.getElementById(id);
  const loginPanel = $('ebulu-login-panel');
  const appPanel = $('ebulu-app-panel');
  const loginForm = $('ebulu-login-form');
  const izinForm = $('ebulu-izin-form');
  const loginStatus = $('ebulu-login-status');
  const formStatus = $('ebulu-form-status');
  const tableBody = $('ebulu-table-body');
  const userEmail = $('ebulu-user-email');
  const logoutBtn = $('ebulu-logout');
  const refreshBtn = $('ebulu-refresh');

  function setStatus(node, message, type = '') {
    node.textContent = message || '';
    node.className = `ebulu-status ${type}`.trim();
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  }

  function formatDate(value) {
    if (!value) return '-';
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`));
  }

  function statusLabel(status) {
    const labels = { menunggu: 'Menunggu', disetujui: 'Disetujui', ditolak: 'Ditolak', selesai: 'Selesai' };
    return labels[status] || status || '-';
  }

  async function renderSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      loginPanel.hidden = false;
      appPanel.hidden = true;
      return;
    }
    loginPanel.hidden = true;
    appPanel.hidden = false;
    userEmail.textContent = session.user.email || 'Pegawai terautentikasi';
    $('tanggal').value = new Date().toISOString().slice(0, 10);
    await loadRows(session.user.id);
  }

  async function loadRows(userId) {
    tableBody.innerHTML = '<tr><td colspan="7" class="ebulu-empty">Memuat data…</td></tr>';
    const { data, error } = await supabase
      .from(TABLE)
      .select('id,tanggal,nama_petugas,unit_kerja,jam_keluar,jam_kembali,keperluan,tujuan,status,catatan')
      .eq('created_by', userId)
      .order('tanggal', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      tableBody.innerHTML = '<tr><td colspan="7" class="ebulu-empty">Data belum dapat dimuat.</td></tr>';
      setStatus(formStatus, error.message || 'Gagal mengambil data.', 'error');
      return;
    }

    if (!data?.length) {
      tableBody.innerHTML = '<tr><td colspan="7" class="ebulu-empty">Belum ada pengajuan izin keluar.</td></tr>';
      return;
    }

    tableBody.innerHTML = data.map((row) => `
      <tr>
        <td>${formatDate(row.tanggal)}</td>
        <td>${escapeHtml(row.nama_petugas)}</td>
        <td>${escapeHtml(row.unit_kerja || '-')}</td>
        <td>${escapeHtml(row.jam_keluar || '-')}</td>
        <td>${escapeHtml(row.jam_kembali || '-')}</td>
        <td>${escapeHtml(row.tujuan || '-')}<br><span class="ebulu-muted">${escapeHtml(row.keperluan)}</span></td>
        <td><span class="ebulu-status-chip ebulu-status-${escapeHtml(row.status)}">${escapeHtml(statusLabel(row.status))}</span></td>
      </tr>`).join('');
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus(loginStatus, 'Memproses login…');
    const email = $('login-email').value.trim();
    const password = $('login-password').value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(loginStatus, error.message || 'Login gagal. Periksa akun Anda.', 'error');
      return;
    }
    loginForm.reset();
    setStatus(loginStatus, '');
    await renderSession();
  });

  izinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus(formStatus, 'Menyimpan pengajuan…');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus(formStatus, 'Sesi login tidak ditemukan. Silakan login kembali.', 'error');
      await renderSession();
      return;
    }

    const payload = {
      tanggal: $('tanggal').value,
      nama_petugas: $('nama-petugas').value.trim(),
      unit_kerja: $('unit-kerja').value.trim() || null,
      jam_keluar: $('jam-keluar').value,
      keperluan: $('keperluan').value.trim(),
      tujuan: $('tujuan').value.trim() || null,
      created_by: user.id
    };

    const { error } = await supabase.from(TABLE).insert(payload);
    if (error) {
      setStatus(formStatus, error.message || 'Pengajuan gagal disimpan.', 'error');
      return;
    }

    izinForm.reset();
    $('tanggal').value = new Date().toISOString().slice(0, 10);
    setStatus(formStatus, 'Pengajuan izin berhasil dicatat.', 'success');
    await loadRows(user.id);
  });

  refreshBtn.addEventListener('click', async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await loadRows(user.id);
  });

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    await renderSession();
  });

  supabase.auth.onAuthStateChange(() => { renderSession(); });
  renderSession();
})();
