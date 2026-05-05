// lib/clientFetch.ts
import { useRouter } from 'next/navigation';
// GET CSRF TOKEN
async function fetchCsrfToken(): Promise<string> {
    await fetch(`${process.env.BASE_END_PONT}/sanctum/csrf-cookie`, {
        credentials: "include",
    });

    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (!token) throw new Error("XSRF-TOKEN cookie not found");

    return decodeURIComponent(token);
}

export async function clientFetch(path: string, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken(); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": xsrfToken,
            ...options.headers, 
        },
        credentials: 'include', // needed for Sanctum cookie auth
        
    });

    if (!res.ok) {
        if (res.status === 401) {
            window.location.href = '/login'; // or useRouter() inside a hook
        }
        if (res.status === 404) {
            throw new Error('Not found');
        }
        throw new Error(`Request failed: ${res.status}`);
    }

    return res;
}