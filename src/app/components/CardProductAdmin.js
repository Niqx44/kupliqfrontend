'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

const CardProductAdmin = ({ selectedCategory, searchQuery }) => {
  const [menus, setMenus] = useState([]);

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

  // Filtering berdasarkan kategori dan pencarian
  const filteredMenus = menus.filter((menu) => {
    const matchCategory =
      selectedCategory === "All" || menu.kategori === selectedCategory;

    const matchSearch =
      menu.nama_menu
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8 max-w-screen-xl mx-auto">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id_menu}
            className="w-full max-w-xs h-[360px] p-4 border rounded-xl shadow-md hover:shadow-lg transition bg-[#F4F4F4] flex flex-col justify-between"
          >
            <div className="flex justify-center items-center">
              <img
                src="/images/—Pngtree—coffee cup ceramic coffee transparent_9057114.png"
                alt={menu.nama_menu}
                className="w-48 h-48 mt-6"
              />
            </div>
            <div className="mt-2 pl-4">
              <h2 className="text-xl font-semibold text-[#817c7a] mb-6">
                {menu.nama_menu}
              </h2>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <p className="text-lg font-normal text-[#775142]">
                  Rp {menu.harga_menu.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardProductAdmin;
