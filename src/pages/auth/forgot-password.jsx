import Footer from '@/components/Footer';
import http from '@/helpers/http.helper';
import { Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { saveEmail } from '@/redux/reducers/auth';
import {MdError} from 'react-icons/md'

import { withIronSessionSsr } from "iron-session/next";
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
    email: Yup.string().email().required(),
});

function ForgotPassword() {
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const router = useRouter()
    const dispatch = useDispatch()

    const doForgotPassword = async(values)=>{
        try {
            setLoading(true)
            setErrorMessage("")
            const form = new URLSearchParams({
                email: values.email
            })
            const {data} = await http().post("/auth/forgotPassword", form)
            console.log(data)
            if(data.success === true){
                dispatch(saveEmail(values.email))
                router.push("/auth/reset-password")
            }
        } catch (error) {
            const message = error?.response?.data.message
            setErrorMessage(message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <main className="w-full h-screen">
                <div className=" w-full h-screen">
                    <div className="bg-forgot-pattern bg-no-repeat bg-cover w-full h-full flex justify-center items-center">
                        <Formik
                            initialValues={{ 
                            email: ""
                         }}
                            validationSchema = {validationSchema}
                            onSubmit={doForgotPassword}
                        >{({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
 
                        }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-11">
                                <div className="text-center">
                                    <div className="text-5xl text-white font-semibold">Forgot your password ?</div>
                                    <div className="text-2xl text-white font-semibold">Don&apos;t worry, we got your back!</div>
                                </div>
                                <div className="flex flex-col gap-3 w-full px-5">
                                    {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <div className="w-full md:w-[550px] h-16">
                                            <input 
                                                type="email" 
                                                name="email"
                                                className={`input input-accent ${errors.email && touched.email && "input-error"} text-secondary bg-white w-full h-full`}
                                                placeholder="Enter your email adress to get link"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email} 
                                            />
                                        </div>
                                        <div className="w-full sm:w-[150px] h-16 ">
                                            {loading ? (<button className="btn btn-accent w-full h-full text-primary text-xl capitalize shadow-lg shadow-stone-500/50"><span className="loading loading-spinner loading-sm"></span></button>) :
                                                (<button className="btn btn-accent w-full h-full text-primary text-xl capitalize shadow-lg shadow-stone-500/50">Send</button>) }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center gap-5 px-5">
                                    <div className="w-full max-w-[470px] text-center text-2xl text-white font-semibold">Click here if you didn’t receive any link in 2 minutes</div>
                                    <div className="w-full md:w-[300px] h-16">
                                        <button className="btn btn-secondary w-full h-full text-white text-xl capitalize shadow-lg shadow-orange-900/50">Resend Link</button>
                                    </div>
                                    <div className="text-center text-2xl text-white font-semibold">01:54</div>
                                </div>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ForgotPassword;
