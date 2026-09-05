-- SERVICE MODULE TAXONOMY v0.1
-- UPTD Puskesmas Tanjung Pinang Kota Jambi
-- Source basis: Profil UPTD Puskesmas Tanjung Pinang 2025 and
-- SK Kepala UPTD Puskesmas Tanjung Pinang Nomor 39 Tahun 2026.
--
-- This migration defines service catalog metadata only.
-- It contains no patient or clinical record data.

WITH modules(cluster_code,code,name,description) AS (VALUES
('K1','K1-KETATAUSAHAAN','Ketatausahaan & Administrasi','Administrasi, front office, pendaftaran, informasi dan pengaduan.'),
('K1','K1-SDM-SARPRAS','Manajemen Sumber Daya','SDM, sarana, prasarana, obat dan perbekalan kesehatan.'),
('K1','K1-MANAJEMEN-PKM','Manajemen Puskesmas','Perencanaan, koordinasi, pemantauan, evaluasi dan keterpaduan antar-klaster.'),
('K1','K1-MUTU-KESELAMATAN','Mutu & Keselamatan Pasien','Manajemen mutu, keselamatan, audit dan perbaikan berkelanjutan.'),
('K1','K1-JEJARING','Manajemen Jejaring','Pengelolaan, pembinaan dan koordinasi jejaring berbasis wilayah.'),
('K1','K1-PEMBERDAYAAN','Pemberdayaan Masyarakat','Pemberdayaan dan keterlibatan masyarakat dalam pembangunan kesehatan.'),
('K1','K1-SI-DIGITAL','Manajemen Sistem Informasi Digital','Data, informasi, pencatatan, pelaporan dan dukungan sistem informasi.'),
('K2','K2-IBU-HAMIL-BERSALIN-NIFAS','Ibu Hamil, Bersalin & Nifas','Pelayanan kesehatan ibu sepanjang siklus kehamilan, persalinan dan nifas.'),
('K2','K2-BAYI-BALITA','Bayi & Anak Balita','Pelayanan bayi, balita dan pemantauan tumbuh kembang.'),
('K2','K2-ANAK-PRASEKOLAH','Anak Pra Sekolah','Pelayanan kesehatan anak usia pra sekolah.'),
('K2','K2-SEKOLAH-REMAJA','Anak Usia Sekolah & Remaja','Pelayanan kesehatan anak usia sekolah dan remaja.'),
('K3','K3-DEWASA','Pelayanan Usia Dewasa','Pelayanan kesehatan usia dewasa, skrining dan tindak lanjut sesuai kebutuhan.'),
('K3','K3-LANSIA','Pelayanan Lanjut Usia','Pelayanan kesehatan lanjut usia, skrining fungsi dan tindak lanjut.'),
('K4','K4-P2M','Penanggulangan Penyakit Menular','Pencegahan, penemuan, penanggulangan, surveilans dan pengendalian penyakit menular.'),
('K4','K4-KESLING','Kesehatan Lingkungan','Kesehatan lingkungan, sanitasi dan pengendalian faktor lingkungan terkait kesehatan.'),
('K5','K5-GIGI-MULUT','Pelayanan Kesehatan Gigi & Mulut','Pelayanan kesehatan gigi dan mulut lintas kelompok sasaran.'),
('K5','K5-GAWAT-DARURAT','Pelayanan Gawat Darurat','Dukungan pelayanan kegawatdaruratan dan tindakan awal sesuai kewenangan.'),
('K5','K5-KEFARMASIAN','Pelayanan Kefarmasian','Pelayanan obat dan dukungan kefarmasian.'),
('K5','K5-LABORATORIUM','Pelayanan Laboratorium','Pelayanan pemeriksaan laboratorium dan dukungan diagnostik.'),
('K5','K5-KRISIS-KESEHATAN','Penanggulangan Krisis Kesehatan','Dukungan kesiapsiagaan dan penanggulangan krisis kesehatan.'),
('K5','K5-REHABILITASI-MEDIK-DASAR','Rehabilitasi Medik Dasar','Dukungan rehabilitasi medik dasar lintas klaster.')
)
INSERT INTO pkm_core.service_module (cluster_id,code,name,description)
SELECT c.id,m.code,m.name,m.description
FROM modules m
JOIN pkm_core.cluster c ON c.code=m.cluster_code
ON CONFLICT(code) DO UPDATE SET
  cluster_id=EXCLUDED.cluster_id,
  name=EXCLUDED.name,
  description=EXCLUDED.description,
  updated_at=now();