'use client';
import { useEffect, useState } from "react";
import { TopicNode } from "@/types/topic-node.types";
// Function
export function useTopicNodes() {
    // Initialization 
    const [topics, setTopics] = useState<TopicNode[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Use Effect mount

    useEffect(() => {
        setLoading(true);
        setError(null);
        // fetch(`${process.env.API_BASE_URL}/nodes`)
        fetch(`http://localhost:8000/api/nodes`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then((data: TopicNode[]) => setTopics(data))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));


    }, []);

    return { topics, loading, error };
}