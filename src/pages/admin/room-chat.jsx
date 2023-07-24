import React from 'react';
import Image from 'next/image';
import search from '../../assets/search.png';
import profile1 from '../../assets/image 48.svg';
import woman from '../../assets/image 39.svg';
import Footer from '../../components/Footer';
import { RiCheckDoubleFill } from 'react-icons/ri';
import camera from '../../assets/camera.png';
import Navbar from '../../components/Header';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, '/auth/login');

    const {data} = await http(token).get('/profile');
    if(data.results.role === 'general'){
      res.setHeader('location', '/chat');
      res.statusCode = 302;
      res.end();
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

const RoomChatAdmin = ({token}) => {
  return (
    <>
      <title>Room Chat | MugLife</title>
      <Navbar token={token} />
      <div className="pt-[100px] font-poppins">
        <div className="lg:bg-[url('../assets/background-chat.png')] bg-cover bg-no-repeat pb-[89px]">
          <div className="lg:pt-[84px] lg:px-[200px] lg:flex ">
            <div className=" py-[60px] px-3 lg:px-[50px]  bg-[#553b2e] lg:rounded-l-[20px]">
              <div className="border-1 flex items-center bg-white py-[18px] pl-[35px] pr-[40px] rounded-[30px] mb-[43px]">
                <Image src={search} alt="search" className="mr-[14px]" />
                <input
                  placeholder="Search Chat"
                  className="focus:outline-none"
                />
              </div>
              <p className="text-[14px] font-bold mb-[43px] pl-[30px] text-white">
                                Click a conversation to start a chat
              </p>
              <div className="flex mb-[20px] text-white">
                <Image
                  src={woman}
                  alt="zulaikha"
                  className="w-[80px] h-[81px] mr-[14px] rounded-[50%]"
                />
                <div>
                  <p className="text-[20px] font-bold mb-[10px]">Zulaikha</p>
                  <p className="w-[210px] text-[15px]">
                                        Hey jason, I can’t find the promo section. Can u tell me
                                        where is it?
                  </p>
                </div>
              </div>
              <hr className="mb-[78px]" />
              <div>
                <p className="text-[15px] text-center text-white">
                                    You have no conversation, start chat other staff! Have a good
                                    day!
                </p>
              </div>
            </div>
            <div className="bg-white px-[36px] py-[28px] lg:w-[1133px] rounded-r-[20px] h-[1100px]">
              <div className="mb-[100px]">
                <p className="text-[#3C2A21] text-[30px] font-bold leading-[45px] mb-[70px]">
                                    Zulaikha
                </p>
                <div className="flex mb-[20px] text-white">
                  <Image
                    src={woman}
                    alt="zulaikha"
                    className="w-[55px] h-[67px] mr-[29px] rounded-[50%]"
                  />
                  <div>
                    <p className="text-[#3C2A21] text-[15px] leading-[22px]">
                                            Hey jason, I can’t find the promo section. Can u tell me
                                            where is it?
                    </p>
                  </div>
                  <span className="text-[#9F9F9F] text-[10px] leading-[15px] w-[45px]">
                                        02.14 PM
                  </span>
                </div>
                <hr className="mb-[34px]" />
                <div className="flex mb-[20px]">
                  <span className="text-[#9F9F9F] text-[10px] leading-[15px] mr-[12px] flex-1">
                                        02.14 PM
                  </span>
                  <RiCheckDoubleFill className="text-[#3C2A21]" />
                  <div className="text-end mr-[29px]">
                    <p className="text-[#3C2A21] text-[15px] leading-[22px]">
                                            it’s on the left corner on the product menu
                    </p>
                  </div>
                  <Image
                    src={profile1}
                    alt="man"
                    className="w-[55px] h-[67px] rounded-[50%]"
                  />
                </div>
                <hr className="mb-[34px]" />
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
  );
};

export default RoomChatAdmin;