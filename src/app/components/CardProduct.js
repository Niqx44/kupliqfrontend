"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CardProduct = ({ selectedCategory, searchQuery }) => {
  const [menus, setMenus] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`);
        setMenus(response.data);
      } catch (error) {
        console.error("Gagal fetch menu:", error);
      }
    };

    fetchMenus();
  }, []);

  const handleAddToCart = (menu) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = existingCart.findIndex((item) => item.id === menu.id_menu);
    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: menu.id_menu,
        name: menu.nama_menu,
        price: menu.harga_menu,
        quantity: 1,
        image: "/images/—Pngtree—coffee cup ceramic coffee transparent_9057114.png",
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setNotification(`${menu.nama_menu} ditambahkan ke keranjang!`);

    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredMenus = menus.filter((menu) => {
    const matchCategory = selectedCategory === "All" || menu.kategori === selectedCategory;
    const matchSearch = menu.nama_menu.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="relative flex justify-center items-start mt-4 sm:mt-6 md:mt-8 py-6 sm:py-8">
      {/* Notifikasi Custom */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-[#775142] text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id_menu}
            className="w-full max-w-[280px] p-4 border rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F4F4] flex flex-col mx-auto"
          >
            <div className="flex justify-center items-center">
              <img
                src={menu.foto_menu || "/images/kupliq2.png"}
                alt={menu.nama_menu}
                className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] mt-2 sm:mt-3 object-cover"
              />
            </div>
            <div className="mt-1 sm:mt-2 pl-2 sm:pl-4 flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#775142] mb-2 sm:mb-3">
                {menu.nama_menu}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg font-normal text-[#775142]">
                  Rp {menu.harga_menu.toLocaleString("id-ID")}
                </p>
                <img
                  src="/buy.svg"
                  alt="Add to Cart"
                  className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
                  onClick={() => handleAddToCart(menu)}
                />
              </div>
            </div>
          </div>
        ))}
        {filteredMenus.length === 0 && (
          <p className="text-[#775142] text-base sm:text-lg md:text-xl col-span-full text-center">
            Tidak ada menu ditemukan.
          </p>
        )}
      </div>

      {/* CSS untuk animasi notifikasi */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CardProduct;