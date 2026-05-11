// lib/clientFetch.ts
import { useRouter } from 'next/navigation';
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
    // if (!res.ok) {
    //     const error = await res.json();

    //     if (res.status === 401) {
    //         window.location.href = '/login';
    //         return; // stop execution after redirect
    //     }

    //     if (res.status === 404) {
    //         throw new Error('Not found');
    //     }
    //     // Throw the error message and error status
    //     throw new Error(error.message ?? `Request failed: ${res.status}`);
    // }

    // } catch (error) {
    //     console.log(error);
    // }
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
export async function clientPost(path: string, body: unknown, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: 'include', // needed for Sanctum cookie auth
        });
        // CHECK the response status
        if (!res.ok) {
            const error = await res.json();

            if (res.status === 401) {
                window.location.href = '/login';
                return; // stop execution after redirect
            }

            if (res.status === 404) {
                throw new Error('Not found');
            }
            // Throw the error message and error status
            throw new Error(error.message ?? `Request failed: ${res.status}`);
        }

    } catch (error) {
        console.log(error);
    }
    // if (!res.ok) {
    //     if (res.status === 401) {
    //         window.location.href = '/login';
    //     }
    //     if (res.status === 404) {
    //         throw new Error('Not found');
    //     }
    //     throw new Error(`Request failed: ${res.status}`);
    // }

    // return res;
}

export async function clientPatch(path: string, body: unknown, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: 'include', // needed for Sanctum cookie auth
        });
        if (!res.ok) {
            const error = await res.json();

            if (res.status === 401) {
                window.location.href = '/login';
                return; // stop execution after redirect
            }

            if (res.status === 404) {
                throw new Error('Not found');
            }
            // Throw the error message and error status
            throw new Error(error.message ?? `Request failed: ${res.status}`);
        }

    } catch (error) {
        console.log(error);
    }

    // if (!res.ok) {
    //     if (res.status === 401) {
    //         window.location.href = '/login';
    //     }
    //     if (res.status === 404) {
    //         throw new Error('Not found');
    //     }
    //     throw new Error(`Request failed: ${res.status}`);
    // }

    // return res;
}

export async function clientDelete(path: string, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
            ...options,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: 'include', // needed for Sanctum cookie auth
        });
        if (!res.ok) {
            const error = await res.json();

            if (res.status === 401) {
                window.location.href = '/login';
                return; // stop execution after redirect
            }

            if (res.status === 404) {
                throw new Error('Not found');
            }
            // Throw the error message and error status
            throw new Error(error.message ?? `Request failed: ${res.status}`);
        }

    } catch (error) {
        console.log(error);
    }

    // if (!res.ok) {
    //     if (res.status === 401) {
    //         window.location.href = '/login';
    //     }
    //     if (res.status === 404) {
    //         throw new Error('Not found');
    //     }
    //     throw new Error(`Request failed: ${res.status}`);
    // }

    // return res;
}