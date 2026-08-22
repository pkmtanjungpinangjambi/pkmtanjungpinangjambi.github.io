/**
 * Buku Tamu Digital - Google Apps Script (TEST/MVP)
 * Data store: Google Sheets yang terikat pada spreadsheet ini.
 *
 * DEPLOYMENT:
 * 1. Upload/buka spreadsheet DB Buku Tamu Digital.
 * 2. Extensions > Apps Script.
 * 3. Salin file ini ke Code.gs.
 * 4. Set Script Property: API_SHARED_SECRET.
 * 5. Deploy sebagai Web App dengan akses yang dibatasi sesuai kebutuhan.
 *
 * SECURITY:
 * - Jangan menyimpan API_SHARED_SECRET di GitHub.
 * - Jangan memasukkan data sensitif (NIK/rekam medis/credential) ke spreadsheet.
 * - Endpoint ini adalah MVP dan harus diuji dengan data dummy terlebih dahulu.
 */

const SHEETS = {
  KUNJUNGAN: 'KUNJUNGAN',
  PETUGAS: 'PETUGAS',
  NOTIFIKASI: 'NOTIFIKASI',
};

function doGet(e) {
  const action = (e.parameter.action || '').trim();

  if (action === 'health') {
    return jsonResponse({ ok: true, service: 'buku-tamu-digital', mode: 'test' });
  }

  if (action === 'petugas') {
    const idPetugas = (e.parameter.id || '').trim();
    if (!idPetugas) return jsonResponse({ ok: false, error: 'id petugas wajib diisi' });

    const petugas = getPetugasById_(idPetugas);
    if (!petugas) return jsonResponse({ ok: false, error: 'petugas tidak ditemukan' });

    return jsonResponse({ ok: true, data: sanitizePetugas_(petugas) });
  }

  return jsonResponse({ ok: false, error: 'action tidak dikenal' });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    if (!isAuthorized_(payload.secret)) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    if (payload.action === 'checkin') {
      return handleCheckin_(payload);
    }

    if (payload.action === 'respond') {
      return handleResponse_(payload);
    }

    return jsonResponse({ ok: false, error: 'action tidak dikenal' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'request tidak valid' });
  }
}

function handleCheckin_(payload) {
  const required = ['nama', 'instansi', 'tujuan', 'idPetugasTujuan', 'adaJanji'];
  const missing = required.filter(key => !String(payload[key] || '').trim());
  if (missing.length) {
    return jsonResponse({ ok: false, error: 'field wajib belum lengkap', fields: missing });
  }

  const petugas = getPetugasById_(payload.idPetugasTujuan);
  if (!petugas) return jsonResponse({ ok: false, error: 'petugas tujuan tidak ditemukan' });

  const now = new Date();
  const visitId = createId_('BT');
  const tersedia = String(petugas.Status_Kehadiran || '').toUpperCase() === 'TERSEDIA';
  const pengganti = tersedia ? '' : String(petugas.ID_Petugas_Pengganti || '').trim();
  const statusNotifikasi = tersedia ? 'PENDING' : (pengganti ? 'PENDING_PENGGANTI' : 'PERLU_ADMIN');
  const prioritas = String(payload.prioritas || 'NORMAL').toUpperCase();

  appendObject_(SHEETS.KUNJUNGAN, {
    ID_Kunjungan: visitId,
    Timestamp: now,
    Nama: sanitizeText_(payload.nama),
    Instansi_Asal: sanitizeText_(payload.instansi),
    Kontak: sanitizeText_(payload.kontak || ''),
    Tujuan_Kunjungan: sanitizeText_(payload.tujuan),
    ID_Petugas_Tujuan: payload.idPetugasTujuan,
    Ada_Janji: String(payload.adaJanji).toUpperCase(),
    Appointment_ID: sanitizeText_(payload.appointmentId || ''),
    Status_Petugas: String(petugas.Status_Kehadiran || ''),
    ID_Petugas_Pengganti: pengganti,
    Status_Kunjungan: 'MENUNGGU',
    Status_Notifikasi: statusNotifikasi,
    Waktu_Checkin: now,
    Waktu_Checkout: '',
    Sumber_QR: sanitizeText_(payload.sumberQr || 'WEBSITE'),
    Prioritas: prioritas,
    Catatan: sanitizeText_(payload.catatan || ''),
  });

  const targetPetugas = tersedia ? payload.idPetugasTujuan : (pengganti || 'ADMIN');
  appendObject_(SHEETS.NOTIFIKASI, {
    ID_Notifikasi: createId_('NTF'),
    ID_Kunjungan: visitId,
    ID_Petugas: targetPetugas,
    Jenis_Notifikasi: String(payload.adaJanji).toUpperCase() === 'TIDAK' ? 'TAMU_TANPA_JANJI' : 'TAMU_TERJADWAL',
    Kanal: 'DASHBOARD',
    Waktu_Kirim: now,
    Status: 'TERCATAT',
    Waktu_Respons: '',
    Eskalasi_Ke: tersedia ? '' : (pengganti || 'ADMIN'),
    Keterangan: tersedia ? 'Menunggu respons petugas tujuan' : 'Dialihkan sesuai status petugas',
  });

  return jsonResponse({
    ok: true,
    data: {
      idKunjungan: visitId,
      statusKunjungan: 'MENUNGGU',
      statusPetugas: petugas.Status_Kehadiran,
      dialihkanKe: targetPetugas,
      message: tersedia ? 'Check-in berhasil dicatat.' : 'Check-in berhasil dicatat dan dialihkan sesuai ketersediaan petugas.'
    }
  });
}

function handleResponse_(payload) {
  if (!payload.idKunjungan || !payload.status) {
    return jsonResponse({ ok: false, error: 'idKunjungan dan status wajib diisi' });
  }

  updateRowByKey_(SHEETS.KUNJUNGAN, 'ID_Kunjungan', payload.idKunjungan, {
    Status_Kunjungan: String(payload.status).toUpperCase(),
    Catatan: sanitizeText_(payload.catatan || ''),
  });

  return jsonResponse({ ok: true, message: 'Status kunjungan diperbarui' });
}

function getPetugasById_(idPetugas) {
  const rows = getObjects_(SHEETS.PETUGAS);
  return rows.find(row => String(row.ID_Petugas || '').trim() === String(idPetugas).trim()) || null;
}

function sanitizePetugas_(petugas) {
  return {
    idPetugas: petugas.ID_Petugas,
    nama: petugas.Nama_Petugas,
    unit: petugas.Unit,
    jabatan: petugas.Jabatan,
    statusKehadiran: petugas.Status_Kehadiran,
    idPetugasPengganti: petugas.ID_Petugas_Pengganti,
    aktif: petugas.Aktif,
  };
}

function getObjects_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet tidak ditemukan: ${sheetName}`);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(row => row.some(cell => cell !== '')).map(row => {
    const obj = {};
    headers.forEach((header, index) => obj[header] = row[index]);
    return obj;
  });
}

function appendObject_(sheetName, object) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet tidak ditemukan: ${sheetName}`);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map(header => Object.prototype.hasOwnProperty.call(object, header) ? object[header] : ''));
}

function updateRowByKey_(sheetName, keyColumn, keyValue, updates) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const keyIndex = headers.indexOf(keyColumn);
  if (keyIndex < 0) throw new Error(`Kolom tidak ditemukan: ${keyColumn}`);
  const rowIndex = values.findIndex((row, index) => index > 0 && String(row[keyIndex]) === String(keyValue));
  if (rowIndex < 0) throw new Error('Data tidak ditemukan');
  Object.keys(updates).forEach(key => {
    const col = headers.indexOf(key);
    if (col >= 0) sheet.getRange(rowIndex + 1, col + 1).setValue(updates[key]);
  });
}

function isAuthorized_(secret) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_SHARED_SECRET');
  return !!expected && !!secret && secret === expected;
}

function sanitizeText_(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

function createId_(prefix) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd-HHmmss');
  const random = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${stamp}-${random}`;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
