import Image from 'next/image';
import Button from './Button'; // pastikan file ini ada atau hapus jika belum dipakai

const HeroSection = () => {
  return (
    <section className="w-full h-auto bg-[url('/images/bg1.png')] bg-cover bg-center py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Kolom Kiri */}
        <div className="flex-1 text-[#FFFFFF] pl-25">
          <h1
            className="text-4xl md:text-7xl font-semibold leading-tight"
            style={{ fontFamily: 'Abhaya Libre' }}
          >
            Get a chance to have an Amazing morning
          </h1>
          <p
            className="text-lg md:text-2xl font-medium mt-6 text-justify pr-15"
            style={{ fontFamily: 'Abhaya Libre' }}
          >
           We are giving you are one time opportunity to
           experience a better life with coffee.
          </p>
          <div className="mt-8">
            <Button className="mt-6"label="Order Now" navigateTo="/signin"/>
          </div>
        </div>

        {/* Kolom Kanan - Gambar */}
        <div className="flex-1 flex justify-center relative pl-25">
          <Image
            src="/images/img_cup.png"
            alt="Coffee cup"
            width={320}
            height={320}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
