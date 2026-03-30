// pages/CarDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // ── Modal states ──
  const [modal, setModal] = useState(null); // 'order' | 'trial' | 'contact'

  const resetForms = () => {
    setOrderStep(1); setOrderDone(false);
    setOrderData({ firstName:'', lastName:'', email:'', phone:'', financing:'cash', message:'', date:'' });
    setTrialDone(false);
    setTrialData({ name:'', email:'', phone:'', date:'', time:'', message:'' });
    setContactDone(false);
    setContactData({ name:'', email:'', phone:'', subject:'question', message:'' });
  };
  const openModal  = (type) => { resetForms(); setModal(type); };
  const closeModal = () => { setModal(null); };

  // ── Order form ──
  const [orderStep, setOrderStep] = useState(1);
  const [orderDone, setOrderDone] = useState(false);
  const [orderData, setOrderData] = useState({ firstName:'', lastName:'', email:'', phone:'', financing:'cash', message:'', date:'' });
  const handleOrderChange = (e) => setOrderData(p => ({ ...p, [e.target.name]: e.target.value }));

  // ── Trial form ──
  const [trialDone, setTrialDone] = useState(false);
  const [trialData, setTrialData] = useState({ name:'', email:'', phone:'', date:'', time:'', message:'' });
  const handleTrialChange = (e) => setTrialData(p => ({ ...p, [e.target.name]: e.target.value }));

  // ── Contact form ──
  const [contactDone, setContactDone] = useState(false);
  const [contactData, setContactData] = useState({ name:'', email:'', phone:'', subject:'question', message:'' });
  const handleContactChange = (e) => setContactData(p => ({ ...p, [e.target.name]: e.target.value }));

  // Charger les données de la voiture depuis l'API
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_URL}/cars/${id}`);
        const carData = response.data.car;
        setCar(carData);
        setMainImage(carData.images?.[0]?.url || carData.images?.[0] || '');
      } catch (err) {
        console.error('Erreur lors du chargement du véhicule:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement du véhicule');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Soumettre la commande
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const orderDataToSend = {
        car: car._id,
        ...orderData,
        totalPrice: car.price
      };
      
      await axios.post(`${API_URL}/orders`, orderDataToSend, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      setOrderDone(true);
      setTimeout(closeModal, 5000);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'envoi de la commande');
    }
  };

  // Soumettre la demande d'essai// Soumettre la demande d'essai - VERSION SIMPLIFIÉE
// Soumettre la demande d'essai - VERSION AVEC VALIDATION
const handleTrialSubmit = async (e) => {
  e.preventDefault();
  
  // Validation côté client avant envoi
  if (!trialData.date) {
    alert('Veuillez sélectionner une date pour l\'essai');
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    
    console.log('📦 Données du formulaire avant envoi:', {
      name: trialData.name,
      email: trialData.email,
      phone: trialData.phone,
      date: trialData.date,
      time: trialData.time,
      message: trialData.message
    });
    
    const trialDataToSend = {
      car: car._id,
      name: trialData.name,
      email: trialData.email,
      phone: trialData.phone,
      date: trialData.date, // S'assurer que la date est bien envoyée
      time: trialData.time || '10:00', // Valeur par défaut si non sélectionnée
      message: trialData.message || ''
    };
    
    console.log('📦 Envoi au backend:', trialDataToSend);
    
    await axios.post(`${API_URL}/trials`, trialDataToSend, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    setTrialDone(true);
  } catch (err) {
    console.error('❌ Erreur détaillée:', err);
    console.error('Réponse erreur:', err.response?.data);
    alert(err.response?.data?.message || 'Erreur lors de la demande d\'essai');
  }
};




  // Soumettre le message de contact
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactDataToSend = {
        ...contactData,
        subject: `Question sur ${car.brand} ${car.model}`
      };
      
      await axios.post(`${API_URL}/contact`, contactDataToSend);
      
      setContactDone(true);
      setTimeout(closeModal, 5000);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'envoi du message');
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' €';
  const fuelIcon = { Essence:'⛽', Diesel:'🛢️', Hybride:'🔋', Électrique:'⚡' };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-['Outfit']">
      <div className="w-11 h-11 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <span className="text-gray-400 text-sm font-medium">Chargement du véhicule…</span>
    </div>
  );

  if (error) return (
    <div className="text-center py-24 px-5 font-['Outfit']">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Erreur de chargement</h2>
      <p className="text-gray-500 mb-6">{error}</p>
      <button 
        onClick={() => navigate('/cars')} 
        className="px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        ← Retour aux voitures
      </button>
    </div>
  );

  if (!car) return (
    <div className="text-center py-24 px-5 font-['Outfit']">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Véhicule introuvable</h2>
      <p className="text-gray-500 mb-6">Ce véhicule n'existe pas ou a été supprimé.</p>
      <button 
        onClick={() => navigate('/cars')} 
        className="px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
      >
        ← Retour aux voitures
      </button>
    </div>
  );

  const specs = [
    { icon:'📅', label:'Année',       value:car.year },
    { icon:'🛣️', label:'Kilométrage', value:`${new Intl.NumberFormat('fr-FR').format(car.mileage)} km` },
    { icon:fuelIcon[car.fuel]||'⛽',  label:'Carburant', value:car.fuel },
    { icon:'⚙️', label:'Boîte',       value:car.transmission },
    { icon:'🎨', label:'Couleur',     value:car.color||'—' },
    { icon:'🚪', label:'Portes',      value:car.doors||'—' },
    { icon:'⚡', label:'Puissance',   value:car.power||'—' },
    { icon:car.isNewCar ? '✦' : '◈', label:'État', value:car.isNewCar ? 'Neuf' : 'Occasion' },
  ];

  const SuccessCard = ({ icon, title, sub, refCode }) => (
    <div className="text-center py-8 px-5">
      <div className="text-6xl mb-4">{icon}</div>
      <div className="text-xl font-black text-slate-900 mb-2">{title}</div>
      <p className="text-sm text-gray-500 leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html:sub }} />
      {refCode && <div className="inline-block bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-bold">{refCode}</div>}
    </div>
  );

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">
      
      {/* Hero */}
      <div className="relative w-full h-[480px] overflow-hidden bg-slate-900">
        <img key={mainImage} src={mainImage} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover animate-fadeIn" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent pointer-events-none" />
        <span 
          className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-[0.7rem] font-extrabold tracking-wide uppercase backdrop-blur-sm border border-white/25"
          style={{ background: car.isNewCar ? 'rgba(5,150,105,0.9)' : 'rgba(245,158,11,0.9)', color: 'white' }}
        >
          {car.isNewCar ? '✦ Neuf' : '◈ Occasion'}
        </span>
        <div className="absolute bottom-7 left-7 text-white text-2xl font-black drop-shadow-lg">
          {car.brand} {car.model} · {car.year}
        </div>
        <div className="absolute bottom-7 right-7 text-white text-2xl font-black drop-shadow-lg">
          {formatPrice(car.price)}
        </div>
      </div>

      {/* Thumbnails */}
      {car.images && car.images.length > 0 && (
        <div className="flex gap-2 p-3 bg-white border-b border-gray-100 overflow-x-auto">
          {car.images.map((img, i) => {
            const imageUrl = img.url || img;
            return (
              <img 
                key={i} 
                src={imageUrl} 
                alt={`Vue ${i+1}`}
                className={`w-[90px] h-[65px] object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 transition-all opacity-65 hover:opacity-90 ${
                  mainImage === imageUrl ? 'border-blue-600 opacity-100 shadow-[0_0_0_3px_rgba(37,99,235,0.2)]' : 'border-transparent'
                }`}
                onClick={() => setMainImage(imageUrl)} 
              />
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-2 transition-all my-6"
        >
          ← Retour aux voitures
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            
            {/* Specs Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wide mb-4">🔍 Caractéristiques</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specs.map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl py-3.5 px-2 text-center border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all">
                    <div className="text-lg mb-1">{s.icon}</div>
                    <span className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-wide block mb-1">{s.label}</span>
                    <span className="text-sm font-extrabold text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
              {[
                {key:'description', label:'📝 Description'},
                {key:'features', label:'✅ Équipements'}
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === t.key 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm' 
                      : 'bg-transparent text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-fadeUp">
              {activeTab === 'description' ? (
                <>
                  <div className="font-extrabold text-slate-900 mb-3">Description du véhicule</div>
                  <p className="text-gray-600 leading-relaxed text-sm">{car.description}</p>
                </>
              ) : (
                <>
                  <div className="font-extrabold text-slate-900 mb-3">Équipements & options</div>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Sticky */}
          <div className="lg:sticky lg:top-20 flex flex-col gap-4">
            
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-md">
              <div className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wide mb-1">Prix de vente</div>
              <div className="text-3xl font-black text-blue-600 tracking-tight leading-none mb-1">{formatPrice(car.price)}</div>
              <div className="text-xs text-gray-400 font-medium mb-6">TVA incluse · Financement disponible</div>
              
              <button 
                onClick={() => openModal('order')}
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all mb-2.5 flex items-center justify-center gap-2"
              >
                🛒 Commander maintenant
              </button>
              
              <button 
                onClick={() => openModal('trial')}
                className="w-full py-3 bg-transparent text-blue-600 border-2 border-blue-600 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white hover:shadow-md hover:-translate-y-1 transition-all mb-2.5 flex items-center justify-center gap-2"
              >
                🚗 Réserver un essai gratuit
              </button>
            </div>

            {/* Seller Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wide mb-4">Votre conseiller</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-lg text-white flex-shrink-0">
                  👨
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">AutoMarket Paris</div>
                  <span className="text-[0.65rem] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ Vendeur vérifié</span>
                </div>
              </div>
              <button 
                onClick={() => openModal('contact')}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center gap-1.5"
              >
                📞 Contacter le vendeur
              </button>
            </div>

            {/* Trust Row */}
            <div className="flex flex-col gap-2">
              {['🛡️ Garantie 12 mois incluse','🔄 Retour sous 7 jours','💳 Financement en 24h','📋 Historique vérifié'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          MODAL — COMMANDER (3 steps)
      ══════════════════════════════ */}
      {modal === 'order' && (
        <div className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl animate-fadeUp scrollbar-thin scrollbar-thumb-gray-200">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-7 pb-5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all">✕</button>
              <h3 className="text-lg font-black text-white relative z-10 mb-1">🛒 Commander ce véhicule</h3>
              <p className="text-xs text-white/50 relative z-10">Réservation sécurisée — Un conseiller vous rappelle sous 2h</p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
                🚗 {car.brand} {car.model} {car.year} · {formatPrice(car.price)}
              </div>
            </div>

            {!orderDone && (
              <div className="flex items-start px-7 pt-5">
                {[{num:1,lbl:'Vos infos'},{num:2,lbl:'Financement'},{num:3,lbl:'Confirmation'}].map((s, idx) => (
                  <div key={s.num} className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                        orderStep > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' :
                        orderStep === s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-110' :
                        'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}>
                        {orderStep > s.num ? '✓' : s.num}
                      </div>
                      {idx < 2 && (
                        <div className={`flex-1 h-0.5 transition-all ${orderStep > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <span className={`text-[0.6rem] font-bold uppercase tracking-wide mt-1 ${
                      orderStep > s.num || orderStep === s.num ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {s.lbl}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-7">
              {orderDone ? (
                <SuccessCard 
                  icon="🎉" 
                  title="Commande envoyée !"
                  sub={`Merci <strong>${orderData.firstName}</strong> ! Un conseiller vous appellera sous 2h au <strong>${orderData.phone}</strong>.`}
                  refCode={`Réf : AM-${Math.random().toString(36).substr(2,8).toUpperCase()}`} 
                />
              ) : orderStep === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setOrderStep(2); }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Prénom <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="text" name="firstName" value={orderData.firstName} onChange={handleOrderChange} required placeholder="Jean" />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nom <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="text" name="lastName" value={orderData.lastName} onChange={handleOrderChange} required placeholder="Dupont" />
                    </div>
                  </div>
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email <span className="text-red-500 ml-0.5">*</span></label>
                  <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="email" name="email" value={orderData.email} onChange={handleOrderChange} required placeholder="jean@email.com" />
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Téléphone <span className="text-red-500 ml-0.5">*</span></label>
                  <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="tel" name="phone" value={orderData.phone} onChange={handleOrderChange} required placeholder="+33 6 00 00 00 00" />
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Date souhaitée</label>
                  <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="date" name="date" value={orderData.date} onChange={handleOrderChange} />
                  <div className="flex mt-2"><button type="submit" className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Étape suivante →</button></div>
                </form>
              ) : orderStep === 2 ? (
                <form onSubmit={(e) => { e.preventDefault(); setOrderStep(3); }}>
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-2.5">Mode de financement <span className="text-red-500 ml-0.5">*</span></label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[{key:'cash',icon:'💵',lbl:'Comptant'},{key:'credit',icon:'💳',lbl:'Crédit auto'},{key:'leasing',icon:'🔄',lbl:'Leasing LOA'}].map(o => (
                      <div key={o.key} 
                        className={`border-2 rounded-xl py-3 px-1 text-center cursor-pointer transition-all ${
                          orderData.financing === o.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                        onClick={() => setOrderData(p => ({ ...p, financing: o.key }))}
                      >
                        <span className="text-2xl block mb-1">{o.icon}</span>
                        <span className="text-xs font-bold text-gray-500">{o.lbl}</span>
                      </div>
                    ))}
                  </div>
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[80px] mb-3" name="message" value={orderData.message} onChange={handleOrderChange} placeholder="Reprise, livraison, options…" />
                  <div className="flex gap-2.5 mt-2">
                    <button type="button" onClick={() => setOrderStep(1)} className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all">← Retour</button>
                    <button type="submit" className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Étape suivante →</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOrderSubmit}>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                    <div className="text-[0.7rem] font-bold text-blue-600 uppercase tracking-wide mb-3">📋 Récapitulatif</div>
                    {[
                      ['Véhicule', `${car.brand} ${car.model} ${car.year}`],
                      ['Client', `${orderData.firstName} ${orderData.lastName}`],
                      ['Email', orderData.email],
                      ['Téléphone', orderData.phone],
                      ['Financement', { cash:'Comptant', credit:'Crédit auto', leasing:'Leasing LOA' }[orderData.financing]]
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center text-sm mb-1.5">
                        <span className="text-gray-500">{k}</span>
                        <span className="text-slate-900 font-bold">{v}</span>
                      </div>
                    ))}
                    <div className="h-px bg-blue-200 my-3" />
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{formatPrice(car.price)}</div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">Aucun paiement à cette étape. Un conseiller vous recontacte sous 2h.</p>
                  <div className="flex gap-2.5">
                    <button type="button" onClick={() => setOrderStep(2)} className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all">← Retour</button>
                    <button type="submit" className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">✅ Confirmer</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          MODAL — ESSAI
      ══════════════════════════════ */}{modal === 'trial' && (
  <div className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" onClick={(e) => e.target === e.currentTarget && closeModal()}>
    <div className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl animate-fadeUp">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-blue-700 rounded-t-3xl p-7 pb-5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
        <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all">✕</button>
        <h3 className="text-lg font-black text-white relative z-10 mb-1">🚗 Réserver un essai gratuit</h3>
        <p className="text-xs text-white/50 relative z-10">Sans engagement · Confirmation sous 24h</p>
        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
          📅 {car.brand} {car.model} {car.year}
        </div>
      </div>

      <div className="p-7">
        {trialDone ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚗</div>
            <div className="text-xl font-black text-slate-900 mb-2">Demande envoyée !</div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Merci <strong>{trialData.name}</strong> !<br />
              Un conseiller vous contactera au <strong>{trialData.phone}</strong> pour confirmer votre essai.
            </p>
            <button 
              onClick={closeModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleTrialSubmit}>
            {/* Nom complet */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Nom complet <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input 
                className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                type="text" 
                name="name" 
                value={trialData.name} 
                onChange={handleTrialChange} 
                required 
                placeholder="Jean Dupont" 
              />
            </div>

            {/* Email et Téléphone */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Email <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input 
                  className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  type="email" 
                  name="email" 
                  value={trialData.email} 
                  onChange={handleTrialChange} 
                  required 
                  placeholder="jean@email.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Téléphone <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input 
                  className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  type="tel" 
                  name="phone" 
                  value={trialData.phone} 
                  onChange={handleTrialChange} 
                  required 
                  placeholder="+33 6 00 00 00 00" 
                />
              </div>
            </div>

            {/* Date et Créneau */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Date <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input 
                  className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  type="date" 
                  name="date" 
                  value={trialData.date} 
                  onChange={handleTrialChange} 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                />
                {/* Affichage de débogage - à supprimer après test */}
                {trialData.date && (
                  <p className="text-xs text-green-600 mt-1">✓ Date sélectionnée: {trialData.date}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Créneau
                </label>
                <select 
                  className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
                  name="time" 
                  value={trialData.time} 
                  onChange={handleTrialChange}
                >
                  <option value="">Choisir</option>
                  <option value="09:00">9h00 – 10h00</option>
                  <option value="10:00">10h00 – 11h00</option>
                  <option value="11:00">11h00 – 12h00</option>
                  <option value="14:00">14h00 – 15h00</option>
                  <option value="15:00">15h00 – 16h00</option>
                  <option value="16:00">16h00 – 17h00</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Message (optionnel)
              </label>
              <textarea 
                className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[80px]" 
                name="message" 
                value={trialData.message} 
                onChange={handleTrialChange} 
                placeholder="Questions, remarques particulières…" 
              />
            </div>

            {/* Note informative */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-xs text-blue-800 leading-relaxed">
                <span className="font-bold">🔔 À savoir :</span> L'essai est gratuit et sans engagement. 
                Un conseiller vous contactera sous 24h pour confirmer le rendez-vous selon vos disponibilités.
              </p>
            </div>

            {/* Bouton de confirmation */}
            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              🚗 Confirmer ma demande d'essai
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
)}
      {/* ══════════════════════════════
          MODAL — CONTACT VENDEUR
      ══════════════════════════════ */}
      {modal === 'contact' && (
        <div className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl animate-fadeUp">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-7 pb-5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all">✕</button>
              
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-xl text-white shadow-lg flex-shrink-0">
                  👨
                </div>
                <div>
                  <div className="text-base font-black text-white mb-0.5">AutoMarket Paris</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_#34d399]" />
                    <span className="text-[0.7rem] text-white/60 font-semibold">En ligne · Répond en &lt; 1h</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
                🚗 {car.brand} {car.model} {car.year} · {formatPrice(car.price)}
              </div>
            </div>

            <div className="p-7">
              {contactDone ? (
                <SuccessCard 
                  icon="✉️" 
                  title="Message envoyé !"
                  sub={`Merci <strong>${contactData.name}</strong> ! Le vendeur vous répondra sous 1h à <strong>${contactData.email}</strong>.`} 
                />
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Votre nom <span className="text-red-500 ml-0.5">*</span></label>
                  <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="text" name="name" value={contactData.name} onChange={handleContactChange} required placeholder="Jean Dupont" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="email" name="email" value={contactData.email} onChange={handleContactChange} required placeholder="jean@email.com" />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Téléphone</label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="tel" name="phone" value={contactData.phone} onChange={handleContactChange} placeholder="+33 6 00 00 00 00" />
                    </div>
                  </div>

                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5 mt-1">Sujet</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[{key:'question',lbl:'❓ Question'},{key:'price',lbl:'💰 Négociation'},{key:'visit',lbl:'📍 Visite'}].map(s => (
                      <div key={s.key} 
                        className={`border-2 rounded-lg py-2 px-1 text-center text-xs font-bold cursor-pointer transition-all ${
                          contactData.subject === s.key ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                        onClick={() => setContactData(p => ({ ...p, subject: s.key }))}
                      >
                        {s.lbl}
                      </div>
                    ))}
                  </div>

                  <label className="block text-[0.7rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Message <span className="text-red-500 ml-0.5">*</span></label>
                  <textarea className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[100px] mb-4" name="message" value={contactData.message} onChange={handleContactChange} required placeholder="Bonjour, je suis intéressé par ce véhicule…" />

                  <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">📨 Envoyer le message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Styles pour animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
        .animate-fadeUp { animation: fadeUp 0.3s ease; }
      `}</style>
    </div>
  );
};

export default CarDetail;