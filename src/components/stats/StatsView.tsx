import StatCard from "./StatCard";
import { FaHandsHelping, FaHeartbeat, FaBookOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function StatsView() {
    const {t} = useTranslation()
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                <StatCard
                    icon={FaHandsHelping}
                    end={300}
                    title={t("Successful Organized Day trips and safaris")}
                    description={t("Great impact on trips and safaris.")}
                    color="text-red-500"
                />
                <StatCard
                    icon={FaHeartbeat}
                    end={200}
                    title={t("Rooom services")}
                    description={t("Remarkable experiences on our Room services")}
                    color="text-pink-500"
                />
                <StatCard
                    icon={FaBookOpen}
                    end={350}
                    title={t("Return Clients")}
                    description={t("Many people loved our hospitality and made return trips here.")}
                    color="text-blue-500"
                />
            </div>
        </section>
    )
}

export default StatsView