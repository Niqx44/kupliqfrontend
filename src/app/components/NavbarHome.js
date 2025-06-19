"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (typeof window !== "undefined") {
        const userId = localStorage.getItem("user_id");

        if (userId) {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/costumer/${userId}`);
            if (!res.ok) throw new Error("Gagal mengambil data customer");

            const data = await res.json();
            setCustomerName(data.nama_costumer || "");
            setProfileImage(data.foto_profile || "");
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
        }
      }
    };

    fetchCustomerData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_role");
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 md:px-16 lg:px-32">
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

        {/* Desktop Navigation and User Section */}
        <div className="hidden sm:flex items-center space-x-8 md:space-x-14">
          <ul className="flex space-x-6 md:space-x-14 text-white text-sm sm:text-base" style={{ fontFamily: "Fairplay Display" }}>
            <li>
              <Link href="/home" className="hover:text-gray-300 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-gray-300 transition-colors duration-300">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-gray-300 transition-colors duration-300">
                Reservation
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/profile" className="flex items-center space-x-2 md:space-x-4 group">
              <span
                className="text-white group-hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base"
                style={{ fontFamily: "Fairplay Display" }}
              >
                {customerName || "Loading..."}
              </span>
              <img
                src={profileImage || "/images/default-profile.png"}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-white group-hover:border-gray-300 transition-all duration-300"
              />
            </Link>

            <button
              onClick={handleSignOut}
              className="text-white hover:text-red-400 transition duration-300 text-sm sm:text-base font-medium"
              style={{ fontFamily: "Fairplay Display" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black/80 backdrop-blur-md text-white px-4 py-6 flex flex-col space-y-4" style={{ fontFamily: "Fairplay Display" }}>
          <Link
            href="/home"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Menu
          </Link>
          <Link
            href="/reservation"
            className="hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            Reservation
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 text-base"
            onClick={toggleMenu}
          >
            <span>{customerName || "Profile"}</span>
            <img
              src={profileImage || "/images/default-profile.png"}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover border border-white"
            />
          </Link>
          <button
            onClick={() => {
              handleSignOut();
              toggleMenu();
            }}
            className="text-left text-red-400 hover:text-red-500 transition duration-300 text-base font-medium"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarHome;