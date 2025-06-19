import Image from 'next/image';
import Button from './Button';

const Hero2 = () => {
  return (
    <section className="relative flex flex-col md:flex-row justify-center items-center pt-10 sm:pt-12 md:pt-20 w-full">
      {/* Kolom Kiri */}
      <div className="flex-1 text-[#603809] px-4 sm:px-6 md:pr-12">
        <h1 className="text-6xl font-bold" style={{ fontFamily: 'Abhaya Libre' }}>
          Discover the best coffee
        </h1>
        <p className="text-2xl font-light mt-4 mb-6 text-justify" style={{ fontFamily: 'Abhaya Libre' }}>
          Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and helps build your mood. Having a cup of coffee is good, but having a cup of real coffee is greater. There is no doubt that you will enjoy this coffee more than others you have ever tasted.
        </p>
      </div>

      {/* Kolom Kanan - Gambar Kopi */}
      <div className="flex justify-center">
        <Image
          src="/images/img_stylized_cup_co.png"
          alt="Coffee cup made of beans"
          width={300}
          height={300}
          className="object-contain w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </div>
    </section>
  );
};

export default Hero2;