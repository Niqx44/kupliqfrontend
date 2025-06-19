import Image from 'next/image';
import Button from './Button';

const Hero2 = () => {
  return (
    <section className="relative flex flex-col md:flex-row justify-center items-center pt-8 sm:pt-10 md:pt-16 lg:pt-20 w-full px-4 sm:px-6 lg:px-8">
      {/* Kolom Kiri - Text */}
      <div className="flex-1 text-[#603809] pr-4 sm:pr-6 md:pr-8 lg:pr-12 max-w-xl relative z-10">
        <h1
          className="text-2xl sm:text-5xl md:text-6xl font-bold"
          style={{ fontFamily: 'Abhaya Libre' }}
        >
          Discover the best coffee
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl font-light mt-3 sm:mt-4 mb-5 sm:mb-6 text-justify"
          style={{ fontFamily: 'Abhaya Libre' }}
        >
          Bean Scene is a coffee shop that provides you with quality coffee that
          helps boost your productivity and helps build your mood. Having a cup of
          coffee is good, but having a cup of real coffee is greater. There is no
          doubt that you will enjoy this coffee more than others you have ever
          tasted.
        </p>
      </div>

      {/* Kolom Kanan - Gambar Kopi */}
      <div className="absolute inset-0 flex justify-center items-center md:static md:flex md:justify-center mt-6 md:mt-0 opacity-40 md:opacity-100 z-0 md:z-auto">
        <Image
          src="/images/img_stylized_cup_co.png"
          alt="Coffee cup made of beans"
          width={300}
          height={300}
          className="object-contain w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px]"
        />
      </div>
    </section>
  );
};

export default Hero2;