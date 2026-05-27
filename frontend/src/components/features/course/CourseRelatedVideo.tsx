"use client";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function CourseRelatedVideo({ subVideos }: any) {
  const [drop, setDrop] = useState(false);
  return (
    <section className="my-5">
      <div className="flex justify-between bg-slate-100 p-3 rounded-md">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-600">
          <Image
            src={`/img/VideoIcon.png`}
            height={20}
            width={20}
            alt="Home Icon"
            className="h-5 w-5"
          />
          Related Videos
          <FontAwesomeIcon
            icon={drop ? faAngleUp : faAngleDown}
            size="1x"
            onClick={() => {
              setDrop((prev) => !prev);
            }}
            className="cursor-pointer text-gray-600 px-2"
          />
        </h2>
      </div>
      {
        drop && (
          <div className="px-6 py-2">
            <ul className="flex flex-col md:flex-row  flex-wrap gap-4 py-2 font-bold">
              {
                subVideos.map((video:any,index:number)=>{
                  return(
                    <li key={index} className="bg-slate-200 rounded-md py-2 md:w-1/6 px-3 hover:text-pink-600">
                      <a href={`/video/${video.slug}`}>
                      {video.title} 

                      </a>
                      </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
      
    </section>
  );
}
