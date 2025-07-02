import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-xl w-full"
            >
                <div className="flex justify-center mb-6 text-yellow-500 text-6xl">
                    <FaExclamationTriangle />
                </div>

                <h1 className="text-4xl font-bold mb-2 text-gray-800">{t("404 - Page Not Found")}</h1>
                <p className="text-gray-500 mb-6">
                    {t("The page you're looking for doesn't exist or has been moved.")}
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary btn-wide"
                >
                   {t(" Go Back Home")}
                </button>
            </motion.div>
        </div>
    );
}
