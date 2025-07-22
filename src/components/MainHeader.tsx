import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bnb1 from "../assets/bnb1.jpg";
import bnbpic from "../assets/bnbpic.jpg";
import bnb2 from "../assets/bnb2.jpg";
import bnb3 from "../assets/bnb3.jpg";
import { useTranslation } from "react-i18next";

function MainHeader() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const images = [bnb1, bnbpic, bnb2, bnb3];

  const content = [
    {
      heading: "Welcome to B&B HOTEL Moshi",
      text: [
        "Discover the stunning beauty of Moshi from the comfortable and inviting B&B HOTEL Moshi.",
        "Located just 45 minutes from Kilimanjaro International Airport, our hotel provides the perfect base for tourists looking to explore the wonders of Tanzania.",
      ],
    },
    {
      heading: "Our Rooms",
      text: ["At B&B HOTEL Moshi, we offer a variety of accommodations to meet all your needs:"],
      list: [
        "Single Rooms: Perfect for solo travelers seeking comfort and privacy.",
        "Double Rooms: Ideal for couples wanting to unwind after a day full of adventure.",
        "Triple Rooms: Great for families or friends traveling together who want to stay comfortably.",
        "Twin Rooms: For those who prefer separate beds, with plenty of room to relax.",
      ],
    },
    {
      heading: "Amenities",
      text: ["At B&B HOTEL Moshi, we are committed to providing a worry-free experience for our guests. Our hotel features:"],
      list: [
        "CCTV security: Ensuring your safety and peace of mind.",
        "Free parking: Convenient and hassle-free parking for all our guests.",
        "Restaurant and bar: Enjoy delicious meals and refreshing drinks at our own restaurant and bar.",
      ],
    },
    {
      heading: "Explore Moshi",
      text: ["Moshi is a vibrant city full of life and culture. Visitors can enjoy numerous activities, including:"],
      list: [
        "Climbing Mount Kilimanjaro: The majestic mountain is a must-see for adventurous travelers.",
        "Safaris in Amboseli National Park: Discover wildlife in their natural habitat with breathtaking views.",
        "Cultural Tours: Learn more about the local community and their traditions.",
        "Markets and Craft Shops: Explore local markets and purchase unique souvenirs and handicrafts.",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [images.length]);

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

              {/* Paragraphs */}
              {content[index].text.map((line, i) => (
                <motion.p
                  key={`text-${i}`}
                  className="text-white text-md mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                >
                  {t(line)}
                </motion.p>
              ))}

              {/* Optional Bullet List */}
              {content[index].list && (
                <motion.ul
                  className="text-white list-disc ml-6 mt-4 text-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {content[index].list.map((item, i) => (
                    <li key={`list-${i}`}>{t(item)}</li>
                  ))}
                </motion.ul>
              )}
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
