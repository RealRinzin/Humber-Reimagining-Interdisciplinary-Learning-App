// export function RingProgressPerCalculator(data: any): number {
export function RingProgressPerCalculator(data: any): number {
    if (!data) return 0;
    if (data.all_checked) return 4*25;
    const fields = ['code', 'rambling', 'quiz', 'interactive'] as const;
    return (fields.filter(field => data[field]).length)*25;
}

export function calculateRingProgress(){

    return 45;
}