// 'use client'
import { useTopicNodes } from "@/hooks/topic_node/useTopicNode"
import ListPage from "./list"

export default async  function NodePage() {

    // const { topics, loading, error } = await  useTopicNodes();
    // console.log(topics)
    // console.log(loading)
    // console.log(error)
    // if (loading) return <p>Loading......</p>
    // if (error) return <p>Error:{error}</p>

    return (
        <>
        <ListPage/>
        </>
    )
}
