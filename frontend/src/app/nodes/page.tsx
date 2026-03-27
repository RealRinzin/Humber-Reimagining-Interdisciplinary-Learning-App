import { useTopicNodes } from "@/hooks/topic_node/useTopicNode"
import ListPage from "./list"
import { getCookie } from "@/lib/cookie";
import { cookies } from 'next/headers'; // ← Next.js server side cookie helper
export default async function NodePage() {
    const cookieStore = await cookies();
    console.log(await cookieStore);
    const res = await fetch(`http:localhost:8000/api/user`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
            Accept: "application/json",
        },
    });

    if (!res.ok) return "failed";
    console.log(res)
    // return res.json();
    return (
        <>
            <ListPage />
        </>
    )
}

