import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FAQs = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      id: 1,
      question: t("What time is check-in and check-out?"),
      answer: t("Check-in starts at 2:00 PM and check-out is by 11:00 AM. Need early check-in or late check-out? Let us know in advance—we’re happy to accommodate when possible!"),
    },
    {
      id: 2,
      question: t("Do you offer airport pickup or shuttle services?"),
      answer: t("Yes! We provide airport transfers upon request. Just share your flight details when booking, and we’ll arrange a smooth ride to and from the hotel."),
    },
    {
      id: 3,
      question: t("Is breakfast included in the room rate?"),
      answer: t("Absolutely! A delicious continental breakfast is included with every stay. Enjoy fresh local flavors, fruits, pastries, and more each morning."),
    },
    {
      id: 4,
      question: t("Are pets allowed at the property?"),
      answer: t("We love furry companions! Pets are welcome in select rooms. Please inform us during booking so we can prepare a comfortable space for both of you."),
    },
    {
      id: 5,
      question: t("What amenities are available in the rooms?"),
      answer: t("Each room includes air conditioning, Wi-Fi, a smart TV, private bathroom, and complimentary toiletries. Suites offer extra touches like minibars and scenic views."),
    },
    {
      id: 6,
      question: t("Can I cancel or modify my reservation?"),
      answer: t("Yes, we offer flexible booking! You can modify or cancel your reservation up to 24 hours before your check-in date without any charges."),
    },
    {
      id: 7,
      question: t("Do you offer tours or local experiences?"),
      answer: t("We do! From guided nature walks to cultural village tours, we’ll help you explore the best of our surroundings. Just ask our front desk or concierge."),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-20 px-4 md:px-12">
      {/* Animated Geometric Shapes */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-2xl"
      />
      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400 rotate-45 opacity-10 blur-xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-gray-600 rounded-full opacity-10 blur-2xl"
      />

      {/* FAQ Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
          {t("Frequently Asked Questions")}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {t("Guest FAQs – Staying With Us Made Easy")}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {faqs.map(({ id, question, answer }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      {/* Ask a Question CTA */}
      <div className='relative z-10 items-center justify-center mx-auto hidden gap-7 mt-4'>
        <span className='text-slate-50'>{t("still having another question?")}</span>
        <Link to="/questions" className='btn btn-primary'>
          {t("ask a question")}
        </Link>
      </div>
    </section>
  );
};

export default FAQs;
