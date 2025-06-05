"use client";

import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import NavbarProfile from "../components/NavbarProfile";
import Footer2 from "../components/footer2";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    id_role: "2",
    foto: "",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/costumer/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data user");
          return res.json();
        })
        .then((data) => {
          setFormData({
            name: data.nama_costumer,
            email: data.email,
            phone: data.notelp_costumer,
            password: data.password,
            id_role: data.id_role,
            foto: data.foto_profile || "",
          });
          setImagePreview(data.foto_profile || "/images/img_rectangle_9.png");
        })
        .catch((err) => {
          console.error("Gagal fetch data user:", err);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => setIsEditing(true);

const handleSave = async () => {
  if (!userId) {
    alert("User ID tidak ditemukan.");
    return;
  }

  let uploadedImageUrl = formData.foto;

  // Upload foto jika ada file baru dipilih
  if (selectedFile) {
    const formDataImage = new FormData();
    formDataImage.append("id_costumer", userId); // ✅ Kirim id ke backend
    formDataImage.append("foto", selectedFile);

    try {
      const resUpload = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-foto-profile`, {
        method: "POST",
        body: formDataImage,
      });

      if (!resUpload.ok) throw new Error("Upload foto gagal");

      const contentType = resUpload.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await resUpload.json();

        if (result?.url) {
          uploadedImageUrl = result.url;
        } else {
          throw new Error("Format JSON tidak sesuai ekspektasi: " + JSON.stringify(result));
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
      console.error("Gagal upload foto:", error);
      alert("Gagal upload foto.");
      return;
    }
  }

  const payload = {
    nama_costumer: formData.name,
    email: formData.email,
    notelp_costumer: formData.phone,
    password: formData.password,
    id_role: formData.id_role,
    foto_profile: uploadedImageUrl,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/costumer/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Profil berhasil diperbarui!");
      setFormData((prev) => ({ ...prev, foto_profile: uploadedImageUrl }));
      setIsEditing(false);
    } else {
      const errText = await res.text();
      console.error("Gagal update:", errText);
      alert("Gagal menyimpan perubahan: " + errText);
    }
  } catch (error) {
    console.error("Error saat update:", error);
    alert("Terjadi kesalahan saat menyimpan perubahan.");
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavbarProfile />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full pt-25">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 relative flex flex-col items-center">
            <img
              src={imagePreview || "/images/img_rectangle_9.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover bg-gray-200"
            />
            {isEditing && (
              <div className="mt-3 text-center">
                <label className="cursor-pointer inline-block bg-[#5C3A2E] text-white text-sm px-4 py-2 rounded-full hover:bg-[#4a2f25] transition">
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">Ukuran maksimal: 2MB</p>
              </div>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-[#5C3A2E]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#5C3A2E] disabled:bg-gray-100"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-[#5C3A2E]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#5C3A2E] disabled:bg-gray-100"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-3.5 text-[#5C3A2E]" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#5C3A2E] disabled:bg-gray-100"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-[#5C3A2E]" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#5C3A2E] disabled:bg-gray-100"
              />
            </div>

            <div className="flex gap-4 pt-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="border border-[#5C3A2E] text-[#5C3A2E] px-6 py-2 rounded-full hover:bg-[#5C3A2E] hover:text-white transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-[#5C3A2E] text-white px-6 py-2 rounded-full hover:bg-[#4a2f25] transition"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer2 />
    </div>
  );
}
