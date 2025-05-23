// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar"; // Pastikan path ke Navbar benar
import Footer from  "./components/Footer";
import "./globals.css"; // Import global styles

// Load font Google dengan variabel CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata global
export const metadata = {
  title: "Kupliq Cafe",
  description: "Website resmi Kupliq Cafe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-black  dark:text-white`}
      >
        <div className="min-h-screen w-full flex flex-col">
          {children} {/* Konten halaman */}
        </div>
      </body>
    </html>
  );
}