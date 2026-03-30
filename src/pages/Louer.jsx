// // pages/Location.jsx — version finale connectée au backend
// import React, { useState, useEffect } from 'react';

// /* ─── Config API ─────────────────────────────────────── */
// const API_BASE = 'http://localhost:5000/api';

// /* ─── Constantes ─────────────────────────────────────── */
// const CATEGORIES  = ['Tous', 'Premium', 'Luxe', 'Sport', 'Électrique', 'SUV Luxe'];
// const AVANTAGES   = [
//   { icon: '🛡️', title: 'Assurance incluse',    desc: 'Tous risques, assistance 24/7 inclus dans chaque location.' },
//   { icon: '⛽', title: 'Carburant offert',      desc: 'Premier plein offert sur toutes les locations longue durée.' },
//   { icon: '🔑', title: 'Remise en main propre', desc: "Votre véhicule livré à l'adresse de votre choix." },
//   { icon: '📱', title: 'App dédiée',            desc: "Gérez votre location, GPS, et assistance depuis l'app." },
// ];
// const STEPS     = [{ num: 1, lbl: 'Vos infos' }, { num: 2, lbl: 'Options' }, { num: 3, lbl: 'Confirmation' }];
// const INSURANCE = [
//   { key: 'standard', icon: '🛡️', lbl: 'Standard', price: 'Incluse'  },
//   { key: 'premium',  icon: '⭐',  lbl: 'Premium',  price: '+15€/j'  },
//   { key: 'vip',      icon: '💎',  lbl: 'VIP',      price: '+29€/j'  },
// ];
// const PICKUPS   = ['Paris - Showroom', 'Lyon - Agence', 'Livraison à domicile', 'Aéroport CDG'];

// const fuelIcon  = { Essence: '⛽', Diesel: '🛢️', Hybride: '🔋', Électrique: '⚡' };
// const catColor  = { Premium: '#2563eb', Luxe: '#7c3aed', Sport: '#dc2626', Électrique: '#059669', 'SUV Luxe': '#b45309' };
// const priceKey  = { day: 'priceDay', week: 'priceWeek', month: 'priceMonth' };
// const periodLbl = { day: '/ jour', week: '/ semaine', month: '/ mois' };
// const fmt       = p => new Intl.NumberFormat('fr-FR').format(p) + ' €';
// const EMPTY     = {
//   name: '', email: '', phone: '',
//   dateStart: '', dateEnd: '',
//   pickupLocation: 'Paris - Showroom',
//   insurance: 'standard',
//   message: '',
// };

// /* ─── Component ──────────────────────────────────────── */
// const Location = () => {
//   const [cat,      setCat]      = useState('Tous');
//   const [period,   setPeriod]   = useState('day');
//   const [modal,    setModal]    = useState(null);
//   const [step,     setStep]     = useState(1);
//   const [done,     setDone]     = useState(false);
//   const [form,     setForm]     = useState(EMPTY);
//   const [ref,      setRef]      = useState('');
//   const [error,    setError]    = useState('');
//   const [loading,  setLoading]  = useState(false);
//   const [cars,     setCars]     = useState([]);
//   const [fetching, setFetching] = useState(true);

//   /* ── Charger les voitures ─────────────────────────── */
//   useEffect(() => {
//     setFetching(true);
//     fetch(`${API_BASE}/location/cars`)
//       .then(r => r.json())
//       .then(data => { if (data.success) setCars(data.data); })
//       .catch(() => {})
//       .finally(() => setFetching(false));
//   }, []);

//   const filtered = cat === 'Tous' ? cars : cars.filter(c => c.category === cat);

//   /* ── Modal ────────────────────────────────────────── */
//   const openModal  = car => { setModal(car); setStep(1); setDone(false); setForm(EMPTY); setError(''); };
//   const closeModal = ()  => setModal(null);
//   const onChange   = e   => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
//   const nextStep   = e   => { e.preventDefault(); setStep(s => s + 1); };

//   /* ── Soumettre la réservation → POST /api/location/bookings ── */
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const res = await fetch(`${API_BASE}/location/bookings`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           carId:  modal._id,
//           period,
//           ...form,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         setError(data.message || 'Une erreur est survenue');
//         return;
//       }

//       setRef(data.reference);
//       setDone(true);
//       setTimeout(closeModal, 5500);

//     } catch {
//       setError('Impossible de contacter le serveur. Réessayez.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── Rendu ────────────────────────────────────────── */
//   return (
//     <div className="font-['Outfit'] bg-gray-50 min-h-screen pb-20">

//       {/* ════ HERO ════ */}
//       <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center animate-[heroZoom_18s_ease-in-out_infinite_alternate] brightness-105"
//           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=95')", transformOrigin: 'center' }} />
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-600/15 to-slate-900/20" />
//         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
//         <div className="relative z-10 w-full max-w-4xl mx-auto px-5 text-center">
//           <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide mb-6">
//             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
//             Location de véhicules premium
//           </div>
//           <h1 className="text-white font-black leading-tight mb-5 text-[clamp(2.5rem,6vw,4rem)] drop-shadow-lg">
//             Louez la voiture<br />de vos <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">rêves</span>
//           </h1>
//           <p className="text-white/95 text-lg max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
//             Flotte premium disponible dès aujourd'hui — livraison à domicile, assurance tous risques incluse, sans engagement.
//           </p>
//           <div className="flex gap-4 justify-center flex-wrap">
//             <button onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}
//               className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20">
//               🚗 Voir la flotte
//             </button>
//             <button className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 hover:-translate-y-1 transition-all">
//               📞 Nous appeler
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ════ AVANTAGES ════ */}
//       <div className="bg-white border-y border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//             {AVANTAGES.map((a, i) => (
//               <div key={i} className="p-6 flex items-start gap-3.5 border-r last:border-r-0 border-gray-200 hover:bg-blue-50 transition-colors">
//                 <span className="text-3xl flex-shrink-0 mt-0.5">{a.icon}</span>
//                 <div>
//                   <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">{a.title}</h3>
//                   <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ════ FLOTTE ════ */}
//       <div className="max-w-7xl mx-auto px-4" id="fleet">
//         <div className="py-9 flex items-center justify-between gap-4 flex-wrap">
//           <div className="flex gap-2 flex-wrap">
//             {CATEGORIES.map(c => (
//               <button key={c} onClick={() => setCat(c)}
//                 className={`px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${cat === c ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'}`}>
//                 {c}
//               </button>
//             ))}
//           </div>
//           <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1">
//             {[['day','/ Jour'],['week','/ Semaine'],['month','/ Mois']].map(([k,l]) => (
//               <button key={k} onClick={() => setPeriod(k)}
//                 className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${period === k ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-blue-600'}`}>
//                 {l}
//               </button>
//             ))}
//           </div>
//         </div>

//         {fetching ? (
//           <div className="flex justify-center items-center py-24 gap-3 text-gray-400">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             Chargement de la flotte…
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
//             {filtered.map(car => (
//               <div key={car._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-200 transition-all">
//                 <div className="relative h-52 overflow-hidden">
//                   <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
//                   <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.68rem] font-extrabold tracking-wide uppercase text-white backdrop-blur-sm border border-white/25"
//                     style={{ background: (catColor[car.category] || '#2563eb') + 'cc' }}>{car.category}</span>
//                   <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[0.68rem] font-bold text-white backdrop-blur-sm border border-white/20"
//                     style={{ background: car.available ? 'rgba(5,150,105,.85)' : 'rgba(220,38,38,.75)' }}>
//                     {car.available ? '✓ Disponible' : '✗ Indisponible'}
//                   </span>
//                   <div className="absolute bottom-3 right-3 text-white font-black text-xl drop-shadow-lg">
//                     {fmt(car[priceKey[period]])}<span className="text-xs opacity-80 font-semibold"> {periodLbl[period]}</span>
//                   </div>
//                 </div>
//                 <div className="p-4 flex-1 flex flex-col gap-3.5">
//                   <div>
//                     <span className="font-black text-slate-900 text-lg tracking-tight">{car.brand} {car.model}</span>
//                     <span className="text-gray-500 text-sm ml-1.5 font-medium">{car.year}</span>
//                   </div>
//                   <div className="grid grid-cols-4 gap-2">
//                     {[
//                       { icon: fuelIcon[car.fuel]||'⛽', label:'Carburant', value: car.fuel },
//                       { icon: '⚙️', label:'Boîte', value: car.transmission==='Automatique'?'Auto':'Manu' },
//                       { icon: '👥', label:'Places', value: car.seats },
//                       { icon: '🛣️', label:'Km inclus', value: car.mileage },
//                     ].map((item,idx) => (
//                       <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-1 text-center">
//                         <div className="text-base mb-1">{item.icon}</div>
//                         <span className="text-[0.62rem] font-bold text-gray-500 uppercase tracking-wide block mb-0.5">{item.label}</span>
//                         <span className="text-xs font-extrabold text-slate-900">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex flex-wrap gap-1.5">
//                     {car.features.slice(0,4).map((f,i) => (
//                       <span key={i} className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">✓ {f}</span>
//                     ))}
//                     {car.features.length > 4 && (
//                       <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold">+{car.features.length-4}</span>
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between gap-2.5 mt-auto pt-3.5 border-t border-gray-200">
//                     <div>
//                       <div className="text-blue-600 font-black text-2xl tracking-tight leading-none">{fmt(car[priceKey[period]])}</div>
//                       <div className="text-xs text-gray-500 mt-0.5">{periodLbl[period]} · TVA incluse</div>
//                     </div>
//                     <button disabled={!car.available} onClick={() => car.available && openModal(car)}
//                       className={`px-5 py-2 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap ${!car.available ? 'opacity-45 cursor-not-allowed' : ''}`}>
//                       {car.available ? '🔑 Réserver' : 'Indisponible'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ════ MODAL ════ */}
//       {modal && (
//         <div className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4"
//           onClick={e => e.target === e.currentTarget && closeModal()}>
//           <div className="bg-white rounded-3xl w-full max-w-md max-h-[93vh] overflow-y-auto shadow-2xl">

//             {/* Header modal */}
//             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-7 pb-5 relative overflow-hidden">
//               <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
//               <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">✕</button>
//               <h3 className="text-lg font-black text-white relative z-10 mb-1">🔑 Réserver ce véhicule</h3>
//               <p className="text-xs text-white/50 relative z-10">Confirmation instantanée · Annulation gratuite 48h avant</p>
//               <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-300 rounded-full text-xs font-bold relative z-10">
//                 🚗 {modal.brand} {modal.model} {modal.year} · {fmt(modal[priceKey[period]])} {periodLbl[period]}
//               </div>
//             </div>

//             {/* Stepper */}
//             {!done && (
//               <div className="flex items-start px-7 pt-5">
//                 {STEPS.map((s, idx) => (
//                   <div key={s.num} className="flex flex-col items-center flex-1">
//                     <div className="flex items-center w-full">
//                       <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : step === s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white scale-110' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'}`}>
//                         {step > s.num ? '✓' : s.num}
//                       </div>
//                       {idx < STEPS.length - 1 && (
//                         <div className={`flex-1 h-0.5 transition-all ${step > s.num ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-200'}`} />
//                       )}
//                     </div>
//                     <span className={`text-[0.6rem] font-bold uppercase tracking-wide mt-1 ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>{s.lbl}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="p-7">
//               {/* ── Succès ── */}
//               {done ? (
//                 <div className="text-center py-8">
//                   <span className="text-7xl block mb-4">🎉</span>
//                   <h3 className="text-2xl font-black text-slate-900 mb-2.5">Réservation confirmée !</h3>
//                   <p className="text-sm text-gray-500 leading-relaxed mb-5">
//                     Merci <span className="font-bold">{form.name}</span> ! Votre réservation pour le{' '}
//                     <span className="font-bold">{modal.brand} {modal.model}</span> est enregistrée.<br />
//                     Un conseiller vous contactera au <span className="font-bold">{form.phone}</span> sous 1h.
//                   </p>
//                   <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide">
//                     📋 Réf : {ref}
//                   </div>
//                 </div>

//               /* ── Étape 1 ── */
//               ) : step === 1 ? (
//                 <form onSubmit={nextStep}>
//                   <p className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">📋 Vos coordonnées</p>
//                   <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Nom complet <span className="text-red-500">*</span></label>
//                   <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5"
//                     type="text" name="name" value={form.name} onChange={onChange} required placeholder="Jean Dupont" />
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email <span className="text-red-500">*</span></label>
//                       <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5"
//                         type="email" name="email" value={form.email} onChange={onChange} required placeholder="jean@email.com" />
//                     </div>
//                     <div>
//                       <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Téléphone <span className="text-red-500">*</span></label>
//                       <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5"
//                         type="tel" name="phone" value={form.phone} onChange={onChange} required placeholder="+33 6 00 00 00 00" />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Début <span className="text-red-500">*</span></label>
//                       <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5"
//                         type="date" name="dateStart" value={form.dateStart} onChange={onChange} required />
//                     </div>
//                     <div>
//                       <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Fin <span className="text-red-500">*</span></label>
//                       <input className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all mb-3.5"
//                         type="date" name="dateEnd" value={form.dateEnd} onChange={onChange} required />
//                     </div>
//                   </div>
//                   <button type="submit" className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all mt-2">
//                     Étape suivante →
//                   </button>
//                 </form>

//               /* ── Étape 2 ── */
//               ) : step === 2 ? (
//                 <form onSubmit={nextStep}>
//                   <p className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">📍 Point de retrait</p>
//                   <div className="grid grid-cols-2 gap-2 mb-4">
//                     {PICKUPS.map(loc => (
//                       <div key={loc} onClick={() => setForm(p => ({ ...p, pickupLocation: loc }))}
//                         className={`border-2 rounded-lg py-2.5 px-2 text-center text-xs font-bold cursor-pointer transition-all ${form.pickupLocation === loc ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-blue-400 hover:bg-blue-50'}`}>
//                         {loc}
//                       </div>
//                     ))}
//                   </div>
//                   <p className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">🛡️ Assurance</p>
//                   <div className="grid grid-cols-3 gap-2 mb-3.5">
//                     {INSURANCE.map(o => (
//                       <div key={o.key} onClick={() => setForm(p => ({ ...p, insurance: o.key }))}
//                         className={`border-2 rounded-xl py-3.5 px-1 text-center cursor-pointer transition-all ${form.insurance === o.key ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-100' : 'border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'}`}>
//                         <span className="text-2xl block mb-1">{o.icon}</span>
//                         <span className="text-xs font-bold text-gray-500 block">{o.lbl}</span>
//                         <span className="text-[0.65rem] text-gray-400 block mt-0.5">{o.price}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <label className="block text-[0.68rem] font-bold text-gray-600 uppercase tracking-wide mb-1.5">Message (optionnel)</label>
//                   <textarea className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-y min-h-[80px]"
//                     name="message" value={form.message} onChange={onChange} placeholder="Demandes particulières…" />
//                   <div className="flex gap-2.5 mt-4">
//                     <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all">← Retour</button>
//                     <button type="submit" className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all">Étape suivante →</button>
//                   </div>
//                 </form>

//               /* ── Étape 3 ── */
//               ) : (
//                 <form onSubmit={onSubmit}>
//                   <p className="text-[0.7rem] font-extrabold text-gray-500 uppercase tracking-wider mb-3.5 pb-2 border-b border-gray-200">✅ Récapitulatif</p>
//                   <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 mb-3.5">
//                     <p className="text-[0.68rem] font-bold text-blue-600 uppercase tracking-wide mb-3">📋 Détails</p>
//                     {[
//                       ['Véhicule',  `${modal.brand} ${modal.model} ${modal.year}`],
//                       ['Tarif',     `${fmt(modal[priceKey[period]])} ${periodLbl[period]}`],
//                       ['Client',    form.name],
//                       ['Email',     form.email],
//                       ['Téléphone', form.phone],
//                       ['Période',   form.dateStart && form.dateEnd ? `${form.dateStart} → ${form.dateEnd}` : 'Non précisée'],
//                       ['Retrait',   form.pickupLocation],
//                       ['Assurance', { standard:'Standard (incluse)', premium:'Premium (+15€/j)', vip:'VIP (+29€/j)' }[form.insurance]],
//                     ].map(([k, v]) => (
//                       <div key={k} className="flex justify-between items-center text-sm mb-1.5">
//                         <span className="text-gray-500">{k}</span>
//                         <span className="text-slate-900 font-bold">{v}</span>
//                       </div>
//                     ))}
//                     <div className="h-px bg-blue-200 my-3" />
//                     <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//                       {fmt(modal[priceKey[period]])} <span className="text-xs font-semibold text-gray-500">{periodLbl[period]}</span>
//                     </div>
//                   </div>

//                   {error && (
//                     <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs font-semibold text-red-600 mb-3.5">
//                       ⚠️ {error}
//                     </div>
//                   )}

//                   <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2.5 text-xs font-semibold text-green-700 mb-3.5">
//                     🔒 Aucun paiement à cette étape · Un conseiller vous contacte sous 1h
//                   </div>

//                   <div className="flex gap-2.5">
//                     <button type="button" onClick={() => setStep(2)} disabled={loading}
//                       className="flex-1 py-3 px-5 bg-gray-100 text-gray-500 border-2 border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-50">
//                       ← Retour
//                     </button>
//                     <button type="submit" disabled={loading}
//                       className="flex-1 py-3 px-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
//                       {loading
//                         ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi…</>
//                         : '✅ Confirmer'
//                       }
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes heroZoom { from { transform: scale(1); } to   { transform: scale(1.08); } }
//         @keyframes fadeUp   { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
//         .animate-fadeUp { animation: fadeUp 0.9s ease-out; }
//         .animate-fadeIn { animation: fadeIn 0.22s ease; }
//       `}</style>
//     </div>
//   );
// };

// export default Location;