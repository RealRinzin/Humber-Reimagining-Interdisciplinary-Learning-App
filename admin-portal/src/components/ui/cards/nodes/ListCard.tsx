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
import Link from "next/link";
import StudentVisibility from "../../visibility/StudentVisibility";

export default function ListCard({ topics, node_color }: any) {
  const updateStudentVisibility = (id: number) => {
    console.log(id);
  };
  return (
    <div className="my-4">
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <Ring color={node_color} />
        <h1 className="text-gray-700 font-bold text-lg">
          <Link href={`/dashboard/topics/${topics?.id}`}>{topics.title}</Link>
        </h1>
        <div className="flex gap-1 items-center w-fit border border-gray-200 rounded-lg py-1 px-2">

          <StudentVisibility status={topics?.student_visible} model="topics" id={topics?.id} />

        </div>
      </div>
      <div className="py-2">
        <div
          className="text-gray-800 text-md font-medium"
          dangerouslySetInnerHTML={{ __html: topics?.description }}
        />

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
