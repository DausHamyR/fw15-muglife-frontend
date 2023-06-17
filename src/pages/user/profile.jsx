import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import food from '../../assets/foods.png';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { IoPencilSharp } from 'react-icons/io5';

function Profile() {
    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <Header />
            <main className="pt-28">
                <div className="w-full bg-payment-pattern bg-no-repeat bg-cover py-11 px-7 lg:px-36 xl:px-64">
                    <div className="w-full mb-11">
                        <div className="w-72 text-4xl text-white font-semibold capitalize ">User Profile</div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-7 xl:gap-16">
                        <div className="w-full md:basis-4/12">
                            <div className="w-full min-h-[350px] rounded-2xl bg-accent pb-4">
                                <div className="w-full flex flex-col items-center justify start gap-5 px-5 md:px-11 py-11 rounded-t-2xl  bg-white">
                                    <div className="relative w-24 h-24">
                                        <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                                            <IoPencilSharp size={13} className="text-white" />
                                        </button>
                                        <div className="w-24 h-24 overflow-hidden rounded-full">
                                            <Image src={food} width={96} height={96} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <div className="h-full flex items-center justify-center text-primary text-lg font-semibold">Zulaikha</div>
                                        <div className="h-full flex items-center justify-center text-primary text-sm">Zulaikha@mail.com</div>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center pt-7">
                                        <div className="w-full flex items-center justify-center text-primary text-mg">Has been ordered 15 product</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:basis-4/6">
                            <div className="w-full min-h-[350px] rounded-2xl  bg-accent pb-4">
                                <div className="relative w-full flex flex-col items-start justify-start gap-7 px-5 md:px-11 py-11 rounded-t-2xl  bg-white">
                                    <button className="absolute top-7 right-7 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                        <IoPencilSharp size={20} className="text-white" />
                                    </button>
                                    <div className="text-primary text-xl font-semibold">Contacts</div>
                                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-7">
                                        <div className="flex-1 w-full flex flex-col items-start justify-between gap-7">
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Email Address :</div>
                                                <div className="text-primary">Zulaikha@mail.com</div>
                                            </div>
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Delivery Address:</div>
                                                <div className="text-primary">Iskandar Street no. 67 Block A Near Bus Stop</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full flex flex-col items-start justify-start gap-7">
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Mobile Number :</div>
                                                <div className="text-primary">Zulaikha@mail.com</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-7 xl:gap-16 mt-16">
                        <div className="w-full md:basis-4/6">
                            <div className="w-full min-h-[450px] rounded-2xl  bg-accent pb-6">
                                <div className="relative w-full h-[96%] flex flex-col items-start justify-start gap-5 px-5 md:px-11 py-11 rounded-t-2xl  bg-white">
                                    <button className="absolute top-7 right-7 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                        <IoPencilSharp size={20} className="text-white" />
                                    </button>
                                    <div className="text-primary text-xl font-semibold">Details</div>
                                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-7">
                                        <div className="flex-1 w-full flex flex-col items-start justify-between gap-7">
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Display Names :</div>
                                                <div className="text-primary">Zulaikha@mail.com</div>
                                            </div>
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Fisrt Name:</div>
                                                <div className="text-primary">Iskandar Street no. 67 Block A Near Bus Stop</div>
                                            </div>
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">Last Name:</div>
                                                <div className="text-primary">Iskandar Street no. 67 Block A Near Bus Stop</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full flex flex-col items-start justify-start gap-7">
                                            <div className="flex w-full flex-col items-start gap-3 border-b border-primary">
                                                <div className="text-lg text-accent">DD/MM/YY</div>
                                                <div className="text-primary">23/12/2021</div>
                                            </div>
                                            <div className="flex w-full flex-col items-start gap-3 ">
                                                <div className="text-lg text-primary flex items-center gap-3">
                                                    <input type="radio" name="gender" id="genChoiceMale" />
                                                    <label htmlFor="genChoiceMale">Male</label>
                                                </div>
                                                <div className="text-lg text-primary flex items-center gap-3">
                                                    <input type="radio" name="gender" id="genChoiceFem" />
                                                    <label htmlFor="genChoiceFem">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:basis-4/12">
                            <div className="w-full min-h-[450px] rounded-2xl ">
                                <div className="w-full h-[96%] flex flex-col items-center justify-between gap-8 px-5 py-11 rounded-t-2xl">
                                    <div className="w-full text-center text-lg text-white font-semibold">Do you want to save the change?</div>
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <button className="w-full btn btn-secondary text-white capitalize rounded-xl">Save Changes</button>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <button className="w-full btn btn-accent text-primary capitalize rounded-xl">Cancel</button>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center mt-7">
                                        <Link href="/edit-password" className="w-full btn btn-neutral text-primary capitalize rounded-xl flex items-center justify-between">
                                            Edit Password <IoIosArrowForward />{' '}
                                        </Link>
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <button className="w-full btn btn-neutral text-primary capitalize rounded-xl flex items-center justify-between">
                                            Logout <IoIosArrowForward />
                                        </button>
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

export default Profile;
