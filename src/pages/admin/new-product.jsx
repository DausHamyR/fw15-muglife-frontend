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

function NewProduct() {
    const router = useRouter();
    const [newVariant, setNewVariant] = React.useState([]);
    const [btnR, setBtnR] = React.useState('bg-info');
    const [btnL, setBtnL] = React.useState('bg-info');
    const [btnXL, setBtnXL] = React.useState('bg-info');
    const [btnRG, setBtnRG] = React.useState('bg-info');
    const [btnLG, setBtnLG] = React.useState('bg-info');
    const [btnXLG, setBtnXLG] = React.useState('bg-info');
    const [btnHD, setBtnHD] = React.useState('btn-info');
    const [btnDI, setBtnDI] = React.useState('btn-info');
    const [btnTA, setBtnTA] = React.useState('btn-info');
    const [category, setCategory] = React.useState([]);
    const [selectedPicture, setSelectedPicture] = React.useState(false);
    const [pictureURI, setPictureURI] = React.useState('');
    const [basePrice, setBasePrice] = React.useState('');
    const [quantityProduct, setQuantityProduct] = React.useState('');
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

    const handleInputPrice = (e) => {
        setBasePrice(e.target.value);
    };
    const handleInputQuntity = (e) => {
        setQuantityProduct(e.target.value);
    };
    console.log(newVariant);

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

    const handleVariantSize = (size) => {
        const variant = {};
        if (size === 'R') {
            if (btnR === 'bg-info') {
                setBtnR('bg-accent');
            } else {
                setBtnR('bg-info');
            }
            variant.code = 'R';
            variant.name = 'Regular';
            variant.price = parseInt(basePrice);
            variant.quantity = parseInt(quantityProduct);
        } else if (size === 'L') {
            if (btnL === 'bg-info') {
                setBtnL('bg-accent');
            } else {
                setBtnL('bg-info');
            }
            const prizeL = parseInt(basePrice) + 5000;
            variant.code = 'L';
            variant.name = 'Large';
            variant.price = prizeL;
            variant.quantity = parseInt(quantityProduct);
        } else if (size === 'XL') {
            if (btnXL === 'bg-info') {
                setBtnXL('bg-accent');
            } else {
                setBtnXL('bg-info');
            }
            const prizeXL = parseInt(basePrice) + 10000;
            variant.code = 'XL';
            variant.name = 'Extra Large';
            variant.price = prizeXL;
            variant.quantity = parseInt(quantityProduct);
        } else if (size === 'RG') {
            if (btnRG === 'bg-info') {
                setBtnRG('bg-accent');
            } else {
                setBtnRG('bg-info');
            }
            variant.code = '250GR';
            variant.name = '250 GR - Regular';
            variant.price = basePrice;
            variant.quantity = parseInt(quantityProduct);
        } else if (size === 'LG') {
            if (btnLG === 'bg-info') {
                setBtnLG('bg-accent');
            } else {
                setBtnLG('bg-info');
            }
            const prizeLG = parseInt(basePrice) + 5000;
            variant.code = '300GR';
            variant.name = '300 GR - Large';
            variant.price = prizeLG;
            variant.quantity = parseInt(quantityProduct);
        } else if (size === 'XLG') {
            if (btnXLG === 'bg-info') {
                setBtnXLG('bg-accent');
            } else {
                setBtnXLG('bg-info');
            }
            const prizeXLG = parseInt(basePrice) + 10000;
            variant.code = '500GR';
            variant.name = '500 GR - Extra Large';
            variant.price = prizeXLG;
            variant.quantity = parseInt(quantityProduct);
        }

        const variantIndex = newVariant.findIndex((item) => item.code === variant.code);

        if (variantIndex === -1) {
            setNewVariant((prevVariants) => [...prevVariants, variant]);
        } else {
            setNewVariant((prevVariants) => prevVariants.filter((item, index) => index !== variantIndex));
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        descriptions: Yup.string().required('Descriptions is required'),
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
        const form = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                form.append(key, values[key]);
            }
        });
        if (selectedPicture) {
            form.append('picture', selectedPicture);
        }

        if (newVariant.length > 0) {
            form.append('variant', JSON.stringify(newVariant));
        }

        const { data } = await http().post('/products/admin', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        router.push('/admin/product');
        setOpenModoal(false);
        console.log(data);
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
                                        <label className="btn btn-accent text-black capitalize w-full">
                                            <span>Choose picture</span>
                                            <input name="picture" onChange={changePicture} className="hidden" type="file" />
                                        </label>
                                    </div>

                                    <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                        <div className="text-xl text-primary font-semibold">Input category</div>
                                        <div className="w-full">
                                            <select name="product_category_id" className="select w-full input input-accent text-black" onChange={handleChange} onBlur={handleBlur} value={values.product_category_id}>
                                                {/* <option disabled selected>Article Category</option> */}
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
                                    </div>

                                    <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                        <div className="text-xl text-primary font-semibold">Delivery Hour :</div>
                                        <div className="w-full">
                                            <div className="text-sm">Input start hour</div>
                                            <input type="time" name="startDelivery" onChange={handleChange} onBlur={handleBlur} value={values.startDelivery} className="w-full input input-accent" placeholder="Input start hour" />
                                        </div>
                                        <div className="w-full">
                                            <div className="text-sm">Input end hour</div>
                                            <input type="time" name="endDelivery" onChange={handleChange} onBlur={handleBlur} value={values.endDelivery} className="w-full input input-accent" placeholder="Input end hour" />
                                        </div>
                                    </div>
                                    <div className="w-full md:max-w-[400px] flex flex-col items-start justify-start gap-5">
                                        <div className="text-xl text-primary font-semibold">Input stock</div>
                                        <div className="w-full">
                                            <input type="text" name="quantity" onChange={handleInputQuntity} onBlur={handleBlur} value={quantityProduct} className="w-full input input-accent" placeholder="Input Stock" />
                                        </div>
                                        {/* {errors.quantity && touched.quantity && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.quantity}</span>
                                            </label>
                                        )} */}
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
                                                    onChange={handleInputPrice}
                                                    onBlur={handleBlur}
                                                    value={basePrice}
                                                    className=" h-11 border-none outline-none w-full text-primary bg-transparent"
                                                    placeholder="Type the price"
                                                />
                                            </div>
                                            {/* {errors.price && touched.price && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.price}</span>
                                                </label>
                                            )} */}
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
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('R')}
                                                    className={`${btnR} w-14 lg:w-[70px] h-14 lg:h-[70px] text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    R
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('L')}
                                                    className={`${btnL} w-14 lg:w-[70px] h-14 lg:h-[70px]  text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    L
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('XL')}
                                                    className={`${btnXL} w-14 lg:w-[70px] h-14 lg:h-[70px]  text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    XL
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('RG')}
                                                    className={`${btnRG} w-14 lg:w-[70px] h-14 lg:h-[70px]  text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    250 gr
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('LG')}
                                                    className={`${btnLG} w-14 lg:w-[70px] h-14 lg:h-[70px]  text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    300 gr
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVariantSize('XLG')}
                                                    className={`${btnXLG} w-14 lg:w-[70px] h-14 lg:h-[70px]  text-primary text-base lg:text-xl text-center px-1 font-semibold rounded-full flex items-center justify-center`}
                                                >
                                                    500 gr
                                                </button>
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
                {/* <button onClick={handleButtonClick('R')} className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">
                    R
                </button> */}
                {/* <button onClick={handleButtonClick('L')} className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">
                    L
                </button>
                <button onClick={handleButtonClick('XL')} className="w-14 lg:w-[70px] h-14 lg:h-[70px] bg-accent text-primary text-xl lg:text-3xl font-semibold rounded-full flex items-center justify-center">
                    XL
                </button> */}
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
