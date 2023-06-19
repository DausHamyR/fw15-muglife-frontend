import { ChevronLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import chart from "../../assets/Group 2.svg";
import ChartDaily from "../../assets/Group 1.svg";
import User from "../../assets/user-testi-2.png";
import Navbar from "../../components/Header";
import Footer from "../../components/Footer";


const Dashboard = () => {
    return (
        <>
            {/* Header */}
            <Navbar />
            {/* Dashboard */}
            <section className="bg-[#eeeeee] px-5 md:px-28 py-10 pt-[150px] border-b-2">
                <div className="md:hidden relative items-center mb-5">
                    <ChevronLeft className="absolute top-1 text-[#3C2A21]" />
                    <h1 className="text-center text-[#3C2A21] font-bold text-lg">Sales Chart</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="hidden md:block text-center">
                        <h3 className="font-bold text-2xl text-[#3C2A21]">
                            See how your store progress so far
                        </h3>
                    </div>
                    <div className="hidden md:flex justify-center gap-16">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center bg-[#9F9F9F] w-6 h-6 rounded-full mb-1">
                                <div className="bg-white w-3 h-3 rounded-full"></div>
                            </div>
                            <div>
                                <p>Daily</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center bg-[#9F9F9F] w-6 h-6 rounded-full mb-1">
                                <div className="bg-white w-3 h-3 rounded-full"></div>
                            </div>
                            <div>
                                <p>Weekly</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center bg-[#3C2A21] w-6 h-6 rounded-full mb-1">
                                <div className="bg-[#D5CEA3] w-3 h-3 rounded-full"></div>
                            </div>
                            <div>
                                <p>Monthly</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 py-8">
                    <div className="flex-[70%] bg-white rounded-2xl shadow-xl px-8 py-5">
                        <div className="flex items-center mb-5">
                            <div className="flex-1">
                                <p className="font-bold text-xl text-[#3C2A21]">Monthly Report</p>
                                <p>Last 6 months</p>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                            <div className="border-b">
                                <Image
                                    src={chart}
                                    alt="Chart"
                                    className="w-4/4 py-10"
                                />
                            </div>
                            <div className="flex justify-center items-center gap-20">
                                <div className="flex items-center gap-5 text-[#3C2A21]">
                                    <div className="w-3 h-3 rounded-full bg-[#D5CEA3]"></div>
                                    <p>Income</p>
                                </div>
                                <div className="flex items-center gap-5 text-[#3C2A21]">
                                    <div className="w-3 h-3 rounded-full bg-[#3C2A21]"></div>
                                    <p>Outcome</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden flex-[70%] bg-white rounded-2xl shadow-xl px-8 py-5">
                        <div className="flex items-center mb-5">
                            <div className="flex-1">
                                <p className="font-bold text-xl text-[#3C2A21]">IDR 2.5M</p>
                                <p>Daily average</p>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                            <div className="border-b">
                                <Image
                                    src={ChartDaily}
                                    alt="Chart"
                                    width={100}
                                    height={100}
                                    className="w-full py-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-[30%] flex flex-col gap-8">
                        <div className="hidden md:block bg-white rounded-xl shadow-lg p-5">
                            <div className="flex gap-5 border-b pb-3">
                                <div className="w-14 h-14">
                                    <Image
                                        src={User}
                                        alt="profile"
                                        width={100}
                                        height={100}

                                        className="rounded-full w-full"
                                    />
                                </div>
                                <div className="text-[#3C2A21]">
                                    <p className="font-bold">Cheryn Laurent</p>
                                    <p>Keep up the good work and spread love!</p>
                                </div>
                            </div>
                            <div className="pt-3 flex flex-col items-center gap-3">
                                <div>
                                    <p className="font-bold text-[#3C2A21]">Best Staff of the Month</p>
                                </div>
                                <div className="border-4 w-14 h-14 flex items-center justify-center rounded-full border-r-green-500 border-b-green-500 border-t-green-500">
                                    <p className="font-bold text-[#3C2A21]">80%</p>
                                </div>
                                <div className="text-center text-[#3C2A21]">
                                    <p>Achieved 3.5M of total 5M 478 Customer</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-5">
                            <div className="flex flex-col items-center gap-5">
                                <div className="text-center text-[#3C2A21]">
                                    <p className="font-bold">Goals</p>
                                    <p>Your goals is still on 76%. Keep up the good work!</p>
                                </div>
                                <div className="border-8 w-24 h-24 flex items-center justify-center rounded-full border-r-[#3C2A21] border-l-[#D5CEA3] border-b-[#3C2A21] border-t-[#3C2A21]">
                                    <p className="font-bold text-[#3C2A21]">76%</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex-[70%]">
                        <button className="btn md:btn-lg w-full rounded-xl bg-[#D5CEA3] hover:bg-[#e0d9ab] text-[#3C2A21]">
                            Download Report
                        </button>
                    </div>
                    <div className="hidden md:block flex-[30%]">
                        <button className="btn md:btn-lg w-full rounded-xl bg-[#D5CEA3] hover:bg-[#e0d9ab] text-[#3C2A21]">
                            Share Report
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer/>
        </>
    );
};

export default Dashboard;