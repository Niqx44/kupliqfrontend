"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMsg(errorText);
        return;
      }

      const data = await response.json();
      console.log("Login response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("id_role", data.id_role);
      localStorage.setItem("user_id", data.id);

      if (data.id_role === 1) {
        router.push("/menuadmin");
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Login error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 shadow-sm">
        <Link href="/">
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-regular text-[#5C3A2E] cursor-pointer"
            style={{ fontFamily: "Cormorant Infant" }}
          >
            Kupliq Cafe
          </div>
        </Link>
        <div className="space-x-4 sm:space-x-6 md:space-x-8 pr-4 sm:pr-6 md:pr-10">
          <Link href="/signup">
            <button className="p-2 px-4 sm:px-5 bg-white rounded-lg border-2 border-[#775142] hover:bg-[#775142] text-[#775142] hover:text-white transition text-sm sm:text-base">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 flex-col md:flex-row justify-center items-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 gap-6 md:gap-10">
        <div className="w-full max-w-sm sm:max-w-md md:w-1/2 px-4 sm:px-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#5C3A2E] mb-2"
            style={{ fontFamily: "Abhaya Libre" }}
          >
            Welcome Back to Kupliq Cafe
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-6">
            Log in to access your account and discover the latest brews, and bites.
          </p>

          {errorMsg && <p className="text-red-600 text-xs sm:text-sm mb-2">{errorMsg}</p>}

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <button
              type="submit"
              className="w-full bg-[#5C3A2E] text-white py-2 rounded-md text-sm sm:text-base hover:bg-[#4a2f25] transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs sm:text-sm text-center text-gray-500 mt-4 sm:mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#5C3A2E] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:w-1/3">
          <Image
            src="/images/mesinkopi.jpg"
            alt="Cafe"
            width={300}
            height={300}
            className="w-full h-auto object-cover rounded-2xl shadow-md max-sm:hidden"
            priority
          />
        </div>
      </div>
    </div>
  );
}