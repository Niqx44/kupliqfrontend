"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Tambah state untuk foto profil
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
            setProfileImage(data.foto_profile || ""); // Simpan foto profil
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

        <div className="flex items-center space-x-6">
          <Link href="/profile" className="flex items-center space-x-4 group">
            <span
              className="text-white group-hover:text-gray-300 transition-colors duration-300"
              style={{ fontFamily: "Fairplay Display" }}
            >
              {customerName || "Loading..."}
            </span>
            <img
              src={profileImage || "/images/default-profile.png"} // Fallback ke default
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-white group-hover:border-gray-300 transition-all duration-300"
            />
          </Link>

          <button
            onClick={handleSignOut}
            className="text-white hover:text-red-400 transition duration-300 text-sm font-medium"
            style={{ fontFamily: "Fairplay Display" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
