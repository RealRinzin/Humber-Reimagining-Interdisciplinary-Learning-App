import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const session = request.cookies.get('humber-idl-app-session')
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
    matcher: ['/', '/nodes/:path*'],
}
