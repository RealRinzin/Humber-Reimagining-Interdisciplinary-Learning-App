export default function FlipCard() {
  return (
    <div className="w-60 h-50 cursor-pointer group bg-slate-300 rounded-2xl">
      <div
        className="relative w-full h-full transition-transform duration-500
                  [transform-style:preserve-3d]
                  group-hover:[transform:rotateY(180deg)]"
      >
        <div
          className="absolute inset-0 rounded-xl 
                    [backface-visibility:hidden] 
                    flex flex-col items-center justify-center gap-2 p-6"
        >
          <p className="m-0 py-1 ">Easy Mode </p>

          <p className="py-2 border-y border-gray-400">If you could only eat one cuisine for the rest of your life, what would it be?</p>
          <p className="m-0 p-0">Click to Flip!</p>
        </div>

        <div
          className="absolute inset-0 
                    [backface-visibility:hidden] bg-slate-900 text-white rounded-2xl
                    [transform:rotateY(180deg)]
                    flex flex-col items-center justify-center gap-2 p-6"
        >
          <p className="m-0 p-0">Easy Mode </p>

          <p className="py-2 border-y border-gray-200">Is a hotdog a sandwich? Defend your answer.</p>
          <p className="m-0 py-1">Click to Flip!</p>
        </div>
      </div>
    </div>
  );
}
