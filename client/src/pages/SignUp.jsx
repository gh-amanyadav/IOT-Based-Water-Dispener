import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setloading(false);
      if (data.success === false) {
        seterror(true);
        return;
      }
      navigate('/signin');
    } catch (error) {
      setloading(false);
      seterror(true);
    }

  };
  return (
    <div className='bg-[#1C1C1C] p-8 h- min-h-screen'>
      <div className='p-3 max-w-lg mx-auto bg-white rounded-2xl'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form className=' flex flex-col gap-4 ' onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
          <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
          <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
          <button className=' bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
          <OAuth />
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to="/signin">
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
    </div>
  )
}

export default SignUp