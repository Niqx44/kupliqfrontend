'use client';
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function NavbarMenuAdmin({ onCategoryChange, onSearch }) {
  const router = useRouter(); 

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <nav className="bg-white shadow-md text-white p-4 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-8 mt-4 px-15">
        {/* Left Section: Judul */}
        <h1 className="text-4xl font-semibold text-[#775142]">Menu</h1>

        {/* Middle Section: SearchBar */}
        <div className="flex-1 mx-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right Section: Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/editmenu")}  
            className="p-2 px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition"
          >
            Edit Menu
          </button>
          <button
            onClick={() => router.push("/reservasiadmin")}  
            className="p-2 px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition"
          >
            Reservasi
          </button> 
          <button
            onClick={() => router.push("/pesananadmin")}  
            className="p-2 px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition"
          >
            Pesanan
          </button>
          <button
            onClick={() => router.push("/signin")} 
            className="p-2 px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex justify-start mt-8 space-x-6 text-sm font-medium px-15">
        <button onClick={() => handleCategoryClick("All")} className="text-[#775142] hover:text-[#4d342a] transition">All Product</button>
        <button onClick={() => handleCategoryClick("Makanan")} className="text-[#775142] hover:text-[#4d342a] transition">Food</button>
        <button onClick={() => handleCategoryClick("Minuman")} className="text-[#775142] hover:text-[#4d342a] transition">Beverages</button>
      </div>
    </nav>
  );    
}
