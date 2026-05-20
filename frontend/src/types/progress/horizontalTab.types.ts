export interface HorizontalTabTypes {
    id: number,
    name: string,
    color: string,
    slug: string,
    description: string,
    is_started: boolean,
    ringInformation: any,
    onHover?: () => void;
    onLeave?: () => void;
}