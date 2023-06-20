import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Header";
import Footer from "../components/Footer";
import tomato from "../assets/tomato.png";
import { Edit2, Trash2 } from "react-feather";

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, '/auth/login');

    return {
        props: {
            token,
        },
    };
}, cookieConfig);

const History = ({token}) => {
    return (
        <>
            <title>History | MugLife</title>
            <Navbar token={token} />
            <div className="max-w-full max-h-full pt-[80px]">
                <div className='bg-history_bg bg-no-repeat bg-cover pb-[100px]'>
                    <div className='flex flex-col justify-center items-center leading-10 pt-[100px]'>
                        <h1 className='text-white text-4xl font-bold'>Let’s see what you have bought!</h1>
                        <p className='text-white'>Long press to delete item</p>
                    </div>

                    <div className='flex flex-col justify-center items-center pt-20'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 cursor-pointer'>
                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered</p>
                                    </div>
                                </div>
                                <button className="absolute right-3 top-3">
                                    <Trash2 className="text-2xl text-[#6A4029]" />
                                </button>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered</p>
                                    </div>
                                </div>

                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>

                                </div>
                            </div>

                            <div className='w-[394px] h-[126px] bg-white rounded-2xl hover:opacity-50'>
                                <div className='py-5 px-5 flex gap-5'>
                                    <Image src={tomato} width="82" height="90" alt="tomato" className='rounded-full' />
                                    <div className='flex-1 text-lg'>
                                        <p className='font-bold text-2xl text-[#3C2A21]'>Veggie tomato mix</p>
                                        <p className="text-[#3C2A21]">IDR 34.000</p>
                                        <p className="text-[#65493a]">Delivered to Table 4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default History;