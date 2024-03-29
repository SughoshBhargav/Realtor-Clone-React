import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      if(userCredential.user){
        navigate("/")
      } 
    } catch (error) {
      console.log(error)
      toast.error("Bad USer credentials")
    }
  }

  return (
    <section className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>

      <div className='flex flex-col md:flex-row justify-center items-center px-6 py-12 max-w-6xl mx-auto w-full'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-0'>
          <img
            src='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='sign-in'
            className='w-full rounded-2xl'
          />
        </div>

        <div className='w-full md:w-[76%] lg:w-[50%] ml-0 md:ml-6'>
          <form onSubmit={onSubmit} className='flex flex-col'>
            <input
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              type='email'
              id='email'
              value={email}
              placeholder='Email Address'
              onChange={onChange}
            />
            <div className='relative mb-6'>
              <input
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                placeholder='Password'
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>

            <div className='flex flex-col md:flex-row justify-between text-sm sm:text-lg'>
              <p className='mb-4 md:mb-0'>
                Don't have an Account?
                <Link
                  to='/sign-up'
                  className='text-red-600 hover:text-red-700 cursor-pointer transition duration-200 ease-in-out ml-1'
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to='/forgot-password'
                  className='text-blue-600 hover:text-blue-700 cursor-pointer transition duration-200 ease-in-out'
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button type='submit' className='w-full mt-6 px-7 py-3 text-sm font-medium uppercase text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800'>Sign In</button>
          
          <div className='flex items-center m-4 before:border-t before:flex-1 before:border-gray-400  after:border-t after:flex-1 after:border-gray-400'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth></OAuth>
          </form>

          
       

        </div>
      </div>
    </section>
  );
}
