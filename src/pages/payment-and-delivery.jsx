import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import { AiFillCreditCard, AiOutlineLoading3Quarters, AiTwotoneBank } from 'react-icons/ai';
import { MdDeliveryDining } from 'react-icons/md';
import ProductImage from '@/assets/ecommerce-default-product.png';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from 'iron-session/next';
import checkCredentials from '@/helpers/checkCredentials';
import { useSelector } from 'react-redux';
import http from '@/helpers/http.helper';
import { useRouter } from 'next/router';

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, '/auth/login');

    return {
        props: {
            token,
        },
    };
}, cookieConfig);

function PaymmentAndDelivery({ token }) {
    const profile = useSelector((state) => state.profile.data);
    const router = useRouter();
    const [transaction, setTransaction] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState([]);
    const [selectedPayment, setSelectedPayment] = React.useState(1);
    const [openModal, setOpenModoal] = React.useState(false);

    // const grandTotal = (parseInt(transaction[0]?.total) * 10) / 100 + parseInt(transaction[0]?.total);
    // console.log(grandTotal);

    const getPM = React.useCallback(async () => {
        try {
            const { data } = await http().get(`/payment-method`);
            setPaymentMethod(data.results);
        } catch (error) {
            const message = error?.response?.data?.message;
            return console.log('error fetching data');
        }
    }, []);

    // console.log(paymentMethod);
    const getTransaction = React.useCallback(async () => {
        try {
            const { data } = await http(token).get(`/transactions`);
            setTransaction(data.results);
        } catch (error) {
            const message = error?.response?.data?.message;
            return console.log('error fetching data');
        }
    }, [token]);

    const doPayment = async (e) => {
        e.preventDefault();
        setOpenModoal(true);

        const trId = transaction[0]?.id;
        const totalPay = (parseInt(transaction[0]?.total) * 10) / 100 + parseInt(transaction[0]?.total);
        const form = new URLSearchParams({
            id: trId,
            payment_method: selectedPayment,
            total: totalPay,
        }).toString();

        // console.log(form);
        const { data } = await http(token).post('/payment-method', form);
        router.push('/history');
        setOpenModoal(false);
    };

    React.useEffect(() => {
        getTransaction();
        getPM();
    }, [getTransaction, getPM]);

    // console.log(transaction[0]);
    return (
        <>
            <Head>
                <title>Payment & Delivery | MugLife</title>
            </Head>
            <Header token={token} />
            <main className="pt-28">
                <div className="w-full bg-payment-pattern bg-no-repeat bg-cover py-11 px-7 lg:px-36 xl:px-64">
                    <div className="w-full mb-11">
                        <div className="w-72 text-4xl text-white font-semibold capitalize ">Checkout your item now!</div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-start gap-7">
                        <div className="w-full md:flex-1">
                            <div className="w-full md:max-w-[450px] flex flex-col items-center justify start gap-11 px-5 md:px-11 py-11 rounded-3xl  bg-white">
                                <div className="text-primary text-3xl font-semibold font-label-food">Order sumary</div>
                                {transaction[0]?.items?.map((item) => {
                                    return (
                                        <div key={`item-product-${item.code}`} className="w-full h-24 flex items-start justify-between gap-7 ">
                                            {item.picture ? (
                                                <Image width={96} height={96} src={item.picture} className="rounded-full h-[96px] w-[96px]" alt="Product-Image" />
                                            ) : (
                                                <Image src={ProductImage} className="rounded-full h-[96px] w-[96px]" alt="Product-Image" />
                                            )}
                                            <div className="flex flex-col items-start justify-between max-w-[188px] overflow-hidden">
                                                <div className="text-primary text-lg max-w-[188px] overflow-hidden">{item?.name}</div>
                                                <div className="text-primary text-lg">x{item?.quantity}</div>
                                                <div className="text-primary text-lg">{item.code === 'R' ? 'Regular' : item.code === 'L' ? 'Large' : item.code === 'XL' ? 'Extra Large' : items.variant}</div>
                                            </div>
                                            <div className="h-full flex items-center justify-center text-primary text-lg">IDR {item?.price}</div>
                                        </div>
                                    );
                                })}

                                <div className="w-full border-t border-grey-600 flex flex-col items-center gap-2 pt-7">
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>SUBTOTAL</div>
                                        <div className="text-start">IDR {transaction[0]?.total}</div>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>TAX AND FEES</div>
                                        <div className="text-start">IDR {(parseInt(transaction[0]?.total) * 10) / 100}</div>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>SHIPPING</div>
                                        <div className="text-start">IDR -</div>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between text-primary text-2xl font-semibold uppercase">
                                    <div>TOTAL</div>
                                    <div className="text-start">IDR {(parseInt(transaction[0]?.total) * 10) / 100 + parseInt(transaction[0]?.total)} </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={doPayment} className="w-full md:flex-1">
                            <div className="w-full md:max-w-[650px] flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl text-white font-bold capitalize">Address details</div>
                                    <div className="text-white font-semibold">Edit</div>
                                </div>
                                <div className="bg-white w-full rounded-3xl p-7 flex flex-col items-start gap-3">
                                    <div className="w-full pb-3 text-lg text-primary border-b border-gray-200">
                                        <span className="font-bold">Delivery</span> to Iskandar Street
                                    </div>
                                    <div className="w-full pb-3 text-lg text-primary border-b border-gray-200">Km 5 refinery road oppsite re public road, effurun, Jakarta</div>
                                    <div className="w-full pb-3 text-lg text-primary">+62 81348287878</div>
                                </div>
                                <div className="text-2xl text-white font-bold capitalize mt-7">Payment Methods</div>
                                <div className="bg-white w-full rounded-3xl p-7 flex flex-col items-start gap-3">
                                    <div className="w-full h-20 flex items-center justify-start gap-5 border-b border-gray-200">
                                        <div className="w-4 h-full flex items-center justify-center">
                                            <input type="radio" name="payment" value="2" onChange={(e) => setSelectedPayment(e.target.value)} id="" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-neutral rounded-xl">
                                            <AiFillCreditCard size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Card</div>
                                    </div>
                                    <div className="w-full h-20 flex items-center justify-start gap-5 border-b border-gray-200">
                                        <div className="w-4 h-full flex items-center justify-center">
                                            <input type="radio" name="payment" value="1" onChange={(e) => setSelectedPayment(e.target.value)} id="" defaultChecked="1" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-xl">
                                            <AiTwotoneBank size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Bank Account</div>
                                    </div>
                                    <div className="w-full h-20 flex items-center justify-start gap-5">
                                        <div className="w-4 h-full flex items-center justify-center">
                                            <input type="radio" name="payment" value="3" onChange={(e) => setSelectedPayment(e.target.value)} id="" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-xl">
                                            <MdDeliveryDining size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Cash on delivery</div>
                                    </div>
                                </div>
                                <div className="w-full mt-7">
                                    <button type="submit" className="w-full btn btn-secondary rounded-2xl text-white text-lg font-semibold capitalize">
                                        Confirm and Pay
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
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
}

export default PaymmentAndDelivery;
