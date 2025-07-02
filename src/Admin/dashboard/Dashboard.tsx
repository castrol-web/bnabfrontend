import { GiMiningHelmet } from "react-icons/gi";
import { LiaCcVisa } from "react-icons/lia";
import StatusCard from "../../components/stats/statistics/StatusCard";

function Dashboard() {
    return (
        <div className="flex items-center justify-center gap-8">
            <StatusCard title={"Rooms Available"} value={"8"} icon={GiMiningHelmet} trend={"10%"} trendDirection={"up"} />
            <StatusCard title={"Organized Trips"} value={"40"} icon={LiaCcVisa } trend={"57%"} trendDirection={"down"} />
        </div>
    )
}

export default Dashboard