import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { FaUtensils, FaShuttleVan, FaWifi, FaCoffee, FaBicycle, FaConciergeBell } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const services = (t: (key: string) => string) => [
    {
        heading: t("Delicious Dining"),
        Icon: FaUtensils,
        details: t("Enjoy a variety of locally inspired meals and international cuisine served fresh every day."),
    },
    {
        heading: t("Airport Pickup"),
        Icon: FaShuttleVan,
        details: t("We provide complimentary shuttle service to and from the airport for all guests."),
    },
    {
        heading: t("Free Wi-Fi"),
        Icon: FaWifi,
        details: t("Stay connected with high-speed internet throughout your stay at our property."),
    },
    {
        heading: t("Coffee Lounge"),
        Icon: FaCoffee,
        details: t("Relax with our premium coffee selections in a cozy lounge setting."),
    },
    {
        heading: t("Bike Rentals"),
        Icon: FaBicycle,
        details: t("Explore the city with our convenient bicycle rental service."),
    },
    {
        heading: t("24/7 Concierge"),
        Icon: FaConciergeBell,
        details: t("Our staff is available around the clock to assist with bookings, tours, and special requests."),
    },
];

function Services() {
    const { t } = useTranslation();

    return (
        <section className="py-12 px-4 sm:px-8 lg:px-16 relative">
            {/* Animated Geometric Shapes */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-2xl"
            />
            <motion.div
                animate={{ x: [2, 14, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400 rotate-45 opacity-10 blur-xl"
            />
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/4 w-24 h-24 bg-gray-600 rounded-full opacity-10 blur-2xl"
            />
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-orange-500 mb-2">{t("Our Services")}</h1>
                <p className="text-gray-500">{t("We provide everything you need for a comfortable and memorable stay.")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services(t).map((service, idx) => (
                    <ServiceCard key={idx} {...service} />
                ))}
            </div>
        </section>
    );
}

export default Services;
