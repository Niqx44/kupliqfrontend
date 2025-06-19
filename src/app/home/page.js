"use client";

import HeroL from "../components/HeroL";
import Hero2 from "../components/Hero2";
import Hero3L from "../components/Hero3L";
import Hero4 from "../components/Hero4";
import HeroSectionL from "../components/HeroSectionL";
import Footer from "../components/Footer";
import NavbarHome from "../components/NavbarHome";

const HomeL = () => {
  return (
    <div className="w-full">
      <NavbarHome />
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 bg-[url('/images/img_coffeeimage.png')] bg-cover bg-center">
        <div className="flex justify-start items-start w-full px-4 sm:px-8 md:px-16 lg:px-24">
          <HeroL />
        </div>
      </div>

      <div className="bg-white pt-4 sm:pt-5 md:pt-6">
        <div className="flex justify-start items-start w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <Hero2 />
        </div>
      </div>

      <div className="bg-white flex justify-start">
        <img
          src="/images/img_coffee_blast.png"
          alt="Coffee Splash"
          className="w-[300px] sm:w-[400px] md:w-[500px] h-auto"
        />
      </div>

      <div className="bg-white">
        <div className="flex justify-start items-start w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <Hero3L />
        </div>
      </div>

      <div className="bg-white flex justify-end">
        <img
          src="/images/image_coffee_blast_2.png"
          alt="Coffee Splash"
          className="w-[300px] sm:w-[400px] md:w-[500px] h-auto"
        />
      </div>

      <div className="bg-white">
        <div className="flex justify-start items-start w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <Hero4 />
        </div>
      </div>

      <div className="bg-white "></div>

      <div className="bg-white">
        <div className="flex justify-start items-start w-full">
          <HeroSectionL />
        </div>
      </div>

      <div className="bg-white h-24 sm:h-32 md:h-40"></div>

      <Footer />
    </div>
  );
};

export default HomeL;