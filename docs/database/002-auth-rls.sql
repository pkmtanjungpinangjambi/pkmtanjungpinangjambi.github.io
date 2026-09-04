-- SECURITY FOUNDATION v0.1
-- PostgreSQL / Supabase compatible starting point.
-- This migration defines application users, roles, helper functions,
-- and Row Level Security for operational master/management data.
-- It intentionally does NOT create or expose patient/clinical tables.

CREATE SCHEMA IF NOT EXISTS pkm_private;

-- ============================================================
-- 1. APPLICATION USERS + ROLES
-- ============================================================
CREATE TABLE IF NOT EXISTS pkm_private.app_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL UNIQUE,
  display_name VARCHAR(160),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pkm_private.user_role (
  app_user_id UUID NOT NULL REFERENCES pkm_private.app_user(id) ON DELETE CASCADE,
  role_code VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (app_user_id, role_code)
);

INSERT INTO pkm_private.app_role (code, name, description)
VALUES
  ('SUPERADMIN', 'Super Administrator', 'Pengelola sistem tertinggi; akses diberikan sangat terbatas.'),
  ('ADMIN', 'Administrator', 'Administrasi master data dan konfigurasi operasional.'),
  ('MANAGER', 'Manager', 'Pemantauan, verifikasi, Monev, dan pengelolaan operasional.'),
  ('STAFF', 'Staff', 'Input dan pengelolaan data operasional sesuai kewenangan.'),
  ('VIEWER', 'Viewer', 'Akses baca untuk data operasional yang diizinkan.')
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- 2. SECURITY-DEFINER HELPERS
-- ============================================================
CREATE OR REPLACE FUNCTION pkm_private.current_app_user_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = pkm_private, public
AS $$
  SELECT id
  FROM pkm_private.app_user
  WHERE auth_user_id = auth.uid()
    AND is_active = TRUE
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION pkm_private.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = pkm_private, public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM pkm_private.user_role ur
    JOIN pkm_private.app_user au ON au.id = ur.app_user_id
    WHERE au.auth_user_id = auth.uid()
      AND au.is_active = TRUE
      AND ur.role_code = required_role
  );
$$;

CREATE OR REPLACE FUNCTION pkm_private.has_any_role(required_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = pkm_private, public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM pkm_private.user_role ur
    JOIN pkm_private.app_user au ON au.id = ur.app_user_id
    WHERE au.auth_user_id = auth.uid()
      AND au.is_active = TRUE
      AND ur.role_code = ANY(required_roles)
  );
$$;

REVOKE ALL ON FUNCTION pkm_private.current_app_user_id() FROM PUBLIC;
REVOKE ALL ON FUNCTION pkm_private.has_role(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION pkm_private.has_any_role(TEXT[]) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION pkm_private.current_app_user_id() TO authenticated;
GRANT EXECUTE ON FUNCTION pkm_private.has_role(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION pkm_private.has_any_role(TEXT[]) TO authenticated;

-- ============================================================
-- 3. ENABLE RLS
-- ============================================================
ALTER TABLE pkm_core.cluster ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.region ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.network_unit ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.network_service_cluster ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.service_module ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.activity_target_cluster ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.indicator ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.indicator_observation ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_core.evidence ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. READ POLICIES FOR AUTHENTICATED USERS
-- ============================================================
DROP POLICY IF EXISTS cluster_read_authenticated ON pkm_core.cluster;
CREATE POLICY cluster_read_authenticated
  ON pkm_core.cluster FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS region_read_authenticated ON pkm_core.region;
CREATE POLICY region_read_authenticated
  ON pkm_core.region FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS network_unit_read_authenticated ON pkm_core.network_unit;
CREATE POLICY network_unit_read_authenticated
  ON pkm_core.network_unit FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS network_service_cluster_read_authenticated ON pkm_core.network_service_cluster;
CREATE POLICY network_service_cluster_read_authenticated
  ON pkm_core.network_service_cluster FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS service_module_read_authenticated ON pkm_core.service_module;
CREATE POLICY service_module_read_authenticated
  ON pkm_core.service_module FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS schedule_read_authenticated ON pkm_core.schedule;
CREATE POLICY schedule_read_authenticated
  ON pkm_core.schedule FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS activity_read_authenticated ON pkm_core.activity;
CREATE POLICY activity_read_authenticated
  ON pkm_core.activity FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS activity_target_cluster_read_authenticated ON pkm_core.activity_target_cluster;
CREATE POLICY activity_target_cluster_read_authenticated
  ON pkm_core.activity_target_cluster FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS indicator_read_authenticated ON pkm_core.indicator;
CREATE POLICY indicator_read_authenticated
  ON pkm_core.indicator FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS indicator_observation_read_authenticated ON pkm_core.indicator_observation;
CREATE POLICY indicator_observation_read_authenticated
  ON pkm_core.indicator_observation FOR SELECT TO authenticated
  USING (TRUE);

DROP POLICY IF EXISTS evidence_read_authenticated ON pkm_core.evidence;
CREATE POLICY evidence_read_authenticated
  ON pkm_core.evidence FOR SELECT TO authenticated
  USING (TRUE);

-- ============================================================
-- 5. WRITE POLICIES
-- ============================================================
-- Master/configuration writes: ADMIN or SUPERADMIN.
DROP POLICY IF EXISTS cluster_write_admin ON pkm_core.cluster;
CREATE POLICY cluster_write_admin
  ON pkm_core.cluster FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS region_write_admin ON pkm_core.region;
CREATE POLICY region_write_admin
  ON pkm_core.region FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS network_unit_write_admin ON pkm_core.network_unit;
CREATE POLICY network_unit_write_admin
  ON pkm_core.network_unit FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS network_service_cluster_write_admin ON pkm_core.network_service_cluster;
CREATE POLICY network_service_cluster_write_admin
  ON pkm_core.network_service_cluster FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS service_module_write_admin ON pkm_core.service_module;
CREATE POLICY service_module_write_admin
  ON pkm_core.service_module FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

-- Schedule/activity operational writes: ADMIN, MANAGER, STAFF.
DROP POLICY IF EXISTS schedule_write_operational ON pkm_core.schedule;
CREATE POLICY schedule_write_operational
  ON pkm_core.schedule FOR INSERT TO authenticated
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']));

DROP POLICY IF EXISTS schedule_update_operational ON pkm_core.schedule;
CREATE POLICY schedule_update_operational
  ON pkm_core.schedule FOR UPDATE TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']));

DROP POLICY IF EXISTS schedule_delete_admin ON pkm_core.schedule;
CREATE POLICY schedule_delete_admin
  ON pkm_core.schedule FOR DELETE TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS activity_write_operational ON pkm_core.activity;
CREATE POLICY activity_write_operational
  ON pkm_core.activity FOR INSERT TO authenticated
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']));

DROP POLICY IF EXISTS activity_update_operational ON pkm_core.activity;
CREATE POLICY activity_update_operational
  ON pkm_core.activity FOR UPDATE TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']));

DROP POLICY IF EXISTS activity_delete_admin ON pkm_core.activity;
CREATE POLICY activity_delete_admin
  ON pkm_core.activity FOR DELETE TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS activity_target_cluster_write_operational ON pkm_core.activity_target_cluster;
CREATE POLICY activity_target_cluster_write_operational
  ON pkm_core.activity_target_cluster FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER','STAFF']));

-- Monev/indicator writes: ADMIN or MANAGER.
DROP POLICY IF EXISTS indicator_write_management ON pkm_core.indicator;
CREATE POLICY indicator_write_management
  ON pkm_core.indicator FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']));

DROP POLICY IF EXISTS indicator_observation_write_management ON pkm_core.indicator_observation;
CREATE POLICY indicator_observation_write_management
  ON pkm_core.indicator_observation FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']));

DROP POLICY IF EXISTS evidence_write_management ON pkm_core.evidence;
CREATE POLICY evidence_write_management
  ON pkm_core.evidence FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN','MANAGER']));

-- ============================================================
-- 6. APP USER SECURITY
-- ============================================================
ALTER TABLE pkm_private.app_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE pkm_private.user_role ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS app_user_self_read ON pkm_private.app_user;
CREATE POLICY app_user_self_read
  ON pkm_private.app_user FOR SELECT TO authenticated
  USING (auth_user_id = auth.uid() OR pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS app_user_admin_write ON pkm_private.app_user;
CREATE POLICY app_user_admin_write
  ON pkm_private.app_user FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

DROP POLICY IF EXISTS user_role_self_read ON pkm_private.user_role;
CREATE POLICY user_role_self_read
  ON pkm_private.user_role FOR SELECT TO authenticated
  USING (
    app_user_id = pkm_private.current_app_user_id()
    OR pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN'])
  );

DROP POLICY IF EXISTS user_role_admin_write ON pkm_private.user_role;
CREATE POLICY user_role_admin_write
  ON pkm_private.user_role FOR ALL TO authenticated
  USING (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']))
  WITH CHECK (pkm_private.has_any_role(ARRAY['SUPERADMIN','ADMIN']));

-- ============================================================
-- 7. HARDENING NOTES
-- ============================================================
COMMENT ON FUNCTION pkm_private.current_app_user_id() IS 'Maps Supabase Auth UID to application user; SECURITY DEFINER with fixed search_path.';
COMMENT ON FUNCTION pkm_private.has_role(TEXT) IS 'Checks one application role using auth.uid().';
COMMENT ON FUNCTION pkm_private.has_any_role(TEXT[]) IS 'Checks multiple application roles using auth.uid().';
COMMENT ON SCHEMA pkm_private IS 'Never expose directly through the public site. Use authenticated backend/API only.';

-- Patient/clinical data must remain outside this migration.
-- Production must additionally define: backup/restore policy, retention,
-- encryption/tokenization strategy, rate limits, MFA/SSO policy, secret management,
-- and immutable audit controls appropriate to the selected backend.
