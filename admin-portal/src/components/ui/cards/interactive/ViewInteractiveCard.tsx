import { useToggle } from "@/hooks/common/useToggle";
import { InteractiveDType } from "@/types/interactive.type";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import path from "path";

export default function ViewInteractiveCard({
  interactive,
}: {
  interactive: InteractiveDType;
}) {
  const { isOn: isOpen, toggle } = useToggle(false);

  return (
    <>
      <button className="bg-gray-400 px-2 text-xs py-1 w-fit rounded-md text-white">
        View{" "}
        <FontAwesomeIcon
          icon={faEye}
          className="cursor-pointer text-white"
          onClick={toggle}
        />
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-10">
          <div className="bg-white mx-auto my-auto w-full  max-h-full relative p-10 rounded-lg ">
            <button
              onClick={() => {
                toggle();
              }}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            <div className="w-full">
              <iframe src={interactive?.path} title={interactive?.description} className="w-full h-96"></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
