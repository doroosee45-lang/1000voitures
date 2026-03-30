// components/dashboard/ActivityFeed.jsx
import React from 'react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (action) => {
    const icons = {
      CREATE_ORDER: '🛒',
      CREATE_RENTAL: '🔑',
      CREATE_TRIAL: '🚗',
      CREATE_CONTACT: '📧',
      CREATE_SELL_REQUEST: '💰',
      CREATE_FINANCING: '💳',
      CREATE_SERVICE_BOOKING: '🔧',
      USER_REGISTER: '👤',
      USER_LOGIN: '🔐'
    };
    return icons[action] || '📌';
  };

  const getActivityColor = (action) => {
    if (action.includes('ORDER')) return 'bg-blue-100 text-blue-600';
    if (action.includes('RENTAL')) return 'bg-purple-100 text-purple-600';
    if (action.includes('TRIAL')) return 'bg-green-100 text-green-600';
    if (action.includes('CONTACT')) return 'bg-amber-100 text-amber-600';
    return 'bg-gray-100 text-gray-600';
  };

  const formatTime = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now - activityDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-extrabold text-slate-900">Activité récente</h3>
      </div>
      
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${getActivityColor(activity.action)} flex items-center justify-center text-sm flex-shrink-0`}>
                {getActivityIcon(activity.action)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 mb-0.5">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{activity.userName || 'Système'}</span>
                  <span>•</span>
                  <span>{formatTime(activity.createdAt)}</span>
                </div>
              </div>
              
              {activity.severity === 'warning' && (
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  ⚠️
                </span>
              )}
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Aucune activité récente
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;