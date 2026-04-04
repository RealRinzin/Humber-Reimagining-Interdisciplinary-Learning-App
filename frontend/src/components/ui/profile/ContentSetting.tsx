import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faGear } from "@fortawesome/free-solid-svg-icons";

export default function ContentSetting() {
  return (
    <>
      <div className="bg-gray-200 rounded-lg p-6">
        <h5 className="font-bold text-gray-700"><FontAwesomeIcon icon={faGear}/> Content Setting <FontAwesomeIcon icon={faCaretDown}/></h5>
        <p className="text-sm py-4">
          Select the content you want to focus on. Your Choics will be
          prioritized, and you'll be able to track progress as you complete
          them.
        </p>
        <div className="flex gap-10 justify-start text-gray-600">
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Videos</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Interactive Demos</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Codes</span>
              </label>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Quizes</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Written Explanation</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Surveys</span>
              </label>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Ramblings</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Audio Bites</span>
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" className="accent-blue-500 w-4 h-4 text-blue-600 cursor-pointer"/>
                <span className="px-2">Resources</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
