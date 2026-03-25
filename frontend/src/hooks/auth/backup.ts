import { useState } from "react"

export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getCsrfCookie = async () => {
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            credentials: "include",
        })
    }

    const login = async (username: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            // 🔥 Step 1: Get CSRF cookie
            await getCsrfCookie()

            // 🔥 Step 2: Login
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include", // ✅ VERY IMPORTANT
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Login failed")
            }

            return data

        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const getUser = async () => {
        const res = await fetch("http://localhost:8000/api/user", {
            credentials: "include",
        })

        if (!res.ok) return null

        return await res.json()
    }

    const logout = async () => {
        await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            credentials: "include",
        })
    }

    return {
        login,
        getUser,
        logout,
        loading,
        error,
    }
}