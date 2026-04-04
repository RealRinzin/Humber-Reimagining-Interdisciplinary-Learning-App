// We are using this tab basically for the Knowledge Map
// Horizontal Tab Progress bar

import RingProgressBar from "./Ring";

export default function TabHorizontal() {
  return (
    <div className="flex items-center border-3 w-1/3 m-10 rounded-2xl border-gray-200">
      <div className="border-r-3 border-gray-200 p-3">
        <RingProgressBar id={4} color={'red'} borderColor={"red"} percentage={90}/>
      </div>

      <div className="flex flex-1 justify-between items-center px-3 py-2">
        <h2 className="text-gray-600 font-bold">Model Space</h2>
        <a href="" className="bg-gray-300 rounded-md px-2 py-1 text-gray-500">
          Start
        </a>
      </div>
    </div>
  );
}
