import { NextResponse } from 'next/server' // to create responses and redirects in the middleware
import type { NextRequest } from 'next/server' // to type the request object in the middleware

/**
 * 
 * @param request 
 * @returns 
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const cookieHeader = request.headers.get('cookie') ?? '';
    console.log("This is check point")
}

export async function proxy(request: NextRequest) {
    console.log("This is proxy")

}