import { RingProgressBarType } from "@/types/common/ringProgressBar";
export default function RingProgressBar({
  color,
  progress,
}: RingProgressBarType) {

  // Calculate the total check for the ring. percentage
  // We are calculation the % share of each circle 
  const progressRateCalculation = (progress/4)*100;
  return (
    <div
      className="w-13 h-13 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${color} 0% ${progressRateCalculation}%, #99a1af ${progressRateCalculation}% 100%)`,
      }}
    >
      <div className="w-10 h-10 rounded-full bg-gray-50 flex justify-center-safe items-center-safe">
        <div
          className="h-8 w-8 m-1 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}
