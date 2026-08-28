import { faCopy, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function DisplayCode({ codes }: { codes: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {codes?.map((code: any, index: number) => (
        <div key={index} className="relative">
          <ul className="absolute top-0 right-0 flex gap-1 z-10">
            <li className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer text-xs text-red-500"
              />
            </li>
            <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer text-xs text-blue-500"
              />
            </li>
            <li className="bg-gray-200 rounded-md h-5 w-5 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer text-xs text-gray-500"
              />
            </li>
          </ul>
          <SyntaxHighlighter language="cpp" style={solarizedDarkAtom}  className="text-xs font-thin">
            {code?.code}
          </SyntaxHighlighter>
        </div>
      ))}
    </div>
  );
}
