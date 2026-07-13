import { cookies } from 'next/headers' // to access cookies in the middleware
import { NextResponse } from 'next/server' // to create responses and redirects in the middleware
import type { NextRequest } from 'next/server' // to type the request object in the middleware

/**
 * 
 * @param request 
 * @returns 
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const cookieHeader = request.headers.get('cookie') ?? '';
    // const cookieStore = await cookies(); // get the cookies from the request using Next.js's cookies function, which returns a cookie store object that we can use to access the cookies in the request
    // We convert the cookie store to a string and include it in the headers of the fetch request to the backend API.
    //  This allows the backend to identify the user based on their session cookie and determine if they are authenticated.
    try {
        const res = await fetch(`${process.env.API_END_POINT}/me`, { // Default
            // const res = await fetch(`${process.env.BASE_END_POINT}/api/user`, { // Default
            method: "GET",
            headers: {
                Cookie: cookieHeader,
                Accept: "application/json"
            }
        })
        if (!res.ok) return false; // if the response is not successful (e.g., if it returns a 401 Unauthorized status), we return false, indicating that the user is not authenticated.
        return true; // if the response is successful (i.e., the user is authenticated), we return true.

    } catch {
        // If there is an error (e.g., network error), we also return false, indicating that the user is not authenticated.
        return false;
    }
}

/**
 * 
 * @param request 
 * @returns 
 */
export async function proxy(request: NextRequest) {

    const loggedIn = await isAuthenticated(request)

    const isHomePage = request.nextUrl.pathname === '/'
    // If not logged in and trying to access protected page → redirect to login
    if (!loggedIn && !isHomePage ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If already logged in and trying to access onboarding → redirect to profile
    if (loggedIn && isHomePage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
}