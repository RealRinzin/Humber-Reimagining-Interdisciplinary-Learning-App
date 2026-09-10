import { faCaretDown, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PathCard({title}:any) {
  return (
    <div className="border-2 bg-gray-200/50 rounded-xl border-gray-300 p-4">
      <h1 className="font-extrabold text-gray-900">{title}</h1>
      <div className="flex items-center gap-2 my-2 text-gray-500 text-sm">
        {/* <FontAwesomeIcon icon={faEye} size="1x" className="cursor-pointer " />
        <p>Visible to students</p> */}
        {/* <p> */}
          {/* <FontAwesomeIcon
            icon={faCaretDown}
            size="1x"
            className="cursor-pointer"
          />
        </p> */}
      </div>
      <p className="text-gray-700 my-2 text-sm font-medium">
        This mode encourages self-directed learning by allowing students to
        explore modules in any order. Choose a starting module while allowing
        students to navigate the rest of the map independently.
      </p>
      <div className="flex justify-end my-2">
        {/* <button className="bg-gray-800 text-white text-xs rounded-md  px-2 py-1">
          Edit
        </button> */}
      </div>
    </div>
  );
}
