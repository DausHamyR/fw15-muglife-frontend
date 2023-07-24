import Image from 'next/image';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { Trash2 } from 'react-feather';
import React from 'react';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import { useSelector } from 'react-redux';
import http from '@/helpers/http.helper';
import ProductImage from '@/assets/ecommerce-default-product.png';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
  const token = req.session?.token;
  checkCredentials(token, res, '/auth/login');

  return {
    props: {
      token,
    },
  };
}, cookieConfig);

const History = ({ token }) => {
  const profile = useSelector((state) => state.profile.data);

  const [history, setHistory] = React.useState([]);

  const getHistory = React.useCallback(async () => {
    try {
      const { data } = await http(token).get('/transactions/history');
      setHistory(data.results);
    } catch (error) {
      const message = error?.response?.data?.message;
      return console.log('error fetching data');
    }
  }, []);
  console.log(history);
  React.useEffect(() => {
    getHistory();
  }, [getHistory]);
  return (
    <>
      <title>History | MugLife</title>
      <Navbar token={token} />
      <div className="max-w-full max-h-full pt-[80px]">
        <div className="bg-history_bg bg-no-repeat bg-cover pb-[100px]">
          <div className="flex flex-col justify-center items-center leading-10 pt-[100px]">
            <h1 className="text-white text-4xl font-bold">Let’s see what you have bought!</h1>
            <p className="text-white">Long press to delete item</p>
          </div>

          <div className="flex flex-col justify-center items-center pt-20 px-11">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 cursor-pointer">
              {history.map((item) => {
                return (
                  <div key={`item-id-prod-${item.id}`} className="w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50">
                    <div className="py-5 px-5 flex gap-5">
                      {item?.items[0]?.picture ? (
                        <Image width={96} height={96} src={item?.items[0]?.picture} className="rounded-full h-[96px] w-[96px]" alt="Product-Image" />
                      ) : (
                        <Image src={ProductImage} className="rounded-full h-[96px] w-[96px]" alt="Product-Image" />
                      )}
                      <div className="flex-1 text-lg">
                        <p className="font-bold text-2xl text-[#3C2A21]">{item?.items[0].name}</p>
                        <p className="text-[#3C2A21]">IDR {item?.total}</p>
                        <p className="text-[#65493a]">{item?.status_payment === 2 ? 'Paid' : 'pending'}</p>
                      </div>
                    </div>
                    <button className="absolute right-3 top-3">
                      <Trash2 className="text-2xl text-[#6A4029]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default History;
