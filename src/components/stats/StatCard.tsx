import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

type statType = {
    icon: any;
    end: number;
    title: string;
    description: string;
    color?: string;
};

function StatCard({ icon: Icon, end, title, description, color = "text-blue-500" }: statType) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const { t } = useTranslation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
        >
            <div className={`mb-4 text-4xl ${color} flex justify-center`}>
                <Icon />
            </div>
            <h3 className="text-3xl font-bold mb-2">
                {isInView && <CountUp end={end} duration={2} />}+
            </h3>
            <h4 className="text-xl font-semibold">{t(title)}</h4>
            <p className="text-sm mt-2">{t(description)}</p>
        </motion.div>
    );
}

export default StatCard;
