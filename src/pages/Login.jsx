// pages/SellCar.js
import React, { useState } from 'react';

const SellCar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '', model: '', year: '', mileage: '',
    fuel: '', transmission: '', price: '', description: '',
    name: '', email: '', phone: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Votre demande a été envoyée ! Un conseiller vous contactera rapidement.');
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
                      placeholder="BMW, Mercedes, Audi…"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      placeholder="Série 3, Classe C, A4…"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      placeholder="2020"
                      min="1990" 
                      max="2025"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      placeholder="50 000 km"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                    placeholder="25 000"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                    placeholder="État général, options, historique d'entretien…"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[100px]"
                  />
                </div>

                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
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

                <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 text-center bg-blue-50 cursor-pointer hover:border-blue-600 hover:bg-blue-100 transition-all mb-4">
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-gray-600 text-sm mb-4">
                    Glissez-déposez vos photos ici<br />ou cliquez pour sélectionner
                  </p>
                  <input type="file" multiple accept="image/*" className="hidden" id="photos" />
                  <label 
                    htmlFor="photos" 
                    className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    Choisir des photos
                  </label>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  📌 Photos recommandées : extérieur avant, arrière, côté gauche & droit,<br />
                  intérieur, tableau de bord, moteur. Format JPG ou PNG, max 10 Mo/photo.
                </p>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all"
                  >
                    ← Retour
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
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
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      placeholder="jean@email.com"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                      placeholder="+33 6 00 00 00 00"
                      className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
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
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all"
                  >
                    ← Retour
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    ✅ Envoyer ma demande
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

export default SellCar;;;; 


// pages/Testimonials.js
import React, { useState } from 'react';

const Testimonials = () => {
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewData, setReviewData] = useState({ name: '', car: '', rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (e) => setReviewData({ ...reviewData, [e.target.name]: e.target.value });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setReviewData({ name: '', car: '', rating: 0, comment: '' }); }, 3000);
  };

  const testimonials = [
    { id: 1, name: 'Sophie Martin',  avatar: '👩', rating: 5, comment: "Excellent service ! J'ai acheté ma BMW Série 3 chez eux et tout s'est passé parfaitement. Le personnel est très professionnel et à l'écoute.", car: 'BMW Série 3',       date: '2024-02-15' },
    { id: 2, name: 'Thomas Dubois',  avatar: '👨', rating: 5, comment: "Je recommande vivement ! Le financement a été très bien expliqué et j'ai pu obtenir un taux avantageux. La voiture était impeccable.",         car: 'Mercedes Classe C', date: '2024-02-10' },
    { id: 3, name: 'Marie Lambert',  avatar: '👩', rating: 4, comment: "Très bonne expérience d'achat. Le service après-vente est réactif et professionnel. Je suis satisfaite de mon achat.",                         car: 'Audi A4',           date: '2024-02-05' },
    { id: 4, name: 'Pierre Durant',  avatar: '👨', rating: 5, comment: "Première expérience d'achat de voiture en ligne et je suis conquis. Tout était clair et transparent. La livraison a été rapide.",               car: 'Toyota Corolla',    date: '2024-01-28' },
    { id: 5, name: 'Julie Moreau',   avatar: '👩', rating: 5, comment: "Un grand merci à toute l'équipe pour leur accompagnement. J'ai pu trouver la voiture de mes rêves à un prix très compétitif.",                  car: 'Peugeot 308',       date: '2024-01-20' },
    { id: 6, name: 'Lucas Bernard',  avatar: '👨', rating: 4, comment: "Très satisfait de mon achat. La transaction s'est déroulée rapidement et le véhicule correspondait exactement à la description.",               car: 'Renault Mégane',    date: '2024-01-15' },
  ];

  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);
  const filteredTestimonials = filter === 'all' ? testimonials : testimonials.filter(t => t.rating === parseInt(filter));

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen">
      
      {/* Animations personnalisées */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
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
        
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-[2]" />
        
        {/* Contenu centré */}
        <div className="relative z-[3] text-center px-5 max-w-3xl mx-auto animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-blink" />
            Avis clients vérifiés
          </div>
          
          <h1 className="text-white font-black leading-tight mb-3 text-[clamp(2rem,5vw,3rem)] drop-shadow-lg">
            Ils nous font <span className="bg-gradient-to-r from-blue-200 to-amber-200 bg-clip-text text-transparent">confiance</span>
          </h1>
          
          <p className="text-white/75 text-base max-w-xl mx-auto">
            Découvrez les retours d'expérience de nos clients satisfaits
          </p>
        </div>
      </div>

      {/* ════════ CONTENU ════════ */}
      <div className="max-w-7xl mx-auto px-1 pb-20">

        {/* Stats strip */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-center items-center gap-0 -mt-12 mb-12 relative z-10 shadow-2xl">
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">{testimonials.length}+</span>
            </div>
            <div className="text-xs text-white/55 font-semibold uppercase tracking-wide mt-1.5">Avis clients</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">{averageRating}</span>
              <span className="text-white/50 text-xl ml-0.5">/5</span>
            </div>
            <div className="text-xs text-white/55 font-semibold uppercase tracking-wide mt-1.5">Note moyenne</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">98%</span>
            </div>
            <div className="text-xs text-white/55 font-semibold uppercase tracking-wide mt-1.5">Clients satisfaits</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">5K+</span>
            </div>
            <div className="text-xs text-white/55 font-semibold uppercase tracking-wide mt-1.5">Véhicules vendus</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-9">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mr-1">Filtrer :</span>
          {[
            { key:'all', label:'Tous les avis' },
            { key:'5',   label:'5 ⭐' },
            { key:'4',   label:'4 ⭐' },
            { key:'3',   label:'3 ⭐' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-xs font-semibold border-2 transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md'
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-xs text-gray-400 font-medium ml-2">
            {filteredTestimonials.length} avis
          </span>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filteredTestimonials.map((t, idx) => (
            <div 
              key={t.id} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200 transition-all relative overflow-hidden group"
              style={{ animation: `fadeUp 0.35s ease ${idx * 0.07}s both` }}
            >
              {/* Ligne de couleur en haut */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
              
              {/* Guillemet décoratif */}
              <div className="absolute top-2 right-4 text-7xl font-black text-blue-50 pointer-events-none">"</div>
              
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400 font-medium">
                    🗓 {new Date(t.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < t.rating ? 'text-amber-400' : 'text-gray-200'}>★</span>
                ))}
                <span className="ml-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{t.rating}/5</span>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed italic mb-4 relative z-10">"{t.comment}"</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 relative z-10">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">🚗 {t.car}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">✓ Vérifié</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/20 rounded-full blur-3xl" />
          
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight relative">
            Vous êtes client chez AutoMarket ?
          </h3>
          <p className="text-white/55 text-sm mb-5 relative">
            Partagez votre expérience et aidez d'autres acheteurs
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative"
          >
            ✍️ Laisser un avis
          </button>
        </div>

      </div>

      {/* ════════ MODAL FORMULAIRE D'AVIS ════════ */}
      {showForm && (
        <div 
          className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeUp_0.2s_ease]"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-[fadeUp_0.3s_ease] relative">
            
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-slate-900 flex items-center justify-center transition-all"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">Merci pour votre avis !</h3>
                <p className="text-sm text-gray-400">Votre témoignage sera publié après validation.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">✍️ Laisser un avis</h3>
                <p className="text-sm text-gray-400 mb-5">Partagez votre expérience avec la communauté</p>

                <form onSubmit={handleReviewSubmit}>
                  {/* Nom */}
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Nom complet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={reviewData.name}
                    onChange={handleReviewChange} 
                    required 
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-4"
                  />

                  {/* Véhicule */}
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Véhicule acheté <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="car" 
                    value={reviewData.car}
                    onChange={handleReviewChange} 
                    required 
                    placeholder="BMW Série 3, Mercedes…"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-4"
                  />

                  {/* Note étoiles */}
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Note <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="flex gap-1.5 mb-4">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n} 
                        type="button" 
                        className="text-2xl p-1 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer"
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewData({ ...reviewData, rating: n })}
                      >
                        <span style={{ color: n <= (hoverRating || reviewData.rating) ? '#f59e0b' : '#e2e8f0' }}>★</span>
                      </button>
                    ))}
                    {reviewData.rating > 0 && (
                      <span className="text-xs font-bold text-amber-600 self-center ml-1">
                        {reviewData.rating}/5
                      </span>
                    )}
                  </div>

                  {/* Commentaire */}
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Votre avis <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea 
                    name="comment" 
                    value={reviewData.comment}
                    onChange={handleReviewChange} 
                    required
                    placeholder="Décrivez votre expérience d'achat…"
                    rows="4"
                    className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y mb-5"
                  />

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!reviewData.rating}
                  >
                    🚀 Publier mon avis
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;





// pages/Location.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Data ───────────────────────────────────────────── */
const CARS = [
  { id: 1, brand: 'BMW', model: 'Série 3', year: 2023, priceDay: 89, priceWeek: 490, priceMonth: 1490, mileage: 'Illimité', fuel: 'Diesel', transmission: 'Automatique', seats: 5, category: 'Premium', features: ['GPS', 'Apple CarPlay', 'Caméra 360°', 'Sièges chauffants', 'Toit ouvrant'], image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=85', available: true },
  { id: 2, brand: 'Mercedes', model: 'Classe C', year: 2023, priceDay: 110, priceWeek: 620, priceMonth: 1890, mileage: 'Illimité', fuel: 'Hybride', transmission: 'Automatique', seats: 5, category: 'Luxe', features: ['MBUX 11.9"', 'Hybride rechargeable', 'Sièges Nappa', 'Pack AMG', 'Keyless Go'], image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=85', available: true },
  { id: 3, brand: 'Audi', model: 'A4', year: 2022, priceDay: 79, priceWeek: 430, priceMonth: 1290, mileage: '300 km/j', fuel: 'Essence', transmission: 'Automatique', seats: 5, category: 'Premium', features: ['Virtual Cockpit', 'B&O Sound', 'Quattro', 'LED Matrix', 'Pack S-Line'], image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=85', available: true },
  { id: 4, brand: 'Porsche', model: '911 Carrera', year: 2022, priceDay: 320, priceWeek: 1850, priceMonth: 5900, mileage: '250 km/j', fuel: 'Essence', transmission: 'Automatique', seats: 2, category: 'Sport', features: ['PCM Navigation', 'Sport Chrono', 'BOSE Sound', 'Caméra recul', 'Keyless'], image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85', available: true },
  { id: 5, brand: 'Tesla', model: 'Model 3', year: 2023, priceDay: 99, priceWeek: 560, priceMonth: 1690, mileage: 'Illimité', fuel: 'Électrique', transmission: 'Automatique', seats: 5, category: 'Électrique', features: ['Autopilot', 'Écran 15"', 'Supercharge', 'Caméras 360°', 'OTA Updates'], image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=85', available: false },
  { id: 6, brand: 'Range Rover', model: 'Sport', year: 2023, priceDay: 250, priceWeek: 1400, priceMonth: 4200, mileage: 'Illimité', fuel: 'Hybride', transmission: 'Automatique', seats: 5, category: 'SUV Luxe', features: ['Pivi Pro', '4x4 Terrain', 'Sièges massants', 'Toit panoramique', 'HUD'], image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=85', available: true },
];

const CATEGORIES = ['Tous', 'Premium', 'Luxe', 'Sport', 'Électrique', 'SUV Luxe'];
const AVANTAGES = [
  { icon: '🛡️', title: 'Assurance incluse', desc: 'Tous risques, assistance 24/7 inclus dans chaque location.' },
  { icon: '⛽', title: 'Carburant offert', desc: 'Premier plein offert sur toutes les locations longue durée.' },
  { icon: '🔑', title: 'Remise en main propre', desc: "Votre véhicule livré à l'adresse de votre choix." },
  { icon: '📱', title: 'App dédiée', desc: "Gérez votre location, GPS, et assistance depuis l'app." },
];
const STEPS = [{ num: 1, lbl: 'Vos infos' }, { num: 2, lbl: 'Options' }, { num: 3, lbl: 'Confirmation' }];
const INSURANCE = [
  { key: 'standard', icon: '🛡️', lbl: 'Standard', price: 'Incluse' },
  { key: 'premium', icon: '⭐', lbl: 'Premium', price: '+15€/j' },
  { key: 'vip', icon: '💎', lbl: 'VIP', price: '+29€/j' },
];
const PICKUPS = ['Paris - Showroom', 'Lyon - Agence', 'Livraison à domicile', 'Aéroport CDG'];

const fuelIcon = { Essence: '⛽', Diesel: '🛢️', Hybride: '🔋', Électrique: '⚡' };
const catColor = { Premium: '#2563eb', Luxe: '#7c3aed', Sport: '#dc2626', Électrique: '#059669', 'SUV Luxe': '#b45309' };
const priceKey = { day: 'priceDay', week: 'priceWeek', month: 'priceMonth' };
const periodLbl = { day: '/ jour', week: '/ semaine', month: '/ mois' };
const fmt = p => new Intl.NumberFormat('fr-FR').format(p) + ' €';
const EMPTY = { name: '', email: '', phone: '', dateStart: '', dateEnd: '', pickupLocation: 'Paris - Showroom', insurance: 'standard', message: '' };

/* ─── Component ──────────────────────────────────────── */
const Location = () => {
  const navigate = useNavigate();
  const [cat, setCat] = useState('Tous');
  const [period, setPeriod] = useState('day');
  const [modal, setModal] = useState(null);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const filtered = cat === 'Tous' ? CARS : CARS.filter(c => c.category === cat);
  const openModal = car => { setModal(car); setStep(1); setDone(false); setForm(EMPTY); };
  const closeModal = () => setModal(null);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const nextStep = e => { e.preventDefault(); setStep(s => s + 1); };
  const onSubmit = e => { e.preventDefault(); setDone(true); setTimeout(closeModal, 5500); };
  const REF = `LOC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">
      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-[heroZoom_18s_ease-in-out_infinite_alternate] brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />
        
        {/* Overlay transparent */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-600/15 to-slate-900/20 backdrop-brightness-105" />
        
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '70px 70px'
        }} />
        
        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
        
        {/* Contenu centré */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 text-center animate-fadeUp">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide mb-6">
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
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20"
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
        <div className="max-w-7xl mx-auto px-[5px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((a, i) => (
              <div key={i} className="p-6 flex items-start gap-3.5 border-r last:border-r-0 border-gray-200 hover:bg-blue-50 transition-colors">
                <span className="text-3xl flex-shrink-0 mt-0.5">{a.icon}</span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">{a.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ FLOTTE ════════ */}
      <div className="max-w-7xl mx-auto px-[5px]" id="fleet">
        <div className="py-9 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                  cat === c
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1">
            {[['day', '/ Jour'], ['week', '/ Semaine'], ['month', '/ Mois']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setPeriod(k)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          {filtered.map(car => (
            <div key={car.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-200 transition-all">
              <div className="relative h-52 overflow-hidden">
                <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.68rem] font-extrabold tracking-wide uppercase text-white backdrop-blur-sm border border-white/25" style={{ background: (catColor[car.category] || '#2563eb') + 'cc' }}>
                  {car.category}
                </span>
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[0.68rem] font-bold text-white backdrop-blur-sm border border-white/20" style={{ background: car.available ? 'rgba(5,150,105,.85)' : 'rgba(220,38,38,.75)' }}>
                  {car.available ? '✓ Disponible' : '✗ Indisponible'}
                </span>
                <div className="absolute bottom-3 right-3 text-white font-black text-xl drop-shadow-lg">
                  {fmt(car[priceKey[period]])}<span className="text-xs opacity-80 font-semibold"> {periodLbl[period]}</span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col gap-3.5">
                <div>
                  <span className="font-black text-slate-900 text-lg tracking-tight">{car.brand} {car.model}</span>
                  <span className="text-gray-500 text-sm ml-1.5 font-medium">{car.year}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: fuelIcon[car.fuel] || '⛽', label: 'Carburant', value: car.fuel },
                    { icon: '⚙️', label: 'Boîte', value: car.transmission === 'Automatique' ? 'Auto' : 'Manu' },
                    { icon: '👥', label: 'Places', value: car.seats },
                    { icon: '🛣️', label: 'Km inclus', value: car.mileage },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-1 text-center">
                      <div className="text-base mb-1">{item.icon}</div>
                      <span className="text-[0.62rem] font-bold text-gray-500 uppercase tracking-wide block mb-0.5">{item.label}</span>
                      <span className="text-xs font-extrabold text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {car.features.slice(0, 4).map((f, i) => (
                    <span key={i} className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">✓ {f}</span>
                  ))}
                  {car.features.length > 4 && (
                    <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">+{car.features.length - 4}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between gap-2.5 mt-auto pt-3.5 border-t border-gray-200">
                  <div>
                    <div className="text-blue-600 font-black text-2xl tracking-tight leading-none">{fmt(car[priceKey[period]])}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{periodLbl[period]} · TVA incluse</div>
                  </div>
                  <button
                    disabled={!car.available}
                    onClick={() => car.available && openModal(car)}
                    className={`px-5 py-2 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap ${
                      !car.available ? 'opacity-45 cursor-not-allowed' : ''
                    }`}
                  >
                    {car.available ? '🔑 Réserver' : 'Indisponible'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ MODAL RÉSERVATION — 3 ÉTAPES ════════ */}
      {modal && (
        <div className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[93vh] overflow-y-auto shadow-2xl animate-[fadeUp_0.3s_cubic-bezier(.4,0,.2,1)] scrollbar-thin scrollbar-thumb-gray-200">
            
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-7 pb-5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:rotate-90 transition-all">✕</button>
              <h3 className="text-lg font-black text-white relative z-10 mb-1">🔑 Réserver ce véhicule</h3>
              <p className="text-xs text-white/50 relative z-10">Confirmation instantanée · Annulation gratuite 48h avant</p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
                🚗 {modal.brand} {modal.model} {modal.year} · {fmt(modal[priceKey[period]])} {periodLbl[period]}
              </div>
            </div>

            {!done && (
              <div className="flex items-start px-7 pt-5">
                {STEPS.map((s, idx) => (
                  <div key={s.num} className="flex flex-col items-center flex-1">
                    <div className="flex items-center w-full">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
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
                    <span className={`text-[0.6rem] font-bold uppercase tracking-wide mt-1 ${
                      step > s.num || step === s.num ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {s.lbl}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="p-7">
              {done ? (
                <div className="text-center py-8 animate-fadeUp">
                  <span className="text-7xl block mb-4 animate-[pop_0.5s_cubic-bezier(.4,0,.2,1)_both]">🎉</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-2.5">Réservation confirmée !</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    Merci <span className="font-bold">{form.name}</span> ! Votre réservation pour le <span className="font-bold">{modal.brand} {modal.model}</span> est enregistrée.<br />
                    Un conseiller vous contactera au <span className="font-bold">{form.phone}</span> sous 1h.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide">📋 Réf : {REF}</div>
                </div>
              ) : step === 1 ? (
                <form onSubmit={nextStep}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">📋 Vos coordonnées</div>
                  
                  <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nom complet <span className="text-red-500 ml-0.5">*</span></label>
                  <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="text" name="name" value={form.name} onChange={onChange} required placeholder="Jean Dupont" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="email" name="email" value={form.email} onChange={onChange} required placeholder="jean@email.com" />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Téléphone <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="tel" name="phone" value={form.phone} onChange={onChange} required placeholder="+33 6 00 00 00 00" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Début <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="date" name="dateStart" value={form.dateStart} onChange={onChange} required />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Fin <span className="text-red-500 ml-0.5">*</span></label>
                      <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5" type="date" name="dateEnd" value={form.dateEnd} onChange={onChange} required />
                    </div>
                  </div>
                  
                  <div className="flex mt-2"><button type="submit" className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Étape suivante →</button></div>
                </form>
              ) : step === 2 ? (
                <form onSubmit={nextStep}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">📍 Point de retrait</div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {PICKUPS.map(loc => (
                      <div
                        key={loc}
                        onClick={() => setForm(p => ({ ...p, pickupLocation: loc }))}
                        className={`border-2 rounded-lg py-2.5 px-2 text-center text-xs font-bold cursor-pointer transition-all ${
                          form.pickupLocation === loc
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">🛡️ Formule d'assurance</div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3.5">
                    {INSURANCE.map(o => (
                      <div
                        key={o.key}
                        onClick={() => setForm(p => ({ ...p, insurance: o.key }))}
                        className={`border-2 rounded-xl py-3.5 px-1 text-center cursor-pointer transition-all ${
                          form.insurance === o.key
                            ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-100'
                            : 'border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{o.icon}</span>
                        <span className="text-xs font-bold text-gray-500 block">{o.lbl}</span>
                        <span className="text-[0.65rem] text-gray-400 block mt-0.5">{o.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Message (optionnel)</label>
                  <textarea className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[80px]" name="message" value={form.message} onChange={onChange} placeholder="Demandes particulières, options souhaitées…" />
                  
                  <div className="flex gap-2.5 mt-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all">← Retour</button>
                    <button type="submit" className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Étape suivante →</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">✅ Récapitulatif</div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 mb-3.5">
                    <div className="text-[0.68rem] font-bold text-blue-600 uppercase tracking-wide mb-3">📋 Détails de la réservation</div>
                    {[
                      ['Véhicule', `${modal.brand} ${modal.model} ${modal.year}`],
                      ['Tarif', `${fmt(modal[priceKey[period]])} ${periodLbl[period]}`],
                      ['Client', form.name],
                      ['Email', form.email],
                      ['Téléphone', form.phone],
                      ['Période', form.dateStart && form.dateEnd ? `${form.dateStart} → ${form.dateEnd}` : 'Non précisée'],
                      ['Retrait', form.pickupLocation],
                      ['Assurance', { standard: 'Standard (incluse)', premium: 'Premium (+15€/j)', vip: 'VIP (+29€/j)' }[form.insurance]],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center text-sm mb-1.5">
                        <span className="text-gray-500">{k}</span>
                        <span className="text-slate-900 font-bold">{v}</span>
                      </div>
                    ))}
                    <div className="h-px bg-blue-200 my-3" />
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {fmt(modal[priceKey[period]])} <span className="text-xs font-semibold text-gray-500">{periodLbl[period]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2.5 text-xs font-semibold text-green-700 mb-3.5">
                    🔒 Aucun paiement à cette étape · Un conseiller vous contacte sous 1h
                  </div>
                  
                  <div className="flex gap-2.5">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 px-5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 hover:text-slate-900 transition-all">← Retour</button>
                    <button type="submit" className="flex-1 py-3 px-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">✅ Confirmer</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations personnalisées via Tailwind */}
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
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.22s ease; }
      `}</style>
    </div>
  );
};

export default Location;






// pages/Garage.js
import React, { useState } from 'react';

const Garage = () => {
  const [booking, setBooking] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    car: ''
  });

  const services = [
    {
      title: 'Révision complète',
      price: '149€',
      duration: '2h',
      description: 'Vidange, filtres, niveaux, contrôle général',
      icon: '🔧'
    },
    {
      title: 'Diagnostic électronique',
      price: '79€',
      duration: '1h',
      description: 'Analyse complète des calculateurs et capteurs',
      icon: '💻'
    },
    {
      title: 'Changement pneus',
      price: '25€/pneu',
      duration: '1h',
      description: 'Montage, équilibrage, parallélisme',
      icon: '🛞'
    },
    {
      title: 'Climatisation',
      price: '89€',
      duration: '1h30',
      description: 'Recharge gaz, désinfection, contrôle étanchéité',
      icon: '❄️'
    },
    {
      title: 'Freinage',
      price: '149€',
      duration: '2h',
      description: 'Changement plaquettes et disques',
      icon: '🛑'
    },
    {
      title: 'Carrosserie',
      price: 'Sur devis',
      duration: 'Variable',
      description: 'Réparation peinture, tôlerie, rénovation',
      icon: '🎨'
    }
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Rendez-vous confirmé ! Vous recevrez un email de confirmation.');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
        Garage & Entretien
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Prenez rendez-vous pour l'entretien de votre véhicule
      </p>

      {/* Services */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        marginBottom: '50px'
      }}>
        {services.map((service, i) => (
          <div
            key={i}
            style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '10px',
              textAlign: 'center',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p style={{ color: '#007bff', fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>
              {service.price}
            </p>
            <p style={{ color: '#666', marginBottom: '10px' }}>⏱️ {service.duration}</p>
            <p style={{ color: '#999', fontSize: '0.9rem' }}>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Prise de rendez-vous */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: '10px',
        color: 'white'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
          Prendre rendez-vous
        </h2>
        
        <form onSubmit={handleBooking} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '15px' }}>
            <select
              value={booking.service}
              onChange={(e) => setBooking({...booking, service: e.target.value})}
              required
              style={inputStyleWhite}
            >
              <option value="">Sélectionnez un service</option>
              {services.map(s => (
                <option key={s.title} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({...booking, date: e.target.value})}
              required
              style={inputStyleWhite}
            />
            <input
              type="time"
              value={booking.time}
              onChange={(e) => setBooking({...booking, time: e.target.value})}
              required
              style={inputStyleWhite}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Marque et modèle de votre voiture"
              value={booking.car}
              onChange={(e) => setBooking({...booking, car: e.target.value})}
              required
              style={inputStyleWhite}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Votre nom"
              value={booking.name}
              onChange={(e) => setBooking({...booking, name: e.target.value})}
              required
              style={inputStyleWhite}
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={booking.phone}
              onChange={(e) => setBooking({...booking, phone: e.target.value})}
              required
              style={inputStyleWhite}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Confirmer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyleWhite = {
  width: '100%',
  padding: '12px',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '5px',
  fontSize: '1rem',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  outline: 'none'
};

export default Garage;





// pages/Financing.js
import React, { useState } from 'react';

const Financing = () => {
  const [formData, setFormData] = useState({
    vehiclePrice: '25000',
    downPayment: '5000',
    duration: '60',
    rate: '3.5'
  });

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.vehiclePrice) - parseFloat(formData.downPayment);
    const monthlyRate = parseFloat(formData.rate) / 100 / 12;
    const months = parseFloat(formData.duration);
    
    if (principal <= 0 || monthlyRate <= 0 || months <= 0) return 0;
    
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(payment) ? 0 : payment.toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>
        Financement automobile
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Calculez vos mensualités et trouvez la meilleure option de financement
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Simulateur */}
        <div style={{
          background: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px'
        }}>
          <h2 style={{ marginBottom: '30px' }}>Simulateur de crédit</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Prix du véhicule (€)
            </label>
            <input
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={formData.vehiclePrice}
              onChange={(e) => setFormData({...formData, vehiclePrice: e.target.value})}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>5 000 €</span>
              <span style={{ fontWeight: 'bold' }}>{parseInt(formData.vehiclePrice).toLocaleString()} €</span>
              <span>100 000 €</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Apport personnel (€)
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={formData.downPayment}
              onChange={(e) => setFormData({...formData, downPayment: e.target.value})}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>0 €</span>
              <span style={{ fontWeight: 'bold' }}>{parseInt(formData.downPayment).toLocaleString()} €</span>
              <span>50 000 €</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Durée (mois)
            </label>
            <input
              type="range"
              min="12"
              max="84"
              step="12"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>12 mois</span>
              <span style={{ fontWeight: 'bold' }}>{formData.duration} mois</span>
              <span>84 mois</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Taux d'intérêt (%)
            </label>
            <input
              type="range"
              min="0.5"
              max="7"
              step="0.1"
              value={formData.rate}
              onChange={(e) => setFormData({...formData, rate: e.target.value})}
              style={{ width: '100%', marginBottom: '5px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>0.5%</span>
              <span style={{ fontWeight: 'bold' }}>{formData.rate}%</span>
              <span>7%</span>
            </div>
          </div>
        </div>

        {/* Résultat */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ color: 'white', marginBottom: '30px' }}>Votre mensualité</h2>
          
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            {parseFloat(monthlyPayment).toLocaleString()} €
          </div>
          
          <p style={{ marginBottom: '10px' }}>
            <strong>Montant financé :</strong> {(parseFloat(formData.vehiclePrice) - parseFloat(formData.downPayment)).toLocaleString()} €
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Durée :</strong> {formData.duration} mois
          </p>
          <p style={{ marginBottom: '30px' }}>
            <strong>Taux :</strong> {formData.rate}%
          </p>

          <button style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '15px',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
            Faire une demande de crédit
          </button>
        </div>
      </div>

      {/* Options de financement */}
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Nos solutions de financement</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          {[
            {
              title: 'Crédit classique',
              desc: 'Financez votre véhicule avec des mensualités fixes',
              icon: '💰'
            },
            {
              title: 'Location avec option d\'achat (LOA)',
              desc: 'Louez avec option d\'achat en fin de contrat',
              icon: '🔑'
            },
            {
              title: 'Crédit ballon',
              desc: 'Des mensualités réduites avec un dernier loyer ajustable',
              icon: '⚽'
            }
          ].map((option, i) => (
            <div key={i} style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{option.icon}</div>
              <h3>{option.title}</h3>
              <p style={{ color: '#666' }}>{option.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Financing;




// pages/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: true, message: '✅ Message envoyé avec succès ! On vous répond sous 24h.' });
    setTimeout(() => setFormStatus({ submitted: false, success: false, message: '' }), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: '📍', title: 'Adresse', content: '123 Av. des Champs-Élysées, Paris', link: 'https://maps.google.com', color: '#eff6ff', accent: '#2563eb' },
    { icon: '📞', title: 'Téléphone', content: '01 23 45 67 89', link: 'tel:0123456789', color: '#f0fdf4', accent: '#059669' },
    { icon: '✉️', title: 'Email', content: 'contact@automarket.fr', link: 'mailto:contact@automarket.fr', color: '#fff7ed', accent: '#ea580c' },
    { icon: '💬', title: 'WhatsApp', content: '+33 6 12 34 56 78', link: 'https://wa.me/33612345678', color: '#f0fdf4', accent: '#16a34a' },
  ];

  const hours = [
    { day: 'Lundi – Vendredi', time: '9h – 19h', open: true },
    { day: 'Samedi', time: '10h – 18h', open: true },
    { day: 'Dimanche', time: 'Fermé', open: false },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: '#f8fafc' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

      
/* ── HERO UNE SEULE IMAGE CLAIRE ── */
.loc-hero { 
  position: relative; 
  height: 600px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  overflow: hidden; 
}

/* Image de fond unique - Haute qualité, claire */
.hero-bg { 
  position: absolute; 
  inset: 0; 
  background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95'); 
  background-size: cover; 
  background-position: center 30%; 
  animation: heroZoom 18s ease-in-out infinite alternate; 
  transform-origin: center;
  filter: brightness(1.05); /* Légèrement plus lumineux */
}

@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}

/* Overlay très transparent */
.hero-overlay { 
  position: absolute; 
  inset: 0; 
  z-index: 1; 
  background: linear-gradient(
    135deg,
    rgba(15,23,42,0.2) 0%,
    rgba(37,99,235,0.15) 50%,
    rgba(15,23,42,0.2) 100%
  );
  backdrop-filter: brightness(1.02);
}

/* Grille subtile (optionnel) */
.hero-grid { 
  position: absolute; 
  inset: 0; 
  z-index: 1; 
  opacity: 0.02; 
  background-image: 
    linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px); 
  background-size: 70px 70px; 
}

/* Fade bottom */
.hero-fade { 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  height: 100px; 
  z-index: 2; 
  background: linear-gradient(to top, #f8fafc, transparent); 
  pointer-events: none; 
}

/* Contenu centré */
.hero-body { 
  position: relative; 
  z-index: 3; 
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  animation: fadeUp 0.9s ease-out; 
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Badge */
.hero-tag { 
  display: inline-flex; 
  align-items: center; 
  gap: 8px; 
  background: rgba(255,255,255,0.15); 
  border: 1px solid rgba(255,255,255,0.3); 
  backdrop-filter: blur(10px); 
  color: white; 
  padding: 8px 22px; 
  border-radius: 99px; 
  font-size: 0.8rem; 
  font-weight: 700; 
  letter-spacing: 1px; 
  margin-bottom: 25px; 
}

.hero-dot { 
  width: 8px; 
  height: 8px; 
  background: #34d399; 
  border-radius: 50%; 
  animation: blink 1.5s infinite; 
  box-shadow: 0 0 10px #34d399; 
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Titre */
.hero-h1 { 
  font-size: clamp(2.5rem, 6vw, 4rem); 
  font-weight: 900; 
  color: white; 
  line-height: 1.1; 
  letter-spacing: -1px; 
  margin-bottom: 20px; 
  text-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.hero-h1 span { 
  background: linear-gradient(90deg, #ffffff, #e0f2fe); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; 
}

/* Sous-titre */
.hero-p { 
  font-size: 1.1rem; 
  color: rgba(255,255,255,0.95); 
  max-width: 650px; 
  margin: 0 auto 35px;
  line-height: 1.7; 
  text-shadow: 0 2px 15px rgba(0,0,0,0.3);
}

/* Boutons centrés */
.hero-ctas { 
  display: flex; 
  gap: 16px; 
  justify-content: center;
  flex-wrap: wrap; 
}

.btn-primary { 
  display: inline-flex; 
  align-items: center; 
  gap: 10px; 
  background: linear-gradient(135deg, #2563eb, #3b82f6); 
  color: white; 
  padding: 14px 34px; 
  border-radius: 99px; 
  font-weight: 700; 
  font-size: 1rem; 
  border: none; 
  cursor: pointer; 
  font-family: 'Outfit', sans-serif; 
  box-shadow: 0 4px 20px rgba(37,99,235,0.3); 
  transition: all 0.3s; 
  border: 1px solid rgba(255,255,255,0.2);
}

.btn-primary:hover { 
  transform: translateY(-3px); 
  box-shadow: 0 8px 30px rgba(37,99,235,0.5); 
}

.btn-ghost { 
  display: inline-flex; 
  align-items: center; 
  gap: 10px; 
  background: rgba(255,255,255,0.1); 
  border: 1.5px solid rgba(255,255,255,0.4); 
  color: white; 
  padding: 14px 34px; 
  border-radius: 99px; 
  font-weight: 600; 
  font-size: 1rem; 
  cursor: pointer; 
  font-family: 'Outfit', sans-serif; 
  backdrop-filter: blur(8px);
  transition: all 0.3s; 
}

.btn-ghost:hover { 
  background: rgba(255,255,255,0.2); 
  border-color: rgba(255,255,255,0.8);
  transform: translateY(-3px); 
}

/* Responsive */
@media (max-width: 768px) {
  .loc-hero { height: 550px; }
  .hero-h1 { font-size: 2.2rem; }
  .hero-p { font-size: 1rem; }
  .btn-primary, .btn-ghost { padding: 12px 28px; }
}

@media (max-width: 480px) {
  .loc-hero { height: 500px; }
  .hero-h1 { font-size: 1.8rem; }
  .hero-ctas { flex-direction: column; width: 100%; }
  .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
}

        /* ── Page body ── */
        .contact-body { max-width: 1200px; margin: 0 auto; padding: 0 20px 80px; }

        /* ── Section label ── */
        .section-label {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; color: #2563eb;
          padding: 5px 14px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 12px;
        }
        .section-title { font-size: 1.9rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.5px; }

        /* ── Info cards ── */
        .info-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin: -44px 0 60px; position: relative; z-index: 10;
        }
        .info-card {
          background: white; border-radius: 16px; padding: 24px 18px;
          text-align: center; border: 1px solid #f1f5f9;
          box-shadow: 0 8px 30px rgba(37,99,235,0.08);
          transition: all 0.3s; text-decoration: none; display: block;
        }
        .info-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(37,99,235,0.14); border-color: #bfdbfe; }
        .info-icon-wrap {
          width: 54px; height: 54px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin: 0 auto 14px;
        }
        .info-card-title { font-weight: 800; color: #0f172a; font-size: 0.95rem; margin-bottom: 6px; }
        .info-card-content { font-size: 0.85rem; font-weight: 600; }

        /* ── Main grid ── */
        .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px; }

        /* ── Form card ── */
        .form-card {
          background: white; border-radius: 20px; padding: 36px;
          box-shadow: 0 4px 24px rgba(37,99,235,0.06); border: 1px solid #f1f5f9;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 18px; }
        .form-label {
          display: block; font-size: 0.78rem; font-weight: 700;
          color: #475569; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 7px;
        }
        .form-label .req { color: #ef4444; margin-left: 2px; }
        .form-input, .form-textarea {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: 0.93rem; color: #0f172a;
          font-family: 'Outfit', sans-serif; background: #f8fafc; outline: none;
          transition: all 0.2s;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: #2563eb; background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: #94a3b8; }
        .form-textarea { resize: vertical; min-height: 130px; }

        .submit-btn {
          width: 100%; padding: 13px 24px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white; border: none; border-radius: 99px;
          font-size: 0.95rem; font-weight: 700; font-family: 'Outfit', sans-serif;
          cursor: pointer; transition: all 0.3s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,99,235,0.4); }
        .submit-btn:active { transform: translateY(0); }

        .form-success {
          margin-top: 16px; padding: 14px 18px;
          background: #d1fae5; color: #065f46;
          border: 1px solid #6ee7b7; border-radius: 10px;
          font-size: 0.9rem; font-weight: 600; text-align: center;
          animation: fadeUp 0.3s ease;
        }

        /* ── Sidebar ── */
        .sidebar { display: flex; flex-direction: column; gap: 16px; }

        .hours-card {
          background: linear-gradient(135deg, #0f172a, #1e3a5f);
          border-radius: 20px; padding: 26px;
          box-shadow: 0 4px 24px rgba(15,23,42,0.2);
          position: relative; overflow: hidden;
        }
        .hours-card::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%);
        }
        .hours-title {
          font-size: 1rem; font-weight: 800; color: white;
          margin: 0 0 20px; display: flex; align-items: center; gap: 8px;
        }
        .hours-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hours-row:last-of-type { border-bottom: none; }
        .hours-day { font-size: 0.875rem; color: rgba(255,255,255,0.7); font-weight: 500; }
        .hours-time { font-size: 0.875rem; font-weight: 700; color: white; }
        .hours-time.closed { color: #94a3b8; }
        .hours-cta {
          margin-top: 18px; padding: 10px 0 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 0.8rem; color: rgba(255,255,255,0.55); line-height: 1.5;
        }
        .hours-cta strong { color: #93c5fd; }

        .quick-card {
          background: white; border-radius: 20px; padding: 24px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 24px rgba(37,99,235,0.05);
        }
        .quick-title {
          font-size: 0.95rem; font-weight: 800; color: #0f172a;
          margin: 0 0 12px; display: flex; align-items: center; gap: 8px;
        }
        .quick-text { color: #475569; font-size: 0.875rem; line-height: 1.7; margin: 0; }
        .quick-text strong { color: #2563eb; }

        /* ── Map card ── */
        .map-card {
          background: white; border-radius: 20px; padding: 28px;
          box-shadow: 0 4px 24px rgba(37,99,235,0.06); border: 1px solid #f1f5f9;
        }
        .map-placeholder {
          height: 380px; border-radius: 14px;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; margin-top: 20px;
        }
        .map-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .map-road-h {
          position: absolute; left: 0; right: 0;
          height: 24px; background: rgba(255,255,255,0.7);
          border-top: 1px solid #bfdbfe; border-bottom: 1px solid #bfdbfe;
        }
        .map-road-v {
          position: absolute; top: 0; bottom: 0;
          width: 24px; background: rgba(255,255,255,0.7);
          border-left: 1px solid #bfdbfe; border-right: 1px solid #bfdbfe;
        }
        .map-marker {
          position: relative; z-index: 2; text-align: center;
        }
        .map-pin {
          font-size: 3rem;
          filter: drop-shadow(0 6px 12px rgba(37,99,235,0.4));
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .map-label {
          background: white; border-radius: 12px; padding: 12px 20px;
          margin-top: 10px; box-shadow: 0 4px 20px rgba(37,99,235,0.12);
          border: 1px solid #bfdbfe;
        }
        .map-label-name { font-weight: 800; color: #0f172a; font-size: 0.95rem; }
        .map-label-addr { font-size: 0.78rem; color: #64748b; margin-top: 2px; }
        .map-label-open { font-size: 0.78rem; color: #059669; font-weight: 700; margin-top: 4px; }

        /* Responsive */
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr; }
          .info-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .info-grid { grid-template-columns: 1fr 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .form-card { padding: 22px; }
        }
        /* Map Section */
.map-section {
  background: white;
  border-radius: 24px;
  padding: var(--space-sm);
  margin: var(--space-lg) 0;
  box-shadow: 0 4px 30px rgba(37,99,235,0.05);
  border: 1px solid #f1f5f9;
}

.map-container {
  width: 100%;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Grille de rue */
.map-grid {
  position: absolute;
  inset: 0;
}

.map-grid-line {
  position: absolute;
  background: rgba(37,99,235,0.1);
}

.map-grid-line.horizontal {
  width: 100%;
  height: 1px;
  left: 0;
}

.map-grid-line.vertical {
  width: 1px;
  height: 100%;
  top: 0;
}

/* Routes */
.map-road {
  position: absolute;
  height: 4px;
  background: linear-gradient(90deg, #94a3b8, #cbd5e1);
  border-radius: 2px;
  transform: translateY(-50%);
  animation: roadPulse 3s ease-in-out infinite;
}

.map-road.vertical {
  width: 4px;
  height: auto;
  background: linear-gradient(180deg, #94a3b8, #cbd5e1);
  transform: translateX(-50%);
}

@keyframes roadPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Bâtiments */
.map-building {
  position: absolute;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 6px;
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: translate(-50%, -50%);
  animation: buildingFloat 4s ease-in-out infinite;
}

.map-building.large {
  width: 60px;
  height: 60px;
}

@keyframes buildingFloat {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.02); }
}

/* Marqueur */
.map-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: pointer;
}

.map-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: rgba(37,99,235,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

.map-pin {
  position: relative;
  font-size: 3rem;
  filter: drop-shadow(0 4px 10px rgba(37,99,235,0.5));
  animation: bounce 2s ease-in-out infinite;
  z-index: 2;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.map-label {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  white-space: nowrap;
  margin-bottom: 15px;
  border: 2px solid #2563eb;
  animation: labelAppear 0.3s ease-out;
}

.map-label::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: #2563eb transparent transparent transparent;
}

@keyframes labelAppear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.map-label-name {
  font-weight: 700;
  color: #0f172a;
  font-size: 1rem;
}

.map-label-addr {
  color: #475569;
  font-size: 0.85rem;
  margin: 4px 0;
}

.map-label-open {
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.map-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: glow 4s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* Responsive */
@media (max-width: 768px) {
  .map-container {
    height: 350px;
  }
  
  .map-label {
    white-space: normal;
    width: 200px;
    text-align: center;
  }
  
  .map-building {
    width: 30px;
    height: 30px;
  }
  
  .map-building.large {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .map-container {
    height: 300px;
  }
}
      `}</style>

      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="loc-hero">
        {/* Image de fond unique */}
        <div className="hero-bg" />

        {/* Overlay transparent */}
        <div className="hero-overlay" />

        {/* Grille subtile (optionnel) */}
        <div className="hero-grid" />

        {/* Fade bottom */}
        <div className="hero-fade" />

        {/* Contenu centré */}
        <div className="wrap">
          <div className="hero-body">
            <div className="hero-tag">
              <span className="hero-dot" />
             Contactez-nous
            </div>
            <h1 className="hero-h1">
            On reste <span>en contact</span>
            </h1>
            <p className="hero-p">
              Une question, un projet ? Notre équipe est là pour vous répondre et vous accompagner dans toutes vos démarches.
            </p>
              
          </div>
        </div>
      </div>


      <div className="contact-body">

        {/* ── Info cards (floating over hero) ── */}
        <div className="info-grid">
          {contactInfo.map((info, i) => (
            <a key={i} href={info.link} target="_blank" rel="noopener noreferrer" className="info-card">
              <div className="info-icon-wrap" style={{ background: info.color }}>
                <span style={{ fontSize: '1.4rem' }}>{info.icon}</span>
              </div>
              <div className="info-card-title">{info.title}</div>
              <div className="info-card-content" style={{ color: info.accent }}>{info.content}</div>
            </a>
          ))}
        </div>

        {/* ── Form + Sidebar ── */}
        <div className="main-grid">

          {/* Form */}
          <div className="form-card">
            <div style={{ marginBottom: '28px' }}>
              <div className="section-label">✉️ Message</div>
              <h2 className="section-title">Parlons de votre projet</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nom complet <span className="req">*</span></label>
                  <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Jean Dupont" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span className="req">*</span></label>
                  <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jean@email.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" />
                </div>
                <div className="form-group">
                  <label className="form-label">Sujet <span className="req">*</span></label>
                  <input className="form-input" type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Achat, vente, financement…" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message <span className="req">*</span></label>
                <textarea className="form-textarea" name="message" value={formData.message} onChange={handleChange} required placeholder="Bonjour, je souhaiterais…" />
              </div>
              <button type="submit" className="submit-btn">
                ✈️ Envoyer le message
              </button>
              {formStatus.submitted && (
                <div className="form-success">{formStatus.message}</div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Hours */}
            <div className="hours-card">
              <div className="hours-title">⏰ Horaires d'ouverture</div>
              {hours.map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className={`hours-time${h.open ? '' : ' closed'}`}>{h.time}</span>
                </div>
              ))}
              <div className="hours-cta">
                Urgence ? Appelez-nous 24/7<br />
                <strong>01 23 45 67 89</strong>
              </div>
            </div>

            {/* Quick reply */}
            <div className="quick-card">
              <div className="quick-title">⚡ Réponse rapide</div>
              <p className="quick-text">
                Notre équipe s'engage à répondre sous <strong>24h ouvrées</strong>. Pour une réponse immédiate, appelez-nous directement.
              </p>
            </div>

            {/* Trust */}
            <div className="quick-card" style={{ background: '#f0f9ff', border: '1px solid #bfdbfe' }}>
              {['🔒 100% confidentiel', '⭐ 4.9/5 satisfaction', '🚗 +5 000 véhicules', '🤝 Sans engagement'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: '1px solid rgba(37,99,235,0.08)', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Map ── */}
       {/* ── Map ── */}
<div className="map-section">
  <div style={{ marginBottom: '30px' }}>
    <div className="section-label">🗺️ Nous trouver</div>
    <h2 className="section-title">Notre showroom à Paris</h2>
    <p style={{ color: '#64748b', marginTop: '10px' }}>
      Venez nous rencontrer en plein cœur des Champs-Élysées
    </p>
  </div>

  {/* Conteneur de la carte - Prêt à intégrer Google Maps / Leaflet / etc. */}
  <div className="map-container" id="map">
    {/* 
      Ici vous pourrez intégrer votre vraie carte :
      
      Exemple avec Google Maps :
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.29229261567436!3d48.85837007928748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647891234567!5m2!1sfr!2sfr" 
        width="100%" 
        height="100%" 
        style={{ border: 0, borderRadius: '16px' }} 
        allowFullScreen 
        loading="lazy"
        title="Localisation AutoMarket"
      />
      
      Ou avec Leaflet, Mapbox, etc.
    */}

    {/* Placeholder élégant en attendant la vraie carte */}
    <div className="map-placeholder">
      {/* Grille de rue */}
      <div className="map-grid">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="map-grid-line horizontal" style={{ top: `${20 + i * 15}%` }} />
        ))}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="map-grid-line vertical" style={{ left: `${20 + i * 15}%` }} />
        ))}
      </div>

      {/* Routes principales */}
      <div className="map-road" style={{ top: '30%', width: '70%', left: '15%' }} />
      <div className="map-road" style={{ top: '60%', width: '60%', left: '20%' }} />
      <div className="map-road vertical" style={{ left: '40%', height: '70%', top: '15%' }} />
      <div className="map-road vertical" style={{ left: '70%', height: '50%', top: '25%' }} />

      {/* Bâtiments */}
      <div className="map-building" style={{ left: '25%', top: '35%' }} />
      <div className="map-building" style={{ left: '55%', top: '45%' }} />
      <div className="map-building large" style={{ left: '65%', top: '25%' }} />

      {/* Marqueur de position */}
      <div className="map-marker">
        <div className="map-pulse" />
        <div className="map-pin">📍</div>
        <div className="map-label">
          <div className="map-label-name">AutoMarket Paris</div>
          <div className="map-label-addr">123 Avenue des Champs-Élysées</div>
          <div className="map-label-open">● Ouvert aujourd'hui 9h – 19h</div>
        </div>
      </div>

      {/* Effet de glow sur la zone */}
      <div className="map-glow" />
    </div>
  </div>

  {/* Informations complémentaires */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '20px',
    marginTop: '25px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: '#eff6ff', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        fontSize: '1.2rem'
      }}>
        🚇
      </div>
      <div>
        <div style={{ fontWeight: '600', color: '#0f172a' }}>Métro</div>
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Franklin D. Roosevelt (lignes 1, 9)</div>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: '#eff6ff', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        fontSize: '1.2rem'
      }}>
        🅿️
      </div>
      <div>
        <div style={{ fontWeight: '600', color: '#0f172a' }}>Parking</div>
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Parking Champs-Élysées à 50m</div>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: '#eff6ff', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563eb',
        fontSize: '1.2rem'
      }}>
        ♿
      </div>
      <div>
        <div style={{ fontWeight: '600', color: '#0f172a' }}>Accessibilité</div>
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Accès PMR par l'entrée principale</div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Contact;




// pages/Compare.js
import React, { useState } from 'react';

const Compare = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      brand: 'BMW',
      model: 'Série 3',
      price: 45000,
      power: '184 ch',
      fuel: 'Diesel',
      consumption: '5.2 L/100km',
      acceleration: '7.1s',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200'
    },
    {
      id: 2,
      brand: 'Mercedes',
      model: 'Classe C',
      price: 48000,
      power: '197 ch',
      fuel: 'Hybride',
      consumption: '4.8 L/100km',
      acceleration: '6.9s',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200'
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4',
      price: 42000,
      power: '190 ch',
      fuel: 'Essence',
      consumption: '6.1 L/100km',
      acceleration: '7.3s',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200'
    }
  ]);

  const specifications = [
    { key: 'price', label: 'Prix', format: '€' },
    { key: 'power', label: 'Puissance', format: '' },
    { key: 'fuel', label: 'Carburant', format: '' },
    { key: 'consumption', label: 'Consommation', format: '' },
    { key: 'acceleration', label: '0-100 km/h', format: '' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
        Comparateur de voitures
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Comparez les modèles côte à côte pour faire le meilleur choix
      </p>

      {/* Tableau de comparaison */}
      <div style={{
        overflowX: 'auto',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '20px', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                Caractéristiques
              </th>
              {cars.map(car => (
                <th key={car.id} style={{ padding: '20px', textAlign: 'center', borderBottom: '2px solid #eee' }}>
                  <img
                    src={car.image}
                    alt={car.model}
                    style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }}
                  />
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{car.brand}</div>
                  <div style={{ color: '#666' }}>{car.model}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specifications.map(spec => (
              <tr key={spec.key}>
                <td style={{ padding: '15px 20px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                  {spec.label}
                </td>
                {cars.map(car => (
                  <td key={car.id} style={{ padding: '15px 20px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
                    {car[spec.key]} {spec.format}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ padding: '20px', borderBottom: 'none' }}></td>
              {cars.map(car => (
                <td key={car.id} style={{ padding: '20px', textAlign: 'center', borderBottom: 'none' }}>
                  <button style={{
                    padding: '10px 30px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    Commander
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ajouter une voiture à comparer */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <select style={{
          padding: '10px 20px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          marginRight: '10px',
          width: '300px'
        }}>
          <option value="">Ajouter un modèle à comparer...</option>
          <option value="BMW">BMW Série 5</option>
          <option value="Mercedes">Mercedes Classe E</option>
          <option value="Audi">Audi A6</option>
        </select>
        <button style={{
          padding: '10px 30px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default Compare;




// pages/Cars.js
import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '', minPrice: '', maxPrice: '',
    fuel: '', transmission: '', year: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setCars([
        { id: 1, brand: 'BMW', model: 'Série 3', year: 2022, price: 45000, mileage: 15000, fuel: 'Diesel', transmission: 'Auto', isNew: false, location: 'Paris', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500' },
        { id: 2, brand: 'Mercedes', model: 'Classe C', year: 2023, price: 55000, mileage: 5000, fuel: 'Hybride', transmission: 'Auto', isNew: true, location: 'Lyon', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500' },
        { id: 3, brand: 'Audi', model: 'A4', year: 2021, price: 38000, mileage: 30000, fuel: 'Essence', transmission: 'Auto', isNew: false, location: 'Marseille', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500' },
        { id: 4, brand: 'Toyota', model: 'Corolla', year: 2022, price: 25000, mileage: 20000, fuel: 'Essence', transmission: 'Manuelle', isNew: false, location: 'Bordeaux', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=500' },
        { id: 5, brand: 'Peugeot', model: '508', year: 2022, price: 32000, mileage: 18000, fuel: 'Diesel', transmission: 'Auto', isNew: false, location: 'Nantes', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500' },
        { id: 6, brand: 'Renault', model: 'Mégane', year: 2023, price: 22000, mileage: 8000, fuel: 'Essence', transmission: 'Manuelle', isNew: true, location: 'Toulouse', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500' },
      ]);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const resetFilters = () => setFilters({ brand: '', minPrice: '', maxPrice: '', fuel: '', transmission: '', year: '' });

  const filteredCars = cars.filter(car => {
    if (filters.brand && !car.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.minPrice && car.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && car.price > parseInt(filters.maxPrice)) return false;
    if (filters.fuel && car.fuel !== filters.fuel) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.year && car.year !== parseInt(filters.year)) return false;
    return true;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

        .cars-page { background: #f8fafc; min-height: 100vh; }

        /* ── Filter bar ── */
        .filter-bar {
          background: white;
          border-bottom: 1px solid #f1f5f9;
          padding: 20px 32px;
          position: sticky;
          top: 68px;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(37,99,235,0.06);
        }
        .filter-bar-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
          margin-right: 4px;
        }
        .filter-input {
          padding: 9px 13px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          background: #f8fafc;
          outline: none;
          transition: all 0.2s;
          min-width: 130px;
        }
        .filter-input:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .filter-input::placeholder { color: #94a3b8; }

        .filter-select {
          padding: 9px 30px 9px 13px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          background: #f8fafc;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: all 0.2s;
          min-width: 130px;
        }
        .filter-select:focus {
          border-color: #2563eb;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }

        .btn-reset {
          padding: 9px 18px;
          background: #f1f5f9;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-reset:hover { background: #e2e8f0; color: #0f172a; }

        /* ── Results bar ── */
        .results-bar {
          max-width: 1400px;
          margin: 28px auto 20px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .results-count {
          display: flex; align-items: center; gap: 10px;
        }
        .results-badge {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.3px;
        }
        .results-label {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* ── Grid full width ── */
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 0;
        }

        /* ── Loading spinner ── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          gap: 16px;
        }
        .spinner {
          width: 44px; height: 44px;
          border: 3px solid #e2e8f0;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .spinner-text {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* ── Empty state ── */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #94a3b8;
        }
        .empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .empty-title { font-size: 1.2rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .empty-sub { font-size: 0.9rem; }

        /* ── CarCard full width override ── */
        .cars-grid > * {
          border-radius: 0 !important;
          box-shadow: none !important;
          border-right: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }
        .cars-grid > *:hover {
          box-shadow: inset 0 0 0 2px #2563eb !important;
          z-index: 2;
          position: relative;
        }

        @media (max-width: 768px) {
          .filter-bar { padding: 14px 16px; top: 60px; }
          .cars-grid { grid-template-columns: 1fr; }
          .results-bar { padding: 0 16px; }
        }
      `}</style>

      <div className="cars-page">

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Sticky Filter Bar ── */}
        <div className="filter-bar">
          <div className="filter-bar-inner">
            <span className="filter-label">🔍 Filtres</span>

            <input
              className="filter-input"
              type="text"
              name="brand"
              placeholder="Marque"
              value={filters.brand}
              onChange={handleFilterChange}
            />
            <input
              className="filter-input"
              type="number"
              name="minPrice"
              placeholder="Prix min €"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              className="filter-input"
              type="number"
              name="maxPrice"
              placeholder="Prix max €"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
            <select className="filter-select" name="fuel" value={filters.fuel} onChange={handleFilterChange}>
              <option value="">Carburant</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
            </select>
            <select className="filter-select" name="transmission" value={filters.transmission} onChange={handleFilterChange}>
              <option value="">Boîte</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Auto">Automatique</option>
            </select>
            <input
              className="filter-input"
              type="number"
              name="year"
              placeholder="Année"
              value={filters.year}
              onChange={handleFilterChange}
              style={{ maxWidth: '100px' }}
            />
            <button className="btn-reset" onClick={resetFilters}>
              ✕ Réinitialiser
            </button>
          </div>
        </div>

        {/* ── Results count ── */}
        {!loading && (
          <div className="results-bar">
            <div className="results-count">
              <span className="results-badge">{filteredCars.length}</span>
              <span className="results-label">
                {filteredCars.length <= 1 ? 'véhicule trouvé' : 'véhicules trouvés'}
              </span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500 }}>
              Mis à jour aujourd'hui
            </span>
          </div>
        )}

        {/* ── Cars Grid or States ── */}
        {loading ? (
          <div className="spinner-wrap">
            <div className="spinner" />
            <span className="spinner-text">Chargement des véhicules…</span>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Aucun véhicule trouvé</div>
            <div className="empty-sub">Essayez de modifier vos filtres</div>
          </div>
        ) : (
          <div className="cars-grid">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default Cars;



// pages/CarDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const handleOrderSubmit = (e) => { e.preventDefault(); setOrderDone(true); setTimeout(closeModal, 5000); };

  // ── Trial form ──
  const [trialDone, setTrialDone] = useState(false);
  const [trialData, setTrialData] = useState({ name:'', email:'', phone:'', date:'', time:'', message:'' });
  const handleTrialChange = (e) => setTrialData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleTrialSubmit = (e) => { e.preventDefault(); setTrialDone(true); setTimeout(closeModal, 5000); };

  // ── Contact form ──
  const [contactDone, setContactDone] = useState(false);
  const [contactData, setContactData] = useState({ name:'', email:'', phone:'', subject:'question', message:'' });
  const handleContactChange = (e) => setContactData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleContactSubmit = (e) => { e.preventDefault(); setContactDone(true); setTimeout(closeModal, 5000); };

  useEffect(() => {
    setTimeout(() => {
      const carData = {
        1: {
          id:1, brand:'BMW', model:'Série 3', year:2022, price:45000,
          mileage:15000, fuel:'Diesel', transmission:'Automatique',
          color:'Noir Saphir', doors:4, power:'190 ch', isNew:false,
          description:'BMW Série 3 en parfait état, entretien régulier chez concessionnaire agréé. Véhicule non fumeur, première main. Toit ouvrant panoramique, sièges chauffants cuir, régulateur adaptatif, caméra de recul 360°, GPS dernière génération, Apple CarPlay & Android Auto.',
          features:['GPS','Toit ouvrant','Sièges chauffants','Caméra 360°','Régulateur adaptatif','Apple CarPlay','Android Auto','Jantes 18"','LED Matrix','Keyless'],
          images:[
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
          ]
        },
        2: {
          id:2, brand:'Mercedes', model:'Classe C', year:2023, price:55000,
          mileage:5000, fuel:'Hybride', transmission:'Automatique',
          color:'Blanc Polaire', doors:4, power:'204 ch', isNew:true,
          description:'Mercedes Classe C hybride rechargeable neuve, première main. Finition AMG Line, écran MBUX 11.9", Pack Premium, toit ouvrant panoramique, sièges Nappa chauffants et ventilés, caméra 360°, aide au stationnement actif.',
          features:['MBUX 11.9"','Hybride rechargeable','Sièges Nappa','Toit panoramique','Caméra 360°','Pack AMG Line','Apple CarPlay','Keyless Go','LED Haute Résolution','Régulateur actif'],
          images:[
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
          ]
        },
        3: {
          id:3, brand:'Audi', model:'A4', year:2021, price:38000,
          mileage:30000, fuel:'Essence', transmission:'Automatique',
          color:'Gris Daytona', doors:4, power:'150 ch', isNew:false,
          description:'Audi A4 TFSI essence, entretien Audi exclusivement. Très bon état général, carrosserie impeccable. Pack Virtual Cockpit, MMI Navigation Plus, sièges sport, phares LED Matrix, régulateur adaptatif.',
          features:['Virtual Cockpit','MMI Navigation','LED Matrix','Sièges sport','Régulateur adaptatif','Bang & Olufsen','Quattro','Apple CarPlay','Aide au stationnement','Pack Sport S-Line'],
          images:[
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800',
          ]
        },
        4: {
          id:4, brand:'Toyota', model:'Corolla', year:2022, price:25000,
          mileage:20000, fuel:'Essence', transmission:'Manuelle',
          color:'Rouge Vermillon', doors:4, power:'125 ch', isNew:false,
          description:'Toyota Corolla essence manuelle en très bon état. Révisions effectuées chez concessionnaire Toyota. Fiable et économique, idéale pour usage quotidien. GPS, caméra de recul, aide au stationnement.',
          features:['GPS','Caméra de recul','Aide stationnement','Bluetooth','Climatisation auto','Régulateur vitesse','Start/Stop','Banquette rabattable','USB / Carplay','Jantes alliage'],
          images:[
            'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
          ]
        },
        5: {
          id:5, brand:'Peugeot', model:'508', year:2022, price:32000,
          mileage:18000, fuel:'Diesel', transmission:'Automatique',
          color:'Bleu Céleste', doors:4, power:'130 ch', isNew:false,
          description:'Peugeot 508 BlueHDi diesel automatique, entretien Peugeot. Finition Allure Pack, i-Cockpit Peugeot 10", toit panoramique, sièges massants électriques, pack Peugeot Connect avec GPS, assistance conduite niveau 2.',
          features:['i-Cockpit 10"','Toit panoramique','Sièges massants','GPS Connect','Night Vision','Conduite autonome niv.2','Jantes 19"','LED Full','Head-Up Display','Keyless'],
          images:[
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
          ]
        },
        6: {
          id:6, brand:'Renault', model:'Mégane', year:2023, price:22000,
          mileage:8000, fuel:'Essence', transmission:'Manuelle',
          color:'Orange Valencia', doors:5, power:'140 ch', isNew:true,
          description:'Renault Mégane TCe 140 essence, quasi neuve. Finition Techno, système OpenR Link Google intégré, écran portrait 12", sièges chauffants, caméra de recul, pack hiver. Garantie constructeur active.',
          features:['OpenR Link Google','Écran 12" portrait','Sièges chauffants','Caméra de recul','Pack Hiver','Régulateur adaptatif','Easy Park Assist','USB-C','Bluetooth 5.0','Garantie constructeur'],
          images:[
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
            'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
          ]
        },
      };
      const selected = carData[id] || null;
      setCar(selected);
      setMainImage(selected?.images[0] || '');
      setLoading(false);
    }, 600);
  }, [id]);

  const formatPrice = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' €';
  const fuelIcon = { Essence:'⛽', Diesel:'🛢️', Hybride:'🔋', Électrique:'⚡' };

  if (loading) return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', gap:'16px', fontFamily:'Outfit,sans-serif' }}>
        <div style={{ width:'44px', height:'44px', border:'3px solid #e2e8f0', borderTopColor:'#2563eb', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        <span style={{ color:'#94a3b8', fontSize:'0.875rem', fontWeight:500 }}>Chargement du véhicule…</span>
      </div>
    </>
  );

  if (!car) return (
    <div style={{ textAlign:'center', padding:'100px 20px', fontFamily:'Outfit,sans-serif' }}>
      <div style={{ fontSize:'3rem', marginBottom:'16px' }}>🔍</div>
      <h2 style={{ color:'#0f172a', fontWeight:800, marginBottom:'8px' }}>Véhicule introuvable</h2>
      <p style={{ color:'#64748b', marginBottom:'24px' }}>Ce véhicule n'existe pas ou a été supprimé.</p>
      <button onClick={() => navigate('/cars')} style={{ padding:'11px 28px', background:'linear-gradient(135deg,#2563eb,#06b6d4)', color:'white', border:'none', borderRadius:'99px', fontWeight:700, cursor:'pointer', fontSize:'0.95rem', fontFamily:'Outfit,sans-serif' }}>
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
    { icon:car.isNew?'✦':'◈',        label:'État',      value:car.isNew?'Neuf':'Occasion' },
  ];

  const SuccessCard = ({ icon, title, sub, refCode }) => (
    <div style={{ textAlign:'center', padding:'32px 20px' }}>
      <div style={{ fontSize:'4rem', marginBottom:'16px' }}>{icon}</div>
      <div style={{ fontSize:'1.3rem', fontWeight:900, color:'#0f172a', marginBottom:'8px' }}>{title}</div>
      <div style={{ fontSize:'0.875rem', color:'#64748b', lineHeight:'1.6', marginBottom:'20px' }} dangerouslySetInnerHTML={{ __html:sub }} />
      {refCode && <div style={{ display:'inline-block', background:'#eff6ff', color:'#2563eb', padding:'8px 20px', borderRadius:'99px', fontSize:'0.82rem', fontWeight:700 }}>{refCode}</div>}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { font-family:'Outfit',sans-serif; box-sizing:border-box; }
        @keyframes spin   { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        .detail-page { background:#f8fafc; min-height:100vh; padding-bottom:80px; }
        .detail-hero { position:relative; width:100%; height:480px; overflow:hidden; background:#0f172a; }
        .detail-hero-img { width:100%; height:100%; object-fit:cover; animation:fadeIn 0.4s ease; }
        .detail-hero-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(15,23,42,0.7) 0%,transparent 50%); pointer-events:none; }
        .detail-hero-badge { position:absolute; top:20px; left:20px; padding:5px 16px; border-radius:99px; font-size:0.72rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.25); }
        .detail-hero-title { position:absolute; bottom:28px; left:28px; color:white; font-size:2rem; font-weight:900; letter-spacing:-0.5px; text-shadow:0 2px 12px rgba(0,0,0,0.4); }
        .detail-hero-price { position:absolute; bottom:28px; right:28px; font-size:2rem; font-weight:900; color:white; letter-spacing:-0.5px; text-shadow:0 2px 12px rgba(0,0,0,0.4); }
        .thumbs-row { display:flex; gap:8px; padding:12px 20px; background:white; border-bottom:1px solid #f1f5f9; overflow-x:auto; }
        .thumb { width:90px; height:65px; object-fit:cover; border-radius:8px; cursor:pointer; flex-shrink:0; border:2px solid transparent; transition:all 0.2s; opacity:0.65; }
        .thumb:hover { opacity:0.9; }
        .thumb.active { border-color:#2563eb; opacity:1; box-shadow:0 0 0 3px rgba(37,99,235,0.2); }
        .back-btn { display:inline-flex; align-items:center; gap:6px; background:none; border:none; color:#2563eb; font-size:0.875rem; font-weight:600; cursor:pointer; padding:0; transition:gap 0.2s; font-family:'Outfit',sans-serif; margin:24px 0 20px; }
        .back-btn:hover { gap:10px; }
        .detail-content { max-width:1200px; margin:0 auto; padding:0 var(--page-spacing,20px); }
        .detail-grid { display:grid; grid-template-columns:1fr 380px; gap:24px; align-items:start; }
        .detail-left { display:flex; flex-direction:column; gap:20px; }
        .specs-card { background:white; border-radius:16px; padding:24px; border:1px solid #f1f5f9; box-shadow:0 2px 12px rgba(37,99,235,0.05); }
        .specs-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .spec-item { background:#f8fafc; border-radius:12px; padding:14px 10px; text-align:center; border:1px solid #f1f5f9; transition:all 0.2s; }
        .spec-item:hover { background:#eff6ff; border-color:#bfdbfe; }
        .spec-icon { font-size:1.2rem; margin-bottom:6px; }
        .spec-label { font-size:0.62rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:3px; }
        .spec-value { font-size:0.88rem; font-weight:800; color:#0f172a; }
        .tabs-bar { display:flex; background:white; border-radius:16px; padding:6px; border:1px solid #f1f5f9; box-shadow:0 2px 12px rgba(37,99,235,0.05); }
        .tab-btn { flex:1; padding:10px; border:none; border-radius:10px; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.2s; font-family:'Outfit',sans-serif; background:transparent; color:#64748b; }
        .tab-btn.active { background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; box-shadow:0 3px 10px rgba(37,99,235,0.25); }
        .tab-content { background:white; border-radius:16px; padding:26px; border:1px solid #f1f5f9; box-shadow:0 2px 12px rgba(37,99,235,0.05); animation:fadeUp 0.25s ease; }
        .tab-title { font-size:1rem; font-weight:800; color:#0f172a; margin:0 0 14px; }
        .tab-text  { color:#475569; line-height:1.8; font-size:0.92rem; margin:0; }
        .features-wrap { display:flex; flex-wrap:wrap; gap:8px; }
        .feature-tag { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; color:#2563eb; padding:6px 14px; border-radius:99px; font-size:0.8rem; font-weight:600; border:1px solid #bfdbfe; transition:all 0.2s; cursor:default; }
        .feature-tag:hover { background:#2563eb; color:white; border-color:#2563eb; }
        .detail-right { position:sticky; top:88px; display:flex; flex-direction:column; gap:16px; }
        .price-card { background:white; border-radius:20px; padding:28px; border:1px solid #f1f5f9; box-shadow:0 4px 24px rgba(37,99,235,0.08); }
        .price-label { font-size:0.72rem; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:4px; }
        .price-value { font-size:2.2rem; font-weight:900; color:#2563eb; letter-spacing:-1px; line-height:1; margin-bottom:6px; }
        .price-sub   { font-size:0.78rem; color:#94a3b8; font-weight:500; margin-bottom:24px; }
        .btn-order { width:100%; padding:14px; background:linear-gradient(135deg,#059669,#10b981); color:white; border:none; border-radius:99px; font-size:0.95rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(5,150,105,0.3); margin-bottom:10px; display:flex; align-items:center; justify-content:center; gap:8px; }
        .btn-order:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(5,150,105,0.4); }
        .btn-trial { width:100%; padding:13px; background:transparent; color:#2563eb; border:1.5px solid #2563eb; border-radius:99px; font-size:0.95rem; font-weight:600; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.25s; margin-bottom:10px; display:flex; align-items:center; justify-content:center; gap:8px; }
        .btn-trial:hover { background:#2563eb; color:white; box-shadow:0 6px 20px rgba(37,99,235,0.3); transform:translateY(-1px); }
        .seller-card { background:white; border-radius:16px; padding:20px; border:1px solid #f1f5f9; box-shadow:0 2px 12px rgba(37,99,235,0.05); }
        .seller-title { font-size:0.78rem; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:14px; }
        .seller-row { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .seller-avatar { width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg,#2563eb,#06b6d4); display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:white; flex-shrink:0; }
        .seller-badge { font-size:0.7rem; color:#059669; font-weight:600; background:#d1fae5; padding:2px 8px; border-radius:99px; }
        .btn-contact { width:100%; padding:11px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:10px; font-size:0.875rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.25s; box-shadow:0 3px 10px rgba(37,99,235,0.2); display:flex; align-items:center; justify-content:center; gap:6px; }
        .btn-contact:hover { transform:translateY(-1px); box-shadow:0 8px 20px rgba(37,99,235,0.35); }
        .trust-row { display:flex; flex-direction:column; gap:8px; }
        .trust-item { display:flex; align-items:center; gap:8px; font-size:0.8rem; font-weight:600; color:#475569; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #f1f5f9; }

        /* ── Modal ── */
        .m-overlay { position:fixed; inset:0; z-index:2000; background:rgba(15,23,42,0.65); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:16px; animation:fadeIn 0.2s ease; }
        .m-card { background:white; border-radius:24px; width:100%; max-width:540px; max-height:92vh; overflow-y:auto; box-shadow:0 40px 100px rgba(15,23,42,0.35); position:relative; animation:fadeUp 0.3s ease; }
        .m-header { border-radius:24px 24px 0 0; padding:24px 28px 20px; position:relative; overflow:hidden; }
        .m-glow   { position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:radial-gradient(circle,rgba(37,99,235,0.3),transparent 70%); pointer-events:none; }
        .m-close  { position:absolute; top:16px; right:16px; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; transition:all 0.2s; z-index:1; }
        .m-close:hover { background:rgba(255,255,255,0.2); transform:rotate(90deg); }
        .m-htitle { font-size:1.15rem; font-weight:900; color:white; margin:0 0 4px; position:relative; z-index:1; }
        .m-hsub   { font-size:0.8rem; color:rgba(255,255,255,0.55); position:relative; z-index:1; }
        .m-hpill  { display:inline-flex; align-items:center; gap:6px; background:rgba(37,99,235,0.25); border:1px solid rgba(37,99,235,0.4); color:#93c5fd; padding:4px 12px; border-radius:99px; font-size:0.73rem; font-weight:700; margin-top:10px; position:relative; z-index:1; }

        /* Steps */
        .m-steps { display:flex; padding:18px 28px 0; }
        .m-step  { display:flex; flex-direction:column; align-items:center; flex:1; }
        .m-step-row { display:flex; align-items:center; width:100%; }
        .m-circle { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.78rem; font-weight:700; flex-shrink:0; transition:all 0.3s; }
        .m-circle.done   { background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; box-shadow:0 3px 10px rgba(37,99,235,0.3); }
        .m-circle.active { background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; box-shadow:0 3px 10px rgba(37,99,235,0.3); transform:scale(1.1); }
        .m-circle.pending{ background:#f1f5f9; color:#94a3b8; border:2px solid #e2e8f0; }
        .m-conn { flex:1; height:2px; transition:background 0.4s; }
        .m-conn.done    { background:linear-gradient(90deg,#2563eb,#06b6d4); }
        .m-conn.pending { background:#e2e8f0; }
        .m-slbl { font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; margin-top:3px; }
        .m-slbl.active  { color:#2563eb; }
        .m-slbl.done    { color:#2563eb; }
        .m-slbl.pending { color:#94a3b8; }

        /* Form */
        .m-body  { padding:20px 28px 28px; }
        .m-label { display:block; font-size:0.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
        .m-req   { color:#ef4444; margin-left:2px; }
        .m-input, .m-select, .m-textarea { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; color:#0f172a; font-family:'Outfit',sans-serif; background:#f8fafc; outline:none; transition:all 0.2s; margin-bottom:14px; }
        .m-input:focus, .m-select:focus, .m-textarea:focus { border-color:#2563eb; background:#fff; box-shadow:0 0 0 3px rgba(37,99,235,0.1); }
        .m-input::placeholder, .m-textarea::placeholder { color:#94a3b8; }
        .m-textarea { resize:vertical; min-height:80px; margin-bottom:0; }
        .m-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .fin-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:14px; }
        .fin-opt { border:1.5px solid #e2e8f0; border-radius:10px; padding:12px 6px; text-align:center; cursor:pointer; transition:all 0.2s; background:#f8fafc; }
        .fin-opt.sel { border-color:#2563eb; background:#eff6ff; }
        .fin-icon  { font-size:1.3rem; display:block; margin-bottom:4px; }
        .fin-label { font-size:0.72rem; font-weight:700; color:#475569; }
        .fin-opt.sel .fin-label { color:#2563eb; }
        .subj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:14px; }
        .subj-opt  { border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 6px; text-align:center; cursor:pointer; transition:all 0.2s; background:#f8fafc; font-size:0.75rem; font-weight:700; color:#475569; }
        .subj-opt.sel { border-color:#2563eb; background:#eff6ff; color:#2563eb; }
        .m-summary { background:#f0f9ff; border:1px solid #bfdbfe; border-radius:12px; padding:16px 18px; margin-bottom:16px; }
        .m-sum-title { font-size:0.7rem; font-weight:700; color:#2563eb; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px; }
        .m-sum-row   { display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:5px; }
        .m-sum-row span:first-child { color:#64748b; }
        .m-sum-row span:last-child  { color:#0f172a; font-weight:700; }
        .m-sum-price { font-size:1.3rem; font-weight:900; color:#2563eb; margin-top:10px; padding-top:10px; border-top:1px solid #bfdbfe; }
        .m-nav { display:flex; gap:10px; margin-top:16px; }
        .m-btn  { flex:1; padding:13px; color:white; border:none; border-radius:99px; font-size:0.95rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .m-btn.blue  { background:linear-gradient(135deg,#2563eb,#06b6d4); box-shadow:0 4px 14px rgba(37,99,235,0.3); }
        .m-btn.blue:hover  { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,99,235,0.4); }
        .m-btn.green { background:linear-gradient(135deg,#059669,#10b981); box-shadow:0 4px 14px rgba(5,150,105,0.3); }
        .m-btn.green:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(5,150,105,0.4); }
        .m-btn-back  { padding:13px 20px; background:#f1f5f9; color:#64748b; border:1.5px solid #e2e8f0; border-radius:99px; font-size:0.9rem; font-weight:600; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.2s; }
        .m-btn-back:hover { background:#e2e8f0; color:#0f172a; }

        @media (max-width:900px) {
          .detail-grid { grid-template-columns:1fr; }
          .detail-right { position:static; }
          .specs-grid { grid-template-columns:repeat(2,1fr); }
          .detail-hero { height:300px; }
          .detail-hero-title { font-size:1.4rem; bottom:18px; left:18px; }
          .detail-hero-price { font-size:1.4rem; bottom:18px; right:18px; }
          .m-grid2 { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="detail-page">

        {/* Hero */}
        <div className="detail-hero">
          <img key={mainImage} src={mainImage} alt={`${car.brand} ${car.model}`} className="detail-hero-img" />
          <div className="detail-hero-overlay" />
          <span className="detail-hero-badge" style={{ background:car.isNew?'rgba(5,150,105,0.9)':'rgba(245,158,11,0.9)', color:'white' }}>
            {car.isNew?'✦ Neuf':'◈ Occasion'}
          </span>
          <div className="detail-hero-title">{car.brand} {car.model} · {car.year}</div>
          <div className="detail-hero-price">{formatPrice(car.price)}</div>
        </div>

        {/* Thumbnails */}
        <div className="thumbs-row">
          {car.images.map((img,i) => (
            <img key={i} src={img} alt={`Vue ${i+1}`}
              className={`thumb${mainImage===img?' active':''}`}
              onClick={() => setMainImage(img)} />
          ))}
        </div>

        {/* Content */}
        <div className="detail-content">
          <button className="back-btn" onClick={() => navigate(-1)}>← Retour aux voitures</button>
          <div className="detail-grid">
            {/* Left */}
            <div className="detail-left">
              <div className="specs-card">
                <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:'14px' }}>🔍 Caractéristiques</div>
                <div className="specs-grid">
                  {specs.map((s,i) => (
                    <div key={i} className="spec-item">
                      <div className="spec-icon">{s.icon}</div>
                      <span className="spec-label">{s.label}</span>
                      <span className="spec-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tabs-bar">
                {[{key:'description',label:'📝 Description'},{key:'features',label:'✅ Équipements'}].map(t => (
                  <button key={t.key} className={`tab-btn${activeTab===t.key?' active':''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
                ))}
              </div>
              <div className="tab-content">
                {activeTab==='description' && (<><div className="tab-title">Description du véhicule</div><p className="tab-text">{car.description}</p></>)}
                {activeTab==='features' && (<><div className="tab-title">Équipements & options</div><div className="features-wrap">{car.features.map((f,i) => <span key={i} className="feature-tag">✓ {f}</span>)}</div></>)}
              </div>
            </div>

            {/* Right */}
            <div className="detail-right">
              <div className="price-card">
                <div className="price-label">Prix de vente</div>
                <div className="price-value">{formatPrice(car.price)}</div>
                <div className="price-sub">TVA incluse · Financement disponible</div>
                <button className="btn-order" onClick={() => openModal('order')}>🛒 Commander maintenant</button>
                <button className="btn-trial" onClick={() => openModal('trial')}>🚗 Réserver un essai gratuit</button>
              </div>
              <div className="seller-card">
                <div className="seller-title">Votre conseiller</div>
                <div className="seller-row">
                  <div className="seller-avatar">👨</div>
                  <div>
                    <div style={{ fontWeight:700, color:'#0f172a', fontSize:'0.9rem' }}>AutoMarket Paris</div>
                    <span className="seller-badge">✓ Vendeur vérifié</span>
                  </div>
                </div>
                <button className="btn-contact" onClick={() => openModal('contact')}>📞 Contacter le vendeur</button>
              </div>
              <div className="trust-row">
                {['🛡️ Garantie 12 mois incluse','🔄 Retour sous 7 jours','💳 Financement en 24h','📋 Historique vérifié'].map(t => (
                  <div key={t} className="trust-item">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          MODAL — COMMANDER (3 steps)
      ══════════════════════════════ */}
      {modal === 'order' && (
        <div className="m-overlay" onClick={(e) => e.target===e.currentTarget && closeModal()}>
          <div className="m-card">
            <div className="m-header" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)' }}>
              <div className="m-glow" />
              <button className="m-close" onClick={closeModal}>✕</button>
              <div className="m-htitle">🛒 Commander ce véhicule</div>
              <div className="m-hsub">Réservation sécurisée — Un conseiller vous rappelle sous 2h</div>
              <div className="m-hpill">🚗 {car.brand} {car.model} {car.year} · {formatPrice(car.price)}</div>
            </div>

            {!orderDone && (
              <div className="m-steps">
                {[{num:1,lbl:'Vos infos'},{num:2,lbl:'Financement'},{num:3,lbl:'Confirmation'}].map((s,idx) => (
                  <div key={s.num} className="m-step">
                    <div className="m-step-row">
                      <div className={`m-circle ${orderStep>s.num?'done':orderStep===s.num?'active':'pending'}`}>
                        {orderStep>s.num?'✓':s.num}
                      </div>
                      {idx<2 && <div className={`m-conn ${orderStep>s.num?'done':'pending'}`} />}
                    </div>
                    <div className={`m-slbl ${orderStep>s.num?'done':orderStep===s.num?'active':'pending'}`}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="m-body">
              {orderDone ? (
                <SuccessCard icon="🎉" title="Commande envoyée !"
                  sub={`Merci <strong>${orderData.firstName}</strong> ! Un conseiller vous appellera sous 2h au <strong>${orderData.phone}</strong>.`}
                  refCode={`Réf : AM-${Math.random().toString(36).substr(2,8).toUpperCase()}`} />
              ) : orderStep===1 ? (
                <form onSubmit={(e) => { e.preventDefault(); setOrderStep(2); }}>
                  <div className="m-grid2">
                    <div><label className="m-label">Prénom <span className="m-req">*</span></label><input className="m-input" type="text" name="firstName" value={orderData.firstName} onChange={handleOrderChange} required placeholder="Jean" /></div>
                    <div><label className="m-label">Nom <span className="m-req">*</span></label><input className="m-input" type="text" name="lastName" value={orderData.lastName} onChange={handleOrderChange} required placeholder="Dupont" /></div>
                  </div>
                  <label className="m-label">Email <span className="m-req">*</span></label>
                  <input className="m-input" type="email" name="email" value={orderData.email} onChange={handleOrderChange} required placeholder="jean@email.com" />
                  <label className="m-label">Téléphone <span className="m-req">*</span></label>
                  <input className="m-input" type="tel" name="phone" value={orderData.phone} onChange={handleOrderChange} required placeholder="+33 6 00 00 00 00" />
                  <label className="m-label">Date souhaitée</label>
                  <input className="m-input" type="date" name="date" value={orderData.date} onChange={handleOrderChange} style={{ marginBottom:0 }} />
                  <div className="m-nav"><button type="submit" className="m-btn blue">Étape suivante →</button></div>
                </form>
              ) : orderStep===2 ? (
                <form onSubmit={(e) => { e.preventDefault(); setOrderStep(3); }}>
                  <label className="m-label" style={{ marginBottom:'10px', display:'block' }}>Mode de financement <span className="m-req">*</span></label>
                  <div className="fin-grid">
                    {[{key:'cash',icon:'💵',lbl:'Comptant'},{key:'credit',icon:'💳',lbl:'Crédit auto'},{key:'leasing',icon:'🔄',lbl:'Leasing LOA'}].map(o => (
                      <div key={o.key} className={`fin-opt${orderData.financing===o.key?' sel':''}`} onClick={() => setOrderData(p=>({...p,financing:o.key}))}>
                        <span className="fin-icon">{o.icon}</span><span className="fin-label">{o.lbl}</span>
                      </div>
                    ))}
                  </div>
                  <label className="m-label">Message</label>
                  <textarea className="m-textarea" name="message" value={orderData.message} onChange={handleOrderChange} placeholder="Reprise, livraison, options…" />
                  <div className="m-nav">
                    <button type="button" className="m-btn-back" onClick={() => setOrderStep(1)}>← Retour</button>
                    <button type="submit" className="m-btn blue">Étape suivante →</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOrderSubmit}>
                  <div className="m-summary">
                    <div className="m-sum-title">📋 Récapitulatif</div>
                    {[['Véhicule',`${car.brand} ${car.model} ${car.year}`],['Client',`${orderData.firstName} ${orderData.lastName}`],['Email',orderData.email],['Téléphone',orderData.phone],['Financement',{cash:'Comptant',credit:'Crédit auto',leasing:'Leasing LOA'}[orderData.financing]]].map(([k,v]) => (
                      <div key={k} className="m-sum-row"><span>{k}</span><span>{v}</span></div>
                    ))}
                    <div className="m-sum-price">{formatPrice(car.price)}</div>
                  </div>
                  <p style={{ fontSize:'0.75rem', color:'#94a3b8', lineHeight:'1.6', margin:'0 0 4px' }}>Aucun paiement à cette étape. Un conseiller vous recontacte sous 2h.</p>
                  <div className="m-nav">
                    <button type="button" className="m-btn-back" onClick={() => setOrderStep(2)}>← Retour</button>
                    <button type="submit" className="m-btn green">✅ Confirmer la commande</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          MODAL — ESSAI
      ══════════════════════════════ */}
      {modal === 'trial' && (
        <div className="m-overlay" onClick={(e) => e.target===e.currentTarget && closeModal()}>
          <div className="m-card">
            <div className="m-header" style={{ background:'linear-gradient(135deg,#1e3a5f,#2563eb)' }}>
              <div className="m-glow" />
              <button className="m-close" onClick={closeModal}>✕</button>
              <div className="m-htitle">🚗 Réserver un essai gratuit</div>
              <div className="m-hsub">Sans engagement · Confirmation SMS sous 1h</div>
              <div className="m-hpill">📅 {car.brand} {car.model} {car.year}</div>
            </div>
            <div className="m-body">
              {trialDone ? (
                <SuccessCard icon="🚗" title="Essai réservé !"
                  sub={`Merci <strong>${trialData.name}</strong> ! Vous recevrez une confirmation au <strong>${trialData.phone}</strong> sous 1h.`}
                  refCode={`Réf : ESS-${Math.random().toString(36).substr(2,8).toUpperCase()}`} />
              ) : (
                <form onSubmit={handleTrialSubmit}>
                  <label className="m-label">Nom complet <span className="m-req">*</span></label>
                  <input className="m-input" type="text" name="name" value={trialData.name} onChange={handleTrialChange} required placeholder="Jean Dupont" />
                  <div className="m-grid2">
                    <div><label className="m-label">Email <span className="m-req">*</span></label><input className="m-input" type="email" name="email" value={trialData.email} onChange={handleTrialChange} required placeholder="jean@email.com" /></div>
                    <div><label className="m-label">Téléphone <span className="m-req">*</span></label><input className="m-input" type="tel" name="phone" value={trialData.phone} onChange={handleTrialChange} required placeholder="+33 6 00 00 00 00" /></div>
                  </div>
                  <div className="m-grid2">
                    <div><label className="m-label">Date <span className="m-req">*</span></label><input className="m-input" type="date" name="date" value={trialData.date} onChange={handleTrialChange} required /></div>
                    <div>
                      <label className="m-label">Créneau</label>
                      <select className="m-select" name="time" value={trialData.time} onChange={handleTrialChange} style={{ marginBottom:0 }}>
                        <option value="">Choisir</option>
                        <option>9h – 10h</option><option>10h – 11h</option><option>11h – 12h</option>
                        <option>14h – 15h</option><option>15h – 16h</option><option>16h – 17h</option>
                      </select>
                    </div>
                  </div>
                  <label className="m-label" style={{ marginTop:'4px' }}>Message</label>
                  <textarea className="m-textarea" name="message" value={trialData.message} onChange={handleTrialChange} placeholder="Questions, remarques particulières…" />
                  <div className="m-nav" style={{ marginTop:'16px' }}>
                    <button type="submit" className="m-btn blue">🚗 Confirmer l'essai</button>
                  </div>
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
        <div className="m-overlay" onClick={(e) => e.target===e.currentTarget && closeModal()}>
          <div className="m-card">
            <div className="m-header" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)' }}>
              <div className="m-glow" />
              <button className="m-close" onClick={closeModal}>✕</button>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px', position:'relative', zIndex:1 }}>
                <div style={{ width:'46px', height:'46px', borderRadius:'50%', background:'linear-gradient(135deg,#2563eb,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', boxShadow:'0 4px 14px rgba(37,99,235,0.4)', flexShrink:0 }}>👨</div>
                <div>
                  <div className="m-htitle" style={{ marginBottom:'3px' }}>AutoMarket Paris</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                    <span style={{ width:'6px', height:'6px', background:'#34d399', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 6px #34d399' }} />
                    <span style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.55)', fontWeight:600 }}>En ligne · Répond en &lt; 1h</span>
                  </div>
                </div>
              </div>
              <div className="m-hpill" style={{ marginTop:0 }}>🚗 {car.brand} {car.model} {car.year} · {formatPrice(car.price)}</div>
            </div>
            <div className="m-body">
              {contactDone ? (
                <SuccessCard icon="✉️" title="Message envoyé !"
                  sub={`Merci <strong>${contactData.name}</strong> ! Le vendeur vous répondra sous 1h à <strong>${contactData.email}</strong>.`} />
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <label className="m-label">Votre nom <span className="m-req">*</span></label>
                  <input className="m-input" type="text" name="name" value={contactData.name} onChange={handleContactChange} required placeholder="Jean Dupont" />
                  <div className="m-grid2">
                    <div><label className="m-label">Email <span className="m-req">*</span></label><input className="m-input" type="email" name="email" value={contactData.email} onChange={handleContactChange} required placeholder="jean@email.com" /></div>
                    <div><label className="m-label">Téléphone</label><input className="m-input" type="tel" name="phone" value={contactData.phone} onChange={handleContactChange} placeholder="+33 6 00 00 00 00" style={{ marginBottom:0 }} /></div>
                  </div>
                  <label className="m-label" style={{ marginTop:'4px' }}>Sujet</label>
                  <div className="subj-grid">
                    {[{key:'question',lbl:'❓ Question'},{key:'price',lbl:'💰 Négociation'},{key:'visit',lbl:'📍 Visite'}].map(s => (
                      <div key={s.key} className={`subj-opt${contactData.subject===s.key?' sel':''}`} onClick={() => setContactData(p=>({...p,subject:s.key}))}>{s.lbl}</div>
                    ))}
                  </div>
                  <label className="m-label">Message <span className="m-req">*</span></label>
                  <textarea className="m-textarea" name="message" value={contactData.message} onChange={handleContactChange} required placeholder="Bonjour, je suis intéressé par ce véhicule…" />
                  <div className="m-nav" style={{ marginTop:'16px' }}>
                    <button type="submit" className="m-btn blue">📨 Envoyer le message</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetail;




// pages/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'authentification ici
    if (isLogin) {
      alert('Connexion réussie !');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      alert('Inscription réussie !');
    }
    navigate('/');
  };

  return (
    <div className="font-['Outfit'] min-h-screen bg-gray-50">
      
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
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-hero-zoom { animation: heroZoom 20s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
        .animate-slideIn { animation: slideIn 0.5s ease-out; }
      `}</style>

      {/* Hero avec image de fond */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Image de fond unique avec zoom */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />
        
        {/* Overlay harmonisé */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-blue-600/30 to-slate-900/40 backdrop-brightness-105" />

        {/* Contenu principal */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
          
          {/* Badge */}
          <div className="text-center mb-8 animate-fadeUp">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-blink shadow-[0_0_10px_#34d399]" />
              <span>🔐 Espace membre</span>
            </div>
          </div>

          {/* Carte principale */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fadeUp">
              
              {/* Header avec onglets */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-5 text-center font-bold text-sm tracking-wide transition-all ${
                    isLogin 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔑 Connexion
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-5 text-center font-bold text-sm tracking-wide transition-all ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📝 Inscription
                </button>
              </div>

              {/* Formulaire */}
              <div className="p-8 animate-slideIn">
                <form onSubmit={handleSubmit}>
                  
                  {/* Nom (uniquement pour inscription) */}
                  {!isLogin && (
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        Nom complet <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin}
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      Email <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean@email.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>

                  {/* Téléphone (uniquement pour inscription) */}
                  {!isLogin && (
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 6 00 00 00 00"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  )}

                  {/* Mot de passe */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      Mot de passe <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>

                  {/* Confirmation mot de passe (uniquement pour inscription) */}
                  {!isLogin && (
                    <div className="mb-5">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        Confirmer le mot de passe <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLogin}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  )}

                  {/* Options supplémentaires */}
                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    {isLogin && (
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20"
                  >
                    {isLogin ? '🔑 Se connecter' : '📝 S\'inscrire'}
                  </button>

                  {/* Séparateur */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="px-3 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  {/* Boutons sociaux */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all"
                    >
                      <span className="text-lg">G</span>
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all"
                    >
                      <span className="text-lg">f</span>
                      Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Message de bas de page */}
            <p className="text-center mt-6 text-sm text-white/80">
              En vous inscrivant, vous acceptez nos{' '}
              <a href="/terms" className="text-white font-semibold hover:underline">conditions d'utilisation</a>
              {' '}et notre{' '}
              <a href="/privacy" className="text-white font-semibold hover:underline">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;



import React, { useEffect, useRef, useState } from 'react';

/* ─── Data ───────────────────────────────────────────── */
const STATS = [
  { value: '10+', label: "Années d'expérience", icon: '⏳' },
  { value: '5000+', label: 'Voitures vendues', icon: '🚗' },
  { value: '98%', label: 'Clients satisfaits', icon: '⭐' },
  { value: '24/7', label: 'Support client', icon: '🛠️' },
];

const VALUES = [
  { icon: '🛡️', title: 'Transparence', description: 'Des informations claires et détaillées sur chaque véhicule.' },
  { icon: '❤️', title: 'Passion', description: "Une équipe passionnée par l'automobile à votre service." },
  { icon: '🤝', title: 'Confiance', description: 'Des relations durables basées sur la confiance mutuelle.' },
  { icon: '✨', title: 'Qualité', description: 'Des véhicules sélectionnés avec le plus grand soin.' },
];

const TEAM = [
  { name: 'Jean Dupont', role: 'Fondateur & CEO', emoji: '👨‍💼', desc: "20 ans d'expérience dans l'automobile" },
  { name: 'Marie Martin', role: 'Directrice Commerciale', emoji: '👩‍💼', desc: 'Experte en stratégie de vente' },
  { name: 'Pierre Durant', role: 'Chef Mécanicien', emoji: '👨‍🔧', desc: 'Passionné de mécanique depuis 25 ans' },
  { name: 'Sophie Bernard', role: 'Conseillère Client', emoji: '👩‍💻', desc: "À l'écoute de vos besoins" },
];

const MILESTONES = [
  { year: '2014', title: 'Création', description: "Fondation d'AutoMarket à Paris", icon: '🚀' },
  { year: '2016', title: 'Expansion', description: 'Ouverture du premier showroom', icon: '🏢' },
  { year: '2018', title: '5 000 ventes', description: 'Cap des 5 000 véhicules vendus', icon: '🎉' },
  { year: '2020', title: 'Digital', description: 'Lancement de la plateforme en ligne', icon: '💻' },
  { year: '2022', title: 'Innovation', description: 'Introduction des visites virtuelles', icon: '📱' },
  { year: '2024', title: 'Référence', description: 'Leader sur le marché français', icon: '🏆' },
];

const ACHIEVEMENTS = [
  { number: '15', label: 'Prix reçus', icon: '🏆' },
  { number: '50+', label: 'Employés', icon: '👥' },
  { number: '3', label: 'Showrooms', icon: '🏢' },
  { number: '1500+', label: 'Avis 5★', icon: '⭐' },
];

const PARTNERSHIPS = [
  { name: 'BMW', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=300&q=80', type: 'Partenaire Premium' },
  { name: 'Mercedes', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=300&q=80', type: 'Partenaire Officiel' },
  { name: 'Audi', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=300&q=80', type: 'Partenaire Premium' },
  { name: 'Porsche', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80', type: 'Partenaire Certifié' },
];

/* ─── Component ──────────────────────────────────────── */
const About = () => {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting)
          setVisible(p => new Set([...p, e.target.dataset.sid]));
      }),
      { threshold: 0.08 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const r = i => el => { refs.current[i] = el; };
  const vis = i => visible.has(String(i)) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7';

  return (
    <div className="font-['Outfit'] bg-gray-50 text-slate-900 overflow-x-hidden">
      
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
        @keyframes dotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes zoomLeft {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes zoomRight {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-dot { animation: dotPulse 1.6s infinite; }
        .animate-zoom-left { animation: zoomLeft 20s ease-in-out infinite alternate; }
        .animate-zoom-right { animation: zoomRight 20s ease-in-out infinite alternate; }
        .group:hover .origin-left { animation-play-state: paused; }
        .group:hover .origin-right { animation-play-state: paused; }
      `}</style>

      {/* ════════ HERO UNE SEULE IMAGE CLAIRE ════════ */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
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
        <div className="relative z-[3] w-full max-w-4xl mx-auto px-5 text-center animate-[fadeUp_0.9s_ease-out]">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-blink shadow-[0_0_10px_#34d399]" />
            Qui sommes-nous ?
          </div>
          
          <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4rem)] drop-shadow-lg">
            À propos de <br />1000 <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Voitures</span>
          </h1>
          
          <p className="text-white/95 text-lg max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            Votre partenaire de confiance pour l'achat et la vente de véhicules depuis plus de 10 ans.
          </p>
          
        </div>
      </div>

      {/* ════════ CONTENU ════════ */}
      <div className="max-w-7xl mx-auto px-[5px]">

        {/* STATS */}
        <div className="relative z-10 -mt-10 mb-16" ref={r(0)} data-sid="0">
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 transition-all duration-700 ${vis(0)}`}>
            {STATS.map((s, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-blue-200 transition-all"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-3xl font-black tracking-tight leading-none mb-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-gray-500 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HISTOIRE */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center my-20 transition-all duration-700 ${vis(1)}`}
          ref={r(1)} data-sid="1"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-1.5 transition-transform group">
            <img 
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90" 
              alt="Notre showroom" 
              className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10" />
            <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-blue-600 shadow-md">✦ Depuis 2014</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-dot shadow-[0_0_5px_#22c55e]" />
              📖 Notre histoire
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Une passion qui dure <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">depuis 10 ans</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">Fondée en 2014, AutoMarket est née de la passion pour l'automobile et du désir de rendre l'achat de véhicules plus transparent et accessible à tous.</p>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">Ce qui a commencé comme une petite équipe de passionnés est devenu une référence nationale, avec plus de 5 000 véhicules vendus et des milliers de clients fidèles.</p>
            <div className="flex gap-6 mt-6 pt-5 border-t border-gray-200 flex-wrap">
              <div><div className="text-2xl font-black text-blue-600">5 000+</div><div className="text-gray-500 text-sm">Véhicules vendus</div></div>
              <div><div className="text-2xl font-black text-blue-600">98%</div><div className="text-gray-500 text-sm">Clients satisfaits</div></div>
              <div><div className="text-2xl font-black text-blue-600">10 ans</div><div className="text-gray-500 text-sm">D'expérience</div></div>
            </div>
          </div>
        </div>

      </div>

      {/* ════════ TIMELINE ════════ */}
      <div className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-[5px]">
          <div 
            className={`text-center mb-10 transition-all duration-700 ${vis(2)}`}
            ref={r(2)} data-sid="2"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-dot shadow-[0_0_5px_#22c55e]" />
              📅 Notre parcours
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Les étapes <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">clés</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2">10 années d'innovation et de croissance continue</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MILESTONES.map((m, i) => (
              <div 
                key={i} 
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center relative overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 hover:scale-x-100 transition-transform" />
                <div className="text-xl font-black text-blue-600 mb-1">{m.year}</div>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="font-bold text-slate-900 text-sm mb-1">{m.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{m.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[5px]">

        {/* VALEURS */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center my-20 transition-all duration-700 ${vis(3)}`}
          ref={r(3)} data-sid="3"
          style={{ direction: 'rtl' }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-1.5 transition-transform group" style={{ direction: 'ltr' }}>
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=90" 
              alt="Nos valeurs" 
              className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10" />
            <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-blue-600 shadow-md">✦ Qualité & Confiance</span>
          </div>
          <div style={{ direction: 'ltr' }}>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-dot shadow-[0_0_5px_#22c55e]" />
              💎 Nos valeurs
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Ce qui nous <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">guide</span> chaque jour
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">Chez AutoMarket, nous plaçons l'humain et la transparence au cœur de chaque transaction, sans exception.</p>
            
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {VALUES.map((v, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm transition-all relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 hover:scale-x-100 transition-transform" />
                  <div className="w-11 h-11 rounded-xl mx-auto mb-2.5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 flex items-center justify-center text-xl">{v.icon}</div>
                  <div className="font-extrabold text-slate-900 text-sm mb-1">{v.title}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

       

        {/* PARTENAIRES */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center my-20 transition-all duration-700 ${vis(5)}`}
          ref={r(5)} data-sid="5"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-1.5 transition-transform group">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90" 
              alt="Nos partenaires" 
              className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10" />
            <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-blue-600 shadow-md">✦ Marques Premium</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-dot shadow-[0_0_5px_#22c55e]" />
              🤝 Nos partenaires
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Des marques <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">d'exception</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">Nous collaborons avec les plus grandes marques automobiles pour vous garantir le meilleur choix et la meilleure qualité sur le marché.</p>
            
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {PARTNERSHIPS.map((p, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:-translate-y-1 hover:border-blue-500 hover:shadow-sm transition-all">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden border-2 border-blue-100">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-0.5">{p.name}</div>
                  <div className="text-blue-600 text-xs font-semibold">{p.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ════════ ÉQUIPE ════════ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 mt-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-[5px] relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-dot shadow-[0_0_5px_#22c55e]" />
              👥 Notre équipe
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">
              Des passionnés à votre service
            </h2>
            <p className="text-white/40 text-sm mt-2">Une équipe d'experts dédiés à votre satisfaction, au quotidien</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((m, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 hover:bg-white/10 hover:border-blue-500/30 transition-all relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
                <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-600/20 to-cyan-500/15 border-2 border-blue-500/40 flex items-center justify-center text-3xl">
                  {m.emoji}
                </div>
                <div className="font-extrabold text-white text-base mb-1">{m.name}</div>
                <div className="text-blue-300 text-sm mb-2 font-medium">{m.role}</div>
                <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ CTA ════════ */}
      <div className="w-full px-0 my-16">
        <div className="relative w-full rounded-none overflow-hidden shadow-2xl group">
          {/* Conteneur des deux images */}
          <div className="absolute inset-0 flex">
            <div 
              className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center animate-zoom-left origin-left"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=90')",
              }}
            />
            <div 
              className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center animate-zoom-right origin-right"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90')",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-slate-900/40 backdrop-brightness-105" />

          <div className="relative py-20 px-4 text-center text-white max-w-7xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-blink" />
              Plus de 5000 véhicules disponibles
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              Prêt à trouver la voiture de vos rêves ?
            </h2>

            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95 drop-shadow-md">
              Rejoignez les milliers de clients satisfaits qui nous ont fait confiance
              pour leur projet automobile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/cars'}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                🚗 Voir nos voitures
              </button>

              <button
                onClick={() => window.location.href = '/contact'}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 hover:-translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                📩 Nous contacter
              </button>
            </div>

            <div className="flex justify-center gap-8 mt-12 text-white bg-black/20 backdrop-blur-sm py-4 px-6 rounded-full mx-auto max-w-md">
              <div>
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm opacity-80">Véhicules</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Satisfaits</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;