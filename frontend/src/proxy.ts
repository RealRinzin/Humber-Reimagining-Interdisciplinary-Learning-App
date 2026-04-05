import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 
 * @param request 
 * @returns 
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`http://localhost:8000/api/user`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
                Accept: "application/json"
            }
        })
        if (!res.ok) return false;
        return true;

    } catch {
        return false;
    }

}
/**
 * 
 * @param request 
 * @returns 
 */
export async function proxy(request: NextRequest) {
    // const session = request.cookies.get('humber-idl-app-session')
    const loggedIn = await isAuthenticated(request)
    // const isLoggedIn = !!session
    const isAuthPage = request.nextUrl.pathname === '/'
    // If not logged in and trying to access protected page → redirect to login
    if (!loggedIn && !isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If already logged in and trying to access login page → redirect to dashboard
    if (loggedIn && isAuthPage) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    // log
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/topics/:path*', '/profile/:path*','/video/:path*'],
}
