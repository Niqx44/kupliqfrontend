"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Button from "./Button";

const CardGroup = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`);
        const data = response.data;

        // Ambil hanya 4 menu terbaru dari akhir array
        const latestMenus = data.slice(-4).reverse();
        setMenus(latestMenus);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <div className="mx-auto text-center">
        <h3 className="text-[4rem] font-extrabold text-[#603809]" style={{ fontFamily: "Abhaya Libre" }}>
          Enjoy a new blend of coffee style
        </h3>
        <h5 className="text-[1.2rem] font-medium text-[#707070] mt-5">
          Explore all flavours of coffee with us. There is always a new cup worth experiencing
        </h5>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap gap-10 justify-center">
          {menus.map((menu) => (
            <div key={menu.id_menu} className="border-1 border-color rounded-md p-2 max-w-[250px] shadow-lg">
              <Image
                src="/images/img_rectangle_7.png" // Replace with dynamic image path if available
                alt={menu.nama_menu}
                width={250}
                height={250}
                className="rounded-tr-md rounded-tl-md"
              />
              <h4 className="text-2xl text-[#603809] font-bold" style={{ fontFamily: "Fairplay Display" }}>
                {menu.nama_menu}
              </h4>
              <p className="text-black font-normal" style={{ fontFamily: "Fairplay Display" }}>
                {menu.deskripsi || "No description"}
              </p>
              <p className="text-[#603809] font-bold" style={{ fontFamily: "Fairplay Display" }}>
                Rp {menu.harga_menu.toLocaleString("id-ID")}
              </p>
              <Button className="mt-2 mb-3" label="Order Now" navigateTo="/signin" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGroup;
