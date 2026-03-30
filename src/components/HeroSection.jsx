// components/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="font-['Outfit']">
      
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
        .animate-hero-zoom { animation: heroZoom 20s ease-in-out infinite alternate; }
        .animate-blink { animation: blink 1.5s infinite; }
        .animate-fadeUp { animation: fadeUp 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      {/* Hero Section */}
      <div className="relative h-[700px] md:h-[600px] sm:h-[550px] flex items-center justify-center overflow-hidden">
        
        {/* Image de fond unique avec zoom */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom brightness-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')",
            transformOrigin: 'center'
          }}
        />
        
        {/* Overlay harmonisé avec les autres pages */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-blue-600/20 to-slate-900/30 backdrop-brightness-105 z-[1]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-[2]" />

        {/* Contenu centré */}
        <div className="relative z-[3] text-center px-5 max-w-4xl mx-auto animate-fadeUp">
          
          {/* Badge harmonisé */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide mb-8 shadow-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-blink shadow-[0_0_10px_#34d399]" />
            <span>🚗 5 000+ véhicules disponibles</span>
          </div>

          {/* Titre avec dégradé harmonisé */}
          <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4.5rem)] drop-shadow-2xl">
            Trouvez la voiture <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-200 via-white to-blue-100 bg-clip-text text-transparent">de vos rêves</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-white/90 text-lg md:text-base sm:text-sm max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg px-3">
            Neufs, d'occasion, toutes marques — comparez, choisissez et roulez 
            en toute confiance avec nos experts à votre écoute.
          </p>

          {/* Stats harmonisées */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-10 bg-black/20 backdrop-blur-md px-8 py-4 rounded-full w-fit mx-auto border border-white/20 shadow-xl">
            <div className="text-center">
              <div className="text-2xl md:text-xl font-black text-white">5 000+</div>
              <div className="text-xs text-white/80 uppercase tracking-wider mt-1 font-medium">Véhicules</div>
            </div>
            <div className="w-px h-8 bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl md:text-xl font-black text-white">120+</div>
              <div className="text-xs text-white/80 uppercase tracking-wider mt-1 font-medium">Marques</div>
            </div>
            <div className="w-px h-8 bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl md:text-xl font-black text-white">98%</div>
              <div className="text-xs text-white/80 uppercase tracking-wider mt-1 font-medium">Satisfaits</div>
            </div>
          </div>

          {/* Boutons harmonisés */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button 
              onClick={() => navigate('/cars')}
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border border-white/20"
            >
              <span className="text-lg">🚗</span>
              Voir nos voitures
            </button>
            
            <button 
              onClick={() => navigate('/sell')}
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <span className="text-lg">💰</span>
              Vendre ma voiture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;