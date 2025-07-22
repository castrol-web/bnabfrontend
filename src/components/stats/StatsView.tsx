import StatCard from "./StatCard";
import { ImUserCheck } from "react-icons/im";
import { FaBed} from "react-icons/fa";
import { MdOutlineRoomService } from "react-icons/md";
import { useTranslation } from "react-i18next";

function StatsView() {
    const {t} = useTranslation()
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                <StatCard
                    icon={FaBed}
                    end={300}
                    title={t("Accommodations")}
                    description={t("Elegant Rooms, Memorable Stays.")}
                    color="text-red-500"
                />
                <StatCard
                    icon={MdOutlineRoomService}
                    end={200}
                    title={t("Room services")}
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