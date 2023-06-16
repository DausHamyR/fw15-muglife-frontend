import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import food from '../../public/foods.png';

function Product() {
    return (
        <>
            <Header />
            <main className="pt-28">
                <div className="flex flex-col-reverse md:flex-row items-start w-full">
                    <div className="w-full lg:w-[27%] min-w-[320px] flex flex-col items-center justify-start h-full gap-9 border-r pt-11">
                        <div className="text-primary text-2xl font-semibold">Promo for you</div>
                        <div className="text-sm text-primary max-w-[200px] text-center">Coupons will be updated every weeks. Check them out! </div>
                        <div className="flex flex-col items-center justify-center w-[280px] h-[470px] bg-accent rounded-3xl py-11">
                            <div className="flex flex-col items-center justify-center w-full h-full border-b border-dashed border-primary px-7 pb-5 gap-3">
                                <div className="h-32 w-32 rounded-full overflow-hidden">
                                    <Image src={food} alt="" />
                                </div>
                                <div className="text-primary text-2xl font-semibold text-center">Beef Spaghetti 20% OFF</div>
                                <div className="text-primary text-sm text-center">Buy 1 Choco Oreo and get 20% off for Beef Spaghetti</div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full h-full pt-5 gap-3 px-7">
                                <div className="text-primary text-base uppercase">COUPON CODE</div>
                                <div className="text-primary text-3xl font-semibold uppercase">FNPR15RG</div>
                                <div className="text-primary text-sm">Valid untill October 10th 2020</div>
                            </div>
                        </div>
                        <div className="w-full text-center">
                            <button className="btn btn-secondary text-white capitalize w-[28S0px] rounded-2xl">Apply Coupon</button>
                        </div>
                        <div className="w-full px-7 mb-5">
                            <div className="text-primary text-sm font-semibold">Terms and Condition</div>
                            <ol className="text-primary text-sm flex flex-col items-start gap-1 pt-2">
                                <li>1. You can only apply 1 coupon per day</li>
                                <li>2. It only for dine in</li>
                                <li>3. Buy 1 get 1 only for new user</li>
                                <li>4. Should make member card to apply coupon</li>
                            </ol>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full lg:w-[73%] flex flex-col items-start justify-center h-full pt-11 ">
                        <div className="w-full flex justify-center items-center text-black px-2 mb-11">
                            <div className="px-11 xl:px-24 w-full flex items-center justify-between gap-5 overflow-scroll scrollbar-hide">
                                <div className="flex justify-center items-center ">
                                    <button className="text-secondary text-lg font-semibold h-full border-b-2 border-secondary w-40">Fafourite Product</button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button className="text-secondary text-lg h-full w-24">Coffee</button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button className="text-secondary text-lg h-full w-24">Non Coffee</button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button className="text-secondary text-lg h-full w-24">Foods</button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button className="text-secondary text-lg h-full w-24">Add-on</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-9 items-center justify-center pt-16 h-screen overflow-scroll scrollbar-hide mb-5 px-11 xl:px-24">
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                            <div className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                    <Image src={food} width={128} alt="" />
                                </div>
                                <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">Veggie tomato mix</div>
                                <div className="text-lg text-secondary font-semibold">IDR 34.000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Product;
