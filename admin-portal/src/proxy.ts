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
    console.log(cookieHeader)
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
        console.log('status:', res.status);
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

    console.log(loggedIn)
    return NextResponse.next()

}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
}