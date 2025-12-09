import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    icon: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950',
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    icon: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950',
  },
  orange: {
    gradient: 'from-orange-500 to-red-500',
    icon: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950',
  },
  red: {
    gradient: 'from-red-500 to-red-600',
    icon: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = 'blue',
}) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
