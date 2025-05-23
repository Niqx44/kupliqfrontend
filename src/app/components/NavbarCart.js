'use client';
import { useRouter } from "next/navigation";

export default function NavbarCart() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md text-white py-4 pb-7">
      <div className="flex flex-wrap items-center justify-between gap-8 mt-4 px-15">
        {/* Left Section: Judul */}
        <h1 className="text-4xl font-semibold text-[#775142]">Cart</h1>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push("/menu")}
            className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition"
          >
            Back
          </button>
        </div>
      </div>
    </nav>
  );    
}
