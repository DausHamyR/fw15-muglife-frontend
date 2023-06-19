import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import ProductImage from '@/assets/ecommerce-default-product.png'
import food from '../../../public/foods.png';
import http from '@/helpers/http.helper';
import { useRouter } from 'next/router';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token || null;
        return {
            props: {
                token,
            },
        };
    },
    cookieConfig
);

function Product({token}) {
    const [products, setProducts] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [inCategory, setInCategory] = React.useState("")
    const router = useRouter()

    const getProduct = React.useCallback(async(category="", limit=50)=>{
        try {
            const {data} = await http().get("/products", {params: {category, limit}})
            setProducts(data.results)
            console.log(data)
        } catch (error) {
            const message = error?.response?.data?.message
            return console.log(message)
        }
    }, [])

    const getCategory = React.useCallback(async()=>{
        try {
            const {data} = await http().get("/categories")
            setCategory(data.results)
            console.log(data)
        } catch (error) {
            const message = error?.response?.data?.message
            return console.log(message)
        }
    },[])

    const doDetailProduct = (id)=>{
        router.replace("/product/"+id)
    }

    React.useEffect(()=>{
        getProduct(inCategory)
        getCategory()
    },[getProduct, getCategory, inCategory])
    return (
        <>
            <title>Product | MugLife</title>
            
            <Header token={token} />
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
                                {/* <div className="flex justify-center items-center ">
                                    <button className="text-secondary text-lg font-semibold h-full border-b-2 border-secondary w-40">Fafourite Product</button>
                                </div> */}
                                {category.map(items =>{
                                    return(
                                        <div 
                                            key={`category-${items.id}`} 
                                            className={`flex justify-center items-center text-secondary hover:text-accent ${items.name === inCategory && "border-b-2 border-secondary font-semibold "}`}
                                        >
                                            <button onClick={()=>setInCategory(items.name)} className="text-lg h-full w-24">{items.name}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-9 items-center justify-center pt-16 h-screen overflow-scroll scrollbar-hide mb-5 px-11 xl:px-24">
                            {products.map(items =>{
                                return(
                                    <button onClick={()=>doDetailProduct(items.id)} key={`product${items.id}`} className="relative mb-20 w-[160px] h-[220px] flex flex-col items-center justify-end gap-3 rounded-3xl py-3 bg-white drop-shadow-md">
                                        <div className="absolute -top-16 w-32 h-32 rounded-full overflow-hidden">
                                            {items.picture ? (<Image width={128} height={128} src={items.picture} alt="Product-Image"/>) 
                                            : (<Image src={ProductImage} alt="Product-Image"/>) }
                                        </div>
                                        <div className="font-label-food text-2xl text-primary font-extrabold w-full h-24 overflow-hidden text-center px-3">{items.name}</div>
                                        <div className="text-lg text-secondary font-semibold">{`Rp${Number(items.variant[1].price).toLocaleString("id")}`}</div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Product;
