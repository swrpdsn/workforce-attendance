# Workforce Attendance

Production-oriented multi-location workforce attendance platform for construction, marine and industrial teams.

## Phase 1

- Multi-tenant organization model
- RBAC foundation
- Employee master
- Projects and locations
- Configurable geofences
- Shifts and effective-dated location assignments
- Immutable attendance events
- Attendance-day calculation model
- Payroll-period foundation
- Audit logging
- Server-side geofence validation
- Initial dashboard

## Local setup

Requirements: Node.js 20+, PostgreSQL 15+

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Run tests:

```bash
npm test
npm run typecheck
```

## Product principle

Attendance events are the source of truth. Payroll consumes calculated attendance outputs. The application does not attempt to replace a statutory payroll engine in Phase 1.
