import React from 'react';
import * as Icons from 'lucide-react';
import { KPICard as KPICardType } from '../types/dashboard';

const KPICard: React.FC<KPICardType> = ({ title, value, change, format, icon }) => {
  const Icon = Icons[icon as keyof typeof Icons];
  const isPositive = change >= 0;
  
  const formatValue = (val: number): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return val.toFixed(1) + '%';
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500 dark:text-gray-400">{title}</div>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="text-2xl font-bold mb-2 dark:text-white">
        {formatValue(value)}
      </div>
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <Icons.TrendingUp className={`w-4 h-4 mr-1 ${!isPositive && 'rotate-180'}`} />
        <span>{Math.abs(change)}% vs last month</span>
      </div>
    </div>
  );
};

export default KPICard;