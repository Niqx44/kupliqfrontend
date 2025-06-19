"use client";

import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function NavbarMenu({ onCategoryChange, onSearch }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md text-white p-4 sm:p-6 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Left Section: Judul */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#775142]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Menu
        </h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-[#775142] text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop: SearchBar and Buttons */}
        <div className="hidden sm:flex flex-1 items-center space-x-4 md:space-x-6">
          <div className="flex-1 mx-2 sm:mx-4">
            <SearchBar onSearch={onSearch} />
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => router.push("/cart")}
              className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
            >
              Cart
            </button>
            <button
              onClick={() => router.push("/order")}
              className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
            >
              Pesanan Saya
            </button>
            <button
              onClick={() => router.push("/home")}
              className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Category Buttons */}
      <div className="hidden sm:flex justify-start max-w-screen-xl mx-auto mt-4 sm:mt-6 space-x-4 sm:space-x-6 text-sm sm:text-base font-medium px-4 sm:px-6 md:px-8">
        <button
          onClick={() => handleCategoryClick("All")}
          className="text-[#775142] hover:text-[#4d342a] transition"
        >
          All Product
        </button>
        <button
          onClick={() => handleCategoryClick("Makanan")}
          className="text-[#775142] hover:text-[#4d342a] transition"
        >
          Food
        </button>
        <button
          onClick={() => handleCategoryClick("Minuman")}
          className="text-[#775142] hover:text-[#4d342a] transition"
        >
          Beverages
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md text-[#775142] px-4 py-6 flex flex-col space-y-4 max-w-screen-xl mx-auto">
          <div className="mx-2">
            <SearchBar onSearch={onSearch} />
          </div>
          <button
            onClick={() => handleCategoryClick("All")}
            className="text-[#775142] hover:text-[#4d342a] transition text-base text-left"
          >
            All Product
          </button>
          <button
            onClick={() => handleCategoryClick("Makanan")}
            className="text-[#775142] hover:text-[#4d342a] transition text-base text-left"
          >
            Food
          </button>
          <button
            onClick={() => handleCategoryClick("Minuman")}
            className="text-[#775142] hover:text-[#4d342a] transition text-base text-left"
          >
            Beverages
        </button>
        <button
          onClick={() => {
            router.push("/cart");
            toggleMenu();
          }}
          className="p-2 px-4 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-base text-center"
        >
          Cart
        </button>
        <button
          onClick={() => {
            router.push("/order");
            toggleMenu();
          }}
          className="p-2 px-4 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-base text-center"
        >
          Pesanan Saya
        </button>
        <button
          onClick={() => {
            router.push("/home");
            toggleMenu();
          }}
          className="p-2 px-4 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-base text-center"
        >
          Back
        </button>
      </div>
    )}
  </nav>
);
}