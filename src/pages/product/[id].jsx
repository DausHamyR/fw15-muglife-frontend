import Image from 'next/image';
import coffee from '@/assets/cold-brew.png';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImage from '@/assets/ecommerce-default-product.png';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import cookieConfig from '@/helpers/cookieConfig';
import React from 'react';
import Link from 'next/link';
import http from '@/helpers/http.helper';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token || null;
  return {
    props: {
      token,
    },
  };
}, cookieConfig);

const ProductDetails = ({ token }) => {
  const profile = useSelector((state) => state.profile.data);

  const {
    query: { id },
  } = useRouter();
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const [delivery, setDelivery] = React.useState([]);
  const [variant, setVariant] = React.useState([]);
  const [price, setPrice] = React.useState('');
  const [charts, setCharts] = React.useState([]);
  const [variantCode, setVariantCode] = React.useState('');
  const [errSelectVar, setErrSelectVar] = React.useState('');
  const [quantityItem, setQuntityItem] = React.useState(1);
  const [openModal, setOpenModoal] = React.useState(false);

  // console.log(JSON.stringify(charts));

  const getChart = React.useCallback(async () => {
    try {
      const { data } = await http(token).get('/charts');
      setCharts(data.results);
    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log(message);
    }
  }, [token]);

  // const fixChart = JSON.stringify(charts);

  const processAddTransaction = async (fixChart) => {
    setOpenModoal(true);
    const dataTransaction = {
      itemId: fixChart.map((item) => item.item_id.toString()),
      variant: fixChart.map((item) => item.variant),
      quantity: fixChart.map((item) => item.quantity),
    };
    if (fixChart.length <= 1) {
      const formattedData = {};
      Object.keys(dataTransaction).forEach((key) => {
        formattedData[key] = [dataTransaction[key]];
      });

      const params = new URLSearchParams();

      Object.entries(formattedData).forEach(([key, value]) => {
        value.forEach((item) => {
          params.append(key + '[]', item);
        });
      });

      const { data } = await http(token).post('/transactions', params.toString());
      router.push('/payment-and-delivery');
      setOpenModoal(false);
    } else {
      const params = new URLSearchParams();

      Object.keys(dataTransaction).forEach((key) => {
        dataTransaction[key].forEach((value) => {
          params.append(key, value);
        });
      });

      const { data } = await http(token).post('/transactions', params.toString());
      router.push('/payment-and-delivery');
      setOpenModoal(false);
    }
  };

  const handleChangePrice = (price, code) => {
    setPrice(price);
    setVariantCode(code);
  };

  const handleIncrement = () => {
    setQuntityItem(quantityItem + 1);
  };

  const handleDecrement = () => {
    if (quantityItem === 1) {
      return false;
    }
    setQuntityItem(quantityItem - 1);
  };
  const processAddToCart = async (item_id) => {
    if (variantCode === '') {
      setErrSelectVar('Please Select the variant');
      return;
    } else {
      setErrSelectVar('');
    }

    const dataChart = {
      id: profile.user_id,
      item_id: item_id,
      variant: variantCode,
      quantity: quantityItem,
    };
    const body = new URLSearchParams(dataChart).toString();
    const { data } = await http(token).post('/charts', body);
    getChart();
  };

  const getProductDetail = React.useCallback(async () => {
    try {
      const { data } = await http().get('/products/' + id);
      setProduct(data.results);
      setVariant(data.results.variant);
    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log(message);
    }
  }, [id]);

  const getDelivery = React.useCallback(async () => {
    try {
      const { data } = await http().get('/delivery-method');
      setDelivery(data.results);
    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log(message);
    }
  }, []);

  React.useEffect(() => {
    getProductDetail();
    getDelivery();
    getChart();
  }, [getProductDetail, getDelivery, getChart]);

  React.useEffect(() => {
    if (!token) {
      setShowModal(true);
    }
    if (token) {
      setShowModal(false);
    }
  }, [token]);

  return (
    <>
      <title>Detail Product | MugLife</title>

      {/* Navbar */}
      <Navbar token={token}></Navbar>

      {showModal && (
        <dialog id="my_modal_1" className="modal bg-white bg-opacity-60" open>
          <form method="dialog" className="modal-box bg-white">
            <h3 className="font-bold text-lg">Hallo!</h3>
            <p className="py-4">Want to order? please do login first</p>
            <div className="modal-action">
              <Link href="/auth/login" className="btn w-36">
                                Ok
              </Link>
            </div>
          </form>
        </dialog>
      )}

      {/* Konten */}
      <main className="relative bg-[#E5E5CB] pt-[150px] pb-[10%]">
        <div className="flex">
          <div className="ml-[5%]">
            <div className="flex gap-0.5 text-gray-500">
              <div>Favorite & Promo {'>'}</div>
              <div className="text-[#3C2A21] font-semibold">{product?.name}</div>
            </div>

            <div className="flex flex-col justify-center items-center mt-[40px]">
              {product.picture ? (
                <Image width={400} height={400} src={product.picture} className="rounded-full h-[400px] w-[400px]" alt="Product-Image" />
              ) : (
                <Image src={ProductImage} className="rounded-full h-[400px] w-[400px]" alt="Product-Image" />
              )}
              <div className="text-center">
                <div className="font-bold text-[65px] text-[#3C2A21]">{product?.name}</div>
                {!price && <div className="text-3xl text-secondary font-semibold py-6">{`IDR${Number(variant[0]?.price).toLocaleString('id')}`}</div>}
                {variant.map((items) => {
                  return <div key={`price${items.code}`}>{price === items.price && <div className="text-3xl text-secondary font-semibold py-6">{`IDR${Number(items.price).toLocaleString('id')}`}</div>}</div>;
                })}
                <div className="flex flex-col gap-[25px]">
                  <button onClick={() => processAddToCart(product.id)} className="font-semibold bg-[#D5CEA3] hover:bg-[#d8d2a7] text-[#3C2A21] py-5 w-full rounded-lg">
                                        Add to Cart
                  </button>
                  <button className="font-semibold bg-[#7D6E83] hover:bg-[#3C2A21] py-5 w-full rounded-lg text-white">Ask a staff</button>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-[10%]">
            <div className="bg-[#FFFFFF] px-[84px] py-[10%] w-full rounded-lg">
              <div className="text-gray-500">
                <div>Delivery only on Monday to </div>
                <div>friday at 1 - 7 pm</div>
              </div>
              <div className="w-96 mt-[43px]">
                <div className="break-all text-gray-500">{product?.descriptions}</div>
              </div>

              <div className="flex flex-col justify-center items-center gap-[42px]">
                <div className="mt-[10%] text-[#745241] font-semibold">Choose a size</div>
                <div className="flex gap-[57px]">
                  {variant.map((items) => {
                    return (
                      <button
                        onClick={() => handleChangePrice(items.price, items.code)}
                        key={`variant-size${items.name}`}
<<<<<<< HEAD
                        className="bg-info text-black hover:bg-[#8f6a57] focus:bg-[#8f6a57] cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center font-bold text-[20px]"
=======
                        className="bg-info text-black hover:bg-[#8f6a57] cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center font-bold text-[20px]"
>>>>>>> e103e2257e1e9d902b1ba5fbc376377aa26e55b9
                      >
                        {items.code}
                      </button>
                    );
                  })}
                </div>
                {errSelectVar === 'Please Select the variant' ? (
                  <label className="label">
                    <span className="label-text-alt text-error">{errSelectVar}</span>
                  </label>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-[46px] gap-[27px]">
              <div className="text-[#745241] font-semibold">Choose Delivery Method</div>
              <div className="flex gap-5">
                {delivery.map((items) => {
                  return (
                    <button
                      disabled={items.name !== product.deliveryMethod}
                      key={`delivery-${items.id}`}
<<<<<<< HEAD
                      className="btn normal-case border-none bg-[#F4F4F8] text-[#D5CEA3] hover:bg-[#8f6a57] focus:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg"
=======
                      className="btn normal-case border-none bg-[#F4F4F8] text-[#D5CEA3] hover:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg"
>>>>>>> e103e2257e1e9d902b1ba5fbc376377aa26e55b9
                    >
                      {items.name}
                    </button>
                  );
                })}
                {/* <button className='bg-[#745241] text-[#D5CEA3] hover:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg'>Dine In</button>
                                <button className='bg-[#F4F4F8] text-[#D5CEA3] hover:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg'>Door Delivery</button>
                                <button className='bg-[#F4F4F8] text-[#D5CEA3] hover:bg-[#8f6a57] py-3 rounded-lg px-[26px] drop-shadow-lg'>Pick Up</button> */}
              </div>
            </div>
            <div className="flex justify-center items-center mt-10">
              <div className="text-[#745241] font-semibold px-4">Set Time</div>
              <div>
                <input className="h-11 text-[#745241] px-6 pl-6 w-full outline-none bg-[#E5E5CB] border-b-2 border-gray-700 focus:border-[#7D6E83] peer" type="text" placeholder="Enter the time you’ll arrived" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="flex bg-[#F8EDE3] justify-center items-center gap-[48px] mr-[-100px]">
        <div className="absolute flex bg-[#FFFFFF] justify-center items-center rounded-lg px-[32px] py-[28px] gap-[46px] mr-[450px] shadow-lg shadow-gray-600">
          <div>
            <Image src={coffee} className="rounded-full" width="50" height="50" alt="desc"></Image>
          </div>
          <div className="grow">
            <div className="text-[#745241] font-semibold">{product?.name}</div>
            {charts.map((items) => {
              return (
                <div key={`charts-me-${items.id}`} className="text-[#745241]">
                                    x{items.quantity} {items.variant === 'R' ? 'Regular' : items.variant === 'L' ? 'Large' : items.variant === 'XL' ? 'Extra Large' : items.variant}
                </div>
              );
            })}
            {/* <div className="text-[#745241]">x1 (Large)</div>
                        <div className="text-[#745241]">x1 (Regular)</div> */}
          </div>
          <div className="flex gap-[27px]">
            <button onClick={handleDecrement} className="bg-[#3C2A21] cursor-pointer h-10 w-10 rounded-full flex justify-center items-center">
                            -
            </button>
            <div className="text-[#745241] font-semibold text-[25px]">{quantityItem}</div>
            <button onClick={handleIncrement} className="bg-[#3C2A21] cursor-pointer h-10 w-10 rounded-full flex justify-center items-center">
                            +
            </button>
          </div>
        </div>
        <div className="absolute flex ml-[300px]">
          <button onClick={() => processAddTransaction(charts)} className=" bg-[#3C2A21] hover:bg-[#5a3f32] py-[45px] px-[57px] rounded-lg shadow-lg shadow-gray-600 text-white font-bold text-[25px]">
                        Checkout
          </button>
        </div>
      </div>

      <Footer />
      <div>
        <input type="checkbox" id="loading" className="modal-toggle" checked={openModal} />
        <div className="modal">
          <div className="modal-box bg-transparent h-40 shadow-none overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <AiOutlineLoading3Quarters className="animate-spin" size={70} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
