import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { jwt } from './utils';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || '';

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // Informacion util del usuario

  if (!session) {
    const requestedPage = req.nextUrl.pathname;

    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();

  /* try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.rewrite(new URL('/auth/login', request.nextUrl));
  } */
}

export const config = {
  matcher: ['/checkout/adress', '/checkout/summary'],
};
