"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

const CardGroup = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`);
        const data = response.data;

        // Ambil 4 menu terbaru
        const latestMenus = data.slice(-4).reverse();
        setMenus(latestMenus);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center">
        <h3
          className="text-3xl md:text-5xl font-extrabold text-[#603809]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Enjoy a new blend of coffee style
        </h3>
        <h5 className="text-base md:text-lg font-medium text-[#707070] mt-5">
          Explore all flavours of coffee with us. There is always a new cup worth experiencing
        </h5>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {menus.map((menu) => (
          <div
            key={menu.id_menu}
            className="w-[250px] bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col items-center"
          >
            <img
              src={
                menu.foto_menu ||
                "/images/—Pngtree—coffee cup ceramic coffee transparent_9057114.png"
              }
              alt={menu.nama_menu}
              className="w-full h-[200px] object-cover rounded-md"
            />
            <h4
              className="text-xl text-[#603809] font-bold mt-4 text-center"
              style={{ fontFamily: "Fairplay Display" }}
            >
              {menu.nama_menu}
            </h4>
            <p
              className="text-sm text-gray-700 text-center mt-1"
              style={{ fontFamily: "Fairplay Display" }}
            >
              {menu.deskripsi || "No description"}
            </p>
            <p
              className="text-[#603809] font-bold mt-2"
              style={{ fontFamily: "Fairplay Display" }}
            >
              Rp {menu.harga_menu.toLocaleString("id-ID")}
            </p>
            <Button className="mt-3" label="Order Now" navigateTo="/signin" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGroup;
