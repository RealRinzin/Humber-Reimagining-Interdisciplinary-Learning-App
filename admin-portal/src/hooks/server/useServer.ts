import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

async function buildFetchOptions(options: RequestInit = {}): Promise<RequestInit> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');
    // 
    const xsrfToken = cookieStore.get('XSRF-TOKEN')?.value ?? '';
    const decodedXsrf = decodeURIComponent(xsrfToken);

    return {
        ...options,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            Cookie: cookieHeader,
            'X-XSRF-TOKEN': decodedXsrf,
            Referer: process.env.FRONTEND_URL ?? 'http://localhost:3001',
            ...options.headers,
        },
        cache: 'no-store',
    };
}

export async function serverFetch(path: string, options: RequestInit = {}) {
    const fetchOptions = await buildFetchOptions(options);
    const res = await fetch(`${process.env.API_END_POINT}${path}`, fetchOptions);
    if (!res.ok)  notFound();
    if (res.status === 404) notFound();
    if (res.status === 401) redirect('/');
    const data = await res.json()
    return data;
}