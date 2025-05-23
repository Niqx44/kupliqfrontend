"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import NavbarProfile from "../components/NavbarProfile";
import Footer2 from "../components/footer2";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Faizal Saputro",
    email: "faizalsaputro@gmail.com",
    phone: "+62117828729",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    // Simpan perubahan data ke backend jika perlu
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <NavbarProfile />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full pt-25">

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src="/images/img_rectangle_9.png"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover bg-gray-200"
            />
          </div>

          {/* Profile Form */}
          <div className="w-full space-y-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Buttons */}
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

      {/* Footer */}
      <Footer2 />
    </div>
  );
}
