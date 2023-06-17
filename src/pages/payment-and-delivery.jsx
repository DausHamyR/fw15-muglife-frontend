import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';
import food from '../assets/foods.png';
import Image from 'next/image';
import { AiFillCreditCard, AiTwotoneBank } from 'react-icons/ai';
import { MdDeliveryDining } from 'react-icons/md';

function PaymmentAndDelivery() {
    return (
        <>
            <Head>
                <title>Payment & Delivry</title>
            </Head>
            <Header />
            <main className="pt-28">
                <div className="w-full bg-payment-pattern bg-no-repeat bg-cover py-11 px-7 lg:px-36 xl:px-64">
                    <div className="w-full mb-11">
                        <div className="w-72 text-4xl text-white font-semibold capitalize ">Checkout your item now!</div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-start gap-7">
                        <div className="w-full md:flex-1">
                            <div className="w-full md:max-w-[450px] flex flex-col items-center justify start gap-11 px-5 md:px-11 py-11 rounded-3xl  bg-white">
                                <div className="text-primary text-3xl font-semibold font-label-food">Order sumary</div>
                                <div className="w-full h-24 flex items-start justify-between gap-7 ">
                                    <div className="w-24 h-24 overflow-hidden rounded-2xl">
                                        <Image src={food} width={96} height={96} alt="" />
                                    </div>
                                    <div className="flex flex-col items-start justify-between max-w-[188px] overflow-hidden">
                                        <div className="text-primary text-lg max-w-[188px] overflow-hidden">Hazzelnut Latte</div>
                                        <div className="text-primary text-lg">x1</div>
                                        <div className="text-primary text-lg">Regular</div>
                                    </div>
                                    <div className="h-full flex items-center justify-center text-primary text-lg">IDR 24.0</div>
                                </div>
                                <div className="w-full h-24 flex items-start justify-between gap-7 ">
                                    <div className="w-24 h-24 overflow-hidden rounded-2xl">
                                        <Image src={food} width={96} height={96} alt="" />
                                    </div>
                                    <div className="flex flex-col items-start justify-between max-w-[188px] overflow-hidden">
                                        <div className="text-primary text-lg max-w-[188px] overflow-hidden">Hazzelnut Latte</div>
                                        <div className="text-primary text-lg">x1</div>
                                        <div className="text-primary text-lg">Regular</div>
                                    </div>
                                    <div className="h-full flex items-center justify-center text-primary text-lg">IDR 24.0</div>
                                </div>
                                <div className="w-full border-t border-grey-600 flex flex-col items-center gap-2 pt-7">
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>SUBTOTAL</div>
                                        <div className="text-start">IDR 120.000</div>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>TAX AND FEES</div>
                                        <div className="text-start">IDR 20.000</div>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-primary text-lg uppercase">
                                        <div>SHIPPING</div>
                                        <div className="text-start">IDR 10.000</div>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between text-primary text-2xl font-semibold uppercase">
                                    <div>TOTAL</div>
                                    <div className="text-start">IDR 150.000</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:flex-1">
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
                                            <input type="radio" name="payment" id="" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-neutral rounded-xl">
                                            <AiFillCreditCard size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Card</div>
                                    </div>
                                    <div className="w-full h-20 flex items-center justify-start gap-5 border-b border-gray-200">
                                        <div className="w-4 h-full flex items-center justify-center">
                                            <input type="radio" name="payment" id="" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-xl">
                                            <AiTwotoneBank size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Bank Account</div>
                                    </div>
                                    <div className="w-full h-20 flex items-center justify-start gap-5">
                                        <div className="w-4 h-full flex items-center justify-center">
                                            <input type="radio" name="payment" id="" />
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-xl">
                                            <MdDeliveryDining size={25} className="text-white" />
                                        </div>
                                        <div className="text-primary text-lg">Cash on delivery</div>
                                    </div>
                                </div>
                                <div className="w-full mt-7">
                                    <button className="w-full btn btn-secondary rounded-2xl text-white text-lg font-semibold capitalize">Confirm and Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PaymmentAndDelivery;
