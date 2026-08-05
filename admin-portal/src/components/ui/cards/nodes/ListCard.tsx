"use client";
import Ring from "../../ring/Ring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCirclePlay,
  faCircleQuestion,
  faCode,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function ListCard({ topics, node_color }: any) {
  const updateStudentVisibility = (id:number) =>{
    console.log(id)
  }
  return (
    <div className="my-4">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <Ring color={node_color} />
        <h1 className="text-gray-700 font-bold text-lg">{topics.title}</h1>
        <div className="flex gap-1 items-center w-fit border border-gray-200 rounded-lg py-1 px-2">
          <p className="text-gray-500">
            {topics?.student_visible ? (
              <FontAwesomeIcon
                icon={faEye}
                size="1x"
                className="cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                size="1x"
                className="cursor-pointer"
              />
            )}
          </p>
          <form action=""></form>
          <p className="text-gray-500 text-xs">
            {/* <select className="outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer"> */}
            <select className="outline-none focus:ring-0 cursor-pointer" onChange={(e) => updateStudentVisibility(Number(e.target.value))}>
              {topics.student_visible ? (
                <>
                  <option value="1">Visible to Students </option>
                  <option value="0"> Hidden From Students</option>
                </>
              ) : (
                <>
                  <option value="0"> Hidden From Students</option>
                  <option value="1">Visible to Students </option>
                </>
              )}
            </select>
          </p>
        </div>
      </div>
      <div className="py-2">
        <p className="text-gray-800 text-md font-medium">
          {topics.description}
        </p>
        <ul className="flex gap-2 my-4 text-slate-400">
          {topics?.video && (
            <li>
              <FontAwesomeIcon
                icon={faCirclePlay}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}

          {topics?.quiz && (
            <li>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}

          {topics?.code && (
            <li>
              <FontAwesomeIcon
                icon={faCode}
                size="1x"
                className="cursor-pointer bg-slate-400 text-white rounded-sm"
              />
            </li>
          )}
          {topics?.rambling && (
            <li>
              <FontAwesomeIcon
                icon={faBook}
                size="1x"
                className="cursor-pointer"
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
