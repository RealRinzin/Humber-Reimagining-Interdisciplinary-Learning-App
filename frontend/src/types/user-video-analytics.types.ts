export interface UserVideoAnalyticsType {
    id: number;
    user_video_id: number;

    // ✅ match your actual enum values (pick one casing and stick with it)
    interaction_type: 'Played' | 'Paused' | 'Seeked' | 'Completed' | 'Buffering' | 'RateChange' | 'Volume' | 'Progress';

    interact_at: number; // whole seconds (unsignedInteger)

    // device info
    device_type: string;
    os_type: string;
    browser_type: string;
    user_agent?: string;   // nullable in migration

    // network
    ip_address?: string;   // nullable in migration

    // timestamps
    played_on: string;     // date string e.g. "2026-04-28"
    created_at: string;
    updated_at: string;

}