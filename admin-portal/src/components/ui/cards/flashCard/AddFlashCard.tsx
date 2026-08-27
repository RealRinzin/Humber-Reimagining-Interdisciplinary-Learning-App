import { useToggle } from "@/hooks/common/useToggle";

export default function AddFlashCard() {
  const { isOn: isOpen, toggle } = useToggle(false);
  return (
    <div className="">
      <button
        className="bg-gray-200 py-2 px-4 rounded-md text-gray-600 font-bold"
        onClick={toggle}
      >
        Add Flashcard
      </button>
      {isOpen && (
        <div className="bg-gray-900/40 fixed left-0 top-0 h-screen w-screen  flex p-4 z-50">
          <div className="bg-white mx-auto my-auto w-full  md:w-1/2 relative p-10 rounded-lg ">
            <button
              onClick={toggle}
              className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 rounded-full text-white cursor-pointer"
            >
              ×
            </button>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>⭐ Item {index + 1}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
