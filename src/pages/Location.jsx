// pages/Location.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/* ─── Data ───────────────────────────────────────────── */
const CATEGORIES = ['Tous', 'Premium', 'Luxe', 'Sport', 'Électrique', 'SUV Luxe'];
const AVANTAGES = [
  { icon: '🛡️', title: 'Assurance incluse', desc: 'Tous risques, assistance 24/7 inclus dans chaque location.', color: 'from-blue-600 to-cyan-500' },
  { icon: '⛽', title: 'Carburant offert', desc: 'Premier plein offert sur toutes les locations longue durée.', color: 'from-green-600 to-emerald-500' },
  { icon: '🔑', title: 'Remise en main propre', desc: "Votre véhicule livré à l'adresse de votre choix.", color: 'from-purple-600 to-pink-500' },
  { icon: '📱', title: 'App dédiée', desc: "Gérez votre location, GPS, et assistance depuis l'app.", color: 'from-orange-600 to-amber-500' },
];
const STEPS = [
  { num: 1, lbl: 'Vos infos', icon: '📋' },
  { num: 2, lbl: 'Options', icon: '⚙️' },
  { num: 3, lbl: 'Confirmation', icon: '✅' }
];
const INSURANCE = [
  { key: 'standard', icon: '🛡️', lbl: 'Standard', price: 0, desc: 'Assurance responsabilité civile de base' },
  { key: 'premium', icon: '⭐', lbl: 'Premium', price: 15, desc: 'Tous risques + assistance 0km' },
  { key: 'vip', icon: '💎', lbl: 'VIP', price: 29, desc: 'Tous risques + conducteur supplémentaire' },
];
const PICKUPS = [
  { id: 'paris', label: 'Paris - Showroom', address: '123 Av. des Champs-Élysées' },
  { id: 'lyon', label: 'Lyon - Agence', address: '45 Rue de la République' },
  { id: 'delivery', label: 'Livraison à domicile', address: 'À votre adresse' },
  { id: 'cdg', label: 'Aéroport CDG', address: 'Terminal 2E - Hall arrivées' },
];

const fuelIcon = { Essence: '⛽', Diesel: '🛢️', Hybride: '🔋', Électrique: '⚡' };
const catColor = { 
  Premium: 'from-blue-600 to-cyan-500', 
  Luxe: 'from-purple-600 to-pink-500', 
  Sport: 'from-red-600 to-orange-500', 
  Électrique: 'from-green-600 to-emerald-500', 
  'SUV Luxe': 'from-amber-600 to-yellow-500' 
};
const periodLbl = { day: '/ jour', week: '/ semaine', month: '/ mois' };
const fmt = p => new Intl.NumberFormat('fr-FR').format(p) + ' €';
const EMPTY = { name: '', email: '', phone: '', dateStart: '', dateEnd: '', pickupLocation: 'Paris - Showroom', insurance: 'standard', message: '' };

/* ─── Component ──────────────────────────────────────── */
const Location = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cat, setCat] = useState('Tous');
  const [period, setPeriod] = useState('day');
  const [modal, setModal] = useState(null);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  // Charger les voitures depuis l'API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        console.log('🔍 Récupération des voitures...');
        
        const response = await axios.get(`${API_URL}/cars`);
        console.log('✅ Réponse reçue:', response.data);
        
        const allCars = response.data.cars || [];
        console.log('🚗 Nombre total de voitures:', allCars.length);
        
        // Transformer les données pour la location
        const rentalCars = allCars.map(car => ({
          ...car,
          // Créer des prix de location basés sur le prix de vente
          priceDay: Math.round(car.price * 0.001), // Prix journalier approximatif
          priceWeek: Math.round(car.price * 0.006), // Prix hebdomadaire approximatif
          priceMonth: Math.round(car.price * 0.02), // Prix mensuel approximatif
          // S'assurer que la disponibilité est correcte
          available: car.isAvailable === true || car.available === true
        }));
        
        // Filtrer les voitures disponibles
        const availableCars = rentalCars.filter(car => car.available);
        
        console.log('✅ Voitures disponibles pour location:', availableCars.length);
        setCars(availableCars);
      } catch (err) {
        console.error('❌ Erreur lors du chargement des voitures:', err);
        setError('Impossible de charger les véhicules');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filtered = cat === 'Tous' 
    ? cars 
    : cars.filter(c => c.category === cat);

  const openModal = car => { 
    setModal(car); 
    setStep(1); 
    setDone(false); 
    setForm(EMPTY); 
  };
  
  const closeModal = () => setModal(null);
  
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  
  const nextStep = e => { 
    e.preventDefault(); 
    setStep(s => s + 1); 
  };
  
  // Fonction pour calculer le nombre de jours
  const calculateDays = () => {
    if (!form.dateStart || !form.dateEnd) return 0;
    
    const start = new Date(form.dateStart);
    const end = new Date(form.dateEnd);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Fonction pour calculer le prix total
  const calculateTotalPrice = () => {
    if (!modal) return 0;
    
    const days = calculateDays();
    if (days <= 0) return 0;
    
    let pricePerDay = 0;
    
    switch (period) {
      case 'day': 
        pricePerDay = modal.priceDay || 0;
        return pricePerDay * days;
      case 'week': 
        pricePerDay = modal.priceWeek / 7 || 0;
        return pricePerDay * days;
      case 'month': 
        pricePerDay = modal.priceMonth / 30 || 0;
        return pricePerDay * days;
      default: 
        return 0;
    }
  };
  
  // Fonction pour calculer le prix de l'assurance
  const calculateInsurancePrice = () => {
    const days = calculateDays();
    if (days <= 0) return 0;
    
    const insurance = INSURANCE.find(i => i.key === form.insurance);
    return (insurance?.price || 0) * days;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const days = calculateDays();
      const basePrice = calculateTotalPrice();
      const insurancePrice = calculateInsurancePrice();
      const totalPrice = basePrice + insurancePrice;
      
      console.log('💰 Détails du prix:', {
        jours: days,
        prixBase: basePrice,
        prixAssurance: insurancePrice,
        total: totalPrice
      });
      
      if (totalPrice <= 0) {
        alert('Veuillez vérifier les dates de location');
        setSubmitting(false);
        return;
      }
      
      const rentalData = {
        car: modal._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        dateStart: form.dateStart,
        dateEnd: form.dateEnd,
        pickupLocation: form.pickupLocation,
        insurance: form.insurance,
        message: form.message || '',
        period: period,
        totalPrice: Math.round(totalPrice * 100) / 100
      };
      
      console.log('📦 Données envoyées au backend:', rentalData);
      
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/rentals`, rentalData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      console.log('✅ Réponse du backend:', response.data);
      setDone(true);
      setTimeout(closeModal, 5000);
    } catch (err) {
      console.error('❌ Erreur lors de la réservation:', err);
      console.error('Détails de l\'erreur:', err.response?.data);
      alert(err.response?.data?.message || 'Une erreur est survenue lors de la réservation');
    } finally {
      setSubmitting(false);
    }
  };

  const REF = `LOC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  const days = calculateDays();
  const basePrice = calculateTotalPrice();
  const insurancePrice = calculateInsurancePrice();
  const totalPrice = basePrice + insurancePrice;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500">Chargement des véhicules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">
      
      {/* Animations personnalisées */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.22s ease; }
        .animate-pop { animation: pop 0.5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-600/15 to-slate-900/20 backdrop-brightness-105" />
        
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 text-center animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
            Location de véhicules premium
          </div>
          
          <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4rem)] drop-shadow-lg">
            Louez la voiture<br />de vos <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">rêves</span>
          </h1>
          
          <p className="text-white/95 text-lg max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            Flotte premium disponible dès aujourd'hui — livraison à domicile, 
            assurance tous risques incluse, sans engagement.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20"
            >
              🚗 Voir la flotte
            </button>
            <button className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 hover:-translate-y-1 transition-all">
              📞 Nous appeler
            </button>
          </div>
        </div>
      </div>

      {/* ════════ AVANTAGES ════════ */}
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((a, i) => (
              <div key={i} className="p-6 flex items-start gap-4 border-r last:border-r-0 border-gray-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-2xl text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0`}>
                  {a.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">{a.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ FLOTTE ════════ */}
      <div className="max-w-7xl mx-auto px-5" id="fleet">
        <div className="py-9 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold border-2 transition-all ${
                  cat === c
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
            {[['day', 'Journalier'], ['week', 'Hebdomadaire'], ['month', 'Mensuel']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setPeriod(k)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  period === k
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-blue-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune voiture disponible</h3>
            <p className="text-gray-500 mb-4">Aucun véhicule n'est disponible à la location pour le moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Rafraîchir
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filtered.map(car => (
              <div key={car._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200 transition-all group">
                <div className="relative h-52 overflow-hidden">
                  <img src={car.images?.[0]?.url || 'https://via.placeholder.com/400x300'} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  <span className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-[0.65rem] font-extrabold tracking-wide uppercase text-white bg-gradient-to-br ${catColor[car.category] || 'from-blue-600 to-cyan-500'} shadow-lg`}>
                    {car.category || 'Standard'}
                  </span>
                  
                  <span className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[0.65rem] font-bold text-white backdrop-blur-md border border-white/30 shadow-lg bg-green-500/90`}>
                    ✓ Disponible
                  </span>
                  
                  <div className="absolute bottom-3 right-3 text-white font-black text-xl drop-shadow-lg">
                    {fmt(car.priceDay)} <span className="text-xs opacity-80 font-semibold">{periodLbl.day}</span>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-xl tracking-tight">
                      {car.brand} {car.model}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {car.year}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: fuelIcon[car.fuel] || '⛽', label: 'Carburant', value: car.fuel },
                      { icon: '⚙️', label: 'Boîte', value: car.transmission === 'Automatique' ? 'Auto' : 'Manu' },
                      { icon: '👥', label: 'Places', value: car.seats || 5 },
                      { icon: '🛣️', label: 'Km', value: car.mileage ? `${car.mileage} km` : 'N/A' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-1 text-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                        <div className="text-lg mb-1">{item.icon}</div>
                        <span className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-wide block mb-0.5">{item.label}</span>
                        <span className="text-xs font-extrabold text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-blue-600 font-black text-2xl tracking-tight leading-none">
                        {fmt(period === 'day' ? car.priceDay : period === 'week' ? car.priceWeek : car.priceMonth)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{periodLbl[period]} · TVA incluse</div>
                    </div>
                    <button
                      onClick={() => openModal(car)}
                      className="px-6 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all whitespace-nowrap"
                    >
                      🔑 Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ════════ MODAL RÉSERVATION — 3 ÉTAPES ════════ */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeUp">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
              
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all">
                ✕
              </button>
              
              <h3 className="text-lg font-black text-white relative z-10 mb-1">🔑 Réserver ce véhicule</h3>
              <p className="text-xs text-white/50 relative z-10">Confirmation instantanée · Annulation gratuite 48h avant</p>
              
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
                🚗 {modal.brand} {modal.model} {modal.year}
              </div>
            </div>

            {/* Stepper */}
            {!done && (
              <div className="flex items-start px-6 pt-5">
                {STEPS.map((s, idx) => (
                  <div key={s.num} className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                        step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' :
                        step === s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-110' :
                        'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}>
                        {step > s.num ? '✓' : s.num}
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 transition-all ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <span className={`text-[0.6rem] font-bold uppercase tracking-wide mt-2 ${
                      step > s.num || step === s.num ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {s.lbl}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-6">
              {done ? (
                <div className="text-center py-8 animate-fadeUp">
                  <span className="text-7xl block mb-4 animate-pop">🎉</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Réservation confirmée !</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    Merci <span className="font-bold">{form.name}</span> !<br />
                    Votre réservation pour le <span className="font-bold">{modal.brand} {modal.model}</span> est enregistrée.<br />
                    Un conseiller vous contactera au <span className="font-bold">{form.phone}</span> sous 1h.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide">
                    📋 Réf : {REF}
                  </div>
                </div>
              ) : step === 1 ? (
                <form onSubmit={nextStep}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[0.6rem]">1</span>
                    Vos coordonnées
                  </div>
                  
                  <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Nom complet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-4" 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={onChange} 
                    required 
                    placeholder="Jean Dupont" 
                  />
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                        Email <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input 
                        className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={onChange} 
                        required 
                        placeholder="jean@email.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                        Téléphone <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input 
                        className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        onChange={onChange} 
                        required 
                        placeholder="+33 6 00 00 00 00" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                        Début <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input 
                        className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                        type="date" 
                        name="dateStart" 
                        value={form.dateStart} 
                        onChange={onChange} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                        Fin <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input 
                        className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                        type="date" 
                        name="dateEnd" 
                        value={form.dateEnd} 
                        onChange={onChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    Étape suivante →
                  </button>
                </form>
              ) : step === 2 ? (
                <form onSubmit={nextStep}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[0.6rem]">2</span>
                    Options de location
                  </div>
                  
                  <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Point de retrait
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {PICKUPS.map(loc => (
                      <div
                        key={loc.id}
                        onClick={() => setForm(p => ({ ...p, pickupLocation: loc.label }))}
                        className={`border-2 rounded-xl py-3 px-2 text-center cursor-pointer transition-all ${
                          form.pickupLocation === loc.label
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm mb-1">{loc.label}</div>
                        <div className="text-[0.6rem] text-gray-500">{loc.address}</div>
                      </div>
                    ))}
                  </div>
                  
                  <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Formule d'assurance
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {INSURANCE.map(o => (
                      <div
                        key={o.key}
                        onClick={() => setForm(p => ({ ...p, insurance: o.key }))}
                        className={`border-2 rounded-xl py-3 px-1 text-center cursor-pointer transition-all ${
                          form.insurance === o.key
                            ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-100'
                            : 'border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{o.icon}</span>
                        <span className="text-xs font-bold text-gray-600 block">{o.lbl}</span>
                        <span className="text-[0.6rem] text-blue-600 font-bold block mt-1">{o.price === 0 ? 'Incluse' : `+${o.price}€/j`}</span>
                        <span className="text-[0.5rem] text-gray-400 mt-1 block">{o.desc}</span>
                      </div>
                    ))}
                  </div>
                  
                  <label className="block text-[0.65rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Message (optionnel)
                  </label>
                  <textarea 
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[80px] mb-4" 
                    name="message" 
                    value={form.message} 
                    onChange={onChange} 
                    placeholder="Demandes particulières, options souhaitées…" 
                  />
                  
                  <div className="flex gap-3 mt-2">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="flex-1 py-2.5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all"
                    >
                      ← Retour
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      Étape suivante →
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[0.6rem]">3</span>
                    Confirmation
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 mb-4">
                    <div className="text-[0.65rem] font-bold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                      Récapitulatif de votre réservation
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {[
                        ['Véhicule', `${modal.brand} ${modal.model} ${modal.year}`],
                        ['Prix journalier', fmt(modal.priceDay)],
                        ['Prix hebdomadaire', fmt(modal.priceWeek)],
                        ['Prix mensuel', fmt(modal.priceMonth)],
                        ['Client', form.name],
                        ['Email', form.email],
                        ['Téléphone', form.phone],
                        ['Période', days > 0 ? `${days} jours` : 'Non précisée'],
                        ['Retrait', form.pickupLocation],
                        ['Assurance', INSURANCE.find(i => i.key === form.insurance)?.lbl || 'Standard'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">{k}</span>
                          <span className="text-slate-900 font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="h-px bg-blue-200 my-3" />
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Sous-total location</span>
                        <span className="text-slate-900 font-semibold">{fmt(basePrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Assurance</span>
                        <span className="text-slate-900 font-semibold">{fmt(insurancePrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-base font-bold mt-2 pt-2 border-t border-blue-200">
                        <span className="text-gray-700">Total</span>
                        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                          {totalPrice > 0 ? fmt(totalPrice) : '---'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3 text-xs font-semibold text-green-700 mb-4">
                    <span className="text-lg">🔒</span>
                    Aucun paiement à cette étape · Un conseiller vous contacte sous 1h
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      className="flex-1 py-2.5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all"
                    >
                      ← Retour
                    </button>
                    <button 
                      type="submit" 
                      disabled={submitting || totalPrice <= 0}
                      className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Traitement...</span>
                        </>
                      ) : (
                        '✅ Confirmer la réservation'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;