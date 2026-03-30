// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatsCard from '../pages/dashboard/StatsCard';
import ActivityFeed from '../pages/dashboard/ActivityFeed';
import RevenueChart from '../pages/dashboard/RevenueChart';
import NotificationsPanel from '../pages/dashboard/NotificationsPanel';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState('day');

  useEffect(() => {
    fetchDashboardData();
    
    // WebSocket pour les mises à jour en temps réel (optionnel)
    const ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_activity') {
        setActivities(prev => [data.activity, ...prev.slice(0, 19)]);
      }
    };

    return () => ws.close();
  }, [period]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [statsRes, activitiesRes, chartRes] = await Promise.all([
        axios.get(`${API_URL}/dashboard/stats?period=${period}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/dashboard/realtime`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/dashboard/charts?days=30`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data.stats);
      setActivities(activitiesRes.data.activities);
      setChartData(formatChartData(chartRes.data.data));
      
    } catch (err) {
      console.error('Erreur chargement dashboard:', err);
      setError('Impossible de charger les données du dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = (data) => {
    // Formater les données pour le graphique
    const dates = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates.map(date => ({
      date,
      orders: data.orders?.find(d => d._id === date)?.revenue || 0,
      rentals: data.rentals?.find(d => d._id === date)?.revenue || 0
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-extrabold text-slate-900">
              Dashboard
            </h1>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['day', 'week', 'month', 'year'].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    period === p
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {p === 'day' ? 'Jour' : p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <NotificationsPanel />
            <button
              onClick={() => navigate('/dashboard/export')}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              📊 Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Ventes"
              value={stats.overview.totalOrders}
              icon="🛒"
              change={12}
              color="blue"
              loading={loading}
            />
            <StatsCard
              title="Locations"
              value={stats.overview.totalRentals}
              icon="🔑"
              change={8}
              color="purple"
              loading={loading}
            />
            <StatsCard
              title="Essais"
              value={stats.overview.totalTrials}
              icon="🚗"
              change={-3}
              color="green"
              loading={loading}
            />
            <StatsCard
              title="Revenus"
              value={`${stats.revenue.total.toLocaleString()}€`}
              icon="💰"
              change={15}
              color="orange"
              loading={loading}
            />
          </div>
        )}

        {/* Deuxième ligne de stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Véhicules"
              value={stats.overview.totalCars}
              icon="🚙"
              change={5}
              color="blue"
              loading={loading}
            />
            <StatsCard
              title="Utilisateurs"
              value={stats.overview.totalUsers}
              icon="👥"
              change={20}
              color="green"
              loading={loading}
            />
            <StatsCard
              title="Contacts"
              value={stats.overview.totalContacts}
              icon="📧"
              change={10}
              color="amber"
              loading={loading}
            />
            <StatsCard
              title="Services"
              value={stats.overview.totalServices}
              icon="🔧"
              change={7}
              color="purple"
              loading={loading}
            />
          </div>
        )}

        {/* Graphique et activité */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart data={chartData} loading={loading} />
          </div>
          
          <div>
            <ActivityFeed activities={activities} />
          </div>
        </div>

        {/* Tableau récapitulatif */}
        {stats && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-extrabold text-slate-900">Statistiques détaillées</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">En attente</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Confirmé</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Commandes</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalOrders}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.pendingOrders}</td>
                    <td className="px-6 py-4 text-sm text-green-600">{stats.overview.confirmedOrders}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Locations</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalRentals}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.activeRentals}</td>
                    <td className="px-6 py-4 text-sm text-green-600">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Essais</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalTrials}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.pendingTrials}</td>
                    <td className="px-6 py-4 text-sm text-green-600">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Contacts</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalContacts}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.unreadContacts}</td>
                    <td className="px-6 py-4 text-sm text-green-600">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Ventes de véhicules</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalSellRequests}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.pendingSellRequests}</td>
                    <td className="px-6 py-4 text-sm text-green-600">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">Financements</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{stats.overview.totalFinancing}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{stats.overview.pendingFinancing}</td>
                    <td className="px-6 py-4 text-sm text-green-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;