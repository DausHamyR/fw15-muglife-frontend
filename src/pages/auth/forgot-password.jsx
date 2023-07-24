import Footer from '@/components/Footer';
import http from '@/helpers/http.helper';
import { Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { saveEmail } from '@/redux/reducers/auth';
import {MdError, MdOutlineDisabledVisible} from 'react-icons/md';

import { withIronSessionSsr } from 'iron-session/next';
import cookieConfig from '@/helpers/cookieConfig';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token;

    if (token) {
      res.setHeader('location', '/');
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
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [isCountdownStarted, setIsCountdownStarted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let timer;
    
    if (isCountdownStarted) {
      timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
        } else {
          if (seconds > 0) {
            setSeconds(prevSeconds => prevSeconds - 1);
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds, isCountdownStarted]);
    
  const handleStartCountdown = () => {
    setMinutes(1);
    setSeconds(59);
    setIsCountdownStarted(true);
  };

  const doForgotPassword = async(event)=>{
    try {
      event.preventDefault();
      setErrorMessage('');
      const {value: email} = event.target.email;
      const form = new URLSearchParams({email}).toString();
      const {data} = await http().post('/auth/forgotPassword', form);
      console.log(data);
      if(data.success === true){
        dispatch(saveEmail(email));
        router.push('/auth/reset-password');
        console.log('tes');
      }
    } catch (error) {
      const message = error?.response?.data.message;
      setErrorMessage(message);
    }
  };
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <main className="w-full h-screen">
        <div className=" w-full h-screen">
          <div className="bg-forgot-pattern bg-no-repeat bg-cover w-full h-full flex justify-center items-center">
            <form onSubmit={doForgotPassword} className="flex flex-col items-center justify-center gap-11">
              <div className="text-center">
                <div className="text-5xl text-white font-semibold">Forgot your password ?</div>
                <div className="text-2xl text-white font-semibold">Don&apos;t worry, we got your back!</div>
                {errorMessage && 
                                    (<div>
                                      <h1 className="alert alert-error w-[330px]">{errorMessage}</h1>
                                    </div>)
                }
              </div>
              <div className="flex flex-col gap-3 w-full px-5">
                {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="w-full md:w-[550px] h-16">
                    <input 
                      type="email" 
                      name="email"
                      className="input input-accent  text-secondary bg-white w-full h-full"
                      placeholder="Enter your email adress to get link"
                    />
                  </div>
                  <div className="w-full sm:w-[150px] h-16 ">
                    {minutes === 0 && seconds === 0 ?
                      (<button onClick={handleStartCountdown} className="btn btn-accent w-full h-full text-primary text-xl capitalize shadow-lg shadow-stone-500/50">Send</button>) :
                      (<button disabled={true} className="btn btn-accent w-full h-full text-primary text-xl capitalize shadow-lg shadow-stone-500/50"><MdOutlineDisabledVisible size={50}/></button>) 
                    }
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-5 px-5">
                <div className="w-full max-w-[470px] text-center text-2xl text-white font-semibold">Click here if you didn’t receive any link in 2 minutes</div>
                <div className="w-full md:w-[300px] h-16">
                  {minutes === 0 && seconds === 0 ?
                    <button onClick={handleStartCountdown} className="btn btn-secondary w-full h-full text-white text-xl capitalize shadow-lg shadow-orange-900/50">Resend Link</button> :
                    <button className="hidden btn btn-secondary w-full h-full text-white text-xl capitalize shadow-lg shadow-orange-900/50">Resend Link</button>
                  }
                </div>
                {minutes === 0 && seconds === 0 ?
                  <div className="hidden text-center text-2xl text-white font-semibold">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div> :
                  <div className="text-center text-2xl text-white font-semibold">{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
                }
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgotPassword;
