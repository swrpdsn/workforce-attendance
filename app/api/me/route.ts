import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '../../../../lib/auth';

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required.' } }, { status: 401 });
  return NextResponse.json({ success: true, data: { user } });
}
