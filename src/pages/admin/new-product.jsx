import Footer from '@/components/Footer';
import Header from '@/components/Header';
import http from '@/helpers/http.helper';
import { Formik, Field } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
import { AiFillCamera, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/router';

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
    },
    {
        code: '250G',
        name: '250 Gram',
    },
    {
        code: '300G',
        name: '300 Gram',
    },
    {
        code: '500G',
        name: '500 Gram',
    },
];

function NewProduct() {
    const router = useRouter();
    const [btnHD, setBtnHD] = React.useState('btn-info');
    const [btnDI, setBtnDI] = React.useState('btn-info');
    const [btnTA, setBtnTA] = React.useState('btn-info');
    const [category, setCategory] = React.useState([]);
    const [selectedPicture, setSelectedPicture] = React.useState(false);
    const [pictureURI, setPictureURI] = React.useState('');
    const [errPicture, setErrPicture] = React.useState('');
    const [openModal, setOpenModoal] = React.useState(false);

    React.useEffect(() => {
        async function getDataCategory() {
            try {
                const { data } = await http().get('/categories');
                setCategory(data.results);
            } catch (err) {
                console.log(err);
            }
        }

        getDataCategory();
    }, []);

    console.log(btnHD);
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

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        descriptions: Yup.string().required('Descriptions is required'),
        product_category_id: Yup.string().required('Please Select category'),
        product_delivery_id: Yup.string().required('Please Select delivery methods'),
        quantity: Yup.string().required('Please input valid quantity'),
        variant: Yup.array().min(1),
        price: Yup.string().required('Please input valid price'),
    });

    const fileToDataUrl = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setPictureURI(reader.result);
        });
        reader.readAsDataURL(file);
    };

    const changePicture = (e) => {
        const file = e.target.files[0];
        setSelectedPicture(file);
        fileToDataUrl(file);
    };

    const createNewProduct = async (values) => {
        setOpenModoal(true);
        if (selectedPicture === false) {
            setOpenModoal(false);
            setErrPicture('Please select product picture');
            return;
        } else {
            setErrPicture('');
        }
        values.variant = VARIANT.filter((item) => values.variant.includes(item.code));
        values.variant.forEach((item, index) => {
            values.variant[index].quantity = parseInt(values.quantity);
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
        });

        if (selectedPicture) {
            formProduct.append('picture', selectedPicture);
        }
        const { data } = await http().post('/products/admin', formProduct, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        router.push('/admin/product');
        setOpenModoal(false);
    };

    return (
        <>
            <Head>
                <title>New Product</title>
            </Head>
            <Header />
            <main className="pt-28">
                <div className="w-full flex flex-col items-start justify-start gap-11 px-5 sm:px-11 lg:px-36 py-11">
                    <div className="w-full text-lg font-semibold">
                        Fafourite Promo <span className="text-lg text-primary font-semibold">{`>`} Add new product</span>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            descriptions: '',
                            product_category_id: '',
                            product_delivery_id: '',
                            quantity: '',
                            variant: [],
                            price: '',
                            start_delivery: '',
                            end_delivery: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={createNewProduct}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-start justify-between gap-11 lg-gap-0">
                                <div className="w-full md:w-[40%] flex flex-col items-center gap-12">
                                    <div className="w-full md:max-w-[400px] flex flex-col items-center justify-center gap-5">
                                        <div className="w-48 lg:w-72 flex items-center justify-center pb-4">
                                            <div className="w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-blue-gray-100 flex items-center justify-center">
                                                {selectedPicture && (
                                                    <div className="w-48 lg:w-72 h-48 lg:h-72 rounded-full relative overflow-hidden">
                                                        <Image className="w-full h-full object-cover" width={200} height={200} src={pictureURI} alt="profile" />
                                                        {/* <div className="absolute bg-gray-200 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center"></div> */}
                                                    </div>
                                                )}
                                                {!selectedPicture && (
                                                    <i>
                                                        <AiFillCamera size={60} className="text-blue-gray-200" />
                                                    </i>
                                                )}
                                            </div>
                                        </div>
                                        {errPicture === 'Please select product picture' ? (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errPicture}</span>
                                            </label>
                                        ) : (
                                            ''
                                        )}
                                        <label className="btn btn-accent text-black capitalize w-full">
                                            <span>Choose picture</span>
                                            <input name="picture" onChange={changePicture} className="hidden" type="file" />
                                        </label>
                                    </div>

                                    <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                        <div className="text-xl text-primary font-semibold">Input category</div>
                                        <div className="w-full">
                                            <select name="product_category_id" className="select w-full input input-accent text-black" onChange={handleChange} onBlur={handleBlur} value={values.product_category_id}>
                                                {category.map((item) => {
                                                    return (
                                                        <React.Fragment key={`category-${item.id}`}>
                                                            <option className="hidden">Product Category</option>
                                                            <option value={item.id}>{item.name}</option>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        {errors.product_category_id && touched.product_category_id && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.product_category_id}</span>
                                            </label>
                                        )}
                                    </div>
                                    {btnHD === 'btn-accent' && (
                                        <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                            <div className="text-xl text-primary font-semibold">Delivery Hour :</div>
                                            <div className="w-full">
                                                <div className="text-sm">Input start hour</div>
                                                <input type="time" name="start_delivery" onChange={handleChange} onBlur={handleBlur} value={values.start_delivery} className="w-full input input-accent" placeholder="Input start hour" />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-sm">Input end hour</div>
                                                <input type="time" name="end_delivery" onChange={handleChange} onBlur={handleBlur} value={values.end_delivery} className="w-full input input-accent" placeholder="Input end hour" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                        <div className="text-xl text-primary font-semibold">Input stock</div>

                                        <div className="w-full">
                                            <input type="text" name="quantity" onChange={handleChange} onBlur={handleBlur} value={values.quantity} className="w-full input input-accent" placeholder="Input Stock" />
                                        </div>
                                        {errors.quantity && touched.quantity && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.quantity}</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full md:w-[60%] flex flex-col items-center">
                                    <div className="w-full md:max-w-[600px] flex flex-col items-start gap-9">
                                        <div className="w-full flex flex-col items-start gap-2 ">
                                            <div className="w-full text-primary text-lg font-semibold">Name :</div>
                                            <div className="w-full border-b border-secondary">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    className=" h-11 border-none outline-none w-full text-primary bg-transparent"
                                                    placeholder="Type product name min. 50 characters"
                                                />
                                            </div>
                                            {errors.name && touched.name && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.name}</span>
                                                </label>
                                            )}
                                        </div>
                                        <div className="w-full flex flex-col items-start gap-2 ">
                                            <div className="w-full text-primary text-lg font-semibold">Price :</div>
                                            <div className="w-full border-b border-secondary">
                                                <Field
                                                    type="text"
                                                    name="price"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.price}
                                                    className=" h-11 border-none outline-none w-full text-primary bg-transparent"
                                                    placeholder="Type the price"
                                                />
                                            </div>

                                            {errors.price && touched.price && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.price}</span>
                                                </label>
                                            )}
                                        </div>
                                        <div className="w-full flex flex-col items-start gap-2 ">
                                            <div className="w-full text-primary text-lg font-semibold">Description :</div>
                                            <div className="w-full border-b border-secondary">
                                                <input
                                                    type="text"
                                                    name="descriptions"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.descriptions}
                                                    className=" h-11 border-none outline-none w-full text-primary bg-transparent"
                                                    placeholder="Describe your product min. 150 characters"
                                                />
                                            </div>
                                            {errors.descriptions && touched.descriptions && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.descriptions}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col items-start gap-2">
                                            <div className="text-primary text-lg font-semibold">Input product size :</div>
                                            <div className="text-base">Click size you want to use for this product</div>
                                            <div className="w-full flex items-center justify-center sm:justify-start lg:justify-between flex-wrap gap-5">
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

                                                {errors.variant && touched.variant && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">{errors.variant}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full flex flex-col items-start gap-2 ">
                                            <div className="text-primary text-lg font-semibold">Input delivery methods :</div>
                                            <div className="text-base">Click methods you want to use for this product</div>
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
                                            {errors.product_delivery_id && touched.product_delivery_id && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.product_delivery_id}</span>
                                                </label>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col items-start gap-5 mt-11 ">
                                            <div className="w-full">
                                                <button type="submit" className="btn btn-secondary text-white capitalize w-full">
                                                    Save NewProduct
                                                </button>
                                            </div>
                                            <div className="w-full">
                                                <Link href="/admin/product" className="btn btn-neutral text-black capitalize w-full">
                                                    cancel
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </main>
            <Footer />
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
    );
}

export default NewProduct;
