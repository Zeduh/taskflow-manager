import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthRoute } from './utils/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuth = Boolean(token);
  const isAuthPage = isAuthRoute(request.nextUrl.pathname);

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};