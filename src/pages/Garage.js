// pages/Garage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Garage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    car: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'revision',
      title: 'Révision complète',
      price: '149€',
      duration: '2h',
      description: 'Vidange, filtres, niveaux, contrôle général',
      icon: '🔧',
      color: 'from-blue-600 to-cyan-500',
      bg: '#eff6ff',
      accent: '#2563eb'
    },
    {
      id: 'diagnostic',
      title: 'Diagnostic électronique',
      price: '79€',
      duration: '1h',
      description: 'Analyse complète des calculateurs et capteurs',
      icon: '💻',
      color: 'from-purple-600 to-pink-500',
      bg: '#f0f9ff',
      accent: '#7c3aed'
    },
    {
      id: 'pneus',
      title: 'Changement pneus',
      price: '25€/pneu',
      duration: '1h',
      description: 'Montage, équilibrage, parallélisme',
      icon: '🛞',
      color: 'from-green-600 to-emerald-500',
      bg: '#f0fdf4',
      accent: '#059669'
    },
    {
      id: 'climatisation',
      title: 'Climatisation',
      price: '89€',
      duration: '1h30',
      description: 'Recharge gaz, désinfection, contrôle étanchéité',
      icon: '❄️',
      color: 'from-cyan-600 to-blue-500',
      bg: '#ecfeff',
      accent: '#0891b2'
    },
    {
      id: 'freinage',
      title: 'Freinage',
      price: '149€',
      duration: '2h',
      description: 'Changement plaquettes et disques',
      icon: '🛑',
      color: 'from-red-600 to-orange-500',
      bg: '#fef2f2',
      accent: '#dc2626'
    },
    {
      id: 'carrosserie',
      title: 'Carrosserie',
      price: 'Sur devis',
      duration: 'Variable',
      description: 'Réparation peinture, tôlerie, rénovation',
      icon: '🎨',
      color: 'from-orange-600 to-amber-500',
      bg: '#fff7ed',
      accent: '#ea580c'
    }
  ];

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setBooking({ ...booking, service: service.title });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingData = {
        service: booking.service,
        date: booking.date,
        time: booking.time,
        car: booking.car,
        name: booking.name,
        phone: booking.phone,
        message: booking.message
      };

      const response = await axios.post(`${API_URL}/garage`, bookingData);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setBooking({
          service: '',
          date: '',
          time: '',
          name: '',
          phone: '',
          car: '',
          message: ''
        });
        setSelectedService(null);
      }, 4000);
      
    } catch (err) {
      console.error('Erreur lors de la réservation:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Obtenir la date du jour pour l'input date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="font-['Outfit'] bg-gray-50">
      
      {/* Animations personnalisées */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>

      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="relative h-[600px] md:h-[550px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Image de fond unique */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />

        {/* Overlay très transparent */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-600/15 to-slate-900/20 backdrop-brightness-105 z-[1]" />

        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.02] z-[1]" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />

        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-[2]" />

        {/* Contenu centré */}
        <div className="relative z-[3] w-full max-w-4xl mx-auto px-5 text-center animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-blink shadow-[0_0_10px_#34d399]" />
            Garage & Entretien
          </div>
          
          <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4rem)] drop-shadow-lg">
            Prenez soin <br /><span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">de votre véhicule</span>
          </h1>
          
          <p className="text-white/95 text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            Entretien, réparation, révision — nos experts prennent soin de votre voiture avec des prestations de qualité.
          </p>
          
          <button 
            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20"
          >
            🔧 Découvrir nos services
          </button>
        </div>
      </div>

      {/* ════════ CONTENU PRINCIPAL ════════ */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium animate-fadeUp">
            ⚠️ {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium animate-fadeUp">
            ✅ Rendez-vous confirmé ! Vous recevrez une confirmation par email sous peu.
          </div>
        )}

        {/* ── Services Grid ── */}
        <div id="services" className="mb-16 scroll-mt-24">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🔧 Nos prestations
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Services d'entretien</h2>
            <p className="text-gray-500 mt-2">Des prestations de qualité pour tous les véhicules</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`
                  bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer group relative
                  hover:-translate-y-2 hover:shadow-xl
                  ${selectedService?.title === service.title 
                    ? 'border-blue-600 shadow-lg' 
                    : 'border-gray-100 hover:border-blue-200'}
                `}
                style={{ animation: `fadeUp 0.5s ease ${index * 0.1}s both` }}
              >
                {/* Badge de sélection */}
                {selectedService?.title === service.title && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10">
                    ✓
                  </div>
                )}
                
                {/* En-tête avec icône */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform"
                    style={{ background: service.bg }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-500">⏱️ {service.duration}</p>
                  </div>
                </div>

                {/* Prix */}
                <div className="mb-3">
                  <span className="text-2xl font-black" style={{ color: service.accent }}>{service.price}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Ligne de couleur en bas au survol */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Formulaire de rendez-vous ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          
          {/* Formulaire */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                📅 Rendez-vous
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Prendre rendez-vous</h2>
              <p className="text-sm text-gray-500 mt-1">Un conseiller vous confirmera le créneau sous 24h</p>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* Service sélectionné */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Service <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="service"
                  value={booking.service}
                  readOnly
                  required
                  placeholder="Cliquez sur un service ci-dessus"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
                {!booking.service && (
                  <p className="text-xs text-amber-600 mt-1">Veuillez sélectionner un service dans la liste</p>
                )}
              </div>

              {/* Date et heure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Date <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={booking.date}
                    onChange={handleChange}
                    min={today}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Heure <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <select
                    name="time"
                    value={booking.time}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  >
                    <option value="">Sélectionner</option>
                    <option value="09:00">09h00 - 10h00</option>
                    <option value="10:00">10h00 - 11h00</option>
                    <option value="11:00">11h00 - 12h00</option>
                    <option value="14:00">14h00 - 15h00</option>
                    <option value="15:00">15h00 - 16h00</option>
                    <option value="16:00">16h00 - 17h00</option>
                    <option value="17:00">17h00 - 18h00</option>
                  </select>
                </div>
              </div>

              {/* Véhicule */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Véhicule <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="car"
                  value={booking.car}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Ex: BMW Série 3, 2022"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Nom et téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Nom complet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Téléphone <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={booking.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Message optionnel */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Informations complémentaires
                </label>
                <textarea
                  name="message"
                  value={booking.message}
                  onChange={handleChange}
                  disabled={loading}
                  rows="4"
                  placeholder="Précisez vos besoins, symptômes, ou questions..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y disabled:opacity-50"
                />
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading || !booking.service}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  '✅ Confirmer le rendez-vous'
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            
            {/* Horaires */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl" />
              
              <div className="text-base font-extrabold text-white mb-4 flex items-center gap-2 relative z-10">
                ⏰ Horaires d'ouverture
              </div>
              
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Lundi – Vendredi</span>
                  <span className="text-sm font-bold text-white">9h – 19h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Samedi</span>
                  <span className="text-sm font-bold text-white">10h – 18h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Dimanche</span>
                  <span className="text-sm font-bold text-gray-400">Fermé</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/60 leading-relaxed relative z-10">
                <span className="font-bold text-blue-300">Urgence ?</span> Appelez-nous 24/7<br />
                <strong className="text-blue-300 text-sm">01 23 45 67 89</strong>
              </div>
            </div>

            {/* Garage info */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
                🔧 Notre garage
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                Équipements dernière génération, mécaniciens certifiés et pièces d'origine — nous traitons votre véhicule avec le plus grand soin.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Intervention rapide sous 24h</span>
              </div>
            </div>

            {/* Services inclus */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
                ✅ Services inclus
              </div>
              {[
                '🔧 Main-d\'œuvre garantie 12 mois',
                '🚗 Véhicule de courtoisie disponible',
                '💳 Paiement 3x sans frais',
                '🔍 Diagnostic offert'
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 py-2 border-b border-blue-200/50 last:border-b-0 text-xs font-semibold text-slate-900">
                  {t}
                </div>
              ))}
            </div>

            {/* Lien vers contact */}
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-3 px-4 bg-transparent border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              📞 Une question ? Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garage;