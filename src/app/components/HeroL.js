import Button from './Button';

const HeroL = () => {
  return (
    <section className="flex flex-col md:flex-row items-center w-full">
      {/* Kolom Kiri */}
      <div className="flex-1 text-white p-4 sm:p-6 md:p-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-normal mb-4 mt-8 md:mt-12" style={{ fontFamily: 'Abhaya Libre' }}>
          We’ve got your morning covered with
        </h1>
        <p className="text-[130px] font-normal mb-5" style={{ fontFamily: 'Clicker Script' }}>
          Coffee
        </p>
        <h2 className="text-base sm:text-lg md:text-xl mb-4 max-w-md md:max-w-xl" style={{ fontFamily: 'Abhaya Libre' }}>
          It is best to start your day with a cup of coffee. Discover the best flavours coffee you will ever have. We provide the best for our customers.
        </h2>
        <Button className="mt-4 sm:mt-6" label="Order Now" navigateTo="/menu" />
      </div>
      <div className="flex-1 p-4 sm:p-6 md:p-8"></div>
    </section>
  );
};

export default HeroL;