import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const [Data, setdata] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        toast.error("All Fields are required");
      } else {
        const response = await axios.post('https://taskecho-app.onrender.com/api/v1/signin', Data);
        setdata({ username: "", email: "", password: "" });
        toast.success("Signup Successfully");
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
        console.error("Axios error:", error);
      }
    }
  };

  return (
    <div className='h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
      <div className='p-8 w-full max-w-md rounded-lg shadow-lg bg-white text-gray-800'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>Create an Account</h2>
        <input
          type='text'
          placeholder='Username'
          className='bg-gray-200 px-4 py-3 my-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150'
          name='username'
          value={Data.username}
          onChange={change}
        />
        <input
          type='email'
          placeholder='Email'
          className='bg-gray-200 px-4 py-3 my-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150'
          name='email'
          value={Data.email}
          onChange={change}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-gray-200 px-4 py-3 my-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150'
          name='password'
          value={Data.password}
          onChange={change}
        />
        <div className='w-full flex items-center justify-between mt-4'>
          <button
            className='bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 w-full'
            onClick={submit}
          >
            Sign Up
          </button>
        </div>
        <div className='text-center mt-6'>
          <span className='text-gray-500'>Already have an account?</span>
          <Link to='/login' className='text-blue-500 font-semibold hover:underline ml-2'>
            Login here
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
