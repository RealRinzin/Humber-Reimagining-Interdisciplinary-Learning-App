"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
export default function DesktopNavigation() {
  const router = useRouter();
  async function logOut(): Promise<void> {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": token ? decodeURIComponent(token) : "",
      },
    });

    router.push("/");
  }
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between place-items-center px-20 md:py-6 md:px-20 text-white">
        <h2 className="text-xl">
          SPA<Image src="/img/SpaceLogo.png" height={20} width={20} alt="User Icon" className="inline"/>CES  PROJECT
        </h2>
        <nav className="flex flex-col md:flex-row  place-items-center justify-end gap-5">
          <div id="hb_search" className="rounded-xl relative">
            <input
              type="text"
              className="py-1 px-5 rounded-xl focus:outline-none"
              placeholder="Search..."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              className="absolute top-2 right-2"
            />
          </div>
          <ul className="flex gap-5 justify-evenly">
            <li>
              <a href="/team">
                <Image src="/img/InformationIcon.png" height={25} width={25} alt="Home Icon"/>
              </a>
            </li>
            <li>
              <a href="/profile/knowledge_map">
                <Image src="/img/HomeIcon.png" height={25} width={25} alt="Home Icon"/>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                // onClick={(e) => {
                //   e.preventDefault();
                //   logOut();
                // }}
              >
                <Image src="/img/AccountIcon.png" height={25} width={25} alt="User Icon"/>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
