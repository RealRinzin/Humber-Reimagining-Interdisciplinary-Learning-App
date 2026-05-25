
// Audio Type Interface
export interface RingProgressBarType {
    id: number,
    progress: number,
    color: string,
    borderColor: string,
    onClick?: () => void,
}