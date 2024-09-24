import { jwtVerify } from 'jose';
import Error from 'next/error';
import { NextResponse } from 'next/server';


const encoder = new TextEncoder();
const jwtKey = encoder.encode(process.env.JWT_KEY || 'default-secret-key');

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await request.cookies.get('access-token');



  try {
    let payload = {};
    try {
      const data = await jwtVerify(token.value, jwtKey);
      payload = data.payload
    } catch (error) {
      console.error('JWT verification failed:', error);
      // return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.includes('/blog/create') || pathname.includes('/blog/manage')) {
      if (!token || !payload.isAuthenticated) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('to', new URL(pathname, request.url));
        return NextResponse.redirect(redirectUrl);
      }
      return  NextResponse.next();
    }

    // if (pathname.includes('/blog')) {

    //   const response = NextResponse.next();
    //   response.headers.set('x-is-verified', payload.isAuthenticated ? 'true' : 'false');
    //   return response;
    // }
  
    return NextResponse.next();
  } catch (error) {
    console.log({error})
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: ['/blog/create', '/blog/manage'],
};
