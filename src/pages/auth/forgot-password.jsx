import Footer from '@/components/Footer';
import Head from 'next/head';
import React from 'react';

function ForgotPassword() {
    return (
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <main className="w-full h-screen">
                <div className=" w-full h-screen">
                    <div className="bg-forgot-pattern bg-no-repeat bg-cover w-full h-full flex justify-center items-center">
                        <form className="flex flex-col items-center justify-center gap-11">
                            <div className="text-center">
                                <div className="text-5xl text-white font-semibold">Forgot your password ?</div>
                                <div className="text-2xl text-white font-semibold">Don&apos;t worry, we got your back!</div>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 px-5">
                                <div className="w-full md:w-[550px] h-16">
                                    <input type="text" className="input input-accent bg-white w-full h-full" placeholder="Enter your email adress to get link" />
                                </div>
                                <div className="w-full sm:w-[150px] h-16 ">
                                    <button className="btn btn-accent w-full h-full text-primary text-xl capitalize shadow-lg shadow-stone-500/50">Send</button>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center gap-5 px-5">
                                <div className="w-full max-w-[470px] text-center text-2xl text-white font-semibold">Click here if you didn’t receive any link in 2 minutes</div>
                                <div className="w-full md:w-[300px] h-16">
                                    <button className="btn btn-secondary w-full h-full text-white text-xl capitalize shadow-lg shadow-orange-900/50">Resend Link</button>
                                </div>
                                <div className="text-center text-2xl text-white font-semibold">01:54</div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ForgotPassword;
