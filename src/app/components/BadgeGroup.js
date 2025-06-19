import React from "react";
import Image from "next/image";

const BadgeGroup = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-5">
      <div className="text-center">
        <h1
          className="text-2xl sm:text-4xl md:text-4xl lg:text-[3rem] font-extrabold text-[#603809]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Enjoy a new blend of coffee style
        </h1>
        <h3
          className="text-base sm:text-lg md:text-xl lg:text-[1.4rem] font-semibold text-[#707070] mt-4 sm:mt-6"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Explore all flavours of coffee with us. There is always a new cup worth experiencing
        </h3>
      </div>
      <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full max-w-[250px] mx-auto bg-[#FFEED8] rounded-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center"
          >
            <div className="flex justify-center items-center mb-4">
              <Image
                src="/images/img_coffee_beans_1.png"
                alt="Coffee cup made of beans"
                width={80}
                height={80}
                className="w-[60px] sm:w-[80px] md:w-[100px] h-auto rounded-t-md"
              />
            </div>
            <h4
              className="text-xl sm:text-2xl md:text-3xl text-[#603809] font-bold mb-2"
              style={{ fontFamily: "Abhaya Libre" }}
            >
              Supreme Beans
            </h4>
            <p
              className="text-sm sm:text-base md:text-lg text-[#707070] font-semibold text-center"
              style={{ fontFamily: "Abhaya Libre" }}
            >
              Beans that provides <br /> great taste
            </p>
          </div>
        ))}
      </div>
      <div className="my-7 text-center">
        <h5
          className="text-base sm:text-xl md:text-2xl font-semibold text-[#707070]"
          style={{ fontFamily: "Abhaya Libre" }}
        >
          Great ideas start with great coffee, Lets help you achieve that
        </h5>
      </div>
    </div>
  );
};

export default BadgeGroup;