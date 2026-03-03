import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CourseProgressUI() {
    return (
        <div className="bg-blue-900 py-3 px-2 rounded-full text-white">
            <ul className="flex flex-col place-items-center">
                <li className="bg-green-600 rounded-full text-center h-6 w-6 text-white">
                    <FontAwesomeIcon icon={faCheck} size="1x" />
                </li>
                <li className="border border-stone-300 h-28 my-1"></li>
                <li className="bg-white border-4 border-green-600 rounded-full text-center h-6 w-6 text-white">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
                <li className="border border-stone-300 h-28 my-1"></li>
                <li className="bg-white border-4 border-slate-700 rounded-full text-center h-6 w-6 text-white">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
                <li className="border border-stone-300 h-28 my-1"></li>
                <li className="bg-white border-4 border-slate-700 rounded-full text-center h-6 w-6 text-white">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
            </ul>
        </div >
    )
}
