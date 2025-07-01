import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import GoogleMapEmbeded from "../components/GoogleMapEmbeded";
const url = import.meta.env.VITE_SERVER_URL;

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${url}/api/user/contact`, form);
            if (response.status === 201) {
                toast.success("Message sent successfully!")
                setForm({ name: "", email: "", subject: "", message: "" })
            }

        } catch (error: any) {
            const msg = error?.response?.data?.message;
            if (error.response?.status === 400 && msg) {
                toast.error(msg);
            } if (error.response?.status === 404 && msg) {
                toast.error(msg);
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error("Failed to send message.");
            }
        } finally {
            setLoading(false)
        }
    };
    return (
        <>
            <Header pageName={"CONTACT"} />
            <section className="relative py-20 px-4 md:px-10 bg-gradient-to-br overflow-hidden">
                {/* Animated SVG Background */}
                <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-full animate-pulse"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#E0F2FE"
                            fillOpacity="1"
                            d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,106.7C840,107,960,181,1080,202.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-gray-700">
                    {/* Contact Info Cards */}
                    <div className="grid gap-8">
                        {[
                            {
                                Icon: FaPhoneAlt,
                                title: "Phone",
                                detail: "+255113368527",
                            },
                            {
                                Icon: FaEnvelope,
                                title: "Email",
                                detail: "Bnabhotel@gmail.com",
                            },
                            {
                                Icon: FaMapMarkerAlt,
                                title: "Location",
                                detail: "Moshi urban Tanzania",
                            },
                        ].map(({ Icon, title, detail }, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4"
                            >
                                <div className="text-blue-600 text-3xl animate-pulse">
                                    <Icon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                                    <p className="text-gray-600">{detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                required
                                className="input input-bordered w-full mt-1"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                required
                                className="input input-bordered w-full mt-1"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                type="text"
                                required
                                className="input input-bordered w-full mt-1"
                                placeholder="Enter subject"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="textarea textarea-bordered w-full mt-1"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            {!loading ? "Send Message" : "sending..."}
                        </motion.button>
                    </motion.form>
                </div>
            </section>
            <GoogleMapEmbeded />
            <ToastContainer />
        </>
    );
};

export default Contact;