'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavbarReserve() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sm:p-6 sticky top-0 z-50 min-h-[64px] sm:min-h-[72px]">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Left Section: Judul */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#775142]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Reservation
        </h1>

        {/* Right Section: Hamburger Menu (Mobile) / Buttons (Desktop) */}
        <div className="relative">
          {/* Hamburger Icon for Mobile */}
          <button
            className="sm:hidden text-[#775142] text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Buttons for Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={() => router.push("/myreservation")}
              className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
            >
              My Reservation
            </button>
            <button
              onClick={() => router.push("/home")}
              className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
            >
              Back
            </button>
          </div>

          {/* Dropdown Menu for Mobile */}
          {isMenuOpen && (
            <div className="sm:hidden absolute right-0 mt-2 w-48 bg-white border border-[#775142] rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  router.push("/myreservation");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left p-2 px-4 text-[#775142] hover:bg-[#775142] hover:text-white transition text-sm sm:text-base"
              >
                My Reservation
              </button>
              <button
                onClick={() => {
                  router.push("/home");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left p-2 px-4 text-[#775142] hover:bg-[#775142] hover:text-white transition text-sm sm:text-base"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}