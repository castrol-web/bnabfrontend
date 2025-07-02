import { FaEquals } from 'react-icons/fa';
import type { IconType } from 'react-icons';

type StatsType = {
  title: string;
  value: string;
  icon: IconType;
  trend: string;
  trendDirection: 'up' | 'down' | 'equal';
};

function StatusCard({ title, value, icon: Icon, trend, trendDirection }: StatsType) {
  function getDirection() {
    if (trendDirection === 'up') return <div className="text-green-500">▲</div>;
    if (trendDirection === 'down') return <div className="text-red-500">▼</div>;
    return <FaEquals className="text-gray-500" />;
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg w-1/3">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-semibold lg:text-lg text-sm">{title}</p>
        </div>
        <Icon className="lg:text-2xl text-lg" />
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div
        className={`text-sm ${
          trendDirection === 'up' ? 'text-green-500' : trendDirection === 'down' ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {getDirection()} {trend}
      </div>
    </div>
  );
}

export default StatusCard;