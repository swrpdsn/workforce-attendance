import type { AuthUser } from './auth';

export type Permission =
  | 'employees:read' | 'employees:write'
  | 'locations:read' | 'locations:write'
  | 'attendance:read' | 'attendance:write'
  | 'corrections:approve' | 'leave:approve' | 'overtime:approve'
  | 'payroll:read' | 'payroll:export'
  | 'users:manage' | 'audit:read';

const rolePermissions: Record<string, Permission[]> = {
  SUPER_ADMIN: ['employees:read','employees:write','locations:read','locations:write','attendance:read','attendance:write','corrections:approve','leave:approve','overtime:approve','payroll:read','payroll:export','users:manage','audit:read'],
  ORG_ADMIN: ['employees:read','employees:write','locations:read','locations:write','attendance:read','attendance:write','corrections:approve','leave:approve','overtime:approve','payroll:read','payroll:export','users:manage','audit:read'],
  HR_ADMIN: ['employees:read','employees:write','locations:read','attendance:read','attendance:write','corrections:approve','leave:approve','overtime:approve','audit:read'],
  LOCATION_ADMIN: ['employees:read','locations:read','locations:write','attendance:read','attendance:write','corrections:approve'],
  SUPERVISOR: ['employees:read','locations:read','attendance:read','attendance:write','corrections:approve','leave:approve','overtime:approve'],
  PAYROLL_ADMIN: ['employees:read','attendance:read','payroll:read','payroll:export'],
  CONTRACTOR_ADMIN: ['employees:read','attendance:read'],
  EMPLOYEE: ['employees:read','attendance:read','attendance:write'],
};

export function hasPermission(user: AuthUser, permission: Permission) {
  return Boolean(rolePermissions[user.role]?.includes(permission));
}

export function requirePermission(user: AuthUser | null, permission: Permission) {
  if (!user) throw new Error('UNAUTHORIZED');
  if (!hasPermission(user, permission)) throw new Error('FORBIDDEN');
  return user;
}
