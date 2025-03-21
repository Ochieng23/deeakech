"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-sky-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          <Link href="/">
            <strong>Diana Akech</strong>
          </Link>
        </div>

        {/* Hamburger Menu Icon (always visible) */}
        <div>
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <FaTimes className="text-black text-2xl" />
            ) : (
              <FaBars className="text-black text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Revealed Menu (small section at the top) */}
      {isOpen && (
        <div className="bg-black text-white w-full">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-8 text-lg sm:text-xl">
            <Link
              href="/"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/videos"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Videos
            </Link>
            <Link
              href="/collabs"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Collabs
            </Link>
            <Link
              href="/portfolio"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              About
            </Link>
            <Link
              href="/insta"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Insta
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;