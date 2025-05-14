import React, { useState } from 'react';
import image from "../assets/depositphotos_179909146-stock-illustration-complaints-comments-bad-negative-feedback.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Signuppage';
import { LiaEyeSolid } from "react-icons/lia";
import { FaEyeSlash } from "react-icons/fa";

const HeroSection = () => {
  const [phone_num, setphone_num] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordshown, setpasswordshown] = useState(false);
  const navigate = useNavigate();
  const { signedup, setsignedup, username, setUserName, currentuser, setcurrentuser } = useAuth();

  const handlePhoneChange = (e) => {
    setphone_num(e.target.value);
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setpasswordshown(prev => !prev);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const submitLogin = async () => {
    const isValidPhone = /^[0-9]{10}$/.test(phone_num);
    if (!isValidPhone) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/login", {
        phone: `+91${phone_num}`,
        password: pass,
      });

      if (response.data.success) {
        setsignedup(true);
        setUserName(response.data.user.name);
        setcurrentuser(response.data.user.id);
        navigate('/report');
      } else {
        setErrorMessage(response.data.message || 'Login failed. Try again.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-600 min-h-screen w-full flex flex-col justify-center items-center relative px-4">
      <div className="text-center mb-12 max-w-2xl z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Report. Track. Resolve.
        </h1>
        <p className="text-slate-200 text-lg md:text-xl">
          Login to connect with your local corporator and raise your voice!
        </p>
        <div className="mt-6">
          <Link to="/report">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300">
              Raise an Issue
            </button>
          </Link>
        </div>
      </div>

      {!signedup && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={phone_num}
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={passwordshown ? 'text' : 'password'}
                  value={pass}
                  onChange={handlePassChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordshown ? <LiaEyeSolid className="text-xl" /> : <FaEyeSlash className="text-xl" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={submitLogin}
              className={`w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-700 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
            <p className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}

      <div className="absolute hidden lg:block right-0 bottom-0 w-[45%] max-w-xl h-[85%] overflow-hidden z-0">
        <img src={image} alt="Hero visual" className="object-cover w-full h-full rounded-l-2xl shadow-lg" />
      </div>
    </div>
  );
};

export default HeroSection;
