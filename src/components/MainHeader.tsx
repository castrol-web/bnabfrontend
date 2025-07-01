import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import waterfal from "../assets/waterfal.jpg"
import chemka from "../assets/chemka.jpg";
import park from "../assets/park.jpg";

const images = [waterfal, chemka, park];

const content = [


    {
        heading: "B&B Hotel",
        text: "Book for a room with spacious rooms",
    },
    {
        heading: "Amazing beds and breakfast",
        text: "Helenus specializes in connecting job seekers to credible opportunities across",
    },
    {
        heading: "PURPOSE TO TRY B&B",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatifugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];
function MainHeader() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="w-full py-72 h-96 overflow-hidden relative mt-28">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 w-full h-full"
                        animate={{ opacity: i === index ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ zIndex: i === index ? 1 : 0 }}
                    >
                        <img
                            src={img}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                ))}

                <div className="absolute inset-0 flex bg-black/50 flex-col justify-center items-center text-center p-6 z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            className="sm:max-w-3xl lg:max-w-4xl"
                        >
                            <motion.h1
                                className="text-white text-4xl md:text-6xl font-bold"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                {content[index].heading}
                            </motion.h1>
                            <motion.p
                                className="text-white text-md mt-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            >
                                {content[index].text}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] z-0"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#F7C873] to-[#EA7300] opacity-15 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] header-custom-shadow"
                />
            </div>
        </>
    )
}

export default MainHeader