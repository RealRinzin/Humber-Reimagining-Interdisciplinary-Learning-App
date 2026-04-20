
const API_URL = 'http://localhost:8000';
import { LoginDType } from '@/types/auth.types';
import { getCookie } from './cookie';

// Step 1: always call this before login to get CSRF cookie
async function getCsrfCookie() {
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include', // required to store the cookie
    });
}

export async function login(username: string, password: string): Promise<LoginDType> {

    // Step 1 — get CSRF token from the browser for authentication
    await getCsrfCookie();
    // Step 2 — login
    const res = await fetch(`${API_URL}/api/v1/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') ?? ''), // decodeURIComponent and send XSRF Token 
        },
        body: JSON.stringify({ username, password }),
    });
    console.log(res)
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
    }

    return res.json();
}
