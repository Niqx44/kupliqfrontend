import Image from 'next/image';
import Button from './Button';

const Hero2 = () => {
  return (
    <section className="relative flex justify-center items-center pt-20 w-full">
      {/* Kolom Kiri */}
      <div className="flex-1 text-[#603809] pr-12">
        <h1 className="text-[4rem] font-bold" style={{ fontFamily: 'Abhaya Libre' }}>
          Discover the best coffee
        </h1>
        <p className="text-[1.5rem] font-light mt-4 mb-6 mr-30 text-justify" style={{ fontFamily: 'Abhaya Libre' }}>
          Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and helps build your mood. Having a cup of coffee is good, but having a cup of real coffee is greater. There is no doubt that you will enjoy this coffee more than others you have ever tasted.
        </p>
      </div>

      {/* Kolom Kanan - Gambar Kopi */}
      <div className="flex relative">
        <Image 
          src="/images/img_stylized_cup_co.png" 
          alt="Coffee cup made of beans" 
          width={500} 
          height={500} 
          className="object-contain"
        />
      </div>

      {/* Gambar Splash Kopi */}
      {/* <div className="absolute bottom-[-80px] left-0 w-full flex justify-">
        <Image 
          src="/images/img_coffee_blast.png" 
          alt="Coffee Splash" 
          width={500} 
          height={100} 
          className="object-contain"
        />
      </div> */}
    </section>
  );
};

export default Hero2;
