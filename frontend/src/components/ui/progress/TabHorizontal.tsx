// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar

import { HorizontalTabTypes } from "@/types/progress/horizontalTab.types";
import RingProgressBar from "./Ring";

export default function TabHorizontal({name,color}:HorizontalTabTypes) {
  return (
    <div className="flex items-center border-3 rounded-2xl border-gray-400/80 my-2">
      <div className="border-r-3 border-gray-400/80 p-3">
        <RingProgressBar id={4} color={'red'} borderColor={"red"} percentage={90}/>
      </div>
      <div className="flex flex-1 justify-between items-center px-3 py-2">
        <h2 className="text-gray-600 font-bold">{name}</h2>
        <a href="" className="bg-gray-400 rounded-md px-2 py-1 text-gray-00">
          Start
        </a>
      </div>
    </div>
  );
}
