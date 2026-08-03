type RingColor = "cyan-500" | "pink-500" | "purple-500" | "blue-500";

const ringColorMap: Record<RingColor, string> = {
  "cyan-500":   "bg-cyan-500/60 ring-cyan-500",
  "pink-500":   "bg-pink-500/60 ring-pink-500",
  "purple-500": "bg-purple-500/60 ring-purple-500",
  "blue-500":   "bg-blue-500/60 ring-blue-500",
};

export default function Ring({ color }: { color: RingColor }) {
  const classes = ringColorMap[color] ?? "bg-gray-500/60 ring-gray-500";
  return (
    <div className={`${classes} ring-3 ring-offset-4 rounded-full h-5 w-5`} />
  );
}