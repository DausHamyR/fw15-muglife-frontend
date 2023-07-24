import http from '@/helpers/http.helper';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ChangePasswordModal = ({ token }) => {
  const [closeModal, setCloseModal] = React.useState(true);

  const close = () => {
    setCloseModal(false);
  };
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const doChangePassword = async (event) => {
    console.log(token);
    setErrorMessage('');
    try{
      setLoading(true);
      event.preventDefault();
      const {value: oldPassword} = event.target.oldPassword;
      const {value: newPassword} = event.target.newPassword;
      const {value: confirmNewPassword} = event.target.confirmNewPassword;
      console.log(oldPassword, newPassword, confirmNewPassword);
      if(newPassword !== confirmNewPassword){
        setErrorMessage('Password and Confirm Password do not match');
        setLoading(false);
        return;
      }
      const body = new URLSearchParams({oldPassword, newPassword, confirmNewPassword});
      console.log(body);
      const {data} = await http(token).patch('/changePassword', body);
      console.log(data);
      if(data){
        setSuccessMessage('Successfully changed password');
        setLoading(false);
      }
    }catch(err){
      console.log(err);
      const message = err?.response?.data?.message;
      const results = err?.response?.data?.results;
      console.log(message);
      console.log(results);
      if(err.message === 'Network Error'){
        setErrorMessage(err.message);
        setLoading(false);
      }
      if(message === 'profile_change_password_wrong_old'){
        setErrorMessage('Old password is incorrect.');
        setLoading(false);
      }
      if(message){
        setErrorMessage(message);
        setLoading(false);
      }
      setSuccessMessage('');
    }finally{
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const [showPassword3, setShowPassword3] = React.useState(false);
  const handleTogglePassword3 = () => {
    setShowPassword3(!showPassword3);
  };

    
  return (
    <>
      <form onSubmit={doChangePassword}>
        <input type="checkbox" id="loading" className="modal-toggle" checked={closeModal} readOnly />
        <div className="modal">
          <div className="modal-box bg-white">
            <div className="py-1 text-black text-lg font-semibold">Change Password</div>
            <div className="text-warning text-sm">*Please change the password periodically</div>
            {errorMessage &&
                        (<div className='flex justify-center'>
                          <h1 className="alert alert-error w-[400px] mt-4">{errorMessage}</h1>
                        </div>)}
            {successMessage && 
                        (<div className='flex justify-center'>
                          <h1 className="alert alert-success w-[400px] mt-4">{successMessage}</h1>
                        </div>)}
            <div className="modal-action flex flex-col items-center justify-center gap-7 w-full">
              <div className="w-full">
                <div className="text-base text-primary pb-2">Old Password</div>
                <label className='flex items-center'>
                  <input name='oldPassword' type={showPassword ? 'text' : 'password'} className="input input-primary w-full" />
                  <div onClick={handleTogglePassword} className='relative right-12'>
                    {showPassword ? 
                      <AiOutlineEye size={25}/> :
                      <AiOutlineEyeInvisible size={25}/> 
                    }
                  </div>
                </label>
              </div>
              <div className="w-full">
                <div className="text-base text-primary pb-2">New Password</div>
                <label className='flex items-center'>
                  <input name='newPassword' type={showPassword2 ? 'text' : 'password'} className="input input-primary w-full" />
                  <div onClick={handleTogglePassword2} className='relative right-12'>
                    {showPassword2 ? 
                      <AiOutlineEye size={25}/> :
                      <AiOutlineEyeInvisible size={25}/> 
                    }
                  </div>
                </label>
              </div>
              <div className="w-full">
                <div className="text-base text-primary pb-2">Confirm Password</div>
                <label className='flex items-center'>
                  <input name='confirmNewPassword' type={showPassword3 ? 'text' : 'password'} className="input input-primary w-full" />
                  <div onClick={handleTogglePassword3} className='relative right-12'>
                    {showPassword3 ? 
                      <AiOutlineEye size={25}/> :
                      <AiOutlineEyeInvisible size={25}/> 
                    }
                  </div>
                </label>
              </div>
              <div className="w-full flex items-center justify-end gap-5">
                <button
                  type="button"
                  className="btn btn-warning w-20 capitalize text-black"
                  onClick={() => {
                    close();
                  }}
                >
                                    Cancel
                </button>
                <button type='submit' disabled={loading} className="btn btn-accent w-40 capitalize text-black ">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordModal;
