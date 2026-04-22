import { cookies } from 'next/headers';
export async function serverFetch(path: string, options: RequestInit = {}) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

    const xsrfToken = cookieStore.get('XSRF-TOKEN')?.value ?? '';
    const decodedXsrf = decodeURIComponent(xsrfToken);

    return fetch(`${process.env.API_BASE_URL}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            Cookie: cookieHeader,
            'X-XSRF-TOKEN': decodedXsrf,
            Referer: process.env.FRONTEND_URL ?? 'http://localhost:3000',
            ...options.headers, // allow overriding headers per call
        },
        cache: 'no-store',
    });
}