'use client';
import { useRouter } from "next/navigation";

export default function NavbarReserve() {

const router = useRouter(); 
  return (
    <nav className="bg-white shadow-md text-white p-4 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-8 mt-4 px-15">
        {/* Left Section: Judul */}
        <h1 className="text-4xl font-semibold text-[#775142]">Reservation</h1>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <button
          onClick={() => router.push("/myreservation")}  
          className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition">
            My Reservation
          </button>
          <button
          onClick={() => router.push("/home")}  
          className="p-2 px-8 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition">
            Back
          </button>
        </div>
      </div>

    </nav>
  );    
}
