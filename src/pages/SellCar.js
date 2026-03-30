// pages/SellCar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SellCar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    brand: '', model: '', year: '', mileage: '',
    fuel: '', transmission: '', price: '', description: '',
    name: '', email: '', phone: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Préparer les données pour l'API
      const sellData = {
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        mileage: parseInt(formData.mileage),
        fuel: formData.fuel,
        transmission: formData.transmission,
        price: parseInt(formData.price),
        description: formData.description,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      // Envoyer la demande de vente
      const response = await axios.post(`${API_URL}/sell`, sellData);

      // Si des photos sont sélectionnées, les uploader (optionnel)
      if (selectedFiles.length > 0) {
        const formDataImages = new FormData();
        for (let file of selectedFiles) {
          formDataImages.append('images', file);
        }
        
        // Note: Vous devrez adapter cette partie selon votre backend
        // await axios.post(`${API_URL}/sell/${response.data.sellRequest._id}/images`, formDataImages);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      console.error('Erreur lors de l\'envoi de la demande:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Véhicule', icon: '🚗' },
    { num: 2, label: 'Photos', icon: '📸' },
    { num: 3, label: 'Contact', icon: '👤' },
  ];

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">
      
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
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
      `}</style>

      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="relative h-[550px] flex items-center justify-center overflow-hidden">
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
        
        {/* Contenu centré */}
        <div className="relative z-[2] text-center px-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-blink shadow-[0_0_10px_#34d399]" />
            💰 Estimation gratuite
          </div>
          
          <h1 className="text-white font-black leading-tight mb-3 text-[clamp(1.9rem,4vw,2.8rem)] drop-shadow-lg">
            Vendez votre voiture<br />
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">au meilleur prix</span>
          </h1>
          
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            Remplissez le formulaire en 3 étapes — un conseiller vous répond sous 24h
          </p>
        </div>
        
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-[2]" />
      </div>

      {/* ════════ MAIN CARD ════════ */}
      <div className="max-w-3xl mx-auto px-5 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Stepper */}
          <div className="flex items-center px-6 sm:px-9 pt-7 gap-0">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center flex-1">
                  <div className={`
                    w-11 h-11 rounded-full flex items-center justify-center text-base font-bold transition-all
                    ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 
                      step === s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-110' : 
                      'bg-gray-100 text-gray-400 border-2 border-gray-200'}
                  `}>
                    {step > s.num ? '✓' : s.icon}
                  </div>
                  <div className={`
                    text-[0.7rem] font-semibold uppercase tracking-wide mt-2
                    ${step > s.num || step === s.num ? 'text-blue-600' : 'text-gray-400'}
                  `}>
                    {s.label}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-6 ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Messages */}
          {error && (
            <div className="mx-6 sm:mx-9 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              ⚠️ {error}
            </div>
          )}
          
          {success && (
            <div className="mx-6 sm:mx-9 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium">
              ✅ Demande envoyée avec succès ! Vous allez être redirigé...
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-9">

            {/* Étape 1 : Véhicule */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base">🚗</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Informations du véhicule</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Marque <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="brand" 
                      value={formData.brand}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="BMW, Mercedes, Audi…"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Modèle <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="model" 
                      value={formData.model}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="Série 3, Classe C, A4…"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Année <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="number" 
                      name="year" 
                      value={formData.year}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="2020"
                      min="1990" 
                      max="2025"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Kilométrage <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="number" 
                      name="mileage" 
                      value={formData.mileage}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="50 000 km"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Carburant <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select 
                      name="fuel" 
                      value={formData.fuel}
                      onChange={handleChange} 
                      required
                      disabled={loading}
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    >
                      <option value="">Sélectionner</option>
                      <option>Essence</option>
                      <option>Diesel</option>
                      <option>Hybride</option>
                      <option>Électrique</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Boîte <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select 
                      name="transmission" 
                      value={formData.transmission}
                      onChange={handleChange} 
                      required
                      disabled={loading}
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    >
                      <option value="">Sélectionner</option>
                      <option>Manuelle</option>
                      <option>Automatique</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Prix souhaité (€) <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price}
                    onChange={handleChange} 
                    required 
                    disabled={loading}
                    placeholder="25 000"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Description
                  </label>
                  <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange} 
                    rows="4"
                    disabled={loading}
                    placeholder="État général, options, historique d'entretien…"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[100px] disabled:opacity-50"
                  />
                </div>

                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Étape suivante →
                </button>
              </div>
            )}

            {/* Étape 2 : Photos */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base">📸</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Photos du véhicule</h3>
                </div>

                <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 text-center bg-blue-50 hover:border-blue-600 hover:bg-blue-100 transition-all mb-4">
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-gray-600 text-sm mb-4">
                    Glissez-déposez vos photos ici<br />ou cliquez pour sélectionner
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    id="photos" 
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <label 
                    htmlFor="photos" 
                    className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer disabled:opacity-50"
                  >
                    Choisir des photos
                  </label>
                  {selectedFiles.length > 0 && (
                    <p className="mt-3 text-sm text-gray-600">
                      {selectedFiles.length} fichier(s) sélectionné(s)
                    </p>
                  )}
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  📌 Photos recommandées : extérieur avant, arrière, côté gauche & droit,<br />
                  intérieur, tableau de bord, moteur. Format JPG ou PNG, max 10 Mo/photo.
                </p>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all disabled:opacity-50"
                  >
                    ← Retour
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    Étape suivante →
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3 : Contact */}
            {step === 3 && (
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base">👤</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Vos coordonnées</h3>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Nom complet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange} 
                    required 
                    disabled={loading}
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Email <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="jean@email.com"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                      Téléphone <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange} 
                      required 
                      disabled={loading}
                      placeholder="+33 6 00 00 00 00"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Résumé */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                    📋 Récapitulatif
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-5">
                    {[
                      ['Véhicule', `${formData.brand} ${formData.model}`],
                      ['Année', formData.year],
                      ['Kilométrage', formData.mileage ? `${Number(formData.mileage).toLocaleString()} km` : '—'],
                      ['Carburant', formData.fuel],
                      ['Boîte', formData.transmission],
                      ['Prix', formData.price ? `${Number(formData.price).toLocaleString()} €` : '—'],
                    ].map(([k, v]) => (
                      <div key={k} className="text-sm">
                        <span className="text-gray-500">{k} : </span>
                        <span className="text-slate-900 font-semibold">{v || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all disabled:opacity-50"
                  >
                    ← Retour
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Envoi...</span>
                      </>
                    ) : (
                      '✅ Envoyer ma demande'
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-7 flex-wrap mt-7 px-5">
          {['🔒 Données sécurisées', '⚡ Réponse sous 24h', '✅ Estimation gratuite', '🤝 Sans engagement'].map(t => (
            <div key={t} className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellCar;