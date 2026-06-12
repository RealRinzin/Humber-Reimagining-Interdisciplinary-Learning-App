"use client";
import ProfileSidebarNode from "@/components/ui/nodeAnimation/ProfileSidebarNode";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ClientPage({ children }: any) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className="px-1 md:px-20 py-5">
      <div className="grid grid-cols-6 gap-8">
        <div className={` relative col-span-6 ${open ? "md:col-span-4" : "md:col-span-6"}`}>
                    <div
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                size="2x"
                className="text-white bg-slate-600 rounded-lg py-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="2x"
                className="text-white bg-slate-600 rounded-lg py-2"
              />
            )}
          </div>
          {children}
        </div>
        {open && (
          <div className={`col-span-6 md:col-span-2 bg-slate-900 rounded-xl`}>
            {mounted && <ProfileSidebarNode />}
          </div>
        )}
      </div>
    </main>
  );
}
