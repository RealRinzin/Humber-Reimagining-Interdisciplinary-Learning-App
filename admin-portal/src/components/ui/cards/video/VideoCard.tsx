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
export default function VideoCard({ id,title,slug }: { id: number,title:string,slug:string }) {
  const deleteVideo = async () => {
    if (window.confirm("Are you sure?")) {
      console.log("delete");
    }
  };
  return (
    <div className="my-4">
      <div className="flex">
          <div
            className="border border-gray-200/80 bg-gray-200 relative px-14 py-10"
          >
            <Link
              href={`http://localhost:3000/video/${slug}`}
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
              <li className="bg-blue-200 rounded-lg h-5 w-5 flex items-center justify-center">
                <Link href={`/dashboard/videos/${id}`}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="cursor-pointer text-xs text-blue-500"
                  />
                </Link>
              </li>
            </ul>
            <div className="absolute bottom-2 left-0 px-4">
              <p className="text-gray-600 font-bold">
                <Link
                  href={`http://localhost:3000/video/${slug}`}
                  target="_blank"
                >
                  {title}
                </Link>
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}
