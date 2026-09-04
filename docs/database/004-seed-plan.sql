-- SEED PLAN v0.1
-- Intentionally contains only verified-or-pending metadata structure.
-- Do not treat placeholder verification states as production facts.

-- ============================================================
-- CLUSTER SERVICE MODULE SEED MAP
-- ============================================================
INSERT INTO pkm_core.service_module (cluster_id, code, name, description)
SELECT c.id, v.code, v.name, v.description
FROM pkm_core.cluster c
JOIN (
  VALUES
    ('K1','K1-ADM','Administrasi','Ketatausahaan dan layanan administrasi'),
    ('K1','K1-SDM','SDM','Manajemen sumber daya manusia'),
    ('K1','K1-SARPRAS','Sarana & Prasarana','Sarana, prasarana, obat, dan perbekalan'),
    ('K1','K1-MUTU','Mutu & Keselamatan','Mutu dan keselamatan pasien'),
    ('K1','K1-JARINGAN','Manajemen Jejaring','Pembinaan dan koordinasi jejaring'),
    ('K1','K1-POSYANDU','Posyandu & UKBM','Pengelolaan jejaring Posyandu/UKBM'),
    ('K2','K2-ANC','ANC','Antenatal care'),
    ('K2','K2-TRIPLE','Triple Eliminasi','Skrining dan tindak lanjut triple eliminasi'),
    ('K2','K2-SIHEPI','SIHEPI','Sistem informasi kesehatan ibu'),
    ('K2','K2-IMUN','Imunisasi','Pelayanan imunisasi program'),
    ('K2','K2-BALITA','Bayi & Balita','Pelayanan bayi dan balita'),
    ('K2','K2-ANAK-REMAJA','Anak & Remaja','Pelayanan anak usia sekolah dan remaja'),
    ('K3','K3-DEWASA','Dewasa','Pelayanan kesehatan dewasa'),
    ('K3','K3-LANSIA','Lansia','Pelayanan kesehatan lansia'),
    ('K3','K3-PTM','PTM','Skrining dan tata laksana penyakit tidak menular'),
    ('K3','K3-JIWA','Kesehatan Jiwa','Promosi, skrining, dan tindak lanjut kesehatan jiwa'),
    ('K3','K3-CKG','Skrining CKG','Skrining sesuai program yang berlaku'),
    ('K4','K4-TB','TB','Pencegahan, penemuan, dan tindak lanjut TB'),
    ('K4','K4-HIV','HIV','Pencegahan, skrining, dan tindak lanjut HIV'),
    ('K4','K4-SURVEILANS','Surveilans','Pemantauan penyakit menular'),
    ('K5','K5-PROMKES','Promosi Kesehatan','Promosi dan pemberdayaan kesehatan'),
    ('K5','K5-GIZI','Gizi','Pelayanan dan intervensi gizi'),
    ('K5','K5-KESLING','Kesehatan Lingkungan','Pemantauan kesehatan lingkungan'),
    ('K5','K5-GAWAT','Kegawatdaruratan','Koordinasi pelayanan kegawatdaruratan'),
    ('K5','K5-PRIORITAS','Program Prioritas','Program lintas klaster')
) AS v(cluster_code, code, name, description) ON v.cluster_code = c.code
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- NETWORK SEED
-- ============================================================
-- Posyandu count and individual names MUST be sourced from the
-- latest verified Puskesmas/kelurahan master before inserting rows.
-- Do not fabricate 42 individual names from the aggregate count.

-- Pustu names currently documented in the website material.
-- Mark PENDING_VERIFICATION until the official master is confirmed.
INSERT INTO pkm_core.network_unit
  (network_type, name, management_cluster_id, status, verification_source)
SELECT
  'PUSTU',
  v.name,
  c.id,
  'PENDING_VERIFICATION',
  'Materi profil website 2025/2026 — perlu verifikasi ke master resmi'
FROM (VALUES ('Kasang Jaya'), ('Sijenjang I'), ('Sijenjang II')) v(name)
JOIN pkm_core.cluster c ON c.code = 'K1'
ON CONFLICT (network_type, name) DO NOTHING;

-- ============================================================
-- REGION SEED NOTES
-- ============================================================
-- The 5 kelurahan loaded by 001-core-schema.sql are a working seed only.
-- Official codes, hierarchy, boundaries, and spelling must be verified
-- before they become authoritative operational master data.

-- ============================================================
-- SERVICE-CLUSTER RELATION FOR PUSTU
-- ============================================================
INSERT INTO pkm_core.network_service_cluster (network_unit_id, service_cluster_id)
SELECT nu.id, c.id
FROM pkm_core.network_unit nu
JOIN pkm_core.cluster c ON c.code IN ('K2','K3','K4','K5')
WHERE nu.network_type = 'PUSTU'
  AND nu.name IN ('Kasang Jaya','Sijenjang I','Sijenjang II')
ON CONFLICT DO NOTHING;

-- Posyandu service-cluster links are created per verified network unit.
-- Do not mass-create individual Posyandu records from the aggregate count.
