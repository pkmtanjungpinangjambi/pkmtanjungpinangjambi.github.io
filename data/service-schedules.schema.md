# Service schedule data schema

Each service has an `id`, `title`, `category`, `active`, one or more `schedules`, optional `special` items, and an optional `note`.

The first implementation keeps the data intentionally small so the static site can consume it without a backend database. Posyandu can be added to the same master later after its source data is normalized.
