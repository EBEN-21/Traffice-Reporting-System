import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const MenuLinks = [
  { id: 1, name: "HOME", link: "/" },
  { id: 2, name: "DRIVERS", link: "/driver-login" },
  { id: 3, name: "OFFICERS", link: "/officer-login" },
  { id: 4, name: "CONTACT", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-5 sm:px-8 md:px-12 py-6 md:py-9 z-20">
      {/* Logo */}
      <div>
        <h1 className="text-[1.8em] sm:text-[2.2em] md:text-[2em] lg:text-[2.2em] font-bold text-white drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]">
          REGULATE
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <ul className="flex items-center gap-8 text-white text-sm md:text-base tracking-widest font-medium">
          {MenuLinks.map((data) => (
            <li key={data.id}>
              <Link
                to={data.link}
                className="hover:text-[#ff4e00] transition duration-200"
              >
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-30">
        <button onClick={toggleMenu} className="text-white text-3xl">
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-0 left-0 w-full bg-black/90 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center py-20 space-y-6 text-white text-lg sm:text-xl font-medium tracking-widest">
          {MenuLinks.map((data) => (
            <Link
              key={data.id}
              to={data.link}
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ff4e00] transition duration-200"
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
