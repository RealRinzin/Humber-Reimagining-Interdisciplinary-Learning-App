import { clientPost } from "@/hooks/client/useClient";
import { useRouter } from "next/navigation";

import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
function Navigation() {
  const router = useRouter();
  // Logout Function to clear the session and redirect it to the login page
  async function logOut(): Promise<void> {
    const res = await clientPost("/logout", {});
    router.push("/");
  }
  return (
    <header className="flex flex-col md:flex-row justify-between place-items-center py-3 gap-2 md:py-6 md:px-20 text-white">
      <h2 className="text-xl">
        <Link href="/">
          SPA
          <Image
            src="/img/icons/SpaceLogo.png"
            height={20}
            width={20}
            alt="User Icon"
            className="inline"
          />
          CES PROJECT - Admin Dashboard
        </Link>
      </h2>

      <nav className="flex flex-col md:flex-row  place-items-center justify-end gap-5">
        {/* <div id="hb_search" className="rounded-xl relative"> */}
          {/* <input
            type="text"
            className="py-1 px-5 rounded-xl focus:outline-none"
            placeholder="Search..."
          /> */}
          {/* <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="1x"
            className="absolute top-2 right-2 cursor-pointer"
          /> */}
        {/* </div> */}
        <ul className="flex gap-5 justify-evenly">
          <li><Link href="/dashboard/topics">Topics</Link></li>
          <li><Link href="/dashboard/users">Users</Link></li>
          <li><Link href="/dashboard/videos">Videos</Link></li>
          <li><Link href="/dashboard/quizzes">Quizzes</Link></li>
          <li><Link href="/dashboard/codes">Codes</Link></li>
          <li><Link href="/dashboard/interactives">Interactives</Link></li>
          <li><Link href="/dashboard/projects">Projects</Link></li>
          <li><Link href="/dashboard/media">Medias</Link></li>
          <li>
            <Link href="/">
              <Image
                src="/img/icons/AccountIcon.png"
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
  );
}

export default Navigation;
