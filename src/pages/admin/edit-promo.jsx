import React from 'react';
import { Edit2 } from 'react-feather';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Header';
import Footer from '../../components/Footer';
import promo from '../../assets/image 29.svg';

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
      res.setHeader('location', '/product');
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

const EditPromo = () => {
  return (
    <>
      <title>Edit Promo | MugLife</title>
      <Navbar />

      {/* Edit promo */}
      <section className='bg-white px-5 md:px-28 py-8 pt-[150px]'>
        <div className='flex items-center'>
          <p className='flex-1'>Favorite & Promo <span className='font-bold text-[#3C2A21]'>&gt; Edit promo</span></p>
          <Link href='/admin/product' className='font-bold text-[#3C2A21] cursor-pointer'>Cancel</Link>
        </div>
        <form className='flex flex-col md:flex-row gap-5 md:gap-28 py-16'>
          {/* Left */}
          <div className='flex-[35%]'>
            <div className='bg-[#3C2A21] rounded-xl flex flex-col items-center py-8'>
              <div className='relative w-fit mb-5'>
                <>
                  <div>
                    <Image src={promo} alt='promoPicture' className='rounded-full w-full h-[130px]' width={100} height={100} />
                  </div>
                  <div className='absolute right-0 bottom-0 w-8 h-8'>
                    <button type='button' className='btn btn-circle btn-sm bg-[#D5CEA3] hover:bg-[#3C2A21] border-none'>
                      <Edit2 className='p-1 text-[#3C2A21] hover:text-[#D5CEA3] ' />
                    </button>
                  </div>
                </>
              </div>
              <div className='text-center font-bold text-3xl mb-5 text-[#D5CEA3]'>
                <p>Beef Spaghetti</p>
                <p>20% OFF</p>
              </div>
              <div className='flex justify-center text-center mb-5'>
                <p className='px-10 text-[#D5CEA3]'>Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</p>
              </div>
              <div className='text-center text-[#D5CEA3] border-t border-dashed border-[#D5CEA3] w-full py-5'>
                <p>COUPON CODE</p>
                <p className='text-3xl font-bold my-3'>FNPR15RG</p>
                <p>Valid untill October 10th 2020</p>
              </div>
            </div>
            <div className='mt-8'>
              <label className='font-bold text-[#3C2A21]'>Expire date :</label>
              <br/>
              <input name='promoStartDate' placeholder='Select start date' className='input input-bordered focus:outline-none mt-3 ' />
              <input name='promoEndDate' placeholder='Select end date' className='input input-bordered focus:outline-none mt-3 ' />
            </div>
            <div className='mt-5 md:mt-8'>
              <label className='font-bold text-[#3C2A21]'>Input coupon code :</label>
              <br/>
              <input type='text' name='discount' placeholder='Input promo code' className='input input-bordered focus:outline-none mt-3 ' />
            </div>
          </div>

          {/* Right */}
          <div className='flex-[65%]'>
            <div className='mb-5'>
              <label className='font-bold text-[#3C2A21]'>Name:</label>
              <br/>
              <input type='text' defaultValue='Beef Spaghetti' name='name' placeholder='Type promo name min. 50 characters' className='input input-bordered rounded-xl mt-2 focus:outline-none' />
            </div>
            <div className='mb-5'>
              <label className='font-bold text-[#3C2A21]'>Price :</label>
              <br/>
              <input type='text' defaultValue='70.000' name='normalPrice' placeholder='Type the price' className='input input-bordered rounded-xl mt-2 focus:outline-none' />
            </div>
            <div className='mb-5'>
              <label className='font-bold text-[#3C2A21]'>Description :</label>
              <br/>
              <input type='text' defaultValue='Buy 1 Choco Oreo and get 20% off for Beef Spaghetti' name='description' placeholder='Describe your promo min. 150 characters' className='input input-bordered rounded-xl mt-2 focus:outline-none' />
            </div>
            <div className='mb-10'>
              <label className='font-bold text-[#3C2A21]'>Input product size :</label>
              <p className='mt-2 mb-5'>Click product size you want to use for this promo</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center w-12 h-12 bg-[#BABABA59] rounded-full'>
                  <p className='font-bold'>R</p>
                </div>
                <div className='flex items-center justify-center w-12 h-12 bg-[#BABABA59] rounded-full'>
                  <p className='font-bold'>L</p>
                </div>
                <div className='flex items-center justify-center w-12 h-12 bg-[#BABABA59] rounded-full'>
                  <p className='font-bold'>XL</p>
                </div>
                <div className='flex items-center justify-center w-12 h-12 bg-[#3C2A21] text-white rounded-full'>
                  <p className='font-bold text-xs text-center'>250<br />gr</p>
                </div>
                <div className='flex items-center justify-center w-12 h-12 bg-[#3C2A21] text-white rounded-full'>
                  <p className='font-bold text-xs text-center'>300<br />gr</p>
                </div>
                <div className='flex items-center justify-center w-12 h-12 bg-[#3C2A21] text-white rounded-full'>
                  <p className='font-bold text-xs text-center'>500<br />gr</p>
                </div>
              </div>
            </div>
            <div className='mb-5'>
              <label className='font-bold text-[#3C2A21]'>Input delivery methods :</label>
              <p className='mt-2 mb-5 text-[#4c352a]'>Click methods you want to use for this promo</p>
              <div className='grid grid-cols-3 gap-3'>
                <div>
                  <button type='button' className='btn bg-[#D5CEA3] hover:bg-[#e6dfb1] border-0 font-bold w-full text-[#3C2A21]'>Home Delivery</button>
                </div>
                <div>
                  <button type='button' className='btn bg-[#D5CEA3] hover:bg-[#e6dfb1] border-0 font-bold w-full text-[#3C2A21]'>Dine in</button>
                </div>
                <div>
                  <button type='button' className='btn bg-[#D5CEA3] hover:bg-[#e6dfb1] border-0 font-bold w-full text-[#3C2A21]'>Take away</button>
                </div>
              </div>
            </div>
            <div className='mb-14'>
              <label className='font-bold text-[#3C2A21]'>Enter the discount :</label>
              <div className='w-1/4'>
                <input type='text' defaultValue='20%' name='discount' className=' input input-bordered rounded-xl mt-2 focus:outline-none' />
              </div>
            </div>
            <div>
              <div className='mt-14'>
                <button type='submit' className='btn btn-lg bg-[#3C2A21] hover:bg-[#593e31] text-white border-0 font-bold'>Save Change</button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default EditPromo;