export interface  OnboardStepsType{
    number: number
    label: string
    component:string,
    status: boolean
}

// Personal detail 
export interface OnboardPersonalDetailType{
    name:string,
    username:string,
    password:string
}

// Select Content 
export interface OnboardSelectContentType{
    video:boolean,
    interactive:boolean,
    code:boolean,
    quiz:boolean,
    rambling:boolean
}

// Learning Path
export interface OnboardLearningPathType{
    explore_mode:boolean,
    guided_path:boolean
}
// Show progress

export interface OnboardShowProgressType{
    status:boolean
}