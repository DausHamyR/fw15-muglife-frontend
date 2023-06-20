import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Select, Option } from '@material-tailwind/react'
import drink from "@/assets/drink.png"
import Footer from '@/components/Footer'
import Navbar from '@/components/Header'
import { BiTrash } from "react-icons/bi";
import ModalDelete from '@/components/modal-delete';
import {FiEdit} from "react-icons/fi"
import ProductImage from '@/assets/ecommerce-default-product.png'
import { AiFillCamera, AiOutlineLoading3Quarters } from 'react-icons/ai';

import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from "@/helpers/checkCredentials";
import http from '@/helpers/http.helper'
import { useRouter } from 'next/router'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { setEditProduct } from '@/redux/reducers/editProduct'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
    const token = req.session?.token;
    checkCredentials(token, res, '/auth/login');

    const {data} = await http(token).get("/profile")
    if(data.results.role === "general"){
        res.setHeader('location', "/product")
        res.statusCode = 302
        res.end()
        return {
            props: {}
        };
    }

    return {
        props: {
            token,
        },
    };
}, cookieConfig);

const validationSchema = Yup.object({
    price: Yup.number().required('Price is required').typeError('Price must be a number'),
    descriptions: Yup.string().min(100, "Descriptions must have min 20 caracters")
  });

const VARIANT = [
    {
        code: 'R',
        name: 'Regular',
    },
    {
        code: 'L',
        name: 'Large',
    },
    {
        code: 'XL',
        name: 'Extra Large',
    }
];

const EditProduct = ({token}) => {
    const dispatch = useDispatch()
    const {query: {id}} = useRouter()
    const [edit, setEdit] = React.useState(false)
    const product = useSelector(state=>state.editProduct.data)
    const [variant, setVariant] = React.useState([])

    const [btnHD, setBtnHD] = React.useState('btn-info');
    const [btnDI, setBtnDI] = React.useState('btn-info');
    const [btnTA, setBtnTA] = React.useState('btn-info');
    const [openModal, setOpenModoal] = React.useState(false);

    const getProduct = React.useCallback(async()=>{
        try {
            const {data} = await http().get("/products/"+id)
            if(data.results){
                dispatch(setEditProduct(data.results))
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

    const handleDelivery = (deliver) => {
        if (deliver === 'homeDelivery') {
            setBtnHD('btn-accent');
            setBtnDI('btn-info');
            setBtnTA('btn-info');
        } else if (deliver === 'dineIn') {
            setBtnHD('btn-info');
            setBtnDI('btn-accent');
            setBtnTA('btn-info');
        } else if (deliver === 'takeAway') {
            setBtnHD('btn-info');
            setBtnDI('btn-info');
            setBtnTA('btn-accent');
        }
    };

    const doEdit = ()=>{
        setEdit(!edit)
    }

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

    const updateProduct = async (values) => {
        setOpenModoal(true);
        values.variant = VARIANT.filter((item) => values.variant.includes(item.code));
        values.variant.forEach((item, index) => {
            console.log(count)
            values.variant[index].quantity = parseInt(count);
            values.variant[index].price = values.price;
            switch (values.variant[index].code) {
                case 'R': {
                    values.variant[index].price = parseInt(values.price);
                    break;
                }
                case 'L': {
                    values.variant[index].price = parseInt(values.price) + 5000;
                    break;
                }
                case 'XL': {
                    values.variant[index].price = parseInt(values.price) + 10000;
                    break;
                }
                default: {
                    values.variant[index].price = parseInt(values.price) + 10000;
                    break;
                }
            }
        });

        values.variant = JSON.stringify(values.variant);
        const formProduct = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                formProduct.append(key, values[key]);
            }
        })
        const {data} = await http().patch('/products/admin/'+id, formProduct, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if(data.results){
            dispatch(setEditProduct(data.results))
            setEdit(false)
            setOpenModoal(false);
        }
       
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

                        <div className='relatif flex flex-col justify-center items-center mt-[40px] overflow-hidden w-[523px] h-[790px]'>
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
                            {product.picture ? (<Image width={400} height={400} src={product.picture} className="h-[790px] w-full object-cover" alt="desc"/>) 
                                : (<Image src={ProductImage} className="w-[523px] h-[790px]" alt="desc"/>) }
                        </div>

                        <div className='pt-10 text-xl text-[#3C2A21]'>
                            <div>Delivery only on <span className='font-bold'>Monday to</span> </div>
                            <div><span className='font-bold'>friday</span> at <span className='font-bold'>1 - 7 pm</span></div>
                        </div>
                    </div>

                    <Formik
                        initialValues={{
                            product_delivery_id: '',
                            quantity: '',
                            variant: [],
                            price: product?.price,
                            descriptions: product?.decriptions || ""
                        }}
                        validationSchema = {validationSchema}
                        onSubmit={updateProduct}

                    > 
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className='ml-[10%] pt-[80px]'>
                                <div className=''>
                                    <div className='pb-5'>
                                        <h1 className='text-5xl text-[#3C2A21] font-[800]'>{product.name}</h1>
                                    </div>

                                    <hr className='w-[500px] bg-[#3C2A21] h-0.5' />

                                    <div className='pt-5 pb-5 flex w-full gap-10 items-center'>
                                        {!edit && <div className="text-3xl text-secondary font-semibold py-6">{`IDR${Number(variant[0]?.price).toLocaleString("id")}`}</div>}
                                        {edit &&
                                            <div className='flex flex-col gap-1'>
                                                <Field
                                                    type="text"
                                                    name="price"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.price}
                                                    className=" input outline-none bg-white font-semibold text-[#3C2A21]"
                                                    placeholder="Type the price"
                                                />
                                                {errors.price && touched.price && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error text-[16px]">{errors.price}</span>
                                                    </label>
                                                )}
                                            </div> }
                                        <label onClick={doEdit} className='flex gap-3 justify-center items-center text-xl text-secondary'><FiEdit size={25}/>Edit</label>
                                    </div>

                                    <hr className='w-[500px] bg-[#3C2A21] h-0.5' />

                                    <div className='w-[500px] pt-5 pb-5'>
                                        {edit && <>
                                            <textarea 
                                                className='input outline-none bg-white font-normal text-secondary text-xl w-full py-4 h-36'
                                                type='text'
                                                name="descriptions"
                                                placeholder="Enter product description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.descriptions} 
                                            /> 
                                            {errors.descriptions && touched.descriptions && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error text-[16px]">{errors.descriptions}</span>
                                                </label>
                                            )}
                                        </>}
                                        {!edit && <div className='font-normal text-gray-600 text-xl'>
                                            {product?.descriptions}
                                        </div>}
                                    </div>

                                    <hr className='w-[500px] bg-[#3C2A21] h-0.5' />
                                </div>

                                <div className='pt-10 pr-10'>
                                    <div className="w-full flex items-center justify-center sm:justify-start flex-wrap gap-5">
                                        {VARIANT.map((item, index) => (
                                            <React.Fragment key={`variant-${item.code}`}>
                                                <input onChange={handleChange} onBlur={handleBlur} id={item.code} className="hidden [&:checked+label]:bg-accent" type="checkbox" name={`variant`} value={item.code} />
                                                <label
                                                    htmlFor={item.code}
                                                    className={
                                                        (item.code.length <= 3 ? 'text-xl lg:text-3xl ' : 'text-base lg:text-xl text-center ') +
                                                        'bg-info w-14 lg:w-[70px] h-14 lg:h-[70px] text-primary font-semibold rounded-full flex items-center justify-center'
                                                    }
                                                >
                                                    {item.code}
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                                <div className='pt-5 pr-10'>
                                    <div className="w-full flex items-center justify-between gap-1 md:gap-5">
                                        <label onClick={() => handleDelivery('homeDelivery')} htmlFor="homeDelivery" className={`btn ${btnHD} w-24 xl:w-44 capitalize text-primary`}>
                                            Home delivery
                                            <Field value="2" type="radio" name="product_delivery_id" id="homeDelivery" className="appearance-none" />
                                        </label>
                                        <label onClick={() => handleDelivery('dineIn')} htmlFor="dineIn" className={`btn ${btnDI} w-24 xl:w-44 capitalize text-primary`}>
                                            Dine In
                                            <Field value="1" type="radio" name="product_delivery_id" id="dineIn" className="appearance-none" />
                                        </label>
                                        <label onClick={() => handleDelivery('takeAway')} htmlFor="takeAway" className={`btn ${btnTA} w-24 xl:w-44 capitalize text-primary`}>
                                            Take Away
                                            <Field value="3" type="radio" name="product_delivery_id" id="takeAway" className="appearance-none" />
                                        </label>
                                    </div>
                                </div>

                                <div className='pt-10 flex gap-5'>
                                    <div className='flex gap-7 just border w-[165px] h-[83px] bg-white rounded-xl text-4xl font-bold px-6 py-5'>
                                        <div 
                                        onClick={decrement}
                                        className='hover:text-[#3C2A21] cursor-pointer '>
                                            -
                                        </div>
                                        <div className='text-[#3C2A21]'>{count}</div>
                                        <input 
                                            className='hidden'
                                            name='quantity'
                                            type='text'
                                            value={count}
                                            onChange={handleChange} onBlur={handleBlur}
                                            />
                                        <div 
                                        onClick={increment}
                                        className='hover:text-[#3C2A21] cursor-pointer'>
                                            +
                                        </div>
                                    </div>
                                    <div className='w-[358px]'>
                                        <label className="btn normal-case h-[83px] btn-secondary text-xl font-bold">
                                            Add to Cart
                                        </label>
                                    </div>
                                </div>
                                <button 
                                    type='submit'
                                    className="btn h-[83px] normal-case btn-secondary text-xl font-bold mt-5">
                                    Save change
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </main>
            <Footer></Footer>
            <div>
                <input type="checkbox" id="loading" className="modal-toggle" checked={openModal} />
                <div className="modal">
                    <div className="modal-box bg-transparent h-40 shadow-none overflow-hidden">
                        <div className="flex flex-col justify-center items-center">
                            <AiOutlineLoading3Quarters className="animate-spin" size={70} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct;
