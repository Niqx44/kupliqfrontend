import React from "react";
import Image from "next/image";
import Button from "./Button";

const CardGroup = () => {
    return (
        <>
            <div>
                <div className="mx-auto">
                    <h3 className="text-[4rem] font-extrabold text-[#603809] "style={{ fontFamily: 'Abhaya Libre' }}>Enjoy a new blend of coffee style</h3>
                    <h5 className="text-[1.2rem] font-medium text-[#707070] mt-5">Explore all flavours of coffee with us. There is always a new cup worth experiencing</h5>
                </div>
                <div className="mt-10">
                    <div className="flex flex-wrap gap-10">
                        <div className="border-1 border-color rounded-md">
                            <Image
                                src="/images/img_rectangle_7.png"
                                alt="Coffee cup made of beans"
                                width={250}
                                height={250}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            <h4 className="text-2xl text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>Cappucino</h4>
                            <p className="text-black font-normal"style={{ fontFamily: 'Fairplay Display' }}>Coffee 50% | Milk 50%</p>
                            <p className="text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>23K</p>
                            <Button className="mt-2 mb-3"label="Order Now" navigateTo="/signin"/>
                        </div>
                        <div className="border-1 border-color rounded-md">
                            <Image
                                src="/images/img_rectangle_7.png"
                                alt="Coffee cup made of beans"
                                width={250}
                                height={250}
                                className="rounded-tr-md rounded-tl-md"
                            />
                           <h4 className="text-2xl text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>Cappucino</h4>
                           <p className="text-black font-normal"style={{ fontFamily: 'Fairplay Display' }}>Coffee 50% | Milk 50%</p>
                           <p className="text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>23K</p>
                            <Button className="mt-2 mb-3"label="Order Now" navigateTo="/signin"/>
                        </div>
                        <div className="border-1 border-color rounded-md">
                            <Image
                                src="/images/img_rectangle_7.png"
                                alt="Coffee cup made of beans"
                                width={250}
                                height={250}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            <h4 className="text-2xl text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>Cappucino</h4>
                            <p className="text-black font-normal"style={{ fontFamily: 'Fairplay Display' }}>Coffee 50% | Milk 50%</p>
                            <p className="text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>23K</p>
                            <Button className="mt-2 mb-3"label="Order Now" navigateTo="/signin"/>
                        </div>
                        <div className="border-1 border-color rounded-md">
                            <Image
                                src="/images/img_rectangle_7.png"
                                alt="Coffee cup made of beans"
                                width={250}
                                height={250}
                                className="rounded-tr-md rounded-tl-md"
                            />
                            <h4 className="text-2xl text-[#603809] font-bold"   >Cappucino</h4>
                            <p className="text-black font-normal"style={{ fontFamily: 'Fairplay Display' }}>Coffee 50% | Milk 50%</p>
                            <p className="text-[#603809] font-bold"style={{ fontFamily: 'Fairplay Display' }}>23K</p>
                            <Button className="mt-2 mb-3"label="Order Now" navigateTo="/signin"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardGroup;