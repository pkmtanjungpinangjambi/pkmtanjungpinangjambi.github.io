-- REGULATORY TAXONOMY + PERFORMANCE HARDENING v0.1
-- UPTD Puskesmas Tanjung Pinang Kota Jambi
--
-- Regulatory architecture:
-- * Five-cluster Puskesmas model aligned to Permenkes 19 Tahun 2024.
-- * K1 Manajemen manages/pembina jejaring.
-- * A network unit can support multiple service clusters through
--   pkm_core.network_service_cluster.

UPDATE pkm_core.cluster
SET name = 'Penanggulangan Penyakit Menular & Kesehatan Lingkungan',
    description = 'Penanggulangan penyakit menular dan kesehatan lingkungan'
WHERE code = 'K4';

UPDATE pkm_core.cluster
SET name = 'Dukungan Pelayanan Lintas Klaster',
    description = 'Dukungan pelayanan yang digunakan lintas klaster sesuai kebutuhan Puskesmas'
WHERE code = 'K5';

CREATE INDEX IF NOT EXISTS idx_region_parent_id
  ON pkm_core.region (parent_id);
CREATE INDEX IF NOT EXISTS idx_network_unit_region_id
  ON pkm_core.network_unit (region_id);
CREATE INDEX IF NOT EXISTS idx_network_unit_management_cluster_id
  ON pkm_core.network_unit (management_cluster_id);
CREATE INDEX IF NOT EXISTS idx_network_service_cluster_service_cluster_id
  ON pkm_core.network_service_cluster (service_cluster_id);
CREATE INDEX IF NOT EXISTS idx_service_module_cluster_id
  ON pkm_core.service_module (cluster_id);
CREATE INDEX IF NOT EXISTS idx_schedule_service_module_id
  ON pkm_core.schedule (service_module_id);
CREATE INDEX IF NOT EXISTS idx_activity_management_cluster_id
  ON pkm_core.activity (management_cluster_id);
CREATE INDEX IF NOT EXISTS idx_activity_network_unit_id
  ON pkm_core.activity (network_unit_id);
CREATE INDEX IF NOT EXISTS idx_activity_region_id
  ON pkm_core.activity (region_id);
CREATE INDEX IF NOT EXISTS idx_activity_target_cluster_service_cluster_id
  ON pkm_core.activity_target_cluster (service_cluster_id);
CREATE INDEX IF NOT EXISTS idx_indicator_cluster_id
  ON pkm_core.indicator (cluster_id);
CREATE INDEX IF NOT EXISTS idx_indicator_observation_region_id
  ON pkm_core.indicator_observation (region_id);
CREATE INDEX IF NOT EXISTS idx_evidence_cluster_id
  ON pkm_core.evidence (cluster_id);

COMMENT ON COLUMN pkm_core.network_unit.management_cluster_id IS
  'Pengelolaan/pembinaan jejaring berada pada K1 Manajemen; hubungan pelayanan ke klaster lain melalui network_service_cluster.';
