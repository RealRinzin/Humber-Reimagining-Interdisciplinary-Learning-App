'use client'
import { useTopicNodes } from "@/hooks/topic_node/useTopicNode"
export default function ListPage() {
    const { topics, loading, error } = useTopicNodes();
    if (loading) return <p>Loading......</p>
    if (error) return <p>Error:{error}</p>

    return (
        <>
            Data here
        </>
    )
}

