// Video export types for the typescript
export interface VideoType {
    id: number,
    name: string,
    title: string,
    slug: string,
    topic_id: number,
    parent_id: number,
    thumbnail: string,
    video_url: string,
    duration: number,
    description: string,
    is_following: boolean,
    node_color: string,
    videos: {
        user_video_setting?: {
            all_checked?: boolean;
            code?: boolean;
            rambling?: boolean;
            quiz?: boolean;
            interactive?: boolean;
        };
    }[];
}


// Video Parts Modal Type description
export interface VideoPartsType{
    src:string,
    title:string,
    description:string,
    subtitle:string,
}