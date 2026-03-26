import { useTopicNodes } from "@/hooks/topic_node/useTopicNode"
import ListPage from "./list"
import { getCookie } from "@/lib/cookie";
import { cookies } from 'next/headers'; // ← Next.js server side cookie helper
export default async function NodePage() {
    return (
        <>
            <ListPage />
        </>
    )
}

