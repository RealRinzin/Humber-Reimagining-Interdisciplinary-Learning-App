export interface VideoType {
    title: string;
    topic_id: number|null,
    video_url:string,
    thumbnail?:string,
    description: string,
    duration:number,
    tldw?:string,
    video: boolean,
    code: boolean,
    quiz: boolean,
    interactive: boolean,
    rambling: boolean,
    interactive_path?: string,
    student_visible: boolean,
}