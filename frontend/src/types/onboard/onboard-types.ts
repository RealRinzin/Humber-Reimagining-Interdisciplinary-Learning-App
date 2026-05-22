export interface OnboardStepsType {
    number: number
    label: string
    component: string,
    status: boolean
}

// Personal detail 
export interface OnboardPersonalDetailType {
    name: string,
    username: string,
    password: string
}

// Select Content 
export interface OnboardSelectContentType {
    video: boolean,
    interactive: boolean,
    code: boolean,
    quiz: boolean,
    rambling: boolean
}

// Learning Path
export interface OnboardLearningPathType {
    explore_mode: boolean,
    guide_path: boolean
    learning_path?: "explore_mode" | "guide_path"; // radio group field
}
// Show progress

export interface OnboardShowProgressType {
    progress: boolean
}