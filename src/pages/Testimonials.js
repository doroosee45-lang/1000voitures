// pages/Testimonials.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewData, setReviewData] = useState({ name: '', car: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0
  });

  // Charger les témoignages depuis l'API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/testimonials?filter=${filter}`);
        setTestimonials(response.data.testimonials);
        setStats(response.data.stats);
      } catch (err) {
        console.error('Erreur lors du chargement des témoignages:', err);
        setError('Impossible de charger les témoignages');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [filter]);

  const handleReviewChange = (e) => setReviewData({ ...reviewData, [e.target.name]: e.target.value });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/testimonials`, reviewData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      setSubmitted(true);
      setTimeout(() => { 
        setSubmitted(false); 
        setShowForm(false); 
        setReviewData({ name: '', car: '', rating: 0, comment: '' });
        // Recharger les témoignages
        const fetchTestimonials = async () => {
          const res = await axios.get(`${API_URL}/testimonials?filter=${filter}`);
          setTestimonials(res.data.testimonials);
          setStats(res.data.stats);
        };
        fetchTestimonials();
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du témoignage:', err);
      alert(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.rating === parseInt(filter));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-['Outfit']">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500">Chargement des témoignages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4 font-['Outfit']">
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
        <div 
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-600/15 to-slate-900/20 backdrop-brightness-105 z-[1]" />
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-[2]" />
        
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
      <div className="max-w-7xl mx-auto px-4 pb-20">

        {/* Stats strip */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-center items-center gap-0 -mt-12 mb-12 relative z-10 shadow-2xl">
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">{stats.total}+</span>
            </div>
            <div className="text-xs text-white/55 font-semibold uppercase tracking-wide mt-1.5">Avis clients</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <div className="text-center flex-1 px-5 py-2">
            <div className="text-3xl font-black text-white tracking-tight leading-none">
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">{stats.averageRating}</span>
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
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun témoignage</h3>
            <p className="text-gray-500 mb-4">Soyez le premier à partager votre expérience !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((t, idx) => (
              <div 
                key={t._id} 
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200 transition-all relative overflow-hidden group"
                style={{ animation: `fadeUp 0.35s ease ${idx * 0.07}s both` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
                
                <div className="absolute top-2 right-4 text-7xl font-black text-blue-50 pointer-events-none">"</div>
                
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 flex items-center justify-center text-xl">
                    {t.avatar || '👤'}
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
                  {t.isVerified && (
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">✓ Vérifié</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

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
          className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeUp"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fadeUp relative">
            
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