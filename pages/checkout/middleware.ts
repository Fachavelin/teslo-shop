import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies.get('token')?.value;

  return new Response('Token:' + token);
}

/* export const config = {
  matcher: '/about/:path*',
};
 */
