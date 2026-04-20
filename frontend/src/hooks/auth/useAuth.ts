import { useState } from "react"

type LoginResponse = {
    token?: string
    message?: string
}

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
            // await getCsrfCookie();
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                // credentials: "include",
                body: JSON.stringify({ username, password }),
            })

            const data: LoginResponse = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Login failed")
            }

            // ✅ store token (adjust based on your backend)
            // if (data.token) {
            //     localStorage.setItem("token", data.token)
            // }
            return data

        } catch (err: any) {
            setError(err.message || "Something went wrong")
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error, }
}