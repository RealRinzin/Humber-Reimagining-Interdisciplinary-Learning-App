import Ring from "../../ring/Ring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCaretDown,
  faCirclePlay,
  faCircleQuestion,
  faCode,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function ListCard({ color }: any) {
  return (
    <div className="my-4">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <Ring color={color} />
        <h1 className="text-gray-700 font-bold text-lg">Intro To Space</h1>
        <div className="flex gap-2 items-center">
          <p className="text-gray-500">
            <FontAwesomeIcon
              icon={faEye}
              size="1x"
              className="cursor-pointer"
            />
          </p>
          <p className="text-gray-500 text-sm"> Visible to student</p>
          <p className="text-gray-500">
            <FontAwesomeIcon
              icon={faCaretDown}
              size="1x"
              className="cursor-pointer"
            />
          </p>
        </div>
      </div>
      <div className="py-2">
        <p className="text-gray-800 text-md font-medium">
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
      </div>
    </div>
  );
}
