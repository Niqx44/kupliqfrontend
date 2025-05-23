"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import NavbarEditMenu from "../components/NavbarEditMenu";

export default function EditMenuClient() {
  const router = useRouter();
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("http://localhost:8080/menu");
        if (!res.ok) throw new Error("Failed to fetch menu data");
        const data = await res.json();

        const menusWithImage = data.map((menu) => ({
          ...menu,
          image: "/images/img_rectangle_9.png",
        }));

        setMenus(menusWithImage);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenus();
  }, []);

  const filteredData = useMemo(() => {
    let data = [...menus];
    if (searchTerm) {
      data = data.filter((item) =>
        [item.nama_menu, item.kategori, item.harga_menu.toString()].some((val) =>
          val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (filterCategory) {
      data = data.filter((item) => item.kategori === filterCategory);
    }

    return data;
  }, [menus, searchTerm, filterCategory]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    for (const id of selectedItems) {
      try {
        const res = await fetch(`http://localhost:8080/menu/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete menu");
      } catch (err) {
        console.error("Error deleting menu:", err);
      }
    }

    setMenus((prev) => prev.filter((item) => !selectedItems.includes(item.id_menu)));
    setSelectedItems([]);
    alert("Menu berhasil dihapus.");
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-white text-black p-6">
      <div className="mb-6">
        <NavbarEditMenu />
      </div>

      <div className="flex flex-wrap gap-6 items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded text-black w-52"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-3 py-2 rounded text-black"
        >
          <option value="">All Categories</option>
          <option value="Minuman">Beverages</option>
          <option value="Makanan">Food</option>
        </select>
        <button
          onClick={() => router.push("/additem")}
          disabled={selectedItems.length > 0}
          className={`px-4 py-2 rounded text-white ${
            selectedItems.length > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#775142] hover:bg-[#4e372d]"
          }`}
        >
          Add
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedItems.length === 0}
          className={`px-4 py-2 rounded text-white ${
            selectedItems.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#775142] hover:bg-[#4e372d]"
          }`}
        >
          Delete
        </button>
      </div>

      <div className="grid grid-cols-[30px_1fr_1fr_1fr_1fr_100px] font-semibold border-b py-2 text-gray-800">
        <div></div>
        <div>Name</div>
        <div>Image</div>
        <div>Category</div>
        <div>Price</div>
        <div>Edit</div>
      </div>

      {filteredData.map((item) => (
        <div
          key={item.id_menu}
          className="grid grid-cols-[30px_1fr_1fr_1fr_1fr_100px] items-center border-b py-2 text-gray-700"
        >
          <input
            type="checkbox"
            checked={selectedItems.includes(item.id_menu)}
            onChange={() => toggleSelect(item.id_menu)}
          />
          <div>{item.nama_menu}</div>
          <div>
            <img
              src={item.image}
              alt={item.nama_menu}
              className="w-12 h-12 object-cover rounded border"
            />
          </div>
          <div>{item.kategori}</div>
          <div>Rp{item.harga_menu.toLocaleString("id-ID")}</div>
          <div>
            <button
              onClick={() => router.push(`/edititem?id=${item.id_menu}`)}
              className="bg-[#775142] text-white px-3 py-1 rounded hover:bg-[#4e372d]"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
