import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
  verifyAdminPassword
} from '@/lib/auth';

const loginRequestSchema = z.object({
  password: z.string().min(1, 'Password is required').max(256, 'Password is too long')
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsedBody = loginRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const isValidPassword = await verifyAdminPassword(parsedBody.data.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: createSessionToken(),
    ...getSessionCookieOptions()
  });

  return response;
}
