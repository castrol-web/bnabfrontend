import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";
import bart from "../assets/bart.jpeg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-12 gap-12">
      {/* Left - Images */}
      <div className="relative w-full lg:w-1/2">
        <motion.img
          src={home1}
          alt="bnb thumbnails"
          className="rounded-2xl w-full shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src={home2}
          alt="bnb inside pictures"
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
          {t("Welcome to B&B Hotel Moshi")}
        </motion.h1>

        <p className="text-sm leading-relaxed">
          {t(
            "Discover the stunning beauty of Moshi from the comfortable and inviting B&B HOTEL Moshi. Located just 45 minutes from Kilimanjaro International Airport, our hotel provides the perfect base for tourists looking to explore the wonders of Tanzania.We look forward to welcoming you to B&B HOTEL Moshi, where adventure and comfort come together! Book your stay now and create unforgettable memories."
          )}
        </p>

        {/* Features List */}
        <ul className="space-y-2 mt-6">
          {[
            "Accommodation",
            "Restaurant",
            "Bar",
            "Coffee Cafe",
            "Laudry Services",
            "Free parking",
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-500" /> {t(item)}
            </li>
          ))}
        </ul>

        {/* Call to Action */}
        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
          <Link to="/about" className="btn btn-primary px-6">
            {t("About Us")}
          </Link>
          <Link to="/founder-story">
            <div className="flex items-center gap-2">
              <img
                src={bart}
                alt={t("Founder")}
                className="w-10 h-10 rounded-full border"
              />
              <div className="text-sm text-left">
                <p className="font-semibold">Bart</p>
                <p className="text-xs text-gray-500">{t("Founder & CEO")}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
