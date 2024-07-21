import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/Report');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='bg-[#1C1C1C] p-8 h- min-h-screen flex justify-center items-center'>
      <div className='p-3 max-w-lg w-full bg-white rounded-2xl'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
          <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
          <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95' disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <div className='flex justify-between items-center mt-4'>
            <div>
              <p>Don't have an account?</p>
              <Link to="/signup" className='text-blue-500'>Sign up</Link>
            </div>
          </div>
        </form>
        <OAuth />
        <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
      </div>
    </div>
  );
};

export default SignIn;
