import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import File from "../../form/file/VideoType";

export default function VideoCard() {
  return (
    <div className="border-b-2 border-gray-200 my-6 py-2">
      <p className="flex text-gray-700 gap-2 font-extrabold">
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="cursor-pointer text-2xl text-gray-500"
        />{" "}
        Videos
      </p>
      <div className="flex justify-center">
        <File />
      </div>
    </div>
  );
}
