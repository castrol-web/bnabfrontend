import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useTranslation } from "react-i18next";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        const verify = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await axios.post(`${SERVER_URL}/api/user/verify-email`, { token });

                    if (response.status === 200) {
                        setStatus("success");
                        toast.success(t(response.data.message) || t("Email verified successfully!"));
                        setTimeout(() => {
                            navigate('/login');
                        }, 4000);
                    }
                } else {
                    setStatus("error");
                    toast.error(t("Missing or invalid token."));
                }
            } catch (error: any) {
                console.error("Verification error:", error.response);
                setStatus("error");
                toast.error(t(error?.response?.data?.message) || t("Verification failed. Try again."));
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 text-white px-4">
            <div className="max-w-md w-full">
                {loading && (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400 border-solid mb-4"></div>
                        <p className="text-lg">{t("Verifying your email, please wait...")}</p>
                    </div>
                )}

                {!loading && status === "success" && (
                    <div className="text-green-400">
                        <h2 className="text-2xl font-semibold mb-2">{t("✅ Email Verified!")}</h2>
                        <p>{t("You'll be redirected to login shortly.")}</p>
                    </div>
                )}

                {!loading && status === "error" && (
                    <div className="text-red-400">
                        <h2 className="text-2xl font-semibold mb-2">{t("❌ Verification Failed")}</h2>
                        <p>{t("Please check your email or try again later.")}</p>
                    </div>
                )}
            </div>

            <ToastContainer position="top-center" theme="dark" />
        </div>
    );
}