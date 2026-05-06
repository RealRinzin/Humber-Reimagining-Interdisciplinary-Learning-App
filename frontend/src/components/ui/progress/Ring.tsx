import { RingProgressBarType } from "@/types/common/ringProgressBar";
export default function RingProgressBar({ color }: RingProgressBarType) {
  return (
    <>
      <div
        className="w-13 h-13 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(
            ${color} 0 ${Math.floor(Math.random()*10).toFixed(0)}0%, #99a1af 50% 80%)`,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-gray-50 flex justify-center-safe items-center-safe">
          <div
            className="h-8 w-8 m-1 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    </>
  );
}
