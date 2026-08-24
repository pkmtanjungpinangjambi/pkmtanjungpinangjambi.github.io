/**
 * GOOGLE APPS SCRIPT - GALERI WEBSITE PUSKESMAS
 * CARA PAKAI:
 * 1. Buka https://script.google.com -> New project
 * 2. Hapus isi editor, tempel SELURUH kode ini
 * 3. Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Deploy -> Authorize -> salin URL yang berakhiran /exec
 * 5. Kirim URL tersebut agar dipasang di drive-gallery.js
 */

function doGet() {
  const folders = {
    foto:  '1fhgI5XcVYVbdj01NgOPDPLOpZf_DAK87', // folder "Foto"
    video: '1un7ZDPvJ-eWB50q1A9RDiL_OQUfd3goh'  // folder "Video"
  };

  const out = { updated: new Date().toISOString(), foto: [], video: [] };

  for (const key in folders) {
    const files = DriveApp.getFolderById(folders[key]).getFiles();
    while (files.hasNext()) {
      const f = files.next();
      if (f.getMimeType() === 'application/vnd.google-apps.folder') continue;
      out[key].push({
        name: f.getName(),
        id: f.getId(),
        date: f.getDateCreated().toISOString()
      });
    }
  }

  const byNewest = (a, b) => new Date(b.date) - new Date(a.date);
  out.foto.sort(byNewest);
  out.video.sort(byNewest);

  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}