import { NextResponse } from 'next/server';
import { getAuthenticatedUser, revokeCurrentSession } from '../../../../../../lib/auth';
import { prisma } from '../../../../../../lib/prisma';

export async function POST() {
  const user = await getAuthenticatedUser();
  if (user) await prisma.auditLog.create({ data: { organizationId: user.organizationId, actorUserId: user.id, action: 'logout', entity: 'User', entityId: user.id } });
  await revokeCurrentSession();
  return NextResponse.json({ success: true });
}
