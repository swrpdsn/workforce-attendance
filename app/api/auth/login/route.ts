import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession, SESSION_COOKIE, verifyPassword } from '../../../../../../lib/auth';
import { prisma } from '../../../../../../lib/prisma';

const schema = z.object({ email: z.string().email().transform((v) => v.toLowerCase().trim()), password: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ success: false, error: { code: 'INVALID_REQUEST', message: 'Email and password are required.' } }, { status: 400 });

  const users = await prisma.user.findMany({ where: { email: parsed.data.email, active: true }, take: 2 });
  const user = users.length === 1 ? users[0] : null;
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' } }, { status: 401 });
  }

  const { token, expiresAt } = await createSession(user.id);
  await prisma.auditLog.create({ data: { organizationId: user.organizationId, actorUserId: user.id, action: 'login', entity: 'User', entityId: user.id } });
  const response = NextResponse.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role, organizationId: user.organizationId, employeeId: user.employeeId } } });
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', expires: expiresAt, path: '/' });
  return response;
}
