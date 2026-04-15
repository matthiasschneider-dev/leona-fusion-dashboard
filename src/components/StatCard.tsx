import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'cyan';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-quantum-blue to-blue-600',
    green: 'from-fusion-green to-green-600',
    orange: 'from-fusion-orange to-orange-600',
    purple: 'from-quantum-purple to-purple-600',
    cyan: 'from-quantum-cyan to-cyan-600'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend === 'up') return 'text-fusion-green';
    if (trend === 'down') return 'text-fusion-red';
    return 'text-gray-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${colorClasses[color]}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </p>
            <div className="mt-2 flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">
                {value}
              </p>
              {unit && (
                <p className="ml-2 text-lg font-medium text-gray-500">
                  {unit}
                </p>
              )}
            </div>
            {trend && trendValue && (
              <div className={`mt-2 flex items-center text-sm ${getTrendColor()}`}>
                <span className="font-bold mr-1">{getTrendIcon()}</span>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={`text-4xl opacity-20`}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
