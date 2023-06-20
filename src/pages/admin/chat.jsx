import React from "react";
import Image from "next/image";
import Link from "next/link";
import search from "../../assets/search.png";
import profile1 from "../../assets/image 48.svg";
import profile2 from "../../assets/image 50.svg";
import profile3 from "../../assets/image 49.svg";
import Footer from "../../components/Footer";
import Navbar from "../../components/Header";

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, '/auth/login');

    const {data} = await http(token).get("/profile")
    if(data.results.role === "general"){
        res.setHeader('location', "/chat")
        res.statusCode = 302
        res.end()
        return {
            props: {}
        };
    }

    return {
        props: {
            token,
        },
    };
}, cookieConfig);

const AdminChat = ({token}) => {
    return (
        <>
            <title>Chat | MugLife</title>
            <Navbar token={token}/>
            <div className="font-poppins pt-[100px]">
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
                                Tap a chat to see the message
                            </p>
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile1}
                                    alt="nico"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Nico</p>
                                    <p className="text-[14px] w-[210px]">
                                        Hey, I’m Nico, Let’s talk and share what’s on your
                                        thoughts!
                                    </p>
                                </div>
                            </div>
                            <hr className="mb-[26px]" />
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile2}
                                    alt="chey"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Cheryn</p>
                                    <p className="text-[14px] w-[210px]">
                                    Hey, I’m Cheryn, can I help you? Just chat me if you have 
                                    some trouble in ordering, happy shopping!
                                    </p>
                                </div>
                            </div>
                            <hr className="mb-[26px]" />
                            <div className="flex mb-[20px] text-white">
                                <Image
                                    src={profile3}
                                    alt="Lou"
                                    className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                />
                                <div>
                                    <p className="text-[20px] font-bold mb-[10px]">Cheryn</p>
                                    <p className="text-[14px] w-[210px]">
                                    Hey, I’m Lou, I’ll here to help you, just talk to me and
                                    we solve the problem. Have a good day!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-[36px] py-[28px] lg:w-[1133px] rounded-r-[20px] h-[1100px]">
                            <div>
                                <p className="text-[#3C2A21] text-[30px] font-bold leading-[45px] mb-[70px]">
                                    Room Chat
                                </p>
                                <Link href="/admin/room-chat">
                                    <div className="flex mb-[20px] text-white">
                                        <Image
                                            src={profile3}
                                            alt="Lucas"
                                            className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                        />
                                        <div className="mr-[5px]">
                                            <p className="text-[#3C2A21] text-[20px] font-bold mb-[10px]">
                                                Lucas
                                            </p>
                                            <p className="text-[#4F5665] text-[15px] leading-[22px] font-bold">
                                                Hey jason, I can’t find the promo section. Can u tell me
                                                where is it?
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <span className="text-[#9F9F9F] text-[10px] leading-[15px]">
                                                02.14 PM
                                            </span>
                                            <span className=" text-[12px] border-1 bg-[#3C2A21] rounded-[50%] text-center w-[20px] h-[20px] font-bold">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <hr className="mb-[27px]" />
                                <div className="flex mb-[20px] text-white">
                                    <Image
                                        src={profile1}
                                        alt="Krist"
                                        className="w-[80px] h-[81px] mr-[16px] rounded-[50%]"
                                    />
                                    <div className="mr-[5px]">
                                        <p className="text-[#3C2A21] text-[20px] font-bold mb-[10px]">
                                            Krist
                                        </p>
                                        <p className="text-[#3C2A21] text-[15px] leading-[22px] ">
                                            Hey jason, I can’t find the promo section. Can u tell me
                                            where is it?
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <span className="text-[#9F9F9F] text-[10px] leading-[15px]">
                                            02.14 PM
                                        </span>
                                    </div>
                                </div>
                                <hr className="mb-[27px]" />
                            </div>
                            <div className="pt-[196px] text-center">
                                <p className="text-[#9F9F9F] text-[15px]">
                                    You have no conversation, you’ll receive notification when a
                                    customer chat you. Keep up the good work!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AdminChat;