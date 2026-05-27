// components/timeToDigit.tsx
export default function timeToDigit({ time }: { time: string }) {
    const seconds = time.split(':').reduce((acc, val) => acc * 60 + parseInt(val), 0);
    return seconds;
}