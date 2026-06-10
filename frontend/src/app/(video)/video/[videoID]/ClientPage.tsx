"use client";
import CommonSideBarNode from "@/components/ui/nodeAnimation/SuggestPathNode";
import { RefreshContext } from "@/components/ui/video/PageRefresh";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
export default function ClientPage({ children }: any) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <RefreshContext.Provider value={() => setRefreshKey((k) => k + 1)}>
      <main className="px-1 md:px-20 py-5">
        <div className="grid grid-cols-6 gap-8">
          <div
            className={`relative col-span-6 ${open ? "md:col-span-4" : "md:col-span-6"}`}
          >
            <div
              className="absolute top-1/3 -translate-y-1/2 -right-4 z-10 cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="2x"
                  className="text-white bg-slate-400 rounded-lg py-2"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="2x"
                  className="text-white bg-slate-400 rounded-lg py-2"
                />
              )}
            </div>
            {children}
          </div>
          {open && (
            <div className={`col-span-6 md:col-span-2 bg-slate-900 rounded-xl`}>
              {mounted && <CommonSideBarNode  refreshKey={refreshKey}/>}
            </div>
          )}
        </div>
      </main>
    </RefreshContext.Provider>
  );
}
