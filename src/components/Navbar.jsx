"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust based on Navbar height (h-16 is 64px, plus some buffer)
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false); // Close menu after scrolling
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "videos", label: "Videos" },
    { id: "collabs", label: "Collabs" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    // { id: "insta", label: "Insta" }, // Placeholder, adjust if you have an Instagram section
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-sky-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-black">
          <button onClick={() => scrollToSection("hero")}>
            <strong>Diana Akech</strong>
          </button>
        </div>
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

      {isOpen && (
        <div className="bg-black text-white w-full">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-8 text-lg sm:text-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-gray-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}