export interface HorizontalTabTypes {
    id: number,
    name: string,
    color: string,
    slug: string,
    description: string,
    total_started?: number,
    is_started: boolean,
    ringInformation: any,
    video:any,
    onHover?: () => void;
    onLeave?: () => void;
}