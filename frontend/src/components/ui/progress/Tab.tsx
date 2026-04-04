// We are using this Tab progress bar 
// for the Profile Individual Topic Progress status
 // - - - - - - 
export default function TabProgressBar() {
  return (
    <>
      <div className="flex w-auto flex-col gap-y-2">
        <p className="text-gray-800 text-sm font-bold pt-2">Lectures Watched</p>
        <ul className="flex gap-1 items-center-safe">
          <li className="rounded-l-md w-8 bg-gray-800 h-4"></li>
          <li className="w-8 bg-gray-800 h-4"></li>
          <li className="w-8 bg-gray-800 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="w-8 bg-gray-400 h-4"></li>
          <li className="rounded-r-md w-8 bg-gray-400 h-4"></li>
        </ul>
        <p className="text-right text-gray-500 text-sm font-black">1/12</p>
      </div>
    </>
  );
}
