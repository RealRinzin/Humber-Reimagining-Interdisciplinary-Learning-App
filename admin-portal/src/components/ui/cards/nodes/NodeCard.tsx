import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ring from "../../ring/Ring";
import {
  faBook,
  faCircleQuestion,
  faCode,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import Image from "next/image";

export default function NodeCard({color}:any) {
  return (
    <div className="border rounded-xl border-gray-200 p-4 shadow-sm">
      {/* Top */}
      <div className="flex my-4 gap-4 justify-items-center-safe">
        <Ring  color={color}/> 
        <h2 className="font-extrabold text-gray-800">Intro to Space</h2>
      </div>
      {/* Student Visibility */}
      <div className="flex my-4 justify-items-center gap-2 text-sm text-gray-600">
        <p>
          <FontAwesomeIcon icon={faEye} size="1x" className="cursor-pointer" />
        </p>
        <p>Visible to Students</p>
        <p>
          <FontAwesomeIcon
            icon={faAngleDown}
            size="1x"
            className="cursor-pointer"
          />
        </p>
      </div>
      {/* Detail */}
      <p className="text-gray-800 font-light text-sm">
        If your data is stored in a native JavaScript Map object rather than a
        regular array, you must convert its entries into an array using
        Array.from() before calling
      </p>
      <ul className="flex gap-2 my-4 text-gray-400">
        <li>
          <FontAwesomeIcon
            icon={faCirclePlay}
            size="1x"
            className="cursor-pointer"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            size="1x"
            className="cursor-pointer"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faCode}
            size="1x"
            className="cursor-pointer bg-gray-400 text-white rounded-sm"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faBook}
            size="1x"
            className="cursor-pointer"
          />
        </li>
      </ul>
      <div className="flex justify-end">
        <button className="bg-gray-800 text-white text-xs rounded-md  px-2 py-1">
          Edit
        </button>
      </div>
    </div>
  );
}
