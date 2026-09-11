// Export type for

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