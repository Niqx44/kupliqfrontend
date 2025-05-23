// app/components/Button.js
'use client'; // Menandakan ini adalah komponen klien

import { useRouter } from 'next/navigation'; // Import useRouter dari next/navigation

const Button = ({ label, navigateTo, type = "button", className = "" }) => {
  const router = useRouter(); // Gunakan useRouter dari next/navigation

  // Fungsi untuk menangani klik tombol
  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo); // Navigasi ke halaman yang ditentukan
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-6 py-3 bg-[#775142] text-white rounded-full shadow-md hover:bg-[#381A13] focus:outline-none focus:ring-2 focus:ring-blue-400 ${className} `}

    >
      {label}
    </button>
  );
};

export default Button;
