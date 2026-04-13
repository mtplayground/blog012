import { NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

const ADMIN_LOGIN_PATH = '/admin/login';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  const response = NextResponse.redirect(loginUrl);

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return response;
}
