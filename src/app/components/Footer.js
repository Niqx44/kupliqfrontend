"use client";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[url('/images/foot1.png')] bg-no-repeat bg-center bg-cover text-white relative">
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center md:items-start min-w-[150px]">
          <Image
            src="/images/kupliq.png"
            alt="Kupliq Cafe Logo"
            width={80}
            height={80}
            className="w-[80px] py-2 sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto object-contain"
            priority
          />
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-center md:text-justify"
            style={{ fontFamily: '"Fairplay Display"' }}
          >
            Location
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Jl. Perintis Kemerdekaan VII No.6 Blok D4, Tamalanrea Indah, Kec.
            Tamalanrea, Kota Makassar, Sulawesi Selatan 90245
          </p>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4"
            style={{ fontFamily: '"Fairplay Display"' }}
          >
            Contact Us
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            +62 810 560 7684 <br />
            kupliqcafe@gmail.com <br />
            <Link
              href="https://www.kupliqcafe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              www.kupliqcafe.com
            </Link>
          </p>
        </div>

        {/* Social Media + Brand */}
        <div className="flex flex-col items-center md:items-end">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4"
            style={{ fontFamily: '"Fairplay Display"' }}
          >
            Find us on...
          </h3>
          <div className="flex gap-4 text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">
            <Link
              href="https://www.facebook.com/kupliqcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="text-white hover:text-[#ac7d6a] transition-colors duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.instagram.com/kupliqcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="text-white hover:text-[#ac7d6a] transition-colors duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.youtube.com/@kupliqcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube page"
              className="text-white hover:text-[#ac7d6a] transition-colors duration-300"
            >
              <FaYoutube />
            </Link>
            <Link
              href="https://www.twitter.com/kupliqcafe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter page"
              className="text-white hover:text-[#ac7d6a] transition-colors duration-300"
            >
              <FaTwitter />
            </Link>
          </div>
          <h1
            className="text-lg sm:text-xl md:text-3xl font-medium"
            style={{ fontFamily: '"Cormorant Infant"' }}
          >
            Kupliq Cafe
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;