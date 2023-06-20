import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Select, Option } from '@material-tailwind/react'
import drink from "@/assets/drink.png"
import Footer from '@/components/Footer'
import Navbar from '@/components/Header'
import { BiTrash } from "react-icons/bi";
import ModalDelete from '@/components/modal-delete';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import http from '@/helpers/http.helper'
import { useRouter } from 'next/router'
import { Formik } from 'formik'

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

const EditProduct = ({token}) => {
    const {query: {id}} = useRouter()
    const [product, setProduct] = React.useState({})
    const [variant, setVariant] = React.useState([])

    const getProduct = React.useCallback(async()=>{
        try {
            const {data} = await http().get("/products/"+id)
            if(data.results){
                setProduct(data.results)
                setVariant(data.results.variant)
            }
        } catch (error) {
            const message = error?.response?.data?.message
            return console.log(message)
        }
    },[])

    React.useEffect(()=>{
        getProduct()
    },[getProduct])

    let [count, setCount] = React.useState(1);
    let increment = () => {
        if (count === 20) {
            return false;
        }
        return setCount(count + 1);
    };
    let decrement = () => {
        if (count === 1) {
            return false;
        }
        return setCount(count - 1);
    };
    const save = () => {
        const btn = document.querySelector(".save");
        btn.textContent = "Saved !";
        btn.disabled = true;
    };
    return (
        <>
            <title>Edit Product | MugLife</title>
            {/* Navbar */}
            <Navbar token={token}></Navbar>

            {/* Konten */}
            <main className='relative bg-[#E5E5CB] pt-[150px] pb-[10%]'>
                <div className='flex'>
                    <div className='ml-[5%]'>
                        <div className='flex gap-0.5'>
                            <div className='text-[#9c9674]'>Favorite & Promo {'>'}</div>
                            <div className='text-[#9c9674]'>{product.name} {'>'}</div>
                            <div className='text-[#3C2A21] font-semibold'>Edit Product</div>
                        </div>

                        <div className='relatif flex flex-col justify-center items-center mt-[40px]'>
                            <div className='absolute pb-[700px] pl-[430px]'>
                                <div className="border-1 w-[50px] h-[50px] rounded-[50%] bg-[#D5CEA3] flex justify-center items-center ">
                                    <div>
                                        <a href="#my-modal-2">
                                            <div className="border-1 bg-[#D5CEA3] w-[40px] h-[40px]  rounded-[50%] flex items-center justify-center">
                                                <BiTrash className=" w-[18px] h-[20px] text-[#3C2A21]" />
                                            </div>
                                        </a>
                                        <ModalDelete />
                                    </div>
                                </div>
                            </div>
                            <Image src={drink} className="w-[523px] h-[790px]" alt="desc" ></Image>
                        </div>

                        <div className='pt-10 text-xl text-[#3C2A21]'>
                            <div>Delivery only on <span className='font-bold'>Monday to</span> </div>
                            <div><span className='font-bold'>friday</span> at <span className='font-bold'>1 - 7 pm</span></div>
                        </div>
                    </div>

                    <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={doLogin}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form className='ml-[10%] pt-[80px]'>
                            <div className=''>
                                <div className='pb-5'>
                                    <h1 className='text-5xl text-[#3C2A21] font-[800]'>{product.name}</h1>
                                </div>
    
                                <hr className='w-[500px] bg-[#3C2A21] h-0.5' />
    
                                <div className='pt-5 pb-5'>
                                    <h1 className='text-4xl font-semibold text-[#3C2A21]'>IDR 30.000</h1>
                                    <input />
                                </div>
    
                                <hr className='w-[500px] bg-[#3C2A21] h-0.5' />
    
                                <div className='w-[500px] pt-5 pb-5'>
                                    <div className='font-normal text-gray-600 text-xl'>
                                        Cold brewing is a method of brewing that combines ground coffee and
                                        cool water and uses time instead of heat to extract the flavor.
                                        It is brewed in small batches and steeped for as long as 48 hours.
                                    </div>
                                </div>
    
                                <hr className='w-[500px] bg-[#3C2A21] h-0.5' />
                            </div>
    
                            <div className='pt-10 pr-10'>
                                <Select color="brown" label="Select Size" className='w-full h-[45px] bg-white py-5 px-5 text-[#3C2A21] rounded-lg'>
                                    <Option className='text-[14px] text-[#3C2A21]'>R</Option>
                                    <Option className='text-[14px] text-[#3C2A21]'>L</Option>
                                    <Option className='text-[14px] text-[#3C2A21]'>XL</Option>
                                </Select>
                            </div>
    
                            <div className='pt-5 pr-10'>
                                <Select color="brown" label="Select Delivery Methods" className='w-full h-[45px] bg-white py-5 px-5 text-[#3C2A21] rounded-lg'>
                                    <Option className='text-[14px] text-[#3C2A21]'>Dine In</Option>
                                    <Option className='text-[14px] text-[#3C2A21]'>Door Delivery</Option>
                                    <Option className='text-[14px] text-[#3C2A21]'>Pick Up</Option>
                                </Select>
                            </div>
    
                            <div className='pt-10 flex gap-5'>
                                <div className='flex gap-7 just border w-[165px] h-[83px] bg-white rounded-xl text-4xl font-bold px-6 py-5'>
                                    <div 
                                    onClick={decrement}
                                    className='hover:text-[#3C2A21] cursor-pointer '>
                                        -
                                    </div>
                                    <div className='text-[#3C2A21]'>{count}</div>
                                    <div 
                                    onClick={increment}
                                    className='hover:text-[#3C2A21] cursor-pointer'>
                                        +
                                    </div>
                                </div>
                                <div className='w-[358px]'>
                                    <Link href="#">
                                        <button className="btn normal-case h-[83px] bg-[#3C2A21] hover:bg-[#5f463a] text-[#D5CEA3] text-xl font-bold">
                                            Add to Cart
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <button 
                            onClick={save}
                            className="save btn h-[83px] normal-case bg-[#3C2A21] hover:bg-[#5f463a] text-[#D5CEA3] text-xl font-bold mt-5">
                                Save change
                            </button>
                        </form>

                        )}

                    </Formik>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}

export default EditProduct;
