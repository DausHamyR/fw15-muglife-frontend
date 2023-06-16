import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import logo from '../../assets/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main className="relative w-full h-screen">
                <div className=" w-full h-screen flex justify-center items-center">
                    <div className="hidden sm:block basis-2/5 lg:basis-2/4 xl:basis-3/5 bg-login-pattern bg-no-repeat bg-cover w-full h-full"></div>
                    <div className="md:basis-3/5 lg:basis-2/4 xl:basis-2/5 w-full h-full">
                        <div className="w-full h-full flex flex-col items-center justify-center py-11 pl-4 md:pl-16 pr-4 md:pr-24">
                            <div className="w-full flex items-center justify-between pb-20">
                                <div>
                                    <Image src={logo} width={150} alt="logo"></Image>
                                </div>
                                <div>
                                    <Link href="/auth/register" className="btn btn-accent w-[150px] rounded-full text-primary capitalize">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                            <div className="text-3xl text-primary font-semibold pb-14">Login</div>
                            <form className="form-control w-full lg:max-w-[500px] h-full flex flex-col items-start justify-start">
                                <div className="w-full flex flex-col items-start justify-start gap-3 pb-7">
                                    <div className="text-primary text-lg font-semibold">Email Address :</div>
                                    <input type="email" className="input input-secondary w-full text-primary" placeholder="Enter your email address" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 pb-5">
                                    <div className="text-primary text-lg font-semibold">Password :</div>
                                    <input type="password" className="input input-secondary w-full text-primary" placeholder="Enter your password" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 pb-5">
                                    <Link href="/auth/forgot-password" className="text-primary text-lg font-semibold underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md mt-5 pb-7">
                                    <button className="btn btn-accent text-primary text-base capitalize w-full">Sign Up</button>
                                </div>
                                <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md">
                                    <button className="btn btn-neutral text-primary text-base capitalize w-full">
                                        <FcGoogle size={25} />
                                        Login with Google
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
            <footer>
                <div className="w-full h-[530px] bg-[#F5F5F5] pt-16 lg:pt-48 pb-11 px-11 md:px-20 lg:px-28 xl:px-48">
                    <div className="w-full h-full flex flex-col sm:flex-row items-start justify-between gap-7">
                        <div className="flex flex-col items-start justify-start gap-7">
                            <div>
                                <Image src={logo} width={150} alt="logo"></Image>
                            </div>
                            <div className="w-full max-w-[340px] text-base text-primary font-semibold">Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</div>
                            <div className="flex items-center justify-start gap-5">
                                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                                    <i>
                                        <FaFacebookF size={15} className="text-primary" />
                                    </i>
                                </div>
                                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                                    <i>
                                        <FaTwitter size={15} className="text-primary" />
                                    </i>
                                </div>
                                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                                    <i>
                                        <FaInstagram size={15} className="text-primary" />
                                    </i>
                                </div>
                            </div>
                            <div className="text-base text-accent">©2023MugLife</div>
                        </div>
                        <div className="flex items-start justify-start gap-7 lg:gap-24">
                            <div className="flex flex-col items-start justify-start gap-7">
                                <div className="text-primary text-lg font-semibold">Product</div>
                                <div className="flex flex-col items-start justify-start gap-5 text-secondary">
                                    <div>Download</div>
                                    <div>Pricing</div>
                                    <div>Locations</div>
                                    <div>Countries</div>
                                    <div>Blog</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-7">
                                <div className="text-primary text-lg font-semibold">Engage</div>
                                <div className="flex flex-col items-start justify-start gap-5 text-secondary">
                                    <div>Coffee Shop ?</div>
                                    <div>FAQ</div>
                                    <div>About Us</div>
                                    <div>Privacy Policy</div>
                                    <div>Terms of Service</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Login;
