// components/dashboard/NotificationsPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const NotificationsPanel = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/dashboard/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Erreur notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/dashboard/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(prev =>
        prev.map(n =>
          n._id === notificationId
            ? { ...n, readBy: [...n.readBy, { user: 'current' }] }
            : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur marquage notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id);
    if (notification.link) {
      navigate(notification.link);
    }
    setShowPanel(false);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      new_order: '🛒',
      new_rental: '🔑',
      new_trial: '🚗',
      new_contact: '📧',
      new_sell_request: '💰',
      new_financing: '💳',
      new_service_booking: '🔧',
      system_alert: '⚠️'
    };
    return icons[type] || '📌';
  };

  const getNotificationColor = (type) => {
    if (type.includes('order')) return 'bg-blue-100 text-blue-600';
    if (type.includes('rental')) return 'bg-purple-100 text-purple-600';
    if (type.includes('trial')) return 'bg-green-100 text-green-600';
    if (type.includes('contact')) return 'bg-amber-100 text-amber-600';
    if (type.includes('alert')) return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
  };

  useEffect(() => {
    fetchNotifications();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <h3 className="font-bold">Notifications</h3>
            <p className="text-xs text-white/80 mt-1">
              {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucune notification
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notif.readBy.some(rb => rb.user === 'current') ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${getNotificationColor(notif.type)} flex items-center justify-center text-sm flex-shrink-0`}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {notif.message}
                      </p>
                      <span className="text-xs font-medium text-gray-400">
                        {new Date(notif.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {notif.priority === 'urgent' && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => {
                setShowPanel(false);
                navigate('/dashboard/notifications');
              }}
              className="w-full text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;