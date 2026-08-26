import { faCirclePlay, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      {videos?.map((video: any, index: number) => (
        <div
          className="bg-gray-100 w-1/4 rounded-md py-2  relative flex justify-center items-center"
          key={index}
        >
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="cursor-pointer text-2xl text-gray-500"
          />
          <div className="">
            <ul className="absolute -top-1 -right-1 flex gap-1">
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
          </div>
        </div>
      ))}
    </div>
  );
}
