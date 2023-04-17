import { useRouter } from "next/router";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;
export default function Navbar() {
  const router = useRouter();
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobile = useCallback(() => {
    setShowMenuMobile((showMenuMobile) => !showMenuMobile);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="w-full z-50 fixed">
      <div
        className={`
        ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
        px-4 md:px-6 py-6 flex flex-row items-center 
      transition duration-300
      `}
      >
        <img
          className="h-4 lg:h-7 cursor-pointer"
          src="./images/logo.png"
          alt="logo"
          onClick={() => router.push("/")}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
        </div>
        <div
          onClick={toggleMobile}
          className="flex flex-row items-center gap-2 ml-8 lg:hidden cursor-pointer relative"
        >
          <p className="text-white text-sm">Browser</p>
          <BsChevronDown
            className={`w-4 text-white fill-white transition ${
              showMenuMobile ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMenuMobile} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-6" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative text-white"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
