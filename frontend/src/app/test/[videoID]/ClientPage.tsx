"use client";
import CommonSideBarNode from "@/components/ui/nodeAnimation/CommonSideBarNode";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ClientPage({ children }: any) {
  const [open, setOpen] = useState(false);
  return (
    <main className="px-1 md:px-20 py-5">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="bg-gray-600 rounded-sm cursor-pointer fixed top-1/2 right-0 border-none shadow-none"
      >
        {open ? (
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            className="text-white bg-gray-400 rounded-xs py-2"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            className="text-white bg-gray-400 rounded-xs py-2"
          />
        )}
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className={` ${open ? "col-span-4" : "col-span-6"}`}>
          {children}
        </div>
        {open && (
          <div className={`col-span-2 bg-slate-900 rounded-xl`}>
            <CommonSideBarNode />
          </div>
        )}
      </div>
    </main>
  );
}
