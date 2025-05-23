import React from "react";
import Image from "next/image";

const BadgeGroup = () => {
    return (
        <>
            <div>
                <div className="mx-auto">
                    <h3 className="text-[4rem] font-extrabold text-[#603809] "style={{ fontFamily: 'Abhaya Libre' }}>Enjoy a new blend of coffee style</h3>
                    <h5 className="text-[1.2rem] font-semibold text-[#707070] mt-5">Explore all flavours of coffee with us. There is always a new cup worth experiencing</h5>
                </div>
                <div className="mt-10">
                    <div className="flex flex-wrap gap-8">
                        <div className="border-1 border-color rounded-md pb-10 bg-[#FFEED8]">
                            <div className="flex justify-center items-center px-20 pt-10 mb-5">
                            <Image
                                src="/images/img_coffee_beans_1.png"
                                alt="Coffee cup made of beans"
                                width={100}
                                height={100}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            </div>
                            <h4 className="text-2xl text-[#603809] font-bold pb-2"style={{ fontFamily: 'Fairplay Display' }}>Supreme Beans</h4>
                            <p className="text-[#707070] font-semibold"style={{ fontFamily: 'Fairplay Display' }}>Beans that provides <br></br>great taste</p>
                        </div>

                        <div className="border-1 border-color rounded-md pb-10 bg-[#FFEED8]">
                            <div className="flex justify-center items-center px-20 pt-10 mb-5">
                            <Image
                                src="/images/img_coffee_beans_1.png"
                                alt="Coffee cup made of beans"
                                width={100}
                                height={100}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            </div>
                            <h4 className="text-2xl text-[#603809] font-bold pb-2"style={{ fontFamily: 'Fairplay Display' }}>Supreme Beans</h4>
                            <p className="text-[#707070] font-semibold"style={{ fontFamily: 'Fairplay Display' }}>Beans that provides <br></br>great taste</p>
                        </div>

                        <div className="border-1 border-color rounded-md pb-10 bg-[#FFEED8]">
                            <div className="flex justify-center items-center px-20 pt-10 mb-5">
                            <Image
                                src="/images/img_coffee_beans_1.png"
                                alt="Coffee cup made of beans"
                                width={100}
                                height={100}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            </div>
                            <h4 className="text-2xl text-[#603809] font-bold pb-2"style={{ fontFamily: 'Fairplay Display' }}>Supreme Beans</h4>
                            <p className="text-[#707070] font-semibold"style={{ fontFamily: 'Fairplay Display' }}>Beans that provides <br></br>great taste</p>
                        </div>

                        <div className="border-1 border-color rounded-md pb-10 bg-[#FFEED8]">
                            <div className="flex justify-center items-center px-20 pt-10 mb-5">
                            <Image
                                src="/images/img_coffee_beans_1.png"
                                alt="Coffee cup made of beans"
                                width={100}
                                height={100}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            </div>
                            <h4 className="text-2xl text-[#603809] font-bold pb-2"style={{ fontFamily: 'Fairplay Display' }}>Supreme Beans</h4>
                            <p className="text-[#707070] font-semibold"style={{ fontFamily: 'Fairplay Display' }}>Beans that provides <br></br>great taste</p>
                        </div>
                    </div>
                    <div className="py-5">
                        <h5 className="text-[1.2rem] font-semibold text-[#707070] mt-5">Great ideas start with great coffee, Lets help you achieve that</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BadgeGroup;   