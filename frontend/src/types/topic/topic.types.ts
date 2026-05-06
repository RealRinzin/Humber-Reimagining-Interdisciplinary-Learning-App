export interface TopicType {
    data: {
        id: number | null;
        label: string | null;
        url: string | null;
        source: string | null;
        target: string | null;
        node_color: string | null;
    };
    position?: {   // add this
        x: number;
        y: number;
    };
}