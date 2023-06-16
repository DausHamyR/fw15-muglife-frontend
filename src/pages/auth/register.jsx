import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import logo from '../../assets/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Footer from '@/components/Footer';

function Register() {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main className="relative w-full h-screen">
                <div className=" w-full h-screen flex justify-center items-center">
                    <div className="hidden sm:block basis-2/5 lg:basis-2/4 xl:basis-3/5 bg-login-pattern bg-no-repeat bg-cover w-full h-full"></div>
                    <div className="md:basis-3/5 lg:basis-2/4 xl:basis-2/5 w-full h-full">
                        <div className="w-full h-full flex flex-col items-center justify-center gap-11 py-11 pl-4 md:pl-16 pr-4 md:pr-24">
                            <div className="w-full flex items-center justify-between">
                                <div>
                                    <Image src={logo} width={150} alt="logo"></Image>
                                </div>
                                <div>
                                    <Link href="/auth/login" className="btn btn-accent w-[150px] rounded-full text-primary capitalize">
                                        Login
                                    </Link>
                                </div>
                            </div>
                            <div className="text-3xl text-primary font-semibold">Sign Up</div>
                            <form className="form-control w-full lg:max-w-[500px] h-full flex flex-col items-start justify-start gap-7">
                                <div className="w-full flex flex-col items-start justify-start gap-3">
                                    <div className="text-primary text-lg font-semibold">Email Address :</div>
                                    <input type="email" className="input input-secondary w-full text-primary" placeholder="Enter your email address" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3">
                                    <div className="text-primary text-lg font-semibold">Password :</div>
                                    <input type="password" className="input input-secondary w-full text-primary" placeholder="Enter your password" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3">
                                    <div className="text-primary text-lg font-semibold">Phone Number :</div>
                                    <input type="text" className="input input-secondary w-full text-primary" placeholder="Enter your phone number" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md mt-5">
                                    <button className="btn btn-accent text-primary text-base capitalize w-full">Sign Up</button>
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md">
                                    <button className="btn btn-neutral text-primary text-base capitalize w-full">
                                        <FcGoogle size={25} />
                                        Sign up with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden absolute lg:flex items-center justify-between m-auto inset-x-0 bottom-[-120px] w-[70%] h-[200px] bg-white rounded-2xl py-11 px-16 drop-shadow-lg">
                    <div>
                        <div className="w-[350px] text-4xl text-primary font-medium pb-3">Get your member card now!</div>
                        <div className="text-base text-primary">Let&apos;s join with our member and enjoy the deals.</div>
                    </div>
                    <div>
                        <button className="btn btn-accent w-[250px] text-primary text-base font-semibold capitalize">Create Now</button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Register;
