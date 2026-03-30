



// pages/Home.js (extrait des parties modifiées)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import HeroSection from '../components/HeroSection';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState(null);
  const [showTrial, setShowTrial] = useState(false);
  const [trialDone, setTrialDone] = useState(false);
  const [trialData, setTrialData] = useState({ name: '', email: '', phone: '', date: '', time: '' });
  const [trialLoading, setTrialLoading] = useState(false);
  const [trialError, setTrialError] = useState('');

  const [nlEmail, setNlEmail] = useState('');
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlError, setNlError] = useState('');

  const [stats, setStats] = useState({
    totalCars: 0,
    totalCustomers: 0,
    averageRating: 4.8
  });

  // Charger les statistiques
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/stats`);
        setStats(response.data.stats);
      } catch (err) {
        console.error('Erreur chargement stats:', err);
      }
    };
    fetchStats();
  }, []);

  const handleTrialChange = (e) => setTrialData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setTrialLoading(true);
    setTrialError('');

    try {
      const response = await axios.post(`${API_URL}/trials`, trialData);
      console.log('✅ Demande d\'essai envoyée:', response.data);
      setTrialDone(true);

      setTimeout(() => {
        setShowTrial(false);
        setTrialDone(false);
        setTrialData({ name: '', email: '', phone: '', date: '', time: '' });
      }, 4000);
    } catch (err) {
      console.error('❌ Erreur:', err);
      setTrialError(err.response?.data?.message || 'Erreur lors de la demande d\'essai');
    } finally {
      setTrialLoading(false);
    }
  };

  const handleNewsletterSubmit = async () => {
    if (!nlEmail.trim()) {
      setNlError('Veuillez entrer une adresse email');
      return;
    }

    setNlLoading(true);
    setNlError('');

    try {
      const response = await axios.post(`${API_URL}/newsletter/subscribe`, { email: nlEmail });
      console.log('✅ Newsletter:', response.data);
      setNlSubscribed(true);
      setNlEmail('');

      setTimeout(() => setNlSubscribed(false), 5000);
    } catch (err) {
      console.error('❌ Erreur newsletter:', err);
      setNlError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setNlLoading(false);
    }
  };

  const featuredCars = [
    { id: 1, brand: 'BMW', model: 'Série 3', year: 2022, price: 45000, mileage: 15000, fuel: 'Diesel', transmission: 'Auto', isNew: false, location: 'Paris', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500' },
    { id: 2, brand: 'Mercedes', model: 'Classe C', year: 2023, price: 55000, mileage: 5000, fuel: 'Hybride', transmission: 'Auto', isNew: true, location: 'Lyon', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500' },
    { id: 3, brand: 'Audi', model: 'A4', year: 2021, price: 38000, mileage: 30000, fuel: 'Essence', transmission: 'Auto', isNew: false, location: 'Marseille', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500' }
  ];

  const newArrivals = [
    { id: 2, brand: 'Mercedes', model: 'Classe C', year: 2023, price: 55000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600', tag: 'Nouveau', fuel: 'Hybride' },
    { id: 6, brand: 'Renault', model: 'Mégane', year: 2023, price: 22000, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600', tag: 'Nouveau', fuel: 'Essence' },
    { id: 1, brand: 'BMW', model: 'Série 3', year: 2022, price: 45000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', tag: 'Premium', fuel: 'Diesel' },
    { id: 5, brand: 'Peugeot', model: '508', year: 2022, price: 32000, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600', tag: 'Populaire', fuel: 'Diesel' },
  ];

  const brands = [
    { name: 'BMW', logo: '🔵', count: 45, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
    { name: 'Mercedes', logo: '⭐', count: 38, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' },
    { name: 'Audi', logo: '⚪', count: 32, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400' },
    { name: 'Toyota', logo: '🔴', count: 27, image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400' },
    { name: 'Peugeot', logo: '🦁', count: 41, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' },
    { name: 'Renault', logo: '💠', count: 36, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
  ];

  const steps = [
    { num: '01', icon: '🔍', title: 'Cherchez', desc: 'Parcourez plus de 5 000 véhicules filtrés selon vos critères.', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80' },
    { num: '02', icon: '🚗', title: 'Essayez', desc: 'Réservez un essai gratuit directement depuis la fiche véhicule.', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80' },
    { num: '03', icon: '✅', title: 'Achetez', desc: 'Finalisez votre commande en ligne avec financement sur mesure.', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80' },
  ];

  const testimonials = [
    { id: 1, name: 'Sophie Martin', avatar: '👩', rating: 5, comment: "Excellente expérience ! J'ai acheté ma BMW chez eux et tout s'est passé parfaitement.", car: 'BMW Série 3', date: '2024-02-15' },
    { id: 2, name: 'Thomas Dubois', avatar: '👨', rating: 5, comment: "Je recommande vivement ! Le financement a été très bien expliqué et j'ai pu obtenir un taux avantageux.", car: 'Mercedes Classe C', date: '2024-02-10' },
    { id: 3, name: 'Marie Lambert', avatar: '👩', rating: 4, comment: "Très bonne expérience d'achat. Le service après-vente est réactif et professionnel.", car: 'Audi A4', date: '2024-02-05' }
  ];

  const whyUs = [
    { icon: '🛡️', title: 'Garantie 12 mois', desc: 'Sur tous nos véhicules' },
    { icon: '💰', title: 'Prix imbattables', desc: "Jusqu'à -20%" },
    { icon: '🔧', title: 'Service après-vente', desc: 'Assistance 24/7' },
    { icon: '🚗', title: 'Essai gratuit', desc: 'Pendant 7 jours' },
  ];

  const formatPrice = (p) => new Intl.NumberFormat('fr-FR').format(p) + ' €';

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: '#f8fafc' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        :root { --page-spacing: 5px; }
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

        .section-label {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; color: #2563eb;
          padding: 5px 14px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 14px;
        }
        .section-title { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.5px; }

        /* ── Search ── */
        .search-bar-wrap { width:100%; margin:-34px auto 0; padding:0 var(--page-spacing); position:relative; z-index:20; }
        .search-bar-inner { background:white; border-radius:0; box-shadow:0 20px 60px rgba(37,99,235,0.13),0 4px 16px rgba(0,0,0,0.06); padding:22px 24px; display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:var(--page-spacing); align-items:end; }
        .search-field label { display:block; font-size:0.72rem; font-weight:700; color:#94a3b8; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:6px; }
        .search-field select { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; color:#0f172a; font-family:'Outfit',sans-serif; outline:none; background:#f8fafc; cursor:pointer; transition:border-color 0.2s,box-shadow 0.2s; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:32px; }
        .search-field select:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,0.1); background-color:#fff; }
        .search-btn { padding:10px 28px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:10px; font-size:0.9rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; white-space:nowrap; transition:all 0.3s; box-shadow:0 4px 14px rgba(37,99,235,0.3); height:42px; }
        .search-btn:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(37,99,235,0.4); }

        /* ── Featured ── */
        .featured-section { width:100%; margin:70px 0 0; padding:0 var(--page-spacing); }
        .section-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:16px; padding:0 20px; }
        .see-all-link { color:#2563eb; font-weight:600; font-size:0.9rem; cursor:pointer; background:none; border:none; display:flex; align-items:center; gap:4px; transition:gap 0.2s; padding:0; }
        .see-all-link:hover { gap:8px; }
        .cars-featured-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--page-spacing); border:1px solid #f1f5f9; overflow:hidden; }

        /* ── NEW ARRIVALS ── */
        .arrivals-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .arrivals-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .arrival-card {
          position:relative; border-radius:16px; overflow:hidden; cursor:pointer;
          height:280px; flex-shrink:0;
          transition:all 0.35s cubic-bezier(.4,0,.2,1);
          box-shadow:0 4px 20px rgba(0,0,0,0.1);
        }
        .arrival-card:hover { transform:translateY(-6px) scale(1.01); box-shadow:0 20px 50px rgba(37,99,235,0.2); }
        .arrival-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s; }
        .arrival-card:hover .arrival-img { transform:scale(1.08); }
        .arrival-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%, transparent 100%);
          transition:opacity 0.3s;
        }
        .arrival-tag {
          position:absolute; top:14px; left:14px;
          padding:4px 12px; border-radius:99px;
          font-size:0.68rem; font-weight:800; letter-spacing:1px; text-transform:uppercase;
          background:linear-gradient(135deg,#2563eb,#06b6d4); color:white;
          backdrop-filter:blur(4px);
        }
        .arrival-fuel {
          position:absolute; top:14px; right:14px;
          padding:4px 10px; border-radius:99px;
          font-size:0.68rem; font-weight:700;
          background:rgba(255,255,255,0.15); color:white;
          border:1px solid rgba(255,255,255,0.3); backdrop-filter:blur(8px);
        }
        .arrival-body { position:absolute; bottom:0; left:0; right:0; padding:18px 16px; }
        .arrival-brand { font-size:0.7rem; font-weight:700; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:1px; }
        .arrival-name  { font-size:1.1rem; font-weight:900; color:white; line-height:1.1; margin:2px 0 8px; letter-spacing:-0.3px; }
        .arrival-footer { display:flex; justify-content:space-between; align-items:center; }
        .arrival-price { font-size:1rem; font-weight:800; color:white; }
        .arrival-btn {
          padding:7px 14px; background:rgba(255,255,255,0.15);
          border:1px solid rgba(255,255,255,0.35); color:white;
          border-radius:99px; font-size:0.72rem; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer; backdrop-filter:blur(6px);
          transition:all 0.2s;
        }
        .arrival-btn:hover { background:rgba(255,255,255,0.3); }

        /* ── SPLIT SECTIONS ── */
        .split-section { width:100%; margin:80px 0 0; }

        .split-row {
          display:grid; grid-template-columns:1fr 1fr;
          min-height:480px; overflow:hidden;
        }
        .split-row-reverse { direction:rtl; }
        .split-row-reverse > * { direction:ltr; }

        /* Image side */
        .split-img-wrap { position:relative; overflow:hidden; min-height:420px; }
        .split-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.7s cubic-bezier(.4,0,.2,1); }
        .split-img-wrap:hover .split-img { transform:scale(1.04); }
        .split-img-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to right, transparent 40%, rgba(248,250,252,0.15) 100%);
          pointer-events:none;
        }
        .split-img-overlay-right {
          background:linear-gradient(to left, transparent 40%, rgba(15,23,42,0.15) 100%);
        }
        .split-img-badge {
          position:absolute; top:24px; left:24px;
          background:linear-gradient(135deg,#f59e0b,#ef4444);
          color:white; padding:6px 16px; border-radius:99px;
          font-size:0.78rem; font-weight:800; letter-spacing:0.5px;
          box-shadow:0 4px 14px rgba(245,158,11,0.4);
        }
        .split-floating-card {
          position:absolute; bottom:28px; right:28px;
          background:white; border-radius:14px; padding:14px 18px;
          display:flex; align-items:center; gap:12px;
          box-shadow:0 10px 32px rgba(0,0,0,0.15);
          border:1px solid #f1f5f9;
          animation:fadeUp 0.6s 0.3s ease both;
        }
        .split-fc-icon  { font-size:1.6rem; }
        .split-fc-title { font-size:1.1rem; font-weight:900; color:#0f172a; line-height:1; }
        .split-fc-sub   { font-size:0.7rem; color:#94a3b8; font-weight:600; margin-top:3px; }

        /* Text side — light */
        .split-text {
          background:white; padding:60px 52px;
          display:flex; flex-direction:column; justify-content:center;
          gap:0;
        }
        .split-label {
          display:inline-flex; align-items:center; gap:6px;
          background:#eff6ff; color:#2563eb;
          padding:5px 14px; border-radius:99px;
          font-size:0.72rem; font-weight:800;
          letter-spacing:1.2px; text-transform:uppercase; margin-bottom:18px;
          width:fit-content;
        }
        .split-title {
          font-size:clamp(1.8rem,3vw,2.6rem); font-weight:900;
          color:#0f172a; line-height:1.1; letter-spacing:-1px; margin:0 0 16px;
        }
        .split-title span { background:linear-gradient(135deg,#ef4444,#f97316); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .split-desc { font-size:0.95rem; color:#475569; line-height:1.8; margin-bottom:24px; }

        .split-chips { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px; }
        .split-chip {
          background:#f0fdf4; color:#059669; border:1px solid #bbf7d0;
          padding:5px 14px; border-radius:99px; font-size:0.78rem; font-weight:700;
        }

        .split-stats { display:flex; align-items:center; gap:0; margin-bottom:32px; }
        .split-stat { text-align:center; flex:1; }
        .split-stat-val { display:block; font-size:1.6rem; font-weight:900; color:#2563eb; letter-spacing:-0.5px; line-height:1; }
        .split-stat-lbl { display:block; font-size:0.65rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; margin-top:4px; }
        .split-stat-div { width:1px; height:36px; background:#e2e8f0; flex-shrink:0; }

        .split-btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 32px; background:linear-gradient(135deg,#ef4444,#f97316);
          color:white; border:none; border-radius:99px;
          font-size:0.95rem; font-weight:700; font-family:'Outfit',sans-serif;
          cursor:pointer; transition:all 0.3s; width:fit-content;
          box-shadow:0 4px 14px rgba(239,68,68,0.3);
        }
        .split-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(239,68,68,0.45); }

        /* Text side — dark */
        .split-text-dark { background:linear-gradient(135deg,#0f172a,#1e3a5f); }
        .split-label-light { background:rgba(37,99,235,0.2); color:#93c5fd; }
        .split-title-light { color:white; }
        .split-span-cyan { background:linear-gradient(90deg,#bfdbfe,#a5f3fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .split-desc-light { color:rgba(255,255,255,0.6); }

        .split-steps-list { display:flex; flex-direction:column; gap:14px; margin-bottom:32px; }
        .split-step-item { display:flex; align-items:center; gap:14px; }
        .split-step-num {
          width:32px; height:32px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,#2563eb,#06b6d4);
          display:flex; align-items:center; justify-content:center;
          font-size:0.8rem; font-weight:800; color:white;
          box-shadow:0 3px 10px rgba(37,99,235,0.3);
        }
        .split-step-text { font-size:0.9rem; font-weight:600; color:rgba(255,255,255,0.8); }

        .split-btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 32px; background:transparent;
          color:white; border:1.5px solid rgba(255,255,255,0.4);
          border-radius:99px; font-size:0.95rem; font-weight:700;
          font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s;
          width:fit-content; backdrop-filter:blur(8px);
        }
        .split-btn-outline:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.7); transform:translateY(-2px); }

        /* ── STATS TICKER ── */
        .ticker-section {
          background:linear-gradient(135deg,#2563eb,#06b6d4);
          padding:0; overflow:hidden; margin:80px 0 0;
        }
        .ticker-inner {
          display:flex; align-items:stretch; flex-wrap:wrap;
        }
        .ticker-item {
          flex:1; min-width:180px; text-align:center; padding:28px 20px;
          border-right:1px solid rgba(255,255,255,0.15); position:relative;
          transition:background 0.25s;
        }
        .ticker-item:last-child { border-right:none; }
        .ticker-item:hover { background:rgba(255,255,255,0.1); }
        .ticker-val { font-size:2rem; font-weight:900; color:white; letter-spacing:-1px; line-height:1; }
        .ticker-lbl { font-size:0.72rem; color:rgba(255,255,255,0.7); font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-top:6px; }
        .ticker-icon { font-size:1.3rem; margin-bottom:8px; display:block; }

        /* ── FINANCEMENT SECTION ── */
        .finance-section {
          margin:80px var(--page-spacing) 0;
          display:grid; grid-template-columns:1fr 1fr; min-height:420px; overflow:hidden;
          border-radius:20px; box-shadow:0 8px 40px rgba(37,99,235,0.1);
        }
        .finance-left {
          background:linear-gradient(135deg,#0f172a,#1e3a5f);
          padding:52px 48px; display:flex; flex-direction:column; justify-content:center;
          position:relative; overflow:hidden;
        }
        .finance-left::before { content:''; position:absolute; top:-60px; right:-60px; width:250px; height:250px; background:radial-gradient(circle,rgba(37,99,235,0.3),transparent 70%); pointer-events:none; }
        .finance-title { font-size:clamp(1.6rem,2.5vw,2.2rem); font-weight:900; color:white; line-height:1.15; letter-spacing:-0.5px; margin:0 0 16px; position:relative; z-index:1; }
        .finance-title span { background:linear-gradient(90deg,#bfdbfe,#a5f3fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .finance-desc { font-size:0.9rem; color:rgba(255,255,255,0.6); line-height:1.75; margin:0 0 28px; position:relative; z-index:1; }
        .finance-options { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:28px; position:relative; z-index:1; }
        .finance-opt { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px 10px; text-align:center; transition:all 0.25s; cursor:default; }
        .finance-opt:hover { background:rgba(37,99,235,0.2); border-color:rgba(37,99,235,0.4); }
        .finance-opt-icon  { font-size:1.4rem; display:block; margin-bottom:6px; }
        .finance-opt-title { font-size:0.78rem; font-weight:800; color:white; }
        .finance-opt-sub   { font-size:0.62rem; color:rgba(255,255,255,0.45); margin-top:2px; }
        .finance-cta { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:99px; font-size:0.9rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(37,99,235,0.35); position:relative; z-index:1; }
        .finance-cta:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,99,235,0.5); }

        .finance-right { position:relative; overflow:hidden; min-height:380px; }
        .finance-img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s; }
        .finance-right:hover .finance-img { transform:scale(1.04); }
        .finance-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(15,23,42,0.3),transparent); }
        .finance-badge { position:absolute; top:24px; left:24px; background:white; border-radius:14px; padding:14px 18px; display:flex; align-items:center; gap:10px; box-shadow:0 8px 24px rgba(0,0,0,0.12); }
        .finance-badge-icon { font-size:1.5rem; }
        .finance-badge-title { font-size:0.9rem; font-weight:800; color:#0f172a; }
        .finance-badge-sub   { font-size:0.65rem; color:#64748b; font-weight:600; margin-top:1px; }

        /* ── GALLERY MOSAIC ── */
        .gallery-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .gallery-grid {
          display:grid;
          grid-template-columns:2fr 1fr 1fr;
          grid-template-rows:240px 240px;
          gap:8px;
        }
        .gallery-item { position:relative; overflow:hidden; cursor:pointer; border-radius:12px; }
        .gallery-item:first-child { grid-row:1/3; }
        .gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; display:block; }
        .gallery-item:hover img { transform:scale(1.06); }
        .gallery-item-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(15,23,42,0.6),transparent 60%); opacity:0; transition:opacity 0.3s; }
        .gallery-item:hover .gallery-item-overlay { opacity:1; }
        .gallery-item-label { position:absolute; bottom:14px; left:14px; color:white; font-size:0.8rem; font-weight:700; opacity:0; transition:opacity 0.3s; }
        .gallery-item:hover .gallery-item-label { opacity:1; }

        /* ── TRIAL MODAL ── */
        .trial-overlay { position:fixed; inset:0; z-index:3000; background:rgba(15,23,42,0.65); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:16px; animation:fadeUp 0.2s ease; }
        .trial-card { background:white; border-radius:24px; width:100%; max-width:500px; overflow:hidden; box-shadow:0 40px 100px rgba(15,23,42,0.3); animation:fadeUp 0.3s ease; }
        .trial-header { background:linear-gradient(135deg,#1e3a5f,#2563eb); padding:24px 28px 20px; position:relative; overflow:hidden; }
        .trial-header::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:radial-gradient(circle,rgba(255,255,255,0.1),transparent 70%); }
        .trial-close { position:absolute; top:16px; right:16px; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:white; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        .trial-close:hover { background:rgba(255,255,255,0.2); transform:rotate(90deg); }
        .trial-header-title { font-size:1.15rem; font-weight:900; color:white; margin:0 0 4px; position:relative; z-index:1; }
        .trial-header-sub   { font-size:0.8rem; color:rgba(255,255,255,0.55); position:relative; z-index:1; }
        .trial-body { padding:24px 28px 28px; }
        .t-label { display:block; font-size:0.7rem; font-weight:700; color:#475569; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
        .t-req { color:#ef4444; margin-left:2px; }
        .t-input, .t-select { width:100%; padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; color:#0f172a; font-family:'Outfit',sans-serif; background:#f8fafc; outline:none; transition:all 0.2s; margin-bottom:14px; }
        .t-input:focus, .t-select:focus { border-color:#2563eb; background:#fff; box-shadow:0 0 0 3px rgba(37,99,235,0.1); }
        .t-input::placeholder { color:#94a3b8; }
        .t-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .t-btn { width:100%; padding:13px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:99px; font-size:0.95rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(37,99,235,0.3); display:flex; align-items:center; justify-content:center; gap:8px; margin-top:4px; }
        .t-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,99,235,0.4); }
        .t-success { text-align:center; padding:28px 20px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        /* ── BRANDS GRID ── */
        .brands-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .brands-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; }
        .brand-card {
          position:relative; border-radius:14px; overflow:hidden;
          cursor:pointer; height:140px;
          transition:all 0.3s cubic-bezier(.4,0,.2,1);
          border:2px solid transparent;
        }
        .brand-card:hover, .brand-card.active { transform:translateY(-4px); border-color:#2563eb; box-shadow:0 12px 30px rgba(37,99,235,0.2); }
        .brand-img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .brand-card:hover .brand-img { transform:scale(1.1); }
        .brand-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 100%); }
        .brand-card.active .brand-overlay { background:linear-gradient(to top,rgba(37,99,235,0.8),rgba(37,99,235,0.3)); }
        .brand-info { position:absolute; bottom:0; left:0; right:0; padding:12px 10px; text-align:center; }
        .brand-name  { font-size:0.82rem; font-weight:800; color:white; letter-spacing:-0.2px; }
        .brand-count { font-size:0.62rem; color:rgba(255,255,255,0.55); font-weight:600; margin-top:2px; }

        /* ── HOW IT WORKS ── */
        .how-section {
          margin:80px var(--page-spacing) 0;
          background:linear-gradient(135deg,#0f172a,#1e3a5f);
          border-radius:24px; padding:60px 48px; overflow:hidden; position:relative;
        }
        .how-section::before { content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:600px; height:300px; background:radial-gradient(ellipse,rgba(37,99,235,0.25),transparent 70%); pointer-events:none; }
        .how-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; position:relative; z-index:1; }
        .how-card { position:relative; }
        .how-connector { position:absolute; top:32px; left:calc(50% + 60px); width:calc(100% - 60px); height:2px; background:linear-gradient(90deg,rgba(37,99,235,0.5),transparent); }
        .how-img-wrap { width:100%; height:180px; border-radius:14px; overflow:hidden; margin-bottom:20px; position:relative; border:2px solid rgba(37,99,235,0.3); }
        .how-img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .how-card:hover .how-img { transform:scale(1.06); }
        .how-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(37,99,235,0.5),transparent); }
        .how-num { position:absolute; top:12px; left:12px; width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,#2563eb,#06b6d4); display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:900; color:white; box-shadow:0 4px 12px rgba(37,99,235,0.4); z-index:2; }
        .how-icon { font-size:1.2rem; position:absolute; top:12px; right:12px; z-index:2; }
        .how-title { font-size:1rem; font-weight:800; color:white; margin:0 0 8px; }
        .how-desc  { font-size:0.85rem; color:rgba(255,255,255,0.5); line-height:1.65; margin:0; }
        .how-btn-wrap { position:relative; z-index:1; text-align:center; margin-top:40px; }
        .how-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 32px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:99px; font-size:0.95rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(37,99,235,0.35); }
        .how-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,99,235,0.5); }

        /* ── TESTIMONIALS ── */
        .testimonials-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--page-spacing); }
        .testimonial-card { background:white; border:1px solid #f1f5f9; padding:28px; box-shadow:0 2px 12px rgba(0,0,0,0.04); transition:all 0.3s cubic-bezier(.4,0,.2,1); position:relative; overflow:hidden; }
        .testimonial-card::before { content:'"'; position:absolute; top:-10px; right:20px; font-size:7rem; font-weight:900; color:#eff6ff; line-height:1; font-family:Georgia,serif; pointer-events:none; }
        .testimonial-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(37,99,235,0.1); border-color:#bfdbfe; }
        .testimonial-avatar { width:46px; height:46px; border-radius:50%; background:linear-gradient(135deg,#eff6ff,#e0f2fe); display:flex; align-items:center; justify-content:center; font-size:1.6rem; flex-shrink:0; border:2px solid #bfdbfe; }
        .stars { display:flex; gap:2px; margin-bottom:14px; }
        .star-filled { color:#f59e0b; font-size:1rem; }
        .star-empty  { color:#e2e8f0; font-size:1rem; }
        .testimonial-comment { color:#475569; line-height:1.7; font-size:0.92rem; font-style:italic; margin:0 0 16px; }
        .testimonial-date { color:#94a3b8; font-size:0.75rem; font-weight:500; }
        .btn-outline-blue { padding:11px 30px; background:transparent; color:#2563eb; border:1.5px solid #2563eb; border-radius:99px; font-size:0.9rem; font-weight:600; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.25s; }
        .btn-outline-blue:hover { background:#2563eb; color:white; box-shadow:0 6px 20px rgba(37,99,235,0.3); transform:translateY(-1px); }

        /* ── WHY US ── */
        .why-section { background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%); margin-top:80px; padding:70px var(--page-spacing); position:relative; overflow:hidden; }
        .why-section::before { content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:600px; height:300px; background:radial-gradient(ellipse,rgba(37,99,235,0.25),transparent 70%); pointer-events:none; }
        .why-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:var(--page-spacing); }
        .why-card { text-align:center; padding:32px 20px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); transition:all 0.3s; position:relative; overflow:hidden; }
        .why-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#2563eb,#06b6d4); transform:scaleX(0); transition:transform 0.3s; }
        .why-card:hover { background:rgba(255,255,255,0.07); transform:translateY(-4px); border-color:rgba(37,99,235,0.3); }
        .why-card:hover::after { transform:scaleX(1); }
        .why-icon { width:60px; height:60px; border-radius:16px; background:linear-gradient(135deg,rgba(37,99,235,0.2),rgba(6,182,212,0.15)); border:1px solid rgba(37,99,235,0.3); display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin:0 auto 18px; }

        /* ── NEWSLETTER SECTION ── */
        .newsletter-section {
          margin:80px var(--page-spacing) 0;
          background:linear-gradient(135deg,#0f172a,#1e3a5f);
          border-radius:20px; padding:60px 52px;
          display:flex; align-items:center; justify-content:space-between;
          gap:40px; flex-wrap:wrap; position:relative; overflow:hidden;
        }
        .newsletter-section::before { content:''; position:absolute; top:-80px; right:-80px; width:300px; height:300px; background:radial-gradient(circle,rgba(37,99,235,0.25),transparent 70%); pointer-events:none; }
        .newsletter-section::after  { content:''; position:absolute; bottom:-60px; left:-60px; width:200px; height:200px; background:radial-gradient(circle,rgba(6,182,212,0.2),transparent 70%); pointer-events:none; }
        .newsletter-left { flex:1; min-width:260px; position:relative; z-index:1; }
        .newsletter-eyebrow { font-size:0.7rem; font-weight:700; color:#06b6d4; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
        .newsletter-eyebrow::before { content:''; width:20px; height:2px; background:linear-gradient(90deg,#2563eb,#06b6d4); border-radius:99px; }
        .newsletter-title { font-size:clamp(1.5rem,2.5vw,2rem); font-weight:900; color:white; margin:0 0 8px; letter-spacing:-0.3px; }
        .newsletter-title span { background:linear-gradient(90deg,#bfdbfe,#a5f3fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .newsletter-sub { font-size:0.875rem; color:rgba(255,255,255,0.5); line-height:1.6; margin:0; }
        .newsletter-right { flex:1; min-width:300px; max-width:460px; position:relative; z-index:1; }
        .newsletter-form { display:flex; gap:8px; }
        .newsletter-input { flex:1; padding:12px 16px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:10px; color:white; font-size:0.875rem; font-family:'Outfit',sans-serif; outline:none; transition:all 0.25s; }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.35); }
        .newsletter-input:focus { border-color:#2563eb; background:rgba(37,99,235,0.1); box-shadow:0 0 0 3px rgba(37,99,235,0.15); }
        .newsletter-btn { padding:12px 22px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:10px; font-size:0.875rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; white-space:nowrap; transition:all 0.25s; box-shadow:0 4px 12px rgba(37,99,235,0.3); }
        .newsletter-btn:hover { transform:translateY(-1px); box-shadow:0 8px 20px rgba(37,99,235,0.45); }
        .newsletter-success { display:flex; align-items:center; gap:8px; color:#34d399; font-size:0.875rem; font-weight:700; animation:fadeUp 0.3s ease; }
        .newsletter-promise { font-size:0.7rem; color:rgba(255,255,255,0.3); margin-top:8px; display:flex; align-items:center; gap:4px; }

        /* ── SERVICES CARDS ── */
        .services-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .service-card {
          position:relative; border-radius:20px; overflow:hidden; cursor:pointer;
          height:320px; transition:all 0.35s cubic-bezier(.4,0,.2,1);
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
        }
        .service-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(37,99,235,0.18); }
        .service-bg { width:100%; height:100%; object-fit:cover; transition:transform 0.6s; display:block; }
        .service-card:hover .service-bg { transform:scale(1.06); }
        .service-overlay { position:absolute; inset:0; transition:background 0.3s; }
        .service-overlay-1 { background:linear-gradient(135deg,rgba(37,99,235,0.85) 0%,rgba(6,182,212,0.6) 100%); }
        .service-overlay-2 { background:linear-gradient(135deg,rgba(5,150,105,0.85) 0%,rgba(16,185,129,0.6) 100%); }
        .service-overlay-3 { background:linear-gradient(135deg,rgba(245,158,11,0.85) 0%,rgba(239,68,68,0.6) 100%); }
        .service-content { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:28px 24px; }
        .service-icon-wrap { width:52px; height:52px; border-radius:14px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin-bottom:auto; backdrop-filter:blur(4px); }
        .service-title { font-size:1.2rem; font-weight:900; color:white; margin:0 0 8px; letter-spacing:-0.3px; }
        .service-desc  { font-size:0.82rem; color:rgba(255,255,255,0.8); line-height:1.6; margin:0 0 18px; }
        .service-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.35); color:white; border-radius:99px; font-size:0.78rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; backdrop-filter:blur(6px); transition:all 0.2s; width:fit-content; }
        .service-btn:hover { background:rgba(255,255,255,0.3); }

        /* ── PARTENAIRES / LOGOS ── */
        .partners-section { width:100%; margin:80px 0 0; padding:0 var(--page-spacing); }
        .partners-strip { background:white; border:1px solid #f1f5f9; border-radius:16px; padding:32px 40px; box-shadow:0 2px 12px rgba(37,99,235,0.04); }
        .partners-title { text-align:center; font-size:0.72rem; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:28px; }
        .partners-logos { display:flex; align-items:center; justify-content:space-around; gap:24px; flex-wrap:wrap; }
        .partner-logo { display:flex; flex-direction:column; align-items:center; gap:8px; opacity:0.5; transition:opacity 0.2s; cursor:default; }
        .partner-logo:hover { opacity:1; }
        .partner-logo-icon { font-size:2rem; }
        .partner-logo-name { font-size:0.72rem; font-weight:800; color:#0f172a; letter-spacing:0.5px; }

        /* ── VÉHICULE DU MOIS ── */
        .featured-month-section { width:100%; margin:80px 0 0; }
        .featured-month-inner {
          display:grid; grid-template-columns:1fr 1fr; min-height:500px; overflow:hidden;
        }
        .fm-img-side { position:relative; overflow:hidden; }
        .fm-img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s; display:block; }
        .fm-img-side:hover .fm-img { transform:scale(1.04); }
        .fm-img-overlay { position:absolute; inset:0; background:linear-gradient(to right,transparent 50%,rgba(248,250,252,0.2) 100%); }
        .fm-ribbon { position:absolute; top:28px; left:-10px; background:linear-gradient(135deg,#f59e0b,#ef4444); color:white; padding:8px 24px 8px 20px; font-size:0.75rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; box-shadow:0 4px 14px rgba(245,158,11,0.4); clip-path:polygon(0 0,100% 0,calc(100% - 10px) 50%,100% 100%,0 100%); }
        .fm-text-side { background:#f8fafc; padding:60px 52px; display:flex; flex-direction:column; justify-content:center; border-left:1px solid #f1f5f9; }
        .fm-month-badge { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg,#fef3c7,#fde68a); color:#92400e; padding:5px 14px; border-radius:99px; font-size:0.72rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; margin-bottom:18px; width:fit-content; }
        .fm-title { font-size:clamp(2rem,3vw,2.8rem); font-weight:900; color:#0f172a; line-height:1.05; letter-spacing:-1px; margin:0 0 6px; }
        .fm-subtitle { font-size:1rem; color:#2563eb; font-weight:700; margin:0 0 20px; }
        .fm-desc { font-size:0.92rem; color:#475569; line-height:1.8; margin:0 0 28px; }
        .fm-specs { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:32px; }
        .fm-spec { background:white; border-radius:12px; padding:14px; text-align:center; border:1px solid #f1f5f9; box-shadow:0 2px 8px rgba(37,99,235,0.04); }
        .fm-spec-icon  { font-size:1.1rem; margin-bottom:5px; }
        .fm-spec-label { font-size:0.6rem; color:#94a3b8; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; display:block; }
        .fm-spec-val   { font-size:0.9rem; font-weight:800; color:#0f172a; }
        .fm-price-row  { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
        .fm-price { font-size:2rem; font-weight:900; color:#2563eb; letter-spacing:-0.5px; }
        .fm-price-old { font-size:1rem; color:#94a3b8; text-decoration:line-through; font-weight:500; margin-left:8px; }
        .fm-cta { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; background:linear-gradient(135deg,#2563eb,#06b6d4); color:white; border:none; border-radius:99px; font-size:0.92rem; font-weight:700; font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 14px rgba(37,99,235,0.3); }
        .fm-cta:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,99,235,0.45); }

        @media (max-width:1024px) {
          .arrivals-grid { grid-template-columns:repeat(2,1fr); }
          .brands-grid { grid-template-columns:repeat(3,1fr); }
          .services-grid { grid-template-columns:1fr 1fr; }
          .featured-month-inner { grid-template-columns:1fr; }
          .fm-img-side { min-height:300px; }
        }
        @media (max-width:768px) {
          .search-bar-inner { grid-template-columns:1fr 1fr; }
          .search-btn { grid-column:1/-1; }
          .cars-featured-grid, .how-grid { grid-template-columns:1fr; }
          .testimonials-grid { grid-template-columns:1fr !important; }
          .why-grid { grid-template-columns:repeat(2,1fr) !important; }
          .arrivals-grid { grid-template-columns:1fr; }
          .brands-grid { grid-template-columns:repeat(2,1fr); }
          .how-section { padding:40px 24px; }
          .section-header { flex-direction:column; align-items:flex-start; gap:12px; }
          .split-row, .split-row-reverse { grid-template-columns:1fr; direction:ltr; }
          .split-text, .split-text-dark { padding:40px 28px; }
          .split-img-wrap { min-height:280px; }
          .split-floating-card { bottom:16px; right:16px; }
          .finance-section { grid-template-columns:1fr; }
          .newsletter-section { padding:40px 28px; }
          .newsletter-form { flex-direction:column; }
          .services-grid { grid-template-columns:1fr; }
          .partners-logos { gap:16px; }
          .fm-text-side { padding:36px 28px; }
          .fm-specs { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:480px) { .search-bar-inner { grid-template-columns:1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Quick Search ── */}
      <div className="search-bar-wrap">
        <div className="search-bar-inner">
          <div className="search-field">
            <label>Marque</label>
            <select><option value="">Toutes les marques</option>{brands.map(b => <option key={b.name}>{b.name}</option>)}</select>
          </div>
          <div className="search-field">
            <label>Modèle</label>
            <select><option value="">Tous les modèles</option></select>
          </div>
          <div className="search-field">
            <label>Budget max</label>
            <select>
              <option value="">Sans limite</option>
              <option>20 000 €</option><option>30 000 €</option>
              <option>40 000 €</option><option>50 000 €</option>
            </select>
          </div>
          <button className="search-btn" onClick={() => navigate('/cars')}>🔍 Rechercher</button>
        </div>
      </div>

      {/* ── Featured Cars ── */}
      <div className="featured-section">
        <div className="section-header">
          <div>
            <div className="section-label">⭐ Sélection</div>
            <h2 className="section-title">Voitures à la une</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/cars')}>Voir tout le catalogue →</button>
        </div>
        <div className="cars-featured-grid">
          {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Nouvelles arrivées (image cards)
      ══════════════════════════════════════════ */}
      <div className="arrivals-section">
        <div className="section-header">
          <div>
            <div className="section-label">🆕 Arrivées récentes</div>
            <h2 className="section-title">Tout juste arrivés</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/cars')}>Voir toutes les nouveautés →</button>
        </div>
        <div className="arrivals-grid">
          {newArrivals.map(car => (
            <div key={car.id} className="arrival-card" onClick={() => navigate(`/car/${car.id}`)}>
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="arrival-img" />
              <div className="arrival-overlay" />
              <span className="arrival-tag">{car.tag}</span>
              <span className="arrival-fuel">{car.fuel}</span>
              <div className="arrival-body">
                <div className="arrival-brand">{car.brand}</div>
                <div className="arrival-name">{car.model} {car.year}</div>
                <div className="arrival-footer">
                  <span className="arrival-price">{formatPrice(car.price)}</span>
                  <button className="arrival-btn" onClick={(e) => { e.stopPropagation(); navigate(`/car/${car.id}`); }}>
                    Voir →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION SPLIT — Image gauche / Texte droite
      ══════════════════════════════════════════ */}
      <div className="split-section">

        {/* ── Bloc 1 : Image gauche, texte droite ── */}
        <div className="split-row">
          <div className="split-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80"
              alt="BMW Série 3"
              className="split-img"
            />
            <div className="split-img-badge">🔥 -20% ce mois</div>
            <div className="split-img-overlay" />
          </div>
          <div className="split-text">
            <div className="split-label">💰 Offres exclusives</div>
            <h2 className="split-title">
              Jusqu'à <span>-20%</span> sur<br />les véhicules d'occasion
            </h2>
            <p className="split-desc">
              Profitez de nos meilleures offres du moment sur une sélection de véhicules premium soigneusement inspectés, garantis 12 mois et livrés en 48h.
            </p>
            <div className="split-chips">
              <span className="split-chip">✓ Garantie incluse</span>
              <span className="split-chip">✓ Historique vérifié</span>
              <span className="split-chip">✓ Livraison 48h</span>
            </div>
            <div className="split-stats">
              <div className="split-stat">
                <span className="split-stat-val">200+</span>
                <span className="split-stat-lbl">Véhicules en promo</span>
              </div>
              <div className="split-stat-div" />
              <div className="split-stat">
                <span className="split-stat-val">-20%</span>
                <span className="split-stat-lbl">Remise maximale</span>
              </div>
              <div className="split-stat-div" />
              <div className="split-stat">
                <span className="split-stat-val">48h</span>
                <span className="split-stat-lbl">Délai livraison</span>
              </div>
            </div>
            <button className="split-btn-primary" onClick={() => navigate('/cars')}>
              🔥 Voir les offres →
            </button>
          </div>
        </div>

        {/* ── Bloc 2 : Texte gauche, image droite ── */}
        <div className="split-row split-row-reverse">
          <div className="split-text split-text-dark">
            <div className="split-label split-label-light">🚗 Essai gratuit</div>
            <h2 className="split-title split-title-light">
              Essayez avant<br /><span className="split-span-cyan">d'acheter</span>
            </h2>
            <p className="split-desc split-desc-light">
              Réservez un essai gratuit directement depuis la fiche de n'importe quel véhicule. Sans engagement, confirmation SMS en moins d'une heure.
            </p>
            <div className="split-steps-list">
              {[
                { num: '1', text: 'Choisissez votre véhicule' },
                { num: '2', text: 'Réservez votre créneau en ligne' },
                { num: '3', text: 'Essayez — sans engagement' },
              ].map(s => (
                <div key={s.num} className="split-step-item">
                  <div className="split-step-num">{s.num}</div>
                  <span className="split-step-text">{s.text}</span>
                </div>
              ))}
            </div>
            <button
              className="split-btn-outline"
              onClick={() => navigate('/garage')}
              style={{
                background: 'linear-gradient(135deg, #8c37e2, #2558c6)',
                border: 'none',
                boxShadow: '0 4px 14px rgba(5,150,105,0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 28px rgba(5,150,105,0.45)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = '0 4px 14px rgba(5,150,105,0.3)';
              }}
            >
              🔧 Garage & Entretien
            </button>
          </div>
          <div className="split-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
              alt="Essai véhicule"
              className="split-img"
            />
            <div className="split-img-overlay split-img-overlay-right" />
            <div className="split-floating-card">
              <div className="split-fc-icon">⭐</div>
              <div>
                <div className="split-fc-title">4.9 / 5</div>
                <div className="split-fc-sub">Note moyenne des essais</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          NEW — Nos marques avec photos
      ══════════════════════════════════════════ */}
      <div className="brands-section">
        <div className="section-header">
          <div>
            <div className="section-label">🏷️ Marques</div>
            <h2 className="section-title">Explorez par marque</h2>
          </div>
        </div>
        <div className="brands-grid">
          {brands.map(b => (
            <div key={b.name}
              className={`brand-card${activeBrand === b.name ? ' active' : ''}`}
              onClick={() => { setActiveBrand(activeBrand === b.name ? null : b.name); navigate('/cars'); }}
            >
              <img src={b.image} alt={b.name} className="brand-img" />
              <div className="brand-overlay" />
              <div className="brand-info">
                <div className="brand-name">{b.name}</div>
                <div className="brand-count">{b.count} véhicules</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Comment ça marche (avec photos)
      ══════════════════════════════════════════ */}
      <div className="how-section">
        <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37,99,235,0.2)', color: '#93c5fd', padding: '5px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '14px' }}>
            🚀 Simple & rapide
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.5px' }}>
            Comment ça marche ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontSize: '0.95rem' }}>
            Trouvez et achetez votre voiture en 3 étapes simples
          </p>
        </div>
        <div className="how-grid">
          {steps.map((s, i) => (
            <div key={i} className="how-card">
              {i < steps.length - 1 && <div className="how-connector" />}
              <div className="how-img-wrap">
                <img src={s.img} alt={s.title} className="how-img" />
                <div className="how-img-overlay" />
                <div className="how-num">{s.num}</div>
                <div className="how-icon">{s.icon}</div>
              </div>
              <h3 className="how-title">{s.title}</h3>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="how-btn-wrap">
          <button className="how-btn" onClick={() => navigate('/cars')}>
            🚗 Commencer maintenant
          </button>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          NEW — Galerie photo mosaïque
      ══════════════════════════════════════════ */}
      <div className="gallery-section">
        <div className="section-header">
          <div>
            <div className="section-label">📸 Galerie</div>
            <h2 className="section-title">Nos véhicules en image</h2>
          </div>
          <button className="see-all-link" onClick={() => navigate('/cars')}>Voir le catalogue →</button>
        </div>
        <div className="gallery-grid">
          {[
            { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80', lbl: 'BMW Série 3' },
            { src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', lbl: 'Mercedes Classe C' },
            { src: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', lbl: 'Audi A4' },
            { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', lbl: 'Peugeot 508' },
            { src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80', lbl: 'Renault Mégane' },
          ].map((g, i) => (
            <div key={i} className="gallery-item" onClick={() => navigate('/cars')}>
              <img src={g.src} alt={g.lbl} />
              <div className="gallery-item-overlay" />
              <div className="gallery-item-label">🚗 {g.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Section financement
      ══════════════════════════════════════════ */}
      <div className="finance-section">
        <div className="finance-left">
          <div className="split-label split-label-light" style={{ marginBottom: '18px' }}>💳 Financement</div>
          <h2 className="finance-title">
            Votre véhicule,<br /><span>votre budget</span>
          </h2>
          <p className="finance-desc">
            Comptant, crédit auto, ou leasing LOA — nous adaptons chaque solution à votre situation. Réponse en 24h, sans frais de dossier.
          </p>
          <div className="finance-options">
            {[
              { icon: '💵', title: 'Comptant', sub: 'Paiement immédiat' },
              { icon: '💳', title: 'Crédit auto', sub: 'De 12 à 84 mois' },
              { icon: '🔄', title: 'LOA / LLD', sub: 'Loyer mensuel fixe' },
            ].map((o, i) => (
              <div key={i} className="finance-opt">
                <span className="finance-opt-icon">{o.icon}</span>
                <div className="finance-opt-title">{o.title}</div>
                <div className="finance-opt-sub">{o.sub}</div>
              </div>
            ))}
          </div>
          <button className="finance-cta" onClick={() => navigate('/contact')}>
            💬 Parler à un conseiller →
          </button>
        </div>
        <div className="finance-right">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
            alt="Financement automobile"
            className="finance-img"
          />
          <div className="finance-overlay" />
          <div className="finance-badge">
            <span className="finance-badge-icon">✅</span>
            <div>
              <div className="finance-badge-title">Réponse en 24h</div>
              <div className="finance-badge-sub">Sans frais de dossier</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Services cards avec images
      ══════════════════════════════════════════ */}
      <div className="services-section">
        <div className="section-header">
          <div>
            <div className="section-label">🔑 Nos services</div>
            <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          </div>
        </div>
        <div className="services-grid">
          {[
            {
              img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80',
              overlay: 'service-overlay-1', icon: '🛒', title: 'Achat de véhicule',
              desc: 'Plus de 5 000 véhicules neufs et d\'occasion sélectionnés. Financement, garantie et livraison inclus.',
              btn: 'Voir les véhicules', to: '/cars'
            },
            {
              img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80',
              overlay: 'service-overlay-2', icon: '💰', title: 'Vente de véhicule',
              desc: 'Estimez gratuitement la valeur de votre véhicule et vendez-le au meilleur prix en 48h.',
              btn: 'Obtenir une estimation', to: '/sell'
            },
            {
              img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=700&q=80',
              overlay: 'service-overlay-3', icon: '🔧', title: 'Service après-vente',
              desc: 'Notre équipe technique prend soin de votre véhicule. Entretien, réparation, révision 24/7.',
              btn: 'En savoir plus', to: '/contact'
            },
          ].map((s, i) => (
            <div key={i} className="service-card" onClick={() => navigate(s.to)}>
              <img src={s.img} alt={s.title} className="service-bg" />
              <div className={`service-overlay ${s.overlay}`} />
              <div className="service-content">
                <div className="service-icon-wrap">{s.icon}</div>
                <div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <button className="service-btn" onClick={(e) => { e.stopPropagation(); navigate(s.to); }}>
                    {s.btn} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Véhicule du mois
      ══════════════════════════════════════════ */}
      <div className="featured-month-section">
        <div className="featured-month-inner">
          <div className="fm-img-side">
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80"
              alt="Véhicule du mois"
              className="fm-img"
            />
            <div className="fm-img-overlay" />
            <div className="fm-ribbon">🏆 Véhicule du mois</div>
          </div>
          <div className="fm-text-side">
            <div className="fm-month-badge">⭐ Coup de cœur mars 2025</div>
            <h2 className="fm-title">Mercedes</h2>
            <div className="fm-subtitle">Classe C · 2023 · Hybride</div>
            <p className="fm-desc">
              Élégance, performance et technologie réunies. La Mercedes Classe C hybride rechargeable offre le meilleur des deux mondes — puissance et économie — dans une carrosserie sculptée à la perfection.
            </p>
            <div className="fm-specs">
              {[
                { icon: '⚡', lbl: 'Motorisation', val: 'Hybride 204ch' },
                { icon: '🛣️', lbl: 'Kilométrage', val: '5 000 km' },
                { icon: '📅', lbl: 'Année', val: '2023' },
                { icon: '⚙️', lbl: 'Boîte', val: 'Automatique' },
                { icon: '🎨', lbl: 'Couleur', val: 'Blanc Polaire' },
                { icon: '🚪', lbl: 'Portes', val: '4 portes' },
              ].map((s, i) => (
                <div key={i} className="fm-spec">
                  <div className="fm-spec-icon">{s.icon}</div>
                  <span className="fm-spec-label">{s.lbl}</span>
                  <span className="fm-spec-val">{s.val}</span>
                </div>
              ))}
            </div>
            <div className="fm-price-row">
              <div>
                <span className="fm-price">55 000 €</span>
                <span className="fm-price-old">62 000 €</span>
              </div>
              <button className="fm-cta" onClick={() => navigate('/cars')}>
                🚗 Voir ce véhicule →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEW — Partenaires & certifications
      ══════════════════════════════════════════ */}
      <div className="partners-section">
        <div className="partners-strip">
          <div className="partners-title">Nos partenaires & certifications</div>
          <div className="partners-logos">
            {[
              { icon: '🏦', name: 'BNP Paribas' },
              { icon: '🛡️', name: 'AXA Assurance' },
              { icon: '🔵', name: 'BMW Group' },
              { icon: '⭐', name: 'Mercedes-Benz' },
              { icon: '⚪', name: 'Audi AG' },
              { icon: '🔴', name: 'Toyota France' },
              { icon: '🦁', name: 'Stellantis' },
              { icon: '✅', name: 'Carpass Certifié' },
            ].map((p, i) => (
              <div key={i} className="partner-logo">
                <span className="partner-logo-icon">{p.icon}</span>
                <span className="partner-logo-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NEWSLETTER — Section complète
      ══════════════════════════════════════════ */} {/* ══════════════════════════════════════════
          NEWSLETTER — Section avec Axios
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', margin: '80px 0 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />

        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(37,99,235,0.6),rgba(6,182,212,0.3),rgba(15,23,42,0.8))' }} />

        {/* Glow spots */}
        <div style={{ position: 'absolute', top: '-80px', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(37,99,235,0.3),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(6,182,212,0.25),transparent 70%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px', margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', padding: '6px 18px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #34d399', animation: 'blink 1.5s infinite' }} />
            Newsletter exclusive
          </div>

          {/* Title */}
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, letterSpacing: '-0.5px', margin: '0 0 16px' }}>
            Les meilleures offres{' '}
            <span style={{ background: 'linear-gradient(90deg,#bfdbfe,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              dans votre boîte mail
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 40px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
            Nouvelles arrivées, promotions exclusives et conseils auto — chaque semaine, sans spam. Plus de <strong style={{ color: 'white' }}>{stats.totalCustomers}+ abonnés</strong> nous font déjà confiance.
          </p>

          {/* Message d'erreur */}
          {nlError && (
            <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>
              ⚠️ {nlError}
            </div>
          )}

          {/* Form */}
          {nlSubscribed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '14px', padding: '16px 28px', color: '#34d399', fontWeight: 700, fontSize: '1rem' }}>
              ✅ Parfait ! Vous êtes abonné avec succès.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', maxWidth: '520px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                placeholder="votre@email.com"
                value={nlEmail}
                onChange={e => setNlEmail(e.target.value)}
                disabled={nlLoading}
                style={{
                  flex: 1, minWidth: '220px', padding: '14px 18px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px', color: 'white',
                  fontSize: '0.95rem', fontFamily: 'Outfit,sans-serif',
                  outline: 'none', backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s',
                  opacity: nlLoading ? 0.7 : 1,
                  cursor: nlLoading ? 'not-allowed' : 'text'
                }}
                onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.2)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                onClick={handleNewsletterSubmit}
                disabled={nlLoading}
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                  color: 'white', border: 'none',
                  borderRadius: '12px', fontSize: '0.95rem',
                  fontWeight: 700, fontFamily: 'Outfit,sans-serif',
                  cursor: nlLoading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                  transition: 'all 0.3s',
                  opacity: nlLoading ? 0.7 : 1
                }}
                onMouseEnter={e => { if (!nlLoading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 28px rgba(37,99,235,0.55)'; } }}
                onMouseLeave={e => { if (!nlLoading) { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 14px rgba(37,99,235,0.4)'; } }}
              >
                {nlLoading ? 'Inscription...' : 'S\'abonner →'}
              </button>
            </div>
          )}

          {/* Trust row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['🔒 100% confidentiel', '📧 1 email / semaine', '🚫 Désabonnement en 1 clic'].map(t => (
              <span key={t} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          {/* Social proof avatars */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
            <div style={{ display: 'flex' }}>
              {['👩', '👨', '👩', '👨', '👩'].map((a, i) => (
                <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg,hsl(${i * 40 + 200},70%,50%),hsl(${i * 40 + 230},80%,60%))`, border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', marginLeft: i > 0 ? '-10px' : '0', zIndex: 5 - i }}>
                  {a}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
              +{stats.totalCustomers} abonnés nous font confiance
            </span>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="testimonials-section">
        <div style={{ textAlign: 'center', marginBottom: '36px', padding: '0 20px' }}>
          <div className="section-label">💬 Avis clients</div>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p style={{ color: '#64748b', marginTop: '10px', fontSize: '0.95rem' }}>Des milliers de clients nous font confiance chaque année</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: '#2563eb', fontSize: '0.78rem', fontWeight: 600 }}>{t.car}</div>
                </div>
              </div>
              <div className="stars">{[...Array(5)].map((_, i) => <span key={i} className={i < t.rating ? 'star-filled' : 'star-empty'}>★</span>)}</div>
              <p className="testimonial-comment">"{t.comment}"</p>
              <div className="testimonial-date">🗓 {new Date(t.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button className="btn-outline-blue" onClick={() => navigate('/testimonials')}>Voir tous les témoignages</button>
        </div>
      </div>

      {/* ── Why Us ── */}
      <div className="why-section">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37,99,235,0.2)', color: '#93c5fd', padding: '5px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '14px' }}>
              ✦ Nos engagements
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.5px' }}>Pourquoi nous choisir ?</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontSize: '0.95rem' }}>La qualité et la confiance avant tout</p>
          </div>
          <div className="why-grid">
            {whyUs.map((item, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;