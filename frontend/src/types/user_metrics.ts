// Export type for
// 1. User Video Metric
// 2. User Topic Metric
// 3  User Flash Card Metric

export interface UserVideoMetricType{
    id:number,
    user_id:number,
    video_id:number,
    started_at:number,
    interaction_type:string,
    ended_at:number,
    watch_duration:number,
    last_paused:number,
    paused_count:number,
    device_type:string,
    complete_status:string,
    played_date:number

}