// pages/Contact.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/contact`, formData);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 4000);
      
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: '📍', title: 'Adresse', content: '123 Av. des Champs-Élysées, Paris', link: 'https://maps.google.com', bg: '#eff6ff', accent: '#2563eb' },
    { icon: '📞', title: 'Téléphone', content: '01 23 45 67 89', link: 'tel:0123456789', bg: '#f0fdf4', accent: '#059669' },
    { icon: '✉️', title: 'Email', content: 'contact@automarket.fr', link: 'mailto:contact@automarket.fr', bg: '#fff7ed', accent: '#ea580c' },
    { icon: '💬', title: 'WhatsApp', content: '+33 6 12 34 56 78', link: 'https://wa.me/33612345678', bg: '#f0fdf4', accent: '#16a34a' },
  ];

  const hours = [
    { day: 'Lundi – Vendredi', time: '9h – 19h', open: true },
    { day: 'Samedi', time: '10h – 18h', open: true },
    { day: 'Dimanche', time: 'Fermé', open: false },
  ];

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
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes roadPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes buildingFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes labelAppear {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-hero-zoom { animation: heroZoom 18s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-out infinite; }
        .animate-roadPulse { animation: roadPulse 3s ease-in-out infinite; }
        .animate-buildingFloat { animation: buildingFloat 4s ease-in-out infinite; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-labelAppear { animation: labelAppear 0.3s ease-out; }
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
            Contactez-nous
          </div>
          
          <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4rem)] drop-shadow-lg">
            On reste <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">en contact</span>
          </h1>
          
          <p className="text-white/95 text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            Une question, un projet ? Notre équipe est là pour vous répondre et vous accompagner dans toutes vos démarches.
          </p>
        </div>
      </div>

      {/* ════════ CONTENU PRINCIPAL ════════ */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        {/* ── Info cards (flottantes) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 mb-16 relative z-10">
          {contactInfo.map((info, i) => (
            <a 
              key={i} 
              href={info.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div 
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: info.bg }}
              >
                {info.icon}
              </div>
              <div className="font-extrabold text-slate-900 text-sm mb-1">{info.title}</div>
              <div className="text-sm font-semibold" style={{ color: info.accent }}>{info.content}</div>
            </a>
          ))}
        </div>

        {/* ── Formulaire + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-6">

          {/* Formulaire */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                ✉️ Message
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Parlons de votre projet</h2>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
                ⚠️ {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium animate-fadeUp">
                ✅ Message envoyé avec succès ! On vous répond sous 24h.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Nom complet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50" 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    disabled={loading}
                    placeholder="Jean Dupont" 
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Email <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    disabled={loading}
                    placeholder="jean@email.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Téléphone
                  </label>
                  <input 
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50" 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    disabled={loading}
                    placeholder="06 12 34 56 78" 
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    Sujet <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input 
                    className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50" 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    disabled={loading}
                    placeholder="Achat, vente, financement…" 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Message <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea 
                  className="w-full px-3.5 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[130px] disabled:opacity-50" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  disabled={loading}
                  placeholder="Bonjour, je souhaiterais…" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi...</span>
                  </>
                ) : (
                  <>
                    ✈️ Envoyer le message
                  </>
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
              
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-b-0">
                  <span className="text-sm text-white/70 font-medium">{h.day}</span>
                  <span className={`text-sm font-bold ${h.open ? 'text-white' : 'text-gray-500'}`}>
                    {h.time}
                  </span>
                </div>
              ))}
              
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/60 leading-relaxed">
                Urgence ? Appelez-nous 24/7<br />
                <strong className="text-blue-300">01 23 45 67 89</strong>
              </div>
            </div>

            {/* Réponse rapide */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="font-extrabold text-slate-900 text-sm mb-2 flex items-center gap-2">
                ⚡ Réponse rapide
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Notre équipe s'engage à répondre sous <strong className="text-blue-600">24h ouvrées</strong>. Pour une réponse immédiate, appelez-nous directement.
              </p>
            </div>

            {/* Confiance */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              {[
                '🔒 100% confidentiel',
                '⭐ 4.9/5 satisfaction',
                '🚗 +5 000 véhicules',
                '🤝 Sans engagement'
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 py-2.5 border-b border-blue-200/50 last:border-b-0 text-sm font-semibold text-slate-900">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Carte ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🗺️ Nous trouver
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Notre showroom à Paris</h2>
            <p className="text-sm text-gray-500 mt-1">
              Venez nous rencontrer en plein cœur des Champs-Élysées
            </p>
          </div>

          {/* Conteneur de la carte */}
          <div className="w-full h-[450px] rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200 mb-5">
            {/* Placeholder de carte animé */}
            <div className="relative w-full h-full">
              {/* Grille de rue */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Routes animées */}
              <div className="absolute top-[30%] left-[15%] w-[70%] h-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded animate-roadPulse" />
              <div className="absolute top-[60%] left-[20%] w-[60%] h-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded animate-roadPulse" />
              <div className="absolute left-[40%] top-[15%] w-1 h-[70%] bg-gradient-to-b from-gray-400 to-gray-300 rounded animate-roadPulse" />
              <div className="absolute left-[70%] top-[25%] w-1 h-[50%] bg-gradient-to-b from-gray-400 to-gray-300 rounded animate-roadPulse" />

              {/* Bâtiments */}
              <div className="absolute left-[25%] top-[35%] w-10 h-10 bg-gray-300 rounded-md border-2 border-white shadow-md animate-buildingFloat" />
              <div className="absolute left-[55%] top-[45%] w-10 h-10 bg-gray-300 rounded-md border-2 border-white shadow-md animate-buildingFloat" />
              <div className="absolute left-[65%] top-[25%] w-14 h-14 bg-gray-300 rounded-md border-2 border-white shadow-md animate-buildingFloat" />

              {/* Marqueur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-blue-600/30 rounded-full animate-pulse" />
                <div className="relative text-5xl animate-bounce drop-shadow-xl">📍</div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white px-4 py-2 rounded-xl shadow-xl border-2 border-blue-600 whitespace-nowrap animate-labelAppear">
                  <div className="font-bold text-slate-900 text-sm">AutoMarket Paris</div>
                  <div className="text-xs text-gray-500">123 Av. des Champs-Élysées</div>
                  <div className="text-xs text-green-600 font-bold mt-1">● Ouvert aujourd'hui 9h – 19h</div>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full animate-glow pointer-events-none" />
            </div>
          </div>

          {/* Informations d'accès */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg text-blue-600 flex-shrink-0">
                🚇
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Métro</div>
                <div className="text-xs text-gray-500">Franklin D. Roosevelt (lignes 1, 9)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg text-blue-600 flex-shrink-0">
                🅿️
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Parking</div>
                <div className="text-xs text-gray-500">Parking Champs-Élysées à 50m</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg text-blue-600 flex-shrink-0">
                ♿
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Accessibilité</div>
                <div className="text-xs text-gray-500">Accès PMR par l'entrée principale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Intégration Google Maps (optionnel) */}
        {/* <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.29229261567436!3d48.85837007928748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647891234567!5m2!1sfr!2sfr" 
          width="100%" 
          height="450" 
          className="rounded-xl border-0"
          allowFullScreen 
          loading="lazy"
          title="Localisation AutoMarket"
        /> */}
      </div>
    </div>
  );
};

export default Contact;