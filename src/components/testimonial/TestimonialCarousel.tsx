import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa';
import engineer from "../../assets/engineer.avif";
import smile from "../../assets/smile.avif";
import woman from "../../assets/woman.jpg";
import { useTranslation } from 'react-i18next';

type Testimonial = {
  name: string;
  title: string;
  quote: string;
  image: string;
  rating: number;
};

export const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const data: Testimonial[] = [
      {
        name: "Jane Doe",
        title: t("Construction Engineer"),
        quote: t("Best room service I enjoyed the hospitality during my stay!"),
        image: engineer,
        rating: 5,
      },
      {
        name: "John Smith",
        title: t("Tourist"),
        quote: t("I really enjoyed the daytrips, good restaurant, free and strong wifi. 10/10 service!"),
        image: smile,
        rating: 4,
      },
      {
        name: "Amina Yusuf",
        title: t("Student"),
        quote: t("Great staff I met there. I would recommend anyone. Worth the pay. So grateful!"),
        image: woman,
        rating: 5,
      },
    ];
    setTestimonials(data);
  }, [t]); // include `t` in the dependency array for live translation updates

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return <div className="text-center py-10">{t("Loading testimonials...")}</div>;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 pt-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">{t("What Our Clients Say")}</h2>
        <p className="text-gray-500">{t("Real stories from our happy customers")}</p>
      </div>

      <div className="relative lg:min-h-[350px] min-h-[600px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <div className="card bg-gray-700 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-3xl w-full">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].title}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div className="flex-1 text-center md:text-left">
                <FaQuoteLeft className="text-blue-400 text-2xl mb-2 mx-auto md:mx-0" />
                <p className="text-slate-50 italic mb-3">"{testimonials[current].quote}"</p>
                <div className="flex justify-center md:justify-start mb-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < testimonials[current].rating ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </div>
                <p className="text-sm text-slate-50">{testimonials[current].title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2">
          <button
            type="button"
            title="Previous"
            onClick={prev}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2">
          <button
            type="button"
            title="Next"
            onClick={next}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
