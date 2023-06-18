import React from "react";
import Image from "next/image";
import { RiCheckDoubleFill } from "react-icons/ri";
import search from "../assets/search.png";
import profile1 from "../assets/image 48.svg";
import profile2 from "../assets/image 50.svg";
import profile3 from "../assets/image 49.svg";
import woman from "../assets/image 39.svg";
import camera from "../assets/camera.png";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import Link from "next/link";

const roomchat = () => {
    return (
        <>
            <title>Roomchat | MugLife</title>
            <Navbar />
            <div className="pt-[100px] font-poppins">
                <div className="lg:bg-[url('../assets/background-chat.png')] bg-cover bg-no-repeat pb-[89px]">
                    <div className="lg:pt-[84px] lg:px-[200px] lg:flex ">
                        <div className=" py-[60px] px-3 lg:px-[50px]  bg-[#553b2e] lg:rounded-l-[20px]">
                            <div className="border-1 flex items-center bg-white py-[18px] pl-[35px] pr-[40px] rounded-[30px] mb-[43px]">
                                <Image src={search} alt="search" className="mr-[14px]" />
                                <input
                                    placeholder="Search Chat"
                                    className="focus:outline-none text-[#3C2A21]"
                                />
                            </div>
                            <p className="text-[14px] text-white font-bold mb-[50px] pl-[2px]">
                                Choose a staff you want to talk with
                            </p>
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile1}
                                    alt="jason"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Jason</p>
                                    <p className="text-[14px] w-[210px]">
                                        Hey, I’m Jason, Let’s talk and share what’s on your
                                        thoughts!
                                    </p>
                                </div>
                            </div>
                            <hr className="mb-[26px]" />
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile2}
                                    alt="cheryn"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Cheryn</p>
                                    <p className="text-[14px] w-[210px]">
                                        Hey, I’m Cheryn, can I help you? Just chat me if you have some
                                        trouble in ordering, happy shopping!
                                    </p>
                                </div>
                            </div>
                            <hr className="mb-[26px]" />
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile3}
                                    alt="lou"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Lou</p>
                                    <p className="text-[14px] w-[210px]">
                                        Hey, I’m Lou, I’ll here to help you, just talk to me and we solve
                                        the problem. Have a good day!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-[36px] py-[28px] lg:w-[1133px] rounded-r-[20px] h-[1100px]">
                            <div className="mb-[100px]">
                                <p className="text-[#3C2A21] text-[25px] font-bold leading-[45px] mb-[70px]">
                                    Jason
                                </p>
                                <div className="flex mb-[20px] ">
                                    <div className="w-[50px] flex flex-col justify-between">
                                        <span className="text-[#9F9F9F] text-[10px]">02.14 PM</span>
                                        <RiCheckDoubleFill className="" />
                                    </div>
                                    <div className="pl-[12px] text-end mr-[29px]">
                                        <span className="text-[#3C2A21] text-[15px] font-bold">
                                            Catherin
                                        </span>
                                        <p className="text-[#4F5665] text-[15px]">
                                            Hey jason, I can’t find the promo section. Can u tell me
                                            where is it?
                                        </p>
                                        <div></div>
                                    </div>
                                    <Image
                                        src={woman}
                                        alt="woman-cust"
                                        className="w-[55px] h-[67px] mr-[16px] rounded-[50%]"
                                    />
                                </div>
                                <hr className="mb-[34px]" />
                                <div className="flex mb-[20px] text-white">
                                    <Image
                                        src={profile1}
                                        alt="jason"
                                        className="w-[55px] h-[67px] mr-[29px] rounded-[50%]"
                                    />
                                    <div>
                                        <p className="text-[#3C2A21] text-[15px] font-bold">
                                            Jason
                                        </p>
                                        <p className="text-[#4F5665] text-[15px] leading-[22px]">
                                            Hey jason, I can’t find the promo section. Can u tell me
                                            where is it?
                                        </p>
                                    </div>
                                    <span className="text-[#9F9F9F] text-[10px] leading-[15px]">
                                        02.14 PM
                                    </span>
                                </div>
                            </div>
                            <div className="pb-[-56px]">
                                <div className="border-1 bg-[#E5E5CB] py-[23px] px-[48px] flex rounded-[20px]">
                                    <input
                                        placeholder="Type a message..."
                                        className="focus:outline-none bg-[#E5E5CB] text-[#3C2A21] flex-1"
                                    />
                                    <Image src={camera} alt="camera" className="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default roomchat;