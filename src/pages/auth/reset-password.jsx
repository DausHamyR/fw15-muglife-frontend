import Head from 'next/head';
import React from 'react';
import Footer from '@/components/Footer';

function ResetPassword() {
    return (
        <>
            <Head>
                <title>Reset Password</title>
            </Head>
            <main className="w-full h-screen">
                <div className=" w-full h-screen">
                    <div className="bg-forgot-pattern bg-no-repeat bg-cover w-full h-full flex justify-center items-center">
                        <form className="flex flex-col items-center justify-center gap-11">
                            <div className="text-center">
                                <div className="text-5xl text-white font-semibold">Reset your password</div>
                                <div className="text-2xl text-white font-semibold">Don&apos;t worry, we got your back!</div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center gap-9 px-5">
                                <div className="w-full md:w-[550px] h-16">
                                    <input type="password" className="input input-accent bg-white w-full h-full" placeholder="Enter your new password" />
                                </div>
                                <div className="w-full md:w-[550px] h-16">
                                    <input type="password" className="input input-accent bg-white w-full h-full" placeholder="Re-Enter your new password" />
                                </div>
                                <div className="w-full md:w-[550px] h-16">
                                    <button className="w-full h-full btn btn-accent text-primary text-xl capitalize shadow-lg shadow-stone-500/50">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ResetPassword;
