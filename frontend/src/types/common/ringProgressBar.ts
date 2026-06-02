
// Audio Type Interface
export interface RingProgressBarType {
    id: number,
    progress: number,
    color: string,
    total:number,
    borderColor: string,
    onClick?: () => void,
}