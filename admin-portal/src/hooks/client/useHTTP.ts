'use client'
import { useState, useEffect } from "react"
import { clientDelete, clientFetch, clientPatch, clientPost } from "./useClient";

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

export function usePost(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (body: any) => {
        try {
            setLoading(true);
            setError(null);
            const res = await clientPost(url, "POST", body);
            if (!res.ok) throw new Error("Failed to post data");
            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postData, data, loading, error };
}


// ======================= Client Side  HTTP PATCH Method ==============================================

export function usePatch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const patchData = async (body: any) => {
        try {
            setLoading(true);
            setError(null);
            const res = await clientPatch(url, "PATCH", body);
            if (!res.ok) throw new Error("Failed to patch data");
            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { patchData, data, loading, error };
}


// ======================= Client Side  HTTP PATCH Method ==============================================
export function useDelete(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await clientDelete(url);
            if (!res.ok) throw new Error("Failed to delete data");
            const result = await res.json().catch(() => null); // DELETE often has no body
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteData, data, loading, error };
}