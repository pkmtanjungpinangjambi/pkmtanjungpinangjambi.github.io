-- CORE OPERATIONAL DATABASE SCHEMA v0.1
-- UPTD Puskesmas Tanjung Pinang Kota Jambi
-- PostgreSQL / Supabase / Neon compatible starting point.
--
-- IMPORTANT:
-- This file defines structure only. It contains no patient data.
-- Patient identity and clinical records must be isolated from public-site data.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS pkm_core;
CREATE SCHEMA IF NOT EXISTS pkm_private;

-- ============================================================
-- 1. MASTER KLASTER
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.cluster (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO pkm_core.cluster (code, name, description)
VALUES
  ('K1', 'Manajemen', 'Manajemen Puskesmas, mutu, jejaring, dan pemberdayaan masyarakat'),
  ('K2', 'Ibu & Anak', 'Pelayanan kesehatan ibu, bayi, anak, remaja, dan imunisasi'),
  ('K3', 'Dewasa & Lansia', 'Pelayanan usia dewasa dan lansia, skrining, risiko, serta tindak lanjut'),
  ('K4', 'Penyakit Menular', 'Pencegahan, penemuan, tata laksana, dan surveilans penyakit menular'),
  ('K5', 'Lintas Klaster', 'Layanan/program yang mendukung lebih dari satu klaster')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- 2. MASTER WILAYAH
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.region (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  type VARCHAR(40) NOT NULL CHECK (type IN ('KELURAHAN', 'RW', 'RT', 'DUSUN', 'OTHER')),
  parent_id UUID REFERENCES pkm_core.region(id) ON DELETE RESTRICT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, type, parent_id)
);

-- Initial master wilayah from the current Puskesmas profile; verify before operational use.
INSERT INTO pkm_core.region (name, type)
VALUES
  ('Tanjung Pinang', 'KELURAHAN'),
  ('Rajawali', 'KELURAHAN'),
  ('Kasang', 'KELURAHAN'),
  ('Kasang Jaya', 'KELURAHAN'),
  ('Sijenjang', 'KELURAHAN')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. MASTER JEJARING
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.network_unit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  network_type VARCHAR(50) NOT NULL CHECK (network_type IN ('POSYANDU', 'PUSTU', 'FKTP', 'UKBM', 'OTHER')),
  name VARCHAR(200) NOT NULL,
  region_id UUID REFERENCES pkm_core.region(id) ON DELETE RESTRICT,
  management_cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  address TEXT,
  phone VARCHAR(40),
  status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION')),
  verified_at TIMESTAMPTZ,
  verification_source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (network_type, name)
);

CREATE TABLE IF NOT EXISTS pkm_core.network_service_cluster (
  network_unit_id UUID NOT NULL REFERENCES pkm_core.network_unit(id) ON DELETE CASCADE,
  service_cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  PRIMARY KEY (network_unit_id, service_cluster_id)
);

-- ============================================================
-- 4. PROGRAM / MODUL DATA
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.service_module (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. JADWAL
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  network_unit_id UUID REFERENCES pkm_core.network_unit(id) ON DELETE RESTRICT,
  service_module_id UUID REFERENCES pkm_core.service_module(id) ON DELETE RESTRICT,
  title VARCHAR(220) NOT NULL,
  category VARCHAR(80) NOT NULL,
  location TEXT,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  recurrence_text VARCHAR(250),
  status VARCHAR(30) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'CANCELLED', 'ARCHIVED')),
  public_visible BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (end_at IS NULL OR start_at IS NULL OR end_at >= start_at)
);

CREATE INDEX IF NOT EXISTS idx_schedule_cluster_start
  ON pkm_core.schedule (cluster_id, start_at);
CREATE INDEX IF NOT EXISTS idx_schedule_network_start
  ON pkm_core.schedule (network_unit_id, start_at);
CREATE INDEX IF NOT EXISTS idx_schedule_public
  ON pkm_core.schedule (public_visible, status, start_at);

-- ============================================================
-- 6. KEGIATAN -> SASARAN KLASTER
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  management_cluster_id UUID REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  title VARCHAR(220) NOT NULL,
  activity_type VARCHAR(80) NOT NULL,
  description TEXT,
  network_unit_id UUID REFERENCES pkm_core.network_unit(id) ON DELETE RESTRICT,
  region_id UUID REFERENCES pkm_core.region(id) ON DELETE RESTRICT,
  activity_date TIMESTAMPTZ,
  status VARCHAR(30) NOT NULL DEFAULT 'PLANNED' CHECK (status IN ('PLANNED', 'ONGOING', 'DONE', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pkm_core.activity_target_cluster (
  activity_id UUID NOT NULL REFERENCES pkm_core.activity(id) ON DELETE CASCADE,
  service_cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  PRIMARY KEY (activity_id, service_cluster_id)
);

-- ============================================================
-- 7. INDIKATOR / PWS / MONEV AGREGAT
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.indicator (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(220) NOT NULL,
  unit VARCHAR(50),
  target_numeric NUMERIC(18,4),
  definition TEXT,
  source_reference TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pkm_core.indicator_observation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_id UUID NOT NULL REFERENCES pkm_core.indicator(id) ON DELETE CASCADE,
  region_id UUID REFERENCES pkm_core.region(id) ON DELETE RESTRICT,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  value_numeric NUMERIC(18,4),
  numerator NUMERIC(18,4),
  denominator NUMERIC(18,4),
  notes TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (indicator_id, region_id, period_start, period_end),
  CHECK (period_end >= period_start)
);

-- ============================================================
-- 8. EVIDENCE / DOKUMENTASI
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_core.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID NOT NULL REFERENCES pkm_core.cluster(id) ON DELETE RESTRICT,
  title VARCHAR(240) NOT NULL,
  evidence_type VARCHAR(80) NOT NULL,
  document_url TEXT,
  document_hash VARCHAR(128),
  evidence_date DATE,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. PRIVATE SECURITY/AUDIT DESIGN (NO PATIENT DATA HERE)
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_private.app_role (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS pkm_private.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID,
  action VARCHAR(80) NOT NULL,
  entity_schema VARCHAR(100) NOT NULL,
  entity_table VARCHAR(100) NOT NULL,
  entity_id UUID,
  request_id VARCHAR(120),
  ip_hash VARCHAR(128),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON pkm_private.audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON pkm_private.audit_log (entity_table, entity_id);

COMMENT ON SCHEMA pkm_private IS 'Protected operational schema; never exposed directly to public website.';
COMMENT ON TABLE pkm_core.network_unit IS 'Master network data only. No patient or cadre identity data.';
COMMENT ON TABLE pkm_core.indicator_observation IS 'Aggregated PWS/Monev observations; never store identifiable patient-level values here.';
COMMENT ON TABLE pkm_private.audit_log IS 'Immutable application audit trail; operational policy should prevent destructive updates/deletes.';

-- Patient/clinical tables are intentionally NOT created in this public repository.
-- Their production design must be implemented only after selecting the authenticated
-- backend/DB stack and security model (RBAC, RLS, encryption/tokenization, backups,
-- retention, and audit requirements).
