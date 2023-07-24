import Image from 'next/image';
import Link from 'next/link';
import coffee from '@/assets/cold-brew.png';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImage from '@/assets/ecommerce-default-product.png';

import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import { useRouter } from 'next/router';
import React from 'react';
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


const ProductDetails = ({token}) => {
  const router = useRouter();
  const {query: {id}} = useRouter();
  const [product, setProduct] = React.useState({});
  const [delivery, setDelivery] = React.useState([]);
  const [variant, setVariant] = React.useState([]);
  const [price, setPrice] = React.useState('');

  const doDelete = async()=>{
    const {data} = await http().delete('/products/:id');
    if(data.results){
      router.push('/admin/product');
    }
        
  };

  const getProductDetail = React.useCallback(async()=>{
    try {
      const {data} = await http().get('/products/'+ id);
      setProduct(data.results);
      setVariant(data.results.variant);
      console.log(data.results.variant);

    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log(message);
    }
  },[id]);

  const getDelivery = React.useCallback(async()=>{
    try {
      const {data} = await http().get('/delivery-method');
      setDelivery(data.results);
    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log(message);
    }
  },[]);

  React.useEffect(()=>{
    getProductDetail();
    getDelivery();
  }, [getProductDetail, getDelivery]);
  return (
    <>
      <title>Detail Product | MugLife</title>

      {/* Navbar */}
      <Navbar token={token}></Navbar>

      {/* Konten */}
      <main className='relative bg-[#E5E5CB] pt-[150px] pb-[10%]'>
        <div className='flex'>
          <div className='ml-[5%]'>
            <div className='flex gap-0.5 text-gray-500'>
              <div>Favorite & Promo {'>'}</div>
              <div className="text-[#3C2A21] font-semibold">{product.name}</div>
            </div>

            <div className='flex flex-col justify-center items-center mt-[40px]'>
              {product.picture ? (<Image width={400} height={400} src={product.picture} className="rounded-full h-[400px] w-[400px]" alt="Product-Image"/>) 
                : (<Image src={ProductImage} className="rounded-full h-[400px] w-[400px]" alt="Product-Image"/>) }
              <div className='text-center'>
                <div className='font-bold text-[65px] text-[#3C2A21]'>{product.name}</div>
                {!price && <div className="text-3xl text-secondary font-semibold py-6">{`IDR${Number(variant[0]?.price).toLocaleString('id')}`}</div>}
                {variant.map(items=>{
                  return(
                    <div key={`price${items.code}`} >
                      {price === items.price && <div className="text-3xl text-secondary font-semibold py-6">{`IDR${Number(items.price).toLocaleString('id')}`}</div>}
                    </div>
                  );
                })}
                                
                <div className='flex flex-col gap-[25px]'>
                  <button className='font-semibold bg-[#D5CEA3] hover:bg-[#d8d2a7] text-[#3C2A21] py-5 w-full rounded-lg'>Add to Cart</button>
                  <button className='font-semibold bg-[#7D6E83] hover:bg-[#3C2A21] py-5 w-full rounded-lg text-white'>Ask a staff</button>
                  <button onClick={()=>window.my_modal_1.showModal()} className='font-semibold bg-black hover:bg-[#666A6D] py-5 w-full rounded-lg text-white'>Delete Menu</button>
                  <dialog id="my_modal_1" className="modal">
                    <form method="dialog" className="modal-box bg-white">
                      <h3 className="font-bold text-lg">Delete Product</h3>
                      <p className="py-4">Are you sure to delete the product?</p>
                      <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex gap-4 w-full justify-end">
                          <button onClick={doDelete} className="btn btn-error normal-case">Delete</button>
                          <button className="btn normal-case btn-primary">Close</button>
                        </div>
                      </div>
                    </form>
                  </dialog>
                </div>
              </div>
            </div>
          </div>


          <div className='ml-[10%]'>
            <div className='bg-[#FFFFFF] px-[84px] py-[10%] w-full rounded-lg'>
              <div className="text-gray-500">
                <div>Delivery only on Monday to </div>
                <div>friday at 1 - 7 pm</div>
              </div>
              <div className='w-96 mt-[43px]'>
                <div className='break-all text-gray-500'>
                  {product?.descriptions}
                </div>
              </div>

              <div className='flex flex-col justify-center items-center gap-[42px]'>
                <div className='mt-[10%] text-[#745241] font-semibold'>Choose a size</div>
                <div className='flex gap-[57px]'>
                  {variant.map(items=>{
                    return(
                      <button onClick={()=>setPrice(items.price)} key={`variant-size${items.name}`} className='bg-[#745241] text-[#D5CEA3] hover:bg-[#8f6a57] cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center font-bold text-[20px]'>{items.code}</button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-[46px] gap-[27px]'>
              <div className="text-[#745241] font-semibold">Choose Delivery Method</div>
              <div className='flex gap-5'>
                {delivery.map(items=>{
                  return(
                    <button disabled={items.name !== product.deliveryMethod } key={`delivery-${items.id}`} className='btn normal-case border-none bg-[#F4F4F8] text-[#D5CEA3] hover:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg'>{items.name}</button>
                  );
                })}
              </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
              <div className="text-[#745241] font-semibold px-4">Set Time</div>
              <div>
                <input
                  className="h-11 text-[#745241] px-6 pl-6 w-full outline-none bg-[#E5E5CB] border-b-2 border-gray-700 focus:border-[#7D6E83] peer"
                  type="text"
                  placeholder="Enter the time you’ll arrived"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className='flex bg-[#F8EDE3] justify-center items-center gap-[48px] mr-[-100px]'>
        <div className='absolute flex bg-[#FFFFFF] justify-center items-center rounded-lg px-[32px] py-[28px] gap-[46px] mr-[450px] shadow-lg shadow-gray-600'>
          <div>
            {product.picture ? (<Image src={product.picture} className="rounded-full" width="50" height="50" alt="Product-Image"/>) 
              : (<Image src={ProductImage} className="rounded-full" width="50" height="50" alt="Product-Image"/>) }
          </div>
          <div className='grow'>
            <div className="text-[#745241] font-semibold">{product.name}</div>
            <div className="text-[#745241]">x1 (Large)</div>
            <div className="text-[#745241]">x1 (Regular)</div>
          </div>
          <div className='flex gap-[27px]'>
            <div className='bg-[#3C2A21] cursor-pointer h-10 w-10 rounded-full flex justify-center items-center'>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            </div>
            <div className='text-[#745241] font-semibold text-[25px]'>2</div>
            <div className='bg-[#3C2A21] cursor-pointer h-10 w-10 rounded-full flex justify-center items-center'>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
          </div>
        </div>
        <div className='absolute flex pl-[300px]'>
          <button className=' bg-[#3C2A21] hover:bg-[#5a3f32] py-[45px] px-[57px] rounded-lg shadow-lg shadow-gray-600 text-white font-bold text-[25px]'>Checkout</button>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default ProductDetails;
