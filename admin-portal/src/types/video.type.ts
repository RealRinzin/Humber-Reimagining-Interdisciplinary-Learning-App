export interface VideoType {
    id:number;
    title: string;
    description: string,
    topic_id: number,
    node_color: string,
    x_axis: number,
    y_axis: number,
    video: boolean,
    code: boolean,
    quiz: boolean,
    interactive: boolean,
    rambling: boolean,
    interactive_path: string,
    student_visible: boolean,
}