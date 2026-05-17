export interface RingCircleProgressType {
    code: boolean;
    interactive: boolean;
    rambling: boolean;
    quiz: boolean;
    code_checked_with_all: boolean;
    interactive_checked_with_all: boolean;
    rambling_checked_with_all: boolean;
    quiz_checked_with_all: boolean;
    all_checked: boolean;
    // Options 
    id?: number|null;
    user_id?: number|null;
    video_id?: number|null;
    created_at?: string|null;
    updated_at?: string |null;
}