import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-[#171717] text-white py-5 px-5 flex justify-between md:justify-center ">
      <h2 className="md:hidden">MyMoviePick</h2>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center gap-5">
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/`}>Home</Link>
          </li>

          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/trending`}>Trending</Link>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/favorite`}>Favorite</Link>
          </li>
          <li className="cursor-pointer hover:opacity-90 hidden md:block">
            <form>
              <span className="bg-white flex items-center justify-between rounded-full px-5">
                <input
                  name="search"
                  placeholder="Search movies...."
                  className="outline-none py-2  text-black"
                />
                <RiSearchLine color="black" className="cursor-pointer" />
              </span>
            </form>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/genre`}>Genre</Link>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/auth/signup`}>Signup</Link>
          </li>
          <li className="cursor-pointer hover:opacity-90">
            <Link href={`/auth/login`}>Login</Link>
          </li>
        </ul>
      </nav>
      <MdOutlineMenu color="white" size={30} className="md:hidden items-end" />
    </header>
  );
};

export default Header;
