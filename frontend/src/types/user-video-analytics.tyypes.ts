export interface userVideoAnalyticsType{
    id: number;
    user_video_id: number;
    interaction_type: 'play' | 'pause' | 'seek' | 'complete' | 'replay' | 'skip';
    interact_at: string;
    device_type: string;
    os_type: string;
    browser_type: string;
    ip_address: string;
    watch_duration_seconds: number;
    video_position_seconds: number;
    completion_percentage: number;
}