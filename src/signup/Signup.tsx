import React, { useState } from "react";
import axios from "axios";
import { countries } from "countries-list";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash, FaPhone, FaGlobe, FaSpinner, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
const url = import.meta.env.VITE_SERVER_URL;

const initialDataSet = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  password: "",
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState(initialDataSet);
  const [showPassword, setShowPassword] = useState(false);


  const countryOptions = Object.entries(countries).map(([code, c]) => ({
    value: c.name,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
          alt={c.name}
          width="20"
          className="inline-block rounded-sm"
        />
        {c.name}
      </div>
    ),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

    if (!signupData.userName || !signupData.email || !signupData.password) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (!usernameRegex.test(signupData.userName)) {
      toast.error("Username must be at least 3 characters and contain only letters, numbers, or underscores.");
      return;
    }

    if (!emailRegex.test(signupData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(signupData.password)) {
      toast.error("Password must be at least 6 characters and include at least 1 letter and 1 number.");
      return;
    }

    if (signupData.phone && !phoneRegex.test(signupData.phone)) {
      toast.error("Phone number is invalid. Use international format e.g. +2547XXXXXXX.");
      return;
    }


    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/user/register`, signupData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("Registration successful! Check your email for verification.");
        setSignupData(initialDataSet);
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message;

      if (error.response?.status === 400 && msg) {
        toast.error(msg);
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="label text-sm font-semibold text-gray-700">
                <FaUser className="inline mr-2" /> Username
              </label>
              <input
                type="text"
                name="userName"
                value={signupData.userName}
                onChange={handleChange}
                className="input input-bordered w-full text-gray-700"
                placeholder="Enter unique username"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="label text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={signupData.firstName}
                onChange={handleChange}
                className="input input-bordered w-full text-gray-700"
                placeholder="Your first name"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="label text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={signupData.lastName}
                onChange={handleChange}
                className="input input-bordered w-full text-gray-700"
                placeholder="your last name"
              />
            </div>
            <div className="w-1/2">
              <label className="label text-sm font-semibold text-gray-700">
                <FaPhone className="inline mr-2" /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={signupData.phone}
                onChange={handleChange}
                className="input input-bordered w-full text-gray-700"
                placeholder="e.g. +2547xxxxxxx"
              />
            </div>
          </div>

          <div>
            <label className="label text-sm font-semibold text-gray-700">
              <FaGlobe className="inline mr-2" /> Nationality
            </label>
            <Select
              name="nationality"
              options={countryOptions}
              onChange={(selectedOption) =>
                setSignupData({
                  ...signupData,
                  nationality: selectedOption?.value || "",
                })
              }
              className="react-select text-gray-700"
              classNamePrefix="rs"
              isSearchable
            />
          </div>

          <div>
            <label className="label text-sm font-semibold text-gray-700">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              className="input input-bordered w-full text-gray-700"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signupData.password}
              onChange={handleChange}
              className="input input-bordered w-full text-gray-700 pr-10"
              placeholder="Choose a secure password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-500 text-sm focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>


          <button
            type="submit"
            className={`btn btn-primary w-full flex items-center justify-center gap-2 transition-all duration-300 ${loading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Signing Up...
              </>
            ) : (
              <>
                <FaArrowRight /> Sign Up
              </>
            )}
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>

      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
};

export default Signup;