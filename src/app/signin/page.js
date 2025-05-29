"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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

      // ✅ Simpan data login ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("id_role", data.id_role);
      localStorage.setItem("user_id", data.id);

      // ✅ Redirect berdasarkan role
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
          <Link href="/signup">
            <button className="w-24 h-12 bg-[#5C3A2E] text-white rounded-full text-sm hover:bg-[#4a2f25] transition-colors">
              Sign Up
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
            Welcome Back to Kupliq Cafe
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Log in to access your account and discover the latest brews, and bites.
          </p>

          {errorMsg && <p className="text-red-600 text-sm mb-2">{errorMsg}</p>}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3A2E]"
            />
            <button
              type="submit"
              className="w-full bg-[#5C3A2E] text-white py-2 rounded-md text-sm hover:bg-[#4a2f25] transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#5C3A2E] hover:underline">
              Sign Up
            </Link>
          </p>

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
