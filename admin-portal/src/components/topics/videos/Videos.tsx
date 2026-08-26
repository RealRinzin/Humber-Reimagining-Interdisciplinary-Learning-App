import {
  faBook,
  faBrain,
  faCirclePlay,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Videos({ videos }: { videos: any }) {
  const deleteVideo = async () => {
    console.log("delete");
  };

  const editVideo = async (id: number) => {
    console.log(id);
  };
  return (
    <div>
      <div className="flex text-gray-700 gap-1 font-extrabold">
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="cursor-pointer text-2xl text-gray-500"
        />
        Videos
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {videos?.map((video: any, index: number) => (
          <div
            className="bg-gray-100 w-full rounded-md  py-14  my-4 relative flex justify-center items-center"
            key={index}
          >
            <Link
              href={`http://localhost:3000/video/${video?.slug}`}
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="cursor-pointer text-3xl text-gray-500 z-10"
              />
            </Link>
            <ul className="absolute -top-1 -right-1 flex gap-1 z-20">
              <li
                className="bg-red-200 rounded-md h-5 w-5 flex items-center justify-center"
                onClick={() => deleteVideo()}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer text-xs text-red-500"
                />
              </li>
              <li
                className="bg-blue-200 rounded-md h-5 w-5 flex items-center justify-center"
                onClick={() => editVideo(video?.id)}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer text-xs text-blue-500"
                />
              </li>
            </ul>

            <div className="absolute bottom-4  left-0 px-4">
              <p className="text-gray-600 font-bold">
                <Link
                  href={`http://localhost:3000/video/${video?.slug}`}
                  target="_blank"
                >
                  {video?.title}
                </Link>
              </p>
              <ul className="flex gap-2 mt-2 text-gray-400 text-sm">
                <li>
                  <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faBook} className="cursor-pointer" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faBrain} className="cursor-pointer" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faInfo} className="cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
