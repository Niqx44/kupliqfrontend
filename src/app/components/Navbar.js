"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex justify-between items-center py-4 px-4 sm:px-8 md:px-16 lg:px-32">
        <Link
          href="/"
          className="text-2xl sm:text-3xl md:text-4xl text-white font-medium"
          style={{ fontFamily: "Cormorant Infant, serif" }}
        >
          Kupliq Cafe
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden sm:flex sm:space-x-8 md:space-x-14 text-white text-sm sm:text-base" style={{ fontFamily: "Fairplay Display" }}>
          <ul className="flex space-x-6 md:space-x-14">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-gray-300 transition-colors duration-300">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-gray-300 transition-colors duration-300">
                Reservation
              </Link>
            </li>
          </ul>
          <ul className="flex space-x-6 md:space-x-14">
            <li>
              <Link href="/signin" className="hover:text-gray-300 transition-colors duration-300">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-gray-300 transition-colors duration-300">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black/80 backdrop-blur-md text-white px-4 py-6 flex flex-col space-y-4" style={{ fontFamily: "Fairplay Display" }}>
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/signin"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Menu
          </Link>
          <Link
            href="/signin"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Reservation
          </Link>
          <Link
            href="/signin"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;