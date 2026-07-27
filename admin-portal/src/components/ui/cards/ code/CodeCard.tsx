import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CodeCard() {
  return (
    <div className="border-b-2 border-gray-200 my-6 py-2">
      <p className="flex text-gray-700 gap-2 font-extrabold">
        <FontAwesomeIcon
          icon={faCode}
          className="cursor-pointer text-2xl text-gray-100 bg-gray-500 rounded-md"
        />{" "}
        Code
      </p>
      <div className="p-4">
        <textarea
          name=""
          id=""
          className="bg-gray-100 rounded-md p-8 w-full"
          placeholder="Paste code or Write code here"
        />
      </div>
    </div>
  );
}
