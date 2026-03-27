import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    try {
        // Get the raw cookie header from the incoming browser request
        const cookieHeader = request.headers.get('cookie') ?? '';
        const res = await fetch(`${process.env.API_BASE_URL}/user`, {
            headers: {
                'Accept': 'application/json',
                'Cookie': cookieHeader, // ← forward raw cookie header directly
            },
        });

        console.log('auth check status:', res.status); // ← check what Laravel returns
        // console.log(res);
        return res.ok;
    } catch {
        return false;
    }
}
export async function proxy(request: NextRequest) {
    const session = request.cookies.get('humber-idl-app-session')
    const loggedIn = await isAuthenticated(request)
    // console.log(loggedIn);

    // console.log(session);
    const isLoggedIn = !!session

    const isAuthPage = request.nextUrl.pathname === '/'

    // If not logged in and trying to access protected page → redirect to login
    if (!isLoggedIn && !isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If already logged in and trying to access login page → redirect to dashboard
    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL('/nodes', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/nodes/:path*', '/profile'],
}
