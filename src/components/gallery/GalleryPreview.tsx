import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import reception from "../../assets/reception.jpeg";
import parking from "../../assets/parking.jpeg";
import room1 from "../../assets/room1.jpeg";
import room2 from "../../assets/room2.jpeg";

const images = [
  parking,
  reception,
  room1,
  room2,
];

const GalleryPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16 bg-base-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-2">{t("Gallery")}</h2>
        <p className="text-gray-400">
          {t("A glimpse of the beauty and comfort you can expect.")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="object-cover w-full h-56 hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/gallery" className="btn btn-primary gap-2">
          {t("View Full Gallery")} <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default GalleryPreview;
