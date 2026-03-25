const API_URL = 'http://localhost:8000';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export async function login(username, password) {
    // Step 1 — get CSRF token
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });

    // Step 2 — login
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
}