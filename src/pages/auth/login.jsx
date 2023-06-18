import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import logo from '../../assets/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookieConfig from '@/helpers/cookieConfig';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;

        if (token) {
            res.setHeader("location", "/");
            res.statusCode = 302;
            res.end();
            return { prop: {token} };
        }

        return {
            props: {
                token: null
            },
        };
    },
    cookieConfig
);

const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is invalid'),
    password: Yup.string().required('Password is invalid'),
});

function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showEye, setShowEye] = React.useState(false);

    const doLogin = async (values) => {
        setErrorMessage('');
        setLoading(true);
        const form = new URLSearchParams({
            email: values.email,
            password: values.password,
        }).toString();

        const { data } = await axios.post('/api/login', form);
        console.log(data);
        if (data.success === false) {
            setErrorMessage('Email or Password wrong');
            setLoading(false);
        }
        if (data.success === true) {
            router.push('/');
            setLoading(false);
        }
    };
    const doShowEye = () => {
        setShowEye(!showEye);
    };
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main className="w-full">
                <div className=" w-full bg-login-pattern bg-no-repeat bg-cover flex justify-center items-center">
                    <div className="hidden sm:block basis-2/5 lg:basis-2/4 xl:basis-3/5 w-full h-full"></div>
                    <div className="md:basis-3/5 lg:basis-2/4 xl:basis-2/5 w-full bg-white pb-24">
                        <div className="w-full h-full flex flex-col items-center justify-center py-11 pl-4 md:pl-16 pr-4 md:pr-24">
                            <div className="w-full flex items-center justify-between pb-20">
                                <div>
                                    <Image src={logo} width={150} alt="logo"></Image>
                                </div>
                                <div>
                                    <Link href="/auth/register" className="btn btn-accent w-[150px] rounded-full text-primary capitalize">
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                            <div className="text-3xl text-primary font-semibold pb-14">Login</div>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={doLogin}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit} className="form-control w-full lg:max-w-[500px] h-full flex flex-col items-start justify-start">
                                        {errorMessage && (
                                            <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg w-full my-2">
                                                <MdError size={30} />
                                                {errorMessage}
                                            </div>
                                        )}
                                        <div className="w-full flex flex-col items-start justify-start gap-3 pb-7">
                                            <div className="text-primary text-lg font-semibold">Email Address :</div>
                                            <div className="form-control w-full flex flex-col gap-1">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className={`input input-secondary ${errors.email && touched.email && 'input-error'} w-full text-primary`}
                                                    placeholder="Enter your email address"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {errors.email && touched.email && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error text-[16px]">{errors.email}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative w-full flex flex-col items-start justify-start gap-3 pb-5">
                                            <div className="text-primary text-lg font-semibold">Password :</div>
                                            <div className="form-control w-full flex flex-col gap-1">
                                                <input
                                                    type={showEye ? 'text' : 'password'}
                                                    name="password"
                                                    className={`input input-secondary ${errors.password && touched.password && 'input-error'} w-full text-primary`}
                                                    placeholder="Enter your password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {errors.password && touched.password && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-[16px] text-error">{errors.password}</span>
                                                    </label>
                                                )}
                                                <button type="button" onClick={doShowEye}>
                                                    {showEye ? <FiEyeOff size={23} className="absolute text-secondary top-[50px]  right-5" /> : <FiEye size={23} className="absolute text-secondary top-[50px] right-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start justify-start gap-3 pb-5">
                                            <Link href="/auth/forgot-password" className="text-primary text-lg font-semibold underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md mt-5 pb-7">
                                            {loading ? (
                                                <button className="btn btn-accent text-primary text-base capitalize w-full">
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                </button>
                                            ) : (
                                                <button className="btn btn-accent text-primary text-base capitalize w-full">Log In</button>
                                            )}
                                        </div>
                                        <div className="w-full flex flex-col items-start justify-start gap-3 shadow-md">
                                            <button className="btn btn-neutral text-primary text-base capitalize w-full">
                                                <FcGoogle size={25} />
                                                Login with Google
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </main>
            <div className="relative w-full">
                <div className="hidden absolute lg:flex items-center justify-between m-auto inset-x-0 bottom-[-120px] w-[70%] h-[200px] bg-white rounded-2xl py-11 px-16 drop-shadow-lg">
                    <div>
                        <div className="w-[350px] text-4xl text-primary font-medium pb-3">Get your member card now!</div>
                        <div className="text-base text-primary">Let&apos;s join with our member and enjoy the deals.</div>
                    </div>
                    <div>
                        <button className="btn btn-accent w-[250px] text-primary text-base font-semibold capitalize">Create Now</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
