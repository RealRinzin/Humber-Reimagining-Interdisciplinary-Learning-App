"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { clientPost } from "@/lib/clientFetch";
import { useState } from "react";
import Link from "next/link";
export default function DesktopNavigation() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search?q=${search}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${search}`);
    }
  };

  async function logOut(): Promise<void> {
    const res = await clientPost("/logout", {});
    router.push("/");
  }
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between place-items-center py-3 gap-2 md:py-6 md:px-20 text-white">
        <h2 className="text-xl">
          <Link href="/">
          SPA
          <Image
            src="/img/SpaceLogo.png"
            height={20}
            width={20}
            alt="User Icon"
            className="inline"
          />
          CES PROJECT
          </Link>
        </h2>
        <nav className="flex flex-col md:flex-row  place-items-center justify-end gap-5">
          <div id="hb_search" className="rounded-xl relative">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-1 px-5 rounded-xl focus:outline-none"
              placeholder="Search..."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <ul className="flex gap-5 justify-evenly">
            <li>
              <Link href="/team">
                <Image
                  src="/img/InformationIcon.png"
                  height={25}
                  width={25}
                  alt="Home Icon"
                />
              </Link>
            </li>
            <li>
              <Link href="/profile/knowledge_map">
                <Image
                  src="/img/HomeIcon.png"
                  height={25}
                  width={25}
                  alt="Home Icon"
                />
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <Image
                  src="/img/AccountIcon.png"
                  height={25}
                  width={25}
                  alt="User Icon"
                />
              </Link>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="1x"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
                className="cursor-pointer"
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
