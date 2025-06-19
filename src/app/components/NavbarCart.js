"use client";

import { useRouter } from "next/navigation";

export default function NavbarCart() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md p-4 sm:p-6 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Left Section: Judul */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#775142]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Cart
        </h1>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/menu")}
            className="p-2 px-4 sm:px-6 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center"
          >
            Back
          </button>
        </div>
      </div>
    </nav>
  );
}