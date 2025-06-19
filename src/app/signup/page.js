"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Please fill out this field.";
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const customerData = {
      nama_costumer: formData.name,
      password: formData.password,
      email: formData.email,
      notelp_costumer: formData.phone,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/costumer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to register");
      }

      alert("Pendaftaran berhasil!");
      router.push("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Gagal mendaftar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 shadow-sm">
        <Link href="/">
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-regular text-[#5C3A2E] cursor-pointer"
            style={{ fontFamily: '"Cormorant Infant"' }}
          >
            Kupliq Cafe
          </div>
        </Link>
        <div className="space-x-4 sm:space-x-6 md:space-x-8 pr-4 sm:pr-6 md:pr-10">
          <Link href="/signin">
            <button className="p-2 px-4 sm:px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base text-center">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 flex-col md:flex-row justify-center items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 gap-4 sm:gap-6 md:gap-8 overflow-y-auto">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md md:w-1/2 px-2 sm:px-4">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#5C3A2E] mb-1 sm:mb-2"
            style={{ fontFamily: '"Abhaya Libre"' }}
          >
            Create Your Kupliq Cafe Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
            Join our cozy community and enjoy exclusive offers. Just fill in your details to get started!
          </p>

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            {["name", "email", "phone", "password", "confirmPassword"].map((field) => {
              let type = "text";
              if (field === "email") type = "email";
              else if (field === "phone") type = "tel";
              else if (field === "password" || field === "confirmPassword") type = "password";

              return (
                <div key={field}>
                  <input
                    name={field}
                    type={type}
                    placeholder={
                      field === "confirmPassword"
                        ? "Confirm Password"
                        : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className={`text-black w-full border rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 ${
                      errors[field]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#5C3A2E]"
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-600 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              );
            })}

            {errorMsg && <p className="text-red-600 text-xs sm:text-sm">{errorMsg}</p>}

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-xs sm:text-sm md:text-base mt-1 sm:mt-2 text-center ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-wait"
                  : "bg-[#5C3A2E] text-white hover:bg-[#4a2f25] transition-colors"
              }`}
              disabled={loading}
            >
              {loading ? "Mendaftarkan..." : "Sign Up"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:w-1/3 max-sm:hidden">
          <Image
            src="/images/mesinkopi.jpg"
            alt="Cafe"
            width={300}
            height={300}
            className="w-full h-auto object-cover rounded-2xl shadow-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}