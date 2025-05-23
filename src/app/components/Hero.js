// app/components/Hero.js
import Button from './Button';

const Hero = () => {
    return (
      <section className="">
        {/* Kolom Kiri */}
        <div className="flex-1 text-white p-6">
          <h1 className="text-xl font-normal mb-4 mt-30" style={{ fontFamily: 'Abhaya Libre' }}>We’ve got your morning covered with</h1>
          <p className="text-[15rem]" style={{ fontFamily: 'Clicker Script' }}>Coffee</p>
          <h2 className="text-xl mb-4 max-w-xl" style={{ fontFamily: 'Abhaya Libre' }}>
            It is best to start your day with a cup of coffee. Discover the best flavours coffee you will ever have. We provide the best for our customers.
          </h2>
          <Button className="mt-6"label="Order Now" navigateTo="/signin"/>
        </div>
        <div className="flex-1 p-6">
        </div>
      </section>
    );
  };
  
  export default Hero;
  