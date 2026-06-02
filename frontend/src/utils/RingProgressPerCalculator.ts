import { clientFetch } from "@/lib/clientFetch";

type ContentSetting = {
    code: number;
    rambling: number;
    quiz: number;
    interactive: number;
};

// export function RingProgressPerCalculator(data: any): number {

export function RingProgressPerCalculator(data: any) {
    if (!data) return 0;
    if (data.all_checked) return  100;
    const fields = ['code', 'rambling', 'quiz', 'interactive'] as const;
    return (fields.filter(field => data[field]).length) * 25;
}

export function nodeProgressCalculator(data: any,user_setting:any,total_checked:number) {

    let count = 0;
    if (!data) return 0;
    if(data?.all_checked) return 100;
    
    const user_content_setting = {
        code: user_setting?.code,
        rambling: user_setting?.rambling,
        quiz: user_setting?.quiz,
        interactive: user_setting?.interactive
    };
    const user_video_setting = {
        code: data?.code,
        rambling: data?.rambling,
        quiz: data?.quiz,
        interactive: data?.interactive
    };
    for (const key of Object.keys(user_content_setting) as (keyof ContentSetting)[]) {
        if (user_content_setting[key] && user_video_setting[key]) count++;
    }
    return (count/ total_checked) * 100;
    // return count
}

export function calculateRingProgress(userContentSetting: any, UserVideoSetting: any) {
    let count = 0;
    const user_content_setting = {
        code: userContentSetting?.code,
        rambling: userContentSetting?.rambling,
        quiz: userContentSetting?.quiz,
        interactive: userContentSetting?.interactive
    };

    const user_video_setting = {
        code: UserVideoSetting?.code,
        rambling: UserVideoSetting?.rambling,
        quiz: UserVideoSetting?.quiz,
        interactive: UserVideoSetting?.interactive
    };

    for (const key of Object.keys(user_content_setting) as (keyof ContentSetting)[]) {
        if (user_content_setting[key] && user_video_setting[key]) count++;
    }
    return count;
}