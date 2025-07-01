import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaLock, FaSpinner, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const url = import.meta.env.VITE_SERVER_URL;

const initialData = {
    email: "",
    password: "",
};

function Login() {
    const [loginData, setLoginData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const from = location.state?.from || "/checkout"; // fallback after login

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!loginData.email || !loginData.password) {
            toast.warning("All fields are required");
            return;
        }

        if (!emailRegex.test(loginData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/user/login`, loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                toast.success("Login successful");
                setLoginData(initialData);

                setTimeout(() => {
                    localStorage.setItem("token", response.data.token);
                    navigate(from, { replace: true });
                }, 1500);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || "Login failed");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="label font-medium text-gray-700">
                            <FaEnvelope className="mr-2 inline" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full text-gray-700"
                            required
                        />
                    </div>

                    <div>
                        <label className="label font-medium text-gray-700">
                            <FaLock className="mr-2 inline" />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full text-gray-700"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full flex items-center justify-center gap-2 transition-all duration-300 ${loading ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" /> Logging in...
                            </>
                        ) : (
                            <>
                                <FaLock /> Login
                            </>
                        )}
                    </button>

                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
                        >
                            <FaUserPlus /> Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>

            <ToastContainer position="top-center" theme="dark" />
        </div>
    );
}

export default Login;