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