import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';
import { AiFillCamera } from 'react-icons/ai';

function NewProduct() {
    return (
        <>
            <Head>
                <title>New Product</title>
            </Head>
            <Header />
            <main className="pt-28">
                <div className="w-full flex flex-col items-start justify-start gap-11 px-5 sm:px-11 lg:px-36 py-11">
                    <div className="w-full text-lg font-semibold">
                        Fafourite Promo <span className="text-lg text-primary font-semibold">{`>`} Add new product</span>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-11 lg-gap-0">
                        <div className="w-full md:w-[40%] flex flex-col items-center gap-12">
                            <div className="w-full md:max-w-[400px] flex flex-col items-center justify-center gap-5">
                                <div className="w-48 lg:w-72 flex items-center justify-center pb-4">
                                    <div className="w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-blue-gray-100 flex items-center justify-center">
                                        <i>
                                            <AiFillCamera size={60} className="text-blue-gray-200" />
                                        </i>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button className="btn btn-black text-white capitalize w-full">take a picture</button>
                                </div>
                                <div className="w-full">
                                    <button className="btn btn-accent text-white capitalize w-full">choose from galery</button>
                                </div>
                            </div>

                            <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                <div className="text-xl text-primary font-semibold">Delivery Hour :</div>
                                <div className="w-full">
                                    <div className="text-sm">Input start hour</div>
                                    <input type="time" name="" id="" className="w-full input input-accent" placeholder="Input start hour" />
                                </div>
                                <div className="w-full">
                                    <div className="text-sm">Input end hour</div>
                                    <input type="time" name="" id="" className="w-full input input-accent" placeholder="Input end hour" />
                                </div>
                            </div>
                            <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                <div className="text-xl text-primary font-semibold">Input stock</div>
                                <div className="w-full">
                                    <input type="text" className="w-full input input-accent" placeholder="Input Stock" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[60%] flex flex-col items-center">
                            <div className="w-full md:max-w-[600px] flex flex-col items-start gap-9">
                                <div className="w-full flex flex-col items-start gap-2 ">
                                    <div className="w-full text-primary text-lg font-semibold">Name :</div>
                                    <div className="w-full border-b border-secondary">
                                        <input type="text" name="" id="" className=" h-11 border-none outline-none w-full text-primary bg-transparent" placeholder="Type product name min. 50 characters" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start gap-2 ">
                                    <div className="w-full text-primary text-lg font-semibold">Price :</div>
                                    <div className="w-full border-b border-secondary">
                                        <input type="text" name="" id="" className=" h-11 border-none outline-none w-full text-primary bg-transparent" placeholder="Type the price" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start gap-2 ">
                                    <div className="w-full text-primary text-lg font-semibold">Description :</div>
                                    <div className="w-full border-b border-secondary">
                                        <input type="text" name="" id="" className=" h-11 border-none outline-none w-full text-primary bg-transparent" placeholder="Describe your product min. 150 characters" />
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-start gap-2">
                                    <div className="text-primary text-lg font-semibold">Input product size :</div>
                                    <div className="text-base">Click size you want to use for this product</div>
                                    <div className="w-full flex items-center justify-center sm:justify-start lg:justify-between flex-wrap gap-5">
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">R</div>
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">L</div>
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">XL</div>
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center">250 gr</div>
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center">300 gr</div>
                                        <div className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center">500 gr</div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-start gap-2 ">
                                    <div className="text-primary text-lg font-semibold">Input delivery methods :</div>
                                    <div className="text-base">Click methods you want to use for this product</div>
                                    <div className="w-full flex items-center justify-between gap-1 md:gap-5">
                                        <div className="btn btn-accent w-24 lg:w-44 capitalize text-primary">Home delivery</div>
                                        <div className="btn btn-accent w-24 lg:w-44 capitalize text-primary">Dine In</div>
                                        <div className="btn btn-disabled w-24 lg:w-44 capitalize text-primary">Take Away</div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-start gap-5 mt-11 ">
                                    <div className="w-full">
                                        <button className="btn btn-secondary text-white capitalize w-full">Save NewProduct</button>
                                    </div>
                                    <div className="w-full">
                                        <button className="btn btn-neutral text-white capitalize w-full">cancel</button>
                                    </div>
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

export default NewProduct;
