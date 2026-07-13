import { faMagnifyingGlass, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
function Navigation() {
  return (
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
            className="py-1 px-5 rounded-xl focus:outline-none"
            placeholder="Search..."
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="1x"
            className="absolute top-2 right-2 cursor-pointer"
          />
        </div>
        <ul className="flex gap-5 justify-evenly">
          <li>
            <Link href="/team">
              <Image
                src="/img/icons/InformationIcon.png"
                height={25}
                width={25}
                alt="Home Icon"
              />
            </Link>
          </li>
          <li>
            <Link href="/profile/icons/knowledge_map">
              <Image
                src="/img/icons/HomeIcon.png"
                height={25}
                width={25}
                alt="Home Icon"
              />
            </Link>
          </li>
          <li>
            <Link href="/profile">
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
