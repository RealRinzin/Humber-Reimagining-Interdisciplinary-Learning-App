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
// ======================= HTTP GET METHOD==============================================

export async function clientFetch(path: string, method: string, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(path, {
            ...options,
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: 'include', // needed for Sanctum cookie auth

        });
        return res;
    } catch (error) {
        throw error;

    }

}
// ======================= HTTP POST METHOD==============================================

export async function clientPost(path: string, body: unknown, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}${path}`, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: "include",
        });
        return res;
    } catch (error) {
        throw error;
    }
}

// ======================= HTTP PATCH METHOD==============================================

export async function clientPatch(path: string, body: unknown, options: RequestInit = {}) {
    console.log(body)
    const xsrfToken = await fetchCsrfToken();
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}${path}`, {
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
        return res;
    } catch (error) {
        throw error;

    }

}
// ======================= HTTP DELETE METHOD==============================================

export async function clientDelete(path: string, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}${path}`, {
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

        return res;

    } catch (error) {
        throw error;

    }

}

// ======================= HTTP FILE METHOD==============================================
export async function clientPostFormData(path: string, formData: FormData, options: RequestInit = {}) {
    const xsrfToken = await fetchCsrfToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}${path}`, {
            ...options,
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                ...options.headers,
            },
            credentials: "include",
        });
        return res;
    } catch (error) {
        throw error;
    }
}
// ======================= HTTP FILE with progress METHOD==============================================

export function clientPostFormDataProgress(
    path: string,
    formData: FormData,
    onProgress: (percent: number) => void
): Promise<Response> {
    return new Promise(async (resolve, reject) => {
        const xsrfToken = await fetchCsrfToken();
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", `${process.env.NEXT_PUBLIC_API_END_POINT}${path}`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-XSRF-TOKEN", xsrfToken);
        xhr.withCredentials = true;

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        };

        xhr.onload = () => {
            resolve(new Response(xhr.responseText, { status: xhr.status }));
        };

        xhr.onerror = () => reject(new Error("Upload failed"));

        xhr.send(formData);
    });
}