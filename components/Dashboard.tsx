import React, { useState, useEffect } from 'react';
import { API_CATEGORIES } from '../constants';
import { ClockIcon, ApiIcon, CategoryIcon, UptimeIcon } from './Icons';

// Capture the start time when the module is first loaded for uptime calculation.
const appStartTime = Date.now();

const StatusPlate: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center space-x-4 backdrop-blur-sm hover:border-green-500/50 transition-colors duration-300">
        <div className="text-green-400 text-3xl">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-xs uppercase font-mono">{title}</p>
            <p className="text-white text-xl font-semibold font-mono">{value}</p>
        </div>
    </div>
);

interface DashboardProps {
    totalApiCalls: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalApiCalls }) => {
    const [time, setTime] = useState(new Date());
    const [uptime, setUptime] = useState('00:00:00:00');

    useEffect(() => {
        const timerId = setInterval(() => {
            // Update clock
            setTime(new Date());

            // Calculate and format uptime
            const totalSeconds = Math.floor((Date.now() - appStartTime) / 1000);
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const format = (num: number) => String(num).padStart(2, '0');
            setUptime(`${format(days)}:${format(hours)}:${format(minutes)}:${format(seconds)}`);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const formatTime12HourPHT = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    const formattedTime = formatTime12HourPHT(time);

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500/10 blur-3xl opacity-30 -z-10"></div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Bilyabits API</h2>
        <p className="text-gray-400 max-w-2xl">
            This is your central hub for managing and exploring our powerful suite of APIs. Monitor your usage, browse detailed documentation, and get started with integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusPlate icon={<ClockIcon />} title="System Time (PHT)" value={formattedTime} />
          <StatusPlate icon={<ApiIcon />} title="Total API Calls" value={totalApiCalls.toLocaleString('en-US')} />
          <StatusPlate icon={<CategoryIcon />} title="API Categories" value={String(API_CATEGORIES.length).padStart(2, '0')} />
          <StatusPlate icon={<UptimeIcon />} title="Uptime (D:H:M:S)" value={uptime} />
      </div>
    </div>
  );
};

export default Dashboard;