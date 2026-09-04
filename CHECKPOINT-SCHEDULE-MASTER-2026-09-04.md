# CHECKPOINT — SERVICE SCHEDULE MASTER 2026-09-04

## Scope
Move recurring service schedule data toward a single master used by Pelayanan, Jadwal, and Beranda.

## Implemented
- Added `data/service-schedules.js` with current operating hours, registration cutoffs, and immunization schedule.
- Added `service-schedule.js` renderer with HTML escaping and graceful empty-state behavior.
- Added documentation for data ownership and schema.

## Source basis
- `jadwal.html` current operating hours and registration limits.
- `imun.pdf` current immunization schedule and requirements.

## Not yet implemented
- Wiring the master into `index.html`, `pelayanan.html`, and `jadwal.html`.
- Normalizing the Posyandu spreadsheet into the same data model.
- PR / merge to `main`.

## Branch
`feat/service-schedule-master-2026-09-04`
