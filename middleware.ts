import { NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/session';

const ADMIN_LOGIN_PATH = '/admin/login';

function buildLoginRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(SESSION_COOKIE_NAME);

  return response;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.SESSION_SECRET;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionSecret || !sessionToken) {
    return buildLoginRedirect(request);
  }

  const isAuthenticated = await verifySessionToken(sessionToken, sessionSecret);

  if (!isAuthenticated) {
    return buildLoginRedirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
