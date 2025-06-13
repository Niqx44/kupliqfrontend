"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="px-32 mx-auto flex justify-between items-center py-7 transition-all duration-500">
        <Link
          href="/"
          className="text-4xl text-white font-medium"
          style={{ fontFamily: "Cormorant Infant, serif" }}
        >
          Kupliq Cafe
        </Link>
        <ul className="flex space-x-14 text-white" style={{ fontFamily: "Fairplay Display" }}>
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
        <ul className="flex space-x-14 text-white">
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
    </nav>
  );
};

export default Navbar;
