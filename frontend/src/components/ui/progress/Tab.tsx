// We are using this Tab progress bar
// for the Profile Individual Topic Progress status
// - - - - - -

import { CapsuleTypes } from "@/types/progress/capsule.types";

//  Types - name, completed number, remining number
export default function TabProgressBar({
  name,
  completed,
  incomplete,
}: CapsuleTypes) {
  return (
    <>
      <div className="flex w-auto flex-col gap-y-2">
        <p className="text-gray-800 text-sm font-bold pt-2">{name}</p>
        <ul className="flex gap-1 items-center-safe">
          {Array.from({ length: completed }).map((_, index) => (
            <li className={`first:rounded-l-md  bg-gray-800 w-6 h-4`} key={index}> </li>
            // <li className={`${index === 0 || completed ===0 ? "rounded-l-md w-8":"w-8"} bg-gray-800 h-4`} key={index}></li>
          ))}
          {Array.from({ length: incomplete }).map((_, index) => (
            <li className={`first:rounded-l-md last:rounded-r-md bg-gray-400 w-6 h-4`} key={index}> </li>
          ))}
        </ul>
        <p className="text-right text-gray-500 text-sm font-black">{`${completed}/ ${completed + incomplete}`}</p>
      </div>
    </>
  );
}
