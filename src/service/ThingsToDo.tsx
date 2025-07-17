import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { GiCoffeeBeans, GiHiking, GiTreehouse, GiMountainClimbing, GiLion } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Things = (t: (key: string) => string) => [
    {
        heading: t("Coffee Tour"),
        Icon: GiCoffeeBeans,
        details: t("Learn first hand a rare insight into local coffee production process right in the heart of the Materuni village. Get amazed by the spectacular 95m waterfall."),
    },
    {
        heading: t("Cultural Tours"),
        Icon: GiHiking,
        details: t("Feeling adventurous? Ask us about the intimate experience in the local African Masai and Hadzabe tribes tour."),
    },
    {
        heading: t("Eco Tourism"),
        Icon: GiTreehouse,
        details: t("Plan a Rau or Marangu Eco-tourism organized by a community based enterprise in Moshi-Kilimanjaro region.Enjoy nature while walking or meditating in the forest."),
    },
    {
        heading: t("Climbers Expedition"),
        Icon: GiMountainClimbing,
        details: t("This expedition is for those who have mental toughness to push their limits. Ask us how we can get you to the peak of Mt. Kilimanjaro (5,895m/19,341 ft) a.s.l"),
    },
    {
        heading: t("Hotspring Experience"),
        Icon: FaSwimmer,
        details: t("Come experience the lovely spring oasis at Kikuletwa. Just sit and enjoy the scenery or put your swimming gear and dive in."),
    },
    {
        heading: t("Safari"),
        Icon: GiLion,
        details: t("While Tanzania has many to offer, Safari tour remain to be the most prominent activity in Tanzania. Come witness the wonders of nature. Let us know you desires, we'll fulfill them."),
    },
];

function ThingsToDo() {
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
            <div className="text-center mb-10 lg:w-1/3 justify-center mx-auto">
                <h1 className="text-3xl font-bold text-orange-500 mb-2">{t("Things To Do")}</h1>
                <p className="text-gray-500 text-sm">{t("Whether you're seeking thrilling adventures, cultural immersion, or peaceful moments in nature — Tanzania has it all. From climbing majestic Mount Kilimanjaro to soaking in the serenity of Kikuletwa Springs, every experience is crafted to leave a lasting memory. Let your story begin here.")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Things(t).map((item, idx) => (
                    <ServiceCard key={idx} {...item} />
                ))}
            </div>
        </section>
    );
}

export default ThingsToDo;
