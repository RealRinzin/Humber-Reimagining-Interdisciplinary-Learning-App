

import { cookies } from "next/headers";
export default async function NodePage() {
    const cookieStore = (await cookies()).toString();

    const res = await fetch('http://localhost:8000/api/user', {
        method: "GET",
        headers: {
            Cookie: cookieStore,
            Accept: "application/json"
        }
    });
    const data = await res.json();
    console.log(data);

    // return page
    return (
        <>
        <h1>{data.name}</h1>
        </>
    )
}

