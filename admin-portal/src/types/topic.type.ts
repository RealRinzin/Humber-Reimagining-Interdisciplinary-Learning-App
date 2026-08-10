// TOPIC basic structure
export interface TopicType {
    title: string;
    description: string,
    node_group_id: number,
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

// Add new Topics
export interface AddNewTopic {
    title: string;
    description: string,
    node_group_id: number,
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

