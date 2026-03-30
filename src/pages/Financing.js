// pages/Financing.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Financing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehiclePrice: '25000',
    downPayment: '5000',
    duration: '60',
    rate: '3.5',
    name: '',
    email: '',
    phone: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.vehiclePrice) - parseFloat(formData.downPayment);
    const monthlyRate = parseFloat(formData.rate) / 100 / 12;
    const months = parseFloat(formData.duration);
    
    if (principal <= 0 || monthlyRate <= 0 || months <= 0) return 0;
    
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(payment) ? 0 : payment.toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalInterest = (parseFloat(monthlyPayment) * parseFloat(formData.duration) - (parseFloat(formData.vehiclePrice) - parseFloat(formData.downPayment))).toFixed(2);
  const totalCost = (parseFloat(monthlyPayment) * parseFloat(formData.duration) + parseFloat(formData.downPayment)).toFixed(2);

  const handleRangeChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const financingData = {
        vehiclePrice: parseFloat(formData.vehiclePrice),
        downPayment: parseFloat(formData.downPayment),
        duration: parseInt(formData.duration),
        rate: parseFloat(formData.rate),
        monthlyPayment: parseFloat(monthlyPayment),
        totalInterest: parseFloat(totalInterest),
        totalCost: parseFloat(totalCost),
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      await axios.post(`${API_URL}/financing`, financingData);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
        setFormData({
          ...formData,
          name: '',
          email: '',
          phone: ''
        });
      }, 3000);
      
    } catch (err) {
      console.error('Erreur lors de la demande de financement:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const financingOptions = [
    {
      title: 'Crédit classique',
      desc: 'Financez votre véhicule avec des mensualités fixes',
      icon: '💰',
      features: ['Taux fixe', 'Mensualités constantes', 'Durée de 12 à 84 mois'],
      color: 'from-blue-600 to-blue-500'
    },
    {
      title: 'Location avec option d\'achat (LOA)',
      desc: 'Louez avec option d\'achat en fin de contrat',
      icon: '🔑',
      features: ['Mensualités réduites', 'Option d\'achat en fin de contrat', 'Entretien inclus possible'],
      color: 'from-purple-600 to-purple-500'
    },
    {
      title: 'Crédit ballon',
      desc: 'Des mensualités réduites avec un dernier loyer ajustable',
      icon: '⚽',
      features: ['Mensualités allégées', 'Dernière mensualité modulable', 'Flexibilité de remboursement'],
      color: 'from-green-600 to-green-500'
    }
  ];

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen py-12 px-4">
      
      {/* Header avec animation */}
      <div className="text-center mb-12 animate-fadeUp">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3">
          Financement <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">automobile</span>
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">
          Calculez vos mensualités et trouvez la meilleure option de financement pour votre projet
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="max-w-7xl mx-auto mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium animate-fadeUp">
          ⚠️ {error}
        </div>
      )}
      
      {success && (
        <div className="max-w-7xl mx-auto mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium animate-fadeUp">
          ✅ Demande de financement envoyée avec succès ! Un conseiller vous contactera sous 24h.
        </div>
      )}

      {/* Simulateur */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Simulateur */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center">📊</span>
              Simulateur de crédit
            </h2>
            
            {/* Prix du véhicule */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Prix du véhicule
                </label>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {parseInt(formData.vehiclePrice).toLocaleString()} €
                </span>
              </div>
              <input
                type="range"
                name="vehiclePrice"
                min="5000"
                max="100000"
                step="1000"
                value={formData.vehiclePrice}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>5 000 €</span>
                <span>100 000 €</span>
              </div>
            </div>

            {/* Apport personnel */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Apport personnel
                </label>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {parseInt(formData.downPayment).toLocaleString()} €
                </span>
              </div>
              <input
                type="range"
                name="downPayment"
                min="0"
                max="50000"
                step="1000"
                value={formData.downPayment}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>0 €</span>
                <span>50 000 €</span>
              </div>
            </div>

            {/* Durée */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Durée
                </label>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {formData.duration} mois
                </span>
              </div>
              <input
                type="range"
                name="duration"
                min="12"
                max="84"
                step="12"
                value={formData.duration}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>12 mois</span>
                <span>84 mois</span>
              </div>
            </div>

            {/* Taux */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Taux d'intérêt
                </label>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {formData.rate}%
                </span>
              </div>
              <input
                type="range"
                name="rate"
                min="0.5"
                max="7"
                step="0.1"
                value={formData.rate}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>0.5%</span>
                <span>7%</span>
              </div>
            </div>
          </div>

          {/* Résultat */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">💰</span>
              Votre mensualité
            </h2>
            
            <div className="text-5xl md:text-6xl font-black mb-6 drop-shadow-lg">
              {parseFloat(monthlyPayment).toLocaleString()} €
            </div>
            
            <div className="space-y-3 mb-6 bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Montant financé</span>
                <span className="font-bold">{(parseFloat(formData.vehiclePrice) - parseFloat(formData.downPayment)).toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Total des intérêts</span>
                <span className="font-bold">{parseFloat(totalInterest).toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <span className="text-white/80">Coût total</span>
                <span className="font-bold text-xl">{parseFloat(totalCost).toLocaleString()} €</span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <span className="group-hover:mr-2 transition-all">→</span> Faire une demande de crédit
            </button>
          </div>
        </div>

        {/* Options de financement */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            Nos solutions de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">financement</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financingOptions.map((option, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {option.desc}
                </p>
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${option.color} text-white flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0`}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de demande de crédit */}
      {showForm && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-t-3xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all"
              >
                ✕
              </button>
              <h3 className="text-lg font-black text-white relative z-10 mb-1">
                💳 Demande de financement
              </h3>
              <p className="text-xs text-white/70 relative z-10">
                Un conseiller vous contactera sous 24h
              </p>
            </div>

            {/* Résumé */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                Récapitulatif de votre simulation
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="text-xs text-gray-500 mb-1">Véhicule</div>
                  <div className="text-sm font-bold text-slate-900">
                    {parseInt(formData.vehiclePrice).toLocaleString()} €
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="text-xs text-gray-500 mb-1">Apport</div>
                  <div className="text-sm font-bold text-slate-900">
                    {parseInt(formData.downPayment).toLocaleString()} €
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="text-xs text-gray-500 mb-1">Durée</div>
                  <div className="text-sm font-bold text-slate-900">
                    {formData.duration} mois
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-3">
                  <div className="text-xs text-gray-500 mb-1">Mensualité</div>
                  <div className="text-sm font-bold text-blue-600">
                    {parseFloat(monthlyPayment).toLocaleString()} €
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              
              {/* Nom */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Nom complet <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Email <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="jean@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Téléphone */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Téléphone <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder="+33 6 00 00 00 00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Note d'information */}
              <div className="mb-5 p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm">
                    🔒
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-blue-600">Aucun engagement</span> · Un conseiller vous rappelle sous 24h pour finaliser votre demande en toute confidentialité.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white rounded-full font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  '✅ Confirmer ma demande'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Styles pour animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
        .animate-slideUp { animation: slideUp 0.3s ease; }
        .animate-fadeUp { animation: fadeUp 0.3s ease; }
      `}</style>
    </div>
  );
};

export default Financing;