import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import engineer from "../assets/engineer.avif"
import { Link } from "react-router-dom";



const AboutSection = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-12">
            {/* Left - Images */}
            <div className="relative w-full lg:w-1/2">
                <motion.img
                    src={home1}
                    alt="Happy Clients"
                    className="rounded-2xl w-full shadow-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                />
                <motion.img
                    src={home2}
                    alt="Consulting"
                    className="absolute bottom-[-40px] left-[30px] w-1/2 rounded-xl shadow-lg border-4 border-[#be7f2c]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                />
            </div>

            {/* Right - Text */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold items-center justify-center mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome to B&B Hotel for
                    Accomodation and Restaurant Bar
                </motion.h1>

                <p className="text-sm leading-relaxed">
                    B&B Hotel, the best hotel in Moshi, is a bit outside the main city center
                    of Kilimanjaro, Moshi town, in Tanzania (East Africa), at the highest majestic Mount Kilimanjaro.
                </p>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start gap-6 mt-4">
                    <div className="text-center">
                        <div className="radial-progress text-primary" data-value="85">
                            85%
                        </div>
                        <p className="mt-2 font-semibold text-sm">Safaris success</p>
                    </div>
                    <div className="text-center">
                        <div className="radial-progress text-secondary" data-value="95">
                            95%
                        </div>
                        <p className="mt-2 font-semibold text-sm">Client Satisfaction</p>
                    </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mt-6">
                    {[
                        "Daytrips",
                        "Laundry Services",
                        "Free wifi",
                        "99% Success Rate for organized Safaris",
                    ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> {item}
                        </li>
                    ))}
                </ul>

                {/* Call to Action */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                    <Link to="/about" className="btn btn-primary px-6">About Us</Link>
                    <div className="flex items-center gap-2">
                        <img
                            src={engineer}
                            alt="Founder"
                            className="w-10 h-10 rounded-full border"
                        />
                        <div className="text-sm text-left">
                            <p className="font-semibold">Alex</p>
                            <p className="text-xs text-gray-500">Founder & CEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
