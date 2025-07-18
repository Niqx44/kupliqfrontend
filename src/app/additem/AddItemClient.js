"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NavbarAddItem from "../components/NavbarAdd";

export default function AddMenuForm() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("/images/latte.png");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const menuData = {
      nama_menu: productName,
      harga_menu: price,
      kategori: category,
      deskripsi: description,
    };

    try {
      // Step 1: Simpan data menu ke backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Gagal menyimpan menu");
      }

      const savedMenu = await response.json();
      const id_menu = savedMenu.id_menu;

      if (!id_menu) {
        throw new Error("Gagal mendapatkan id_menu dari server");
      }

      // Step 2: Upload foto jika ada
      if (imageFile) {
        const formData = new FormData();
        formData.append("id_menu", id_menu); // pastikan id_menu sesuai dengan backend
        formData.append("foto", imageFile); // field ini harus "foto" sesuai backend

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-menu`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          const errUpload = await uploadRes.text();
          throw new Error("Menu disimpan, tapi gagal upload gambar: " + errUpload);
        }
      }

      alert("Menu berhasil ditambahkan!");
      router.push("/editmenu");
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(error.message || "Terjadi kesalahan saat menambahkan menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#5a2e1a] px-6 pt-28">
      <NavbarAddItem />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-start justify-center gap-8 mt-10"
      >
        {/* Left: Image Upload */}
        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border border-[#5a2e1a]"
          />
          <label className="mt-4 px-4 py-2 border border-[#5a2e1a] rounded cursor-pointer shadow-sm hover:bg-[#f3f3f3]">
            Upload Foto
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Right: Form Inputs */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          />

          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
            required
          >
            <option value="">Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>

          <input
            type="text"
            placeholder="Deskripsi Singkat"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-[#5a2e1a] rounded px-4 py-2 outline-none focus:ring-1 focus:ring-[#5a2e1a]"
          />

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className={`mt-2 px-6 py-2 border border-[#5a2e1a] rounded-full ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-wait"
                : "hover:bg-[#5a2e1a] hover:text-white transition"
            }`}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
