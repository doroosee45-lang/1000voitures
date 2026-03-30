// components/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, change, color = 'blue', loading = false }) => {
  const colorClasses = {
    blue: 'from-blue-600 to-cyan-500',
    green: 'from-green-600 to-emerald-500',
    purple: 'from-purple-600 to-pink-500',
    orange: 'from-orange-600 to-amber-500',
    red: 'from-red-600 to-rose-500'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      {loading ? (
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      )}
    </div>
  );
};

export default StatsCard;