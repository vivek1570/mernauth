import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [loading,setLoading]=useState(true);
  const [err,seterr]=useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log('form submitted',formData);
    setLoading(true);
    seterr(false);
    try{
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(!res.ok)
      {
        seterr(true);
      }
      console.log(data);
      setLoading(false);
    }
    catch(error)
    {
      setLoading(false);
      seterr(true);
      console.log(error);
    }
  }
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
              disabled={!loading}
            >
              Sign Up
            </button>
          </div>
        </form>
        {
          err && <p className='text-red-400'>username or email id aldready exist</p>
        }

        {/* Sign In Section */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <Link to='/signin'>
          <button
            className="text-indigo-500 hover:underline mt-2"
          >
            Sign In
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
