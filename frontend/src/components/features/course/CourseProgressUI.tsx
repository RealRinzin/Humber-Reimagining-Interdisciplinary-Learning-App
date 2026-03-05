import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 
export default function CourseProgressUI() {
    return (
        <div className="bg-blue-900 py-3 px-2 rounded-full text-white primary-color">
            <ul className="flex flex-row md:flex-col items-center justify-evenly">
                <li className="flex flex-col justify-center items-center bg-green-600 rounded-full text-center h-6 w-6 text-white">
                    <FontAwesomeIcon icon={faCheck} size="1x" />
                </li>
                <li className="border border-green-600 h-0 w-24 md:h-28 md:w-0 my-1"></li>

                <li className="bg-white border-4 border-green-600 rounded-full text-center h-6 w-6 text-white">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
                <li className="border border-stone-300 h-0 w-24 md:h-28 md:w-0 my-1"></li>
                <li className="bg-white border-4 border-slate-700 rounded-full text-center h-6 w-6 text-white hover:border-green-600 hover:cursor-pointer transition duration-300 ease-in-out hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
                <li className="border border-stone-300 h-0 w-24 md:h-28 md:w-0 my-1"></li>

                <li className="bg-white border-4 border-slate-700 rounded-full text-center h-6 w-6 text-white hover:border-green-600 hover:cursor-pointer transition duration-300 ease-in-out hover:shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]">
                    {/* <FontAwesomeIcon icon={faCheck} size="1x" className="text-slate-500" /> */}
                </li>
            </ul>
        </div >
    )
}
