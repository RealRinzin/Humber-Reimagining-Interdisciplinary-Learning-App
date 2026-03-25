// app/actions/auth.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    // console.log(formData);
    // return;
    const res = await fetch(`http://localhost:8000/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
        }),
    })

    if (!res.ok) {
        console.log(res);
        return "invalid";
        // console.log('Invalid');
        // return 'Invalid Credentials';
        throw new Error('Invalid credentials')
    }

    const { token } = await res.json()
    console.log(token)
    // ; (await cookies()).set('token', token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax',
    //     maxAge: 60 * 60 * 24 * 7,
    //     path: '/',
    // })

    redirect('/nodes')
}