import StatCard from "./StatCard";
import { ImUserCheck } from "react-icons/im";
import { MdOutlineRoomService } from "react-icons/md";
import {GiLion } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function StatsView() {
    const {t} = useTranslation()
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                <StatCard
                    icon={GiLion}
                    end={300}
                    title={t("Successful Organized safaris")}
                    description={t("Great impact on safaris.")}
                    color="text-red-500"
                />
                <StatCard
                    icon={MdOutlineRoomService}
                    end={200}
                    title={t("Rooom services")}
                    description={t("Remarkable experiences on our Room services")}
                    color="text-pink-500"
                />
                <StatCard
                    icon={ImUserCheck}
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