'use client'
import { useState } from "react"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const login = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.message || 'Invalid credentials')
                return
            }

            const data = await res.json()
            console.log("Success:", data)

        } catch (err) {
            console.error(err)
            setError('Something went wrong')
        }
    }

    return (
        <>
            <input
                type="text"
                name="username"
                className="border-slate-400 border-2 rounded"
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <input
                type="password"
                name="password"
                className="border-slate-400 border-2 rounded"
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button onClick={login}>Login</button>

            {error && <p className="text-red-500">{error}</p>}
        </>
    )
}