
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

    // Step 1 — get CSRF token
    await getCsrfCookie();
    // await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    //     credentials: 'include',
    // });

    // Step 2 — login
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') ?? ''),
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
}