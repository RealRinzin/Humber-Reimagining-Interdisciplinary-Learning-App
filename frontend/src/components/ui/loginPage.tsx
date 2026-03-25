'use client';

import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: any) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(username, password);
            router.push('/nodes');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            {error && <p>{error}</p>}
            <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}