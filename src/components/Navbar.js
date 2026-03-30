// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/cars?search=${search}`);
      setSearch('');
    }
  };

  return (
    <div className="font-['Outfit']">
      
      {/* Animations personnalisées */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
        .animate-slideDown { animation: slideDown 0.22s ease forwards; }
        .logo-dot {
          display: inline-block;
          width: 6px; height: 6px;
          background: #2563eb;
          border-radius: 50%;
          margin-left: 1px;
          margin-bottom: 3px;
          animation: logoPulse 2.5s infinite;
        }
      `}</style>

      <nav className={`
        sticky top-0 z-[1000] px-8 transition-all duration-350
        ${scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-blue-600/10 shadow-lg' 
          : 'bg-white border-b border-gray-100 shadow-sm'
        }
      `}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-xl shadow-md flex-shrink-0">
              🚗
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                1000<span className="text-blue-600"> voiture </span>
                <span className="logo-dot" />
              </span>
              <span className="text-[0.58rem] text-gray-400 font-semibold tracking-widest uppercase">
                {/* Slogan optionnel */}
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { to: '/', label: 'Accueil' },
              { to: '/cars', label: 'Voitures' },
              { to: '/about', label: 'À propos' },
              { to: '/location', label: 'Louer' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative text-gray-700 no-underline font-medium text-sm hover:text-blue-600 transition-colors duration-250 pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            ))}

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3.5 py-2 rounded-full border-2 border-gray-200 bg-gray-50 text-sm text-slate-900 outline-none w-[170px] focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-['Outfit']"
              />
            </form>

            {/* CTA Button - Redirige vers /auth */}
            <button
              onClick={() => navigate('/auth')}
              className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-cyan-600 before:transition-all before:duration-300 hover:before:left-0"
            >
              <span className="relative z-10">Connexion</span>
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition-colors ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 px-2 border-t border-gray-100 animate-slideDown">
            <div className="flex flex-col gap-0.5">
              {[
                { to: '/', label: 'Accueil', icon: '🏠' },
                { to: '/cars', label: 'Voitures', icon: '🚗' },
                { to: '/about', label: 'À propos', icon: '💡' },
                { to: '/location', label: 'Louer', icon: '✉️' },
                { to: '/contact', label: 'Contact', icon: '✉️' },
              ].map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 no-underline font-medium text-sm rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:pl-6 transition-all"
                >
                  <span>{icon}</span>
                  {label}
                </Link>
              ))}

              <div className="my-2 h-px bg-gray-100" />

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex gap-2 px-3">
                <input
                  type="text"
                  placeholder="Rechercher un véhicule..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-['Outfit']"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-base shadow-md hover:shadow-lg transition-all"
                >
                  🔍
                </button>
              </form>

              {/* Mobile CTA - Redirige vers /auth */}
              <div className="px-3 mt-2">
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Connexion
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;