"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Please fill out this field.";
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic goes here (e.g., API call)
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-8 shadow-sm">
        <Link href="/">
          <div
            className="text-3xl font-regular text-[#5C3A2E] cursor-pointer"
            style={{ fontFamily: "Cormorant Infant" }}
          >
            Kupliq Cafe
          </div>
        </Link>
        <div className="space-x-8 pr-10">
          <Link href="/signin">
            <button className="w-24 h-12 bg-[#5C3A2E] text-white rounded-full text-sm hover:bg-[#4a2f25] transition-colors">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 justify-center items-center">
        <div className="w-2/5 max-w-md px-6">
          <h1
            className="text-4xl font-extrabold text-[#5C3A2E] mb-2"
            style={{ fontFamily: "Abhaya Libre" }}
          >
            Create Your Kupliq Cafe Account
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Join our cozy community and enjoy exclusive offers. Just fill in
            your details to get started!
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {["name", "email", "phone", "password", "confirmPassword"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  type={field.includes("password") ? "password" : field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  placeholder={
                    field === "confirmPassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className={`text-black w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#5C3A2E]"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#5C3A2E] text-white py-2 rounded-md text-sm hover:bg-[#4a2f25] transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            or continue with
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <button>
              <img src="/images/fb.png" alt="Facebook" className="w-5 h-5" />
            </button>
            <button>
              <img src="/images/google.png" alt="Google" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-1/4 hidden md:block">
          <img
            src="/images/Slider.png"
            alt="Cafe"
            className="w-full h-auto object-cover rounded-l-2xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
