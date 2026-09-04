-- PUBLIC API LAYER v0.1
-- PostgreSQL / Supabase compatible.
-- Expose curated, non-sensitive views to the public website.
-- Never expose pkm_core tables directly to anon/public clients.

CREATE SCHEMA IF NOT EXISTS pkm_api;

-- ============================================================
-- 1. PUBLIC SCHEDULE VIEW
-- ============================================================
CREATE OR REPLACE VIEW pkm_api.public_schedule AS
SELECT
  s.id,
  s.title,
  s.category,
  s.location,
  s.start_at,
  s.end_at,
  s.recurrence_text,
  c.code AS cluster_code,
  c.name AS cluster_name,
  nu.network_type,
  nu.name AS network_name,
  sm.code AS module_code,
  sm.name AS module_name
FROM pkm_core.schedule s
LEFT JOIN pkm_core.cluster c ON c.id = s.cluster_id
LEFT JOIN pkm_core.network_unit nu ON nu.id = s.network_unit_id
LEFT JOIN pkm_core.service_module sm ON sm.id = s.service_module_id
WHERE s.public_visible = TRUE
  AND s.status = 'PUBLISHED'
  AND (c.is_active = TRUE OR c.id IS NULL)
  AND (nu.status = 'ACTIVE' OR nu.id IS NULL);

-- ============================================================
-- 2. PUBLIC NETWORK DIRECTORY
-- ============================================================
CREATE OR REPLACE VIEW pkm_api.public_network AS
SELECT
  nu.id,
  nu.network_type,
  nu.name,
  r.name AS region_name,
  nu.address,
  nu.phone,
  nu.status,
  string_agg(DISTINCT c.code || ' — ' || c.name, ', ' ORDER BY c.code) AS service_clusters
FROM pkm_core.network_unit nu
LEFT JOIN pkm_core.region r ON r.id = nu.region_id
LEFT JOIN pkm_core.network_service_cluster nsc ON nsc.network_unit_id = nu.id
LEFT JOIN pkm_core.cluster c ON c.id = nsc.service_cluster_id
WHERE nu.status = 'ACTIVE'
GROUP BY nu.id, nu.network_type, nu.name, r.name, nu.address, nu.phone, nu.status;

-- ============================================================
-- 3. PUBLIC CLUSTER DIRECTORY
-- ============================================================
CREATE OR REPLACE VIEW pkm_api.public_cluster AS
SELECT
  c.id,
  c.code,
  c.name,
  c.description
FROM pkm_core.cluster c
WHERE c.is_active = TRUE;

-- ============================================================
-- 4. PUBLIC AGGREGATED INDICATORS ONLY
-- ============================================================
CREATE OR REPLACE VIEW pkm_api.public_indicator AS
SELECT
  i.code,
  i.name,
  i.unit,
  c.code AS cluster_code,
  c.name AS cluster_name,
  o.period_start,
  o.period_end,
  o.value_numeric,
  o.numerator,
  o.denominator
FROM pkm_core.indicator i
JOIN pkm_core.cluster c ON c.id = i.cluster_id
JOIN pkm_core.indicator_observation o ON o.indicator_id = i.id
WHERE i.is_active = TRUE
  AND c.is_active = TRUE;

-- ============================================================
-- 5. EXPLICIT PUBLIC GRANTS
-- ============================================================
GRANT USAGE ON SCHEMA pkm_api TO anon, authenticated;
GRANT SELECT ON pkm_api.public_schedule TO anon, authenticated;
GRANT SELECT ON pkm_api.public_network TO anon, authenticated;
GRANT SELECT ON pkm_api.public_cluster TO anon, authenticated;
GRANT SELECT ON pkm_api.public_indicator TO anon, authenticated;

-- Do not allow anonymous clients to query operational core tables directly.
REVOKE ALL ON SCHEMA pkm_core FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA pkm_core FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA pkm_core FROM anon;

COMMENT ON SCHEMA pkm_api IS 'Curated public API surface. Only non-sensitive, publication-approved views belong here.';
COMMENT ON VIEW pkm_api.public_schedule IS 'Published public schedules only; excludes verification/audit/internal fields.';
COMMENT ON VIEW pkm_api.public_network IS 'Active network directory; contains operationally safe directory information only.';
COMMENT ON VIEW pkm_api.public_indicator IS 'Aggregated indicator data only; never patient-level clinical data.';

-- IMPORTANT:
-- If the public website needs to expose additional fields, add them deliberately
-- to a curated view. Never grant SELECT on the underlying pkm_core tables to anon.
