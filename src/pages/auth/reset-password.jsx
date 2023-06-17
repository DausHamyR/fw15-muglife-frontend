import Head from 'next/head';
import React from 'react';
import Footer from '@/components/Footer';
import { Formik } from 'formik';
import {FiEyeOff, FiEye} from "react-icons/fi"
import {MdError} from "react-icons/md"
import {BsCheckCircleFill} from "react-icons/bs"

import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from 'next/router';
import cookieConfig from '@/helpers/cookieConfig';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import http from '@/helpers/http.helper';
import { Link } from 'react-feather';

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
    newPassword: Yup.string().required("Password is invalid"),
    confirmPassword: Yup.string()
    .required("Confirm password is empty !")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});


function ResetPassword() {
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [showEye, setShowEye] = React.useState(false)
    const [openEye, setOpenEye] = React.useState(false)
    const [goLogin, setGoLogin] = React.useState(false)
    const email = useSelector(state => state.auth.email)

    const doResetPassword = async (values)=>{
        try {
            setLoading(true)
            setGoLogin(false)
            setErrorMessage("")
            successMessage("")

            const form = new URLSearchParams({
                email: email,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            })

            const {data} = await http().post("/auth/resetPassword", form)
            console.log(data)
            if(data.message){
                setSuccessMessage(data.message)
                setGoLogin(true)
            }
        } catch (error) {
            const message = error?.response?.data.message
            setErrorMessage(message)
        }
        finally{
            setLoading(false)
        }
    }

    const doShowEye = ()=>{
        setShowEye(!showEye);
    };

    const doOpenEye = ()=>{
        setOpenEye(!openEye);
    };

    return (
        <>
            <Head>
                <title>Reset Password</title>
            </Head>
            <main className="w-full h-screen">
                <div className=" w-full h-screen">
                    <div className="bg-forgot-pattern bg-no-repeat bg-cover w-full h-full flex justify-center items-center">
                    <Formik
                            initialValues={{ 
                            newPassword: "",
                            confirmPassword: ""
                         }}
                            validationSchema = {validationSchema}
                            onSubmit={doResetPassword}
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
                                    <div className="text-5xl text-white font-semibold">Reset your password</div>
                                    <div className="text-2xl text-white font-semibold">Don&apos;t worry, we got your back!</div>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center gap-9 px-5">
                                    {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg w-full my-2"><MdError size={30}/>{errorMessage}</div>)}
                                    {successMessage && (<div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg w-full my-2"><BsCheckCircleFill size={30}/>{successMessage}</div>)}
                                    <div className="relative form-control w-full md:w-[550px]">
                                        <input 
                                            type={showEye ? "text" : "password"} 
                                            name="newPassword"
                                            className={`input input-accent  ${errors.newPassword && touched.newPassword && "input-error"} text-secondary bg-white w-full h-16`}
                                            placeholder="Enter your new password" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newPassword}
                                        />
                                        {errors.newPassword && touched.newPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-[16px] text-error">{errors.newPassword}</span>
                                            </label>)
                                        }
                                        <button type="button" onClick={doShowEye}>
                                            {showEye ? (<FiEyeOff size={27} className="absolute text-secondary top-5  right-5" />) :
                                                (<FiEye size={27} className="absolute text-secondary top-5 right-5" />)
                                            }
                                        </button>   
                                    </div>
                                    <div className="relative form-control w-full md:w-[550px]">
                                        <input 
                                            type={openEye ? "text" : "password"} 
                                            name="confirmPassword"
                                            className={`input input-accent  ${errors.confirmPassword && touched.confirmPassword && "input-error"} text-secondary bg-white w-full h-16`}
                                            placeholder="Enter your confirm password" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-[16px] text-error">{errors.confirmPassword}</span>
                                            </label>)
                                        }
                                        <button type="button" onClick={doOpenEye}>
                                            {openEye ? (<FiEyeOff size={27} className="absolute text-secondary top-5  right-5" />) :
                                                (<FiEye size={27} className="absolute text-secondary top-5 right-5" />)
                                            }
                                        </button>   
                                    </div>
                                    <div className="w-full md:w-[550px] h-16">
                                        {loading ? (<button className="w-full h-full btn btn-accent text-primary text-xl capitalize shadow-lg shadow-stone-500/50"><span className="loading loading-spinner loading-sm"></span></button>) :
                                        (<button className="w-full h-full btn btn-accent text-primary text-xl capitalize shadow-lg shadow-stone-500/50">Reset</button>) }
                                    </div>
                                    {goLogin && <span className="text-xl text-primary">Password reset was successful, please <Link href="/auth/login" className="text-primary hover:text-secondary">Log In</Link> again</span>}
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

export default ResetPassword;
