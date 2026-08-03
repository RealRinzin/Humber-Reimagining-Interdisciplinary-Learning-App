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

export default function ListCard({ topics, node_color }: any) {
  console.log(topics?.video === true);
  return (
    <div className="my-4">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <Ring color={node_color} />
        <h1 className="text-gray-700 font-bold text-lg">{topics.title}</h1>
        <div className="flex gap-2 items-center">
          <p className="text-gray-500">
            <FontAwesomeIcon
              icon={faEye}
              size="1x"
              className="cursor-pointer"
            />
          </p>
          <p className="text-gray-500 text-sm"> Visible to students</p>
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
          {topics.description}
        </p>
        <ul className="flex gap-2 my-4 text-slate-400">
          {topics?.video && (
            <li>
              <FontAwesomeIcon
                icon={faCirclePlay}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}

          {topics?.quiz && (
            <li>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}

          {topics?.code && (
            <li>
              <FontAwesomeIcon
                icon={faCode}
                size="1x"
                className="cursor-pointer bg-slate-400 text-white rounded-sm"
              />
            </li>
          )}
          {topics?.rambling && (
            <li>
              <FontAwesomeIcon
                icon={faBook}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
