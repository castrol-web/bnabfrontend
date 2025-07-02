import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import waterfal from "../assets/waterfal.jpg";
import bnbpic from "../assets/bnbpic.jpg";
import park from "../assets/park.jpg";
import { useTranslation } from "react-i18next";

function MainHeader() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const images = [waterfal, bnbpic, park];

  const content = [
    {
      heading: "Welcome to B&B Hotel",
      text: "Discover comfort, peace, and warm hospitality in the heart of Moshi.",
    },
    {
      heading: "Your Home Away From Home",
      text: "Enjoy cozy beds, fresh breakfasts, and breathtaking views of Mount Kilimanjaro.",
    },
    {
      heading: "Experience Tranquility",
      text: "Unwind in nature, indulge in delicious cuisine, and explore hidden gems nearby.",
    },
  ];

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
                {t(content[index].heading)}
              </motion.h1>
              <motion.p
                className="text-white text-md mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {t(content[index].text)}
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
  );
}

export default MainHeader;
