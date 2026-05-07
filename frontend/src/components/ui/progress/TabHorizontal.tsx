// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar

import { HorizontalTabTypes } from "@/types/progress/horizontalTab.types";
import RingProgressBar from "./Ring";

export default function TabHorizontal({ name, color,slug }: HorizontalTabTypes) {
  return (
    <div className="flex items-center border-3 rounded-2xl border-gray-400/80 my-2">
      <div className="flex flex-col items-center justify-center border-r-3 border-gray-400/80 p-3">
        <RingProgressBar id={2} color={color} borderColor={color} percentage={90} />
        <div className="pt-2">
          <p className="text-center text-sm font-semibold">4/8</p>
          <p className="text-gray-600">Complete</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-3 py-2">
        <div className="flex flex-1 justify-between items-center">
          <h2 className="text-gray-600 font-bold">{name}</h2>
          <a href={`/video/${slug}`} className="bg-gray-400 rounded-md px-2 py-1 text-gray-00">
            Start
          </a>
        </div>
        <p className="text-gray-700 py-2 ">
          The camera is always at the origin looking down the -z axis, dammit!
          (Scott probably wrote this).
        </p>
      </div>
    </div>
  );
}
