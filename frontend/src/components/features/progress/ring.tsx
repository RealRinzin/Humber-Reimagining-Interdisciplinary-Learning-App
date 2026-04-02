import { RingProgressBarType } from "@/types/common/ringProgressBar";

export default function RingProgressBar({id,color,borderColor,percentage}:RingProgressBarType) {
  return (
    <>
      <div
        className="w-13 h-13 rounded-full flex items-center justify-center"
        // style={{
        //   background: `conic-gradient(
        //       ${id === 0 ? "#378ADD 0% 80%, #D3D1C7 50% 100%)" : "#378ADD 0% 90%, #D3D1C7 50% 30%)"}`,
        // }}
        style={{
            background:`conic-gradient(
            ${id===0 ? `${color} 0 80%, ${borderColor} 50% 80%`:`#378ADD 0% 90%, #D3D1C7 50% 30%`})`
        }}
      >
        <div className="w-10 h-10 rounded-full bg-gray-50 flex justify-center-safe items-center-safe">
          <div
            className={` ${id === 1 ? "bg-cyan-400" : id === 2 ? "bg-purple-700" : "bg-pink-600"} h-8 w-8 m-1 rounded-full`}
          ></div>
        </div>
      </div>
    </>
  );
}
