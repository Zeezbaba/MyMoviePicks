import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import SearchModal from "./SearchModal";
import { BiSearch } from "react-icons/bi";
import { useMyContext } from "@/context";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { isAuthorized } = useMyContext();
  return (
    <header
      className={`bg-[#171717] text-white py-5 px-5 flex justify-between md:justify-center fixed inset-x-0 top-0 z-10`}
    >
      <h2 className="md:hidden">MyMoviePick</h2>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-5">
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/`}>Home</Link>
          </li>

          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/trending`}>Trending</Link>
          </li>
          
          <li
            className="cursor-pointer hover:opacity-90 hidden md:block"
            onClick={() => setIsSearchOpen(true)}
          >
            <div className="cursor-pointer">
              <span className="bg-white flex gap-5 items-center justify-between rounded-full px-5 py-2 text-gray-500">
                Search movies....
                <RiSearchLine color="black" className="cursor-pointer" />
              </span>
            </div>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/favorite`}>Favorite</Link>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/genre`}>Genre</Link>
          </li>
          {!isAuthorized && (
            <>
              {" "}
              <li className="cursor-pointer hover:opacity-90">
                <Link href={`/auth/signup`}>Signup</Link>
              </li>
              <li className="cursor-pointer hover:opacity-90">
                <Link href={`/auth/login`}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex gap-2 md:hidden">
        <BiSearch size={30} onClick={() => setIsSearchOpen(true)} />
        <MdOutlineMenu
          color="white"
          size={30}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {isOpen && (
        <div className="fixed right-0 w-1/2 bottom-0 top-16 transition-all duration-500 ease-in-out   bg-[#171717] flex  justify-center p-5">
          <nav className="block md:hidden">
            <ul className="flex flex-col items-center gap-5">
              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/`}>Home</Link>
              </li>

              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/trending`}>Trending</Link>
              </li>
              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/favorite`}>Favorite</Link>
              </li>
              <li className="cursor-pointer hover:opacity-90 hidden md:block">
                <div className="cursor-pointer">
                  <span className="bg-white flex items-center justify-between rounded-full px-5">
                    Search movies....
                    {/* <input
                      name="search"
                      placeholder="Search movies...."
                      className="outline-none py-2  text-black"
                    /> */}
                    <RiSearchLine color="black" className="cursor-pointer" />
                  </span>
                </div>
              </li>
              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/genre`}>Genre</Link>
              </li>
              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/auth/signup`}>Signup</Link>
              </li>
              <li
                className="cursor-pointer hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/auth/login`}>Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      {isSearchOpen && <SearchModal action={() => setIsSearchOpen(false)} />}
    </header>
  );
};

export default Header;
