'use client'
import { useState, useEffect } from "react"
import { clientFetch } from "../useAuth";

export function useFetch(url: string) {
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
                const res = await clientFetch(url);
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