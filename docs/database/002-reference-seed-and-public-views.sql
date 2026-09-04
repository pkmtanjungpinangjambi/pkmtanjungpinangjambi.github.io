-- REFERENCE SEED + PUBLIC VIEWS v0.1
-- Jalankan setelah 001-core-schema.sql pada database non-production.
-- Tidak berisi data pasien.

-- ============================================================
-- 1. MASTER MODUL LAYANAN PER KLASTER
-- ============================================================
INSERT INTO pkm_core.service_module (cluster_id, code, name, description)
SELECT c.id, v.code, v.name, v.description
FROM pkm_core.cluster c
JOIN (VALUES
  ('K1','K1-ADMIN','Administrasi','Ketatausahaan dan administrasi layanan'),
  ('K1','K1-SDM','SDM','Manajemen sumber daya manusia'),
  ('K1','K1-SARPRAS','Sarana & Prasarana','Pengelolaan sarana, prasarana, obat, dan perbekalan'),
  ('K1','K1-MUTU','Mutu & Keselamatan','Mutu, keselamatan pasien, dan perbaikan berkelanjutan'),
  ('K1','K1-JEJARING','Manajemen Jejaring','Pengelolaan jejaring termasuk Posyandu, Pustu, dan UKBM'),
  ('K1','K1-POSYANDU','Posyandu & UKBM','Pengelolaan/pembinaan kegiatan jejaring berbasis masyarakat'),
  ('K1','K1-PEMBERDAYAAN','Pemberdayaan Masyarakat','Pemberdayaan masyarakat dan keterlibatan lintas sektor'),
  ('K2','K2-IBU-HAMIL','Ibu Hamil','Pelayanan kesehatan ibu hamil'),
  ('K2','K2-ANC','ANC','Antenatal care'),
  ('K2','K2-TRIPLE-ELIMINASI','Triple Eliminasi','Skrining dan tindak lanjut triple eliminasi'),
  ('K2','K2-SIHEPI','SIHEPI','Pencatatan/pelaporan terkait kesehatan ibu dan bayi sesuai sistem yang berlaku'),
  ('K2','K2-BAYI-BALITA','Bayi & Balita','Pelayanan bayi dan balita'),
  ('K2','K2-ANAK-REMAJA','Anak & Remaja','Pelayanan anak dan remaja'),
  ('K2','K2-IMUNISASI','Imunisasi','Imunisasi program sesuai ketentuan berlaku'),
  ('K3','K3-DEWASA','Dewasa','Pelayanan kesehatan usia dewasa'),
  ('K3','K3-LANSIA','Lansia','Pelayanan kesehatan lansia'),
  ('K3','K3-HT','Hipertensi','Skrining dan tindak lanjut hipertensi'),
  ('K3','K3-DM','Diabetes','Skrining dan tindak lanjut diabetes'),
  ('K3','K3-JIWA','Kesehatan Jiwa','Skrining dan tindak lanjut kesehatan jiwa'),
  ('K3','K3-CKG','Skrining CKG','Skrining CKG sesuai program yang berlaku'),
  ('K4','K4-TB','TB','Penemuan, tata laksana, dan pemantauan TB'),
  ('K4','K4-HIV','HIV','Pencegahan, skrining, dan tindak lanjut HIV'),
  ('K4','K4-DIARE','Diare','Pencegahan dan penanganan diare'),
  ('K4','K4-ISPA','ISPA','Pencegahan dan pelayanan ISPA'),
  ('K4','K4-VEKTOR','Penyakit Tular Vektor','Surveilans dan pengendalian penyakit tular vektor'),
  ('K5','K5-PROMKES','Promosi Kesehatan','Promosi kesehatan lintas sasaran'),
  ('K5','K5-GIZI','Gizi','Dukungan program gizi lintas klaster'),
  ('K5','K5-KESLING','Kesehatan Lingkungan','Dukungan kesehatan lingkungan'),
  ('K5','K5-KEGAWATDARURATAN','Kegawatdaruratan','Dukungan kegawatdaruratan lintas pelayanan'),
  ('K5','K5-PRIORITAS','Program Prioritas','Program prioritas lintas klaster')
) AS v(cluster_code, code, name, description) ON v.cluster_code = c.code
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- 2. MASTER PUSTU (POSYANDU TIDAK DIDAFTARKAN SEBAGAI 1 UNIT AGREGAT)
-- ============================================================
INSERT INTO pkm_core.network_unit
  (network_type, name, management_cluster_id, status, verification_source)
SELECT 'PUSTU', v.name, c.id, 'PENDING_VERIFICATION', 'Materi profil website 2026; verifikasi operasional diperlukan'
FROM pkm_core.cluster c
CROSS JOIN (VALUES
  ('Kasang Jaya'),
  ('Sijenjang I'),
  ('Sijenjang II')
) AS v(name)
WHERE c.code = 'K1'
ON CONFLICT (network_type, name) DO NOTHING;

INSERT INTO pkm_core.network_service_cluster (network_unit_id, service_cluster_id)
SELECT n.id, c.id
FROM pkm_core.network_unit n
CROSS JOIN pkm_core.cluster c
WHERE n.network_type = 'PUSTU'
  AND n.name IN ('Kasang Jaya', 'Sijenjang I', 'Sijenjang II')
  AND c.code IN ('K2', 'K3', 'K4', 'K5')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. SAFE PUBLIC VIEWS
-- ============================================================
CREATE OR REPLACE VIEW pkm_core.v_public_schedule AS
SELECT
  s.id,
  c.code AS cluster_code,
  c.name AS cluster_name,
  n.network_type,
  n.name AS network_name,
  sm.name AS service_module,
  s.title,
  s.category,
  s.location,
  s.start_at,
  s.end_at,
  s.recurrence_text,
  s.status,
  s.notes
FROM pkm_core.schedule s
LEFT JOIN pkm_core.cluster c ON c.id = s.cluster_id
LEFT JOIN pkm_core.network_unit n ON n.id = s.network_unit_id
LEFT JOIN pkm_core.service_module sm ON sm.id = s.service_module_id
WHERE s.public_visible = TRUE
  AND s.status = 'PUBLISHED';

CREATE OR REPLACE VIEW pkm_core.v_public_network AS
SELECT
  n.id,
  n.network_type,
  n.name,
  r.name AS region_name,
  n.status,
  COALESCE(string_agg(DISTINCT c.code, ', ' ORDER BY c.code), '') AS service_cluster_codes
FROM pkm_core.network_unit n
LEFT JOIN pkm_core.region r ON r.id = n.region_id
LEFT JOIN pkm_core.network_service_cluster nsc ON nsc.network_unit_id = n.id
LEFT JOIN pkm_core.cluster c ON c.id = nsc.service_cluster_id
WHERE n.status = 'ACTIVE'
GROUP BY n.id, n.network_type, n.name, r.name, n.status;

-- Aggregate-safe dashboard view. It deliberately returns counts, not individual records.
CREATE OR REPLACE VIEW pkm_core.v_public_network_summary AS
SELECT
  network_type,
  COUNT(*) FILTER (WHERE status = 'ACTIVE') AS active_count
FROM pkm_core.network_unit
GROUP BY network_type;

COMMENT ON VIEW pkm_core.v_public_schedule IS 'Safe public schedule surface; only explicitly published and public-visible rows.';
COMMENT ON VIEW pkm_core.v_public_network IS 'Safe public network surface; no patient/cadre identity data.';
COMMENT ON VIEW pkm_core.v_public_network_summary IS 'Aggregated network counts for public dashboard use.';
