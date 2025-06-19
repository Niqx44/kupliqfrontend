import Image from 'next/image';
import Button from './Button';

const HeroSectionL = () => {
  return (
    <section className="w-full h-auto bg-[url('/images/bg1.png')] bg-cover bg-center py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
        {/* Kolom Kiri */}
        <div className="flex-1 text-[#FFFFFF] px-4 sm:px-6 md:px-8">
          <h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight"
            style={{ fontFamily: 'Abhaya Libre' }}
          >
            Get a chance to have an Amazing morning
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl font-medium mt-4 sm:mt-6 text-justify"
            style={{ fontFamily: 'Abhaya Libre' }}
          >
            We are giving you a one-time opportunity to experience a better life with coffee.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8">
            <Button className="mt-4 sm:mt-6" label="Order Now" navigateTo="/menu" />
          </div>
        </div>

        {/* Kolom Kanan - Gambar */}
        <div className="flex-1 flex justify-center px-4 sm:px-6 md:px-8">
          <Image
            src="/images/img_cup.png"
            alt="Coffee cup"
            width={200}
            height={200}
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[320px] h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionL;