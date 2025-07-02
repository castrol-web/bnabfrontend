import type { FC } from "react";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ServiceProp {
    heading: string;
    Icon: IconType;
    details: string;
}

const ServiceCard: FC<ServiceProp> = ({ heading, Icon, details }) => {
    const {t} = useTranslation();
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="shadow-xl bg-gray-900 rounded-2xl p-6 text-center border hover:shadow-2xl transition-all duration-300"
        >
            <div className="flex items-center justify-center mb-4 text-primary text-4xl">
                <Icon />
            </div>
            <h2 className="text-xl font-semibold text-[#EAE4D5] mb-2">{t(heading)}</h2>
            <p className="text-sm text-gray-500">{t(details)}</p>
        </motion.div>
    );
};

export default ServiceCard;
