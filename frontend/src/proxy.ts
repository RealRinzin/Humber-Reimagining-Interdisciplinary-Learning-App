// This file is responsible for handling the authentication and authorization of the user. 
// It will check if the user is authenticated before allowing them to access certain pages. 
// If the user is not authenticated, they will be redirected to the login page. 
// If the user is already authenticated and tries to access the login page, they will be redirected to the dashboard page. 
// This file uses Next.js middleware to intercept requests and perform these checks before rendering the pages.

/**
 * The `proxy` function is a Next.js middleware that checks if the user is authenticated before allowing them to access certain pages. 
 * It uses the `isAuthenticated` function to check if the user is authenticated by making a request to the backend API. 
 * If the user is not authenticated and tries to access a protected page, they will be redirected to the login page. 
 * If the user is already authenticated and tries to access the login page, they will be redirected to the dashboard page. 
 * The `matcher` configuration specifies which routes should be protected by this middleware.
 */

import { cookies } from 'next/headers' // to access cookies in the middleware
import { NextResponse } from 'next/server' // to create responses and redirects in the middleware
import type { NextRequest } from 'next/server' // to type the request object in the middleware

/**
 * 
 * @param request 
 * @returns 
 */

// This function checks if the user is authenticated by making a request to the backend API with the cookies from the request.
// If the request is successful, it returns true, indicating that the user is authenticated. 
// If the request fails (e.g., due to a 401 Unauthorized response), it returns false, indicating that the user is not authenticated.
/**
 * In this function, we are making a GET request to the `/api/user` endpoint of our backend API to check if the user is authenticated. 
 * We include the cookies from the request in the headers of the fetch request, which allows the backend to identify the user based on their session cookie. 
 * If the response is successful (i.e., the user is authenticated), we return true. If the response is not successful (e.g., if it returns a 401 Unauthorized status), we return false, indicating that the user is not authenticated.
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const cookieHeader = request.headers.get('cookie') ?? '';
    console.log(cookieHeader)
    // const cookieStore = await cookies(); // get the cookies from the request using Next.js's cookies function, which returns a cookie store object that we can use to access the cookies in the request
    // We convert the cookie store to a string and include it in the headers of the fetch request to the backend API.
    //  This allows the backend to identify the user based on their session cookie and determine if they are authenticated.
    try { 
        const res = await fetch(`${process.env.BASE_END_POINT}/api/user`, { // Default
            method: "GET",
            // credentials: "include",
            headers: {
                // Cookie: cookieStore.toString(),
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
    // const session = request.cookies.get('humber-idl-app-session')
    const loggedIn = await isAuthenticated(request)

    const isAuthPage = request.nextUrl.pathname === '/'
    const isOnBoardingPage = request.nextUrl.pathname === '/onboarding';
    // If not logged in and trying to access protected page → redirect to login
    if (!loggedIn && !isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If already logged in and trying to access login page → redirect to dashboard
    if (loggedIn && isAuthPage) {
        return NextResponse.redirect(new URL('/profile/knowledge_map', request.url))
    }
    // log
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/topics/:path*', '/profile/:path*','/video/:path*','/team/:path*'],
}
