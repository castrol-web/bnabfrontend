import StatCard from "./StatCard";
import { FaHandsHelping, FaHeartbeat, FaBookOpen } from "react-icons/fa";

function StatsView() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                <StatCard
                    icon={FaHandsHelping}
                    end={300}
                    title="Successful Organized Day trips and safaris"
                    description="Great impact on trips and safaris."
                    color="text-red-500"
                />
                <StatCard
                    icon={FaHeartbeat}
                    end={200}
                    title="Rooom services"
                    description="Remarkable experiences on our Room services"
                    color="text-pink-500"
                />
                <StatCard
                    icon={FaBookOpen}
                    end={350}
                    title="Return Clients"
                    description="Many people loved our hospitality and made return trips here."
                    color="text-blue-500"
                />
            </div>
        </section>
    )
}

export default StatsView