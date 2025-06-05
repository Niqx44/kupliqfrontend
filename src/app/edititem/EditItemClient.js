"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarEditItem from "../components/NavbarEditItem";

export default function EditMenuForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [imagePreview, setImagePreview] = useState("/images/latte.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fotoMenu, setFotoMenu] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch menu with id ${id}`);
          return res.json();
        })
        .then((data) => {
          setProductName(data.nama_menu);
          setPrice(data.harga_menu);
          setCategory(data.kategori);
          setDescription(data.deskripsi);
          setFotoMenu(data.foto_menu);
          setImagePreview(data.foto_menu || "/images/latte.png");
        })
        .catch((err) => {
          console.error("Error loading menu:", err);
          alert("Gagal memuat data menu.");
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = fotoMenu;

    // Upload gambar jika dipilih gambar baru
    if (selectedFile) {
      const formDataImage = new FormData();
      formDataImage.append("id_menu", id);
      formDataImage.append("foto", selectedFile);

      try {
        const resUpload = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-menu`, {
          method: "POST",
          body: formDataImage,
        });

        if (!resUpload.ok) throw new Error("Upload gambar gagal");

        const contentType = resUpload.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const result = await resUpload.json();
          if (result?.url) {
            uploadedImageUrl = result.url;
          } else {
            throw new Error("Format JSON tidak sesuai: " + JSON.stringify(result));
          }
        } else {
          const text = await resUpload.text();
          const match = text.match(/https?:\/\/[^\s]+/);
          if (match) {
            uploadedImageUrl = match[0];
          } else {
            throw new Error("URL gambar tidak ditemukan dalam respons: " + text);
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Gagal upload gambar.");
        return;
      }
    }

    const body = {
      nama_menu: productName,
      harga_menu: price,
      kategori: category,
      deskripsi: description,
      foto_menu: uploadedImageUrl,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Gagal update menu");
      alert("Menu berhasil diperbarui!");
      router.push("/editmenu");
    } catch (error) {
      console.error("Gagal update menu:", error);
      alert("Terjadi kesalahan saat menyimpan menu.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#5a2e1a] px-6 pt-28">
      <NavbarEditItem />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-start justify-center gap-8 mt-10"
      >
        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border border-[#5a2e1a]"
          />
          <label className="mt-4 px-4 py-2 border border-[#5a2e1a] rounded cursor-pointer">
            Upload Foto
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Nama Produk"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border px-4 py-2 rounded"
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
          <input
            type="text"
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 border border-[#5a2e1a] rounded-full hover:bg-[#5a2e1a] hover:text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
