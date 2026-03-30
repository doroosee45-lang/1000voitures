// pages/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validation des mots de passe pour l'inscription
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      // Préparer les données à envoyer
      const userData = {
        email: formData.email,
        password: formData.password
      };

      if (!isLogin) {
        userData.name = formData.name;
        userData.phone = formData.phone;
      }

      // Appel API selon le mode (connexion ou inscription)
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API_URL}${endpoint}`, userData);

      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSuccess(isLogin ? 'Connexion réussie !' : 'Inscription réussie !');

      // Redirection après un court délai
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      console.error('Erreur d\'authentification:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
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
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 py-5 text-center font-bold text-sm tracking-wide transition-all ${
                    isLogin 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔑 Connexion
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 py-5 text-center font-bold text-sm tracking-wide transition-all ${
                    !isLogin 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📝 Inscription
                </button>
              </div>

              {/* Messages d'erreur/succès */}
              {error && (
                <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium animate-fadeUp">
                  ⚠️ {error}
                </div>
              )}
              
              {success && (
                <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 font-medium animate-fadeUp">
                  ✅ {success}
                </div>
              )}

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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                        disabled={loading}
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                      disabled={loading}
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                        disabled={loading}
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                      disabled={loading}
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all disabled:opacity-50"
                        disabled={loading}
                      />
                    </div>
                  )}

                  {/* Options supplémentaires */}
                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                        disabled={loading}
                      />
                      <span className="text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    {isLogin && (
                      <button 
                        type="button" 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                        disabled={loading}
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Chargement...</span>
                      </>
                    ) : (
                      isLogin ? '🔑 Se connecter' : '📝 S\'inscrire'
                    )}
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
                      disabled={loading}
                      className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all disabled:opacity-50"
                    >
                      <span className="text-lg">G</span>
                      Google
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all disabled:opacity-50"
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