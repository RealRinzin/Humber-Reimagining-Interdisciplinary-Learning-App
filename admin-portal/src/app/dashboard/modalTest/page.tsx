"use client";
import { useToggle } from "@/hooks/common/useToggle";
export default function ModalTest() {
  const { isOn: isOpen, toggle } = useToggle(false);
  return (
    <div className=" h-screen">
      <button className="cursor-pointer" onClick={toggle}>
        {isOpen ? "Close" : "Open"}
      </button>
      {!isOpen && (
        <div className="bg-gray-900/20 fixed top-0 h-screen w-screen  flex p-4">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            {Array.from({ length: 30 }).map((_, index) => (
              <div key={index}>⭐ Item {index + 1}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
