// GET CSRF TOKEN
async function fetchCsrfToken(): Promise<string> {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
    });
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (!token) throw new Error("XSRF-TOKEN cookie not found");

    return decodeURIComponent(token);
}
/**
 *  FETCH METHOD
 * @param path 
 * @param options 
 * @returns 
 */
export async function clientFetch(path: string, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    // try {
    const res = await fetch(path, {
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
        throw new Error(`Request failed: ${res.status}`);
    }

    return res;
}