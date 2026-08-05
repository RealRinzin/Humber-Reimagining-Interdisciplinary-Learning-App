'use client'
import { useState, useEffect } from "react"
import { clientFetch } from "../useClient";

export function useFetch(url: string,method:string) {
    // response data object
    const [data, setData] = useState(null);
    // loading status
    const [loading, setLoading] = useState(true);
    // Erro response
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await clientFetch(url,"GET");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [url]);

    // Return the response object
    return {data,loading,error}
}

// ======================= Client Side  HTTP PATCH Method ==============================================

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

}