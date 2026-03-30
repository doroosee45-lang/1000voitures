// components/ReservationModal.jsx
import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────
   Composant réutilisable — Modal de réservation 3 étapes
   Usage :
     <ReservationModal car={car} onClose={() => setModal(false)} />
───────────────────────────────────────────────────────── */

const STEPS = [
  { num: 1, lbl: 'Vos infos'    },
  { num: 2, lbl: 'Financement'  },
  { num: 3, lbl: 'Confirmation' },
];

const FINANCING = [
  { key: 'cash',    icon: '💵', lbl: 'Comptant'   },
  { key: 'credit',  icon: '💳', lbl: 'Crédit auto' },
  { key: 'leasing', icon: '🔄', lbl: 'Leasing LOA' },
];

const fmt = p => new Intl.NumberFormat('fr-FR').format(p) + ' €';

const EMPTY = {
  firstName: '', lastName: '', email: '',
  phone: '', date: '', financing: 'cash', message: '',
};

const ReservationModal = ({ car, onClose }) => {
  const [step, setStep]   = useState(1);
  const [done, setDone]   = useState(false);
  const [data, setData]   = useState(EMPTY);

  const change = e => setData(p => ({ ...p, [e.target.name]: e.target.value }));
  const next   = e => { e.preventDefault(); setStep(s => s + 1); };
  const submit = e => { e.preventDefault(); setDone(true); setTimeout(onClose, 5000); };
  const ref    = `AM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; }

        @keyframes fadeIn { from{opacity:0}           to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes pop    { 0%{transform:scale(.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }

        :root {
          --blue:   #2563eb;
          --blue2:  #3b82f6;
          --cyan:   #06b6d4;
          --green:  #059669;
          --green2: #10b981;
          --slate:  #0f172a;
          --muted:  #64748b;
          --border: #e2e8f0;
          --bg:     #f8fafc;
          --grad:   linear-gradient(135deg,#2563eb,#06b6d4);
          --grad-g: linear-gradient(135deg,#059669,#10b981);
        }

        /* ── overlay ── */
        .rm-overlay {
          position: fixed; inset: 0; z-index: 3000;
          background: rgba(15,23,42,.7); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px; animation: fadeIn .25s ease;
        }

        /* ── card ── */
        .rm-card {
          background: white; border-radius: 26px; width: 100%; max-width: 540px;
          max-height: 94vh; overflow-y: auto;
          box-shadow: 0 48px 120px rgba(15,23,42,.4);
          animation: fadeUp .32s cubic-bezier(.4,0,.2,1);
          scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent;
        }
        .rm-card::-webkit-scrollbar       { width: 4px; }
        .rm-card::-webkit-scrollbar-track { background: transparent; }
        .rm-card::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        /* ── header ── */
        .rm-hd {
          background: linear-gradient(135deg,#0f172a,#1e3a5f);
          border-radius: 26px 26px 0 0; padding: 26px 28px 22px;
          position: relative; overflow: hidden;
        }
        .rm-hd-glow {
          position: absolute; top: -50px; right: -50px; width: 200px; height: 200px;
          background: radial-gradient(circle,rgba(37,99,235,.35),transparent 70%);
          pointer-events: none;
        }
        .rm-hd-glow2 {
          position: absolute; bottom: -30px; left: -30px; width: 140px; height: 140px;
          background: radial-gradient(circle,rgba(6,182,212,.2),transparent 70%);
          pointer-events: none;
        }
        .rm-close {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
          color: white; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, transform .2s;
        }
        .rm-close:hover { background: rgba(255,255,255,.22); transform: rotate(90deg); }

        .rm-hd-title { font-size: 1.18rem; font-weight: 900; color: white; margin-bottom: 5px; position: relative; z-index: 1; }
        .rm-hd-sub   { font-size: .78rem; color: rgba(255,255,255,.5); position: relative; z-index: 1; }
        .rm-hd-pill  {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(37,99,235,.22); border: 1px solid rgba(37,99,235,.4);
          color: #93c5fd; padding: 5px 14px; border-radius: 99px;
          font-size: .72rem; font-weight: 700; margin-top: 12px; position: relative; z-index: 1;
        }

        /* ── stepper ── */
        .rm-stepper {
          display: flex; align-items: flex-start; padding: 20px 28px 0; gap: 0;
        }
        .rm-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .rm-step-row { display: flex; align-items: center; width: 100%; }
        .rm-circle {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; font-weight: 800;
          transition: background .3s, box-shadow .3s, transform .3s;
        }
        .rm-circle.done    { background: var(--grad); color: white; box-shadow: 0 3px 12px rgba(37,99,235,.35); }
        .rm-circle.active  { background: var(--grad); color: white; box-shadow: 0 3px 12px rgba(37,99,235,.35); transform: scale(1.12); }
        .rm-circle.pending { background: var(--bg); color: #94a3b8; border: 2px solid var(--border); }
        .rm-conn { flex: 1; height: 2px; transition: background .4s; margin-top: 0; }
        .rm-conn.done    { background: var(--grad); }
        .rm-conn.pending { background: var(--border); }
        .rm-slbl { font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; margin-top: 5px; }
        .rm-slbl.active  { color: var(--blue); }
        .rm-slbl.done    { color: var(--blue); }
        .rm-slbl.pending { color: #94a3b8; }

        /* ── body ── */
        .rm-body { padding: 22px 28px 28px; }

        /* ── form elements ── */
        .rm-label { display: block; font-size: .68rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 6px; }
        .rm-req   { color: #ef4444; margin-left: 2px; }
        .rm-input, .rm-select, .rm-textarea {
          width: 100%; padding: 11px 14px; border: 1.5px solid var(--border);
          border-radius: 11px; font-size: .9rem; color: var(--slate);
          font-family: 'Outfit',sans-serif; background: var(--bg);
          outline: none; transition: border-color .2s, box-shadow .2s, background .2s;
          margin-bottom: 14px;
        }
        .rm-input:focus, .rm-select:focus, .rm-textarea:focus {
          border-color: var(--blue); background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,.1);
        }
        .rm-input::placeholder, .rm-textarea::placeholder { color: #94a3b8; }
        .rm-textarea { resize: vertical; min-height: 84px; margin-bottom: 0; }
        .rm-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* ── financing options ── */
        .rm-fin-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 16px; }
        .rm-fin-opt {
          border: 1.5px solid var(--border); border-radius: 12px;
          padding: 16px 8px; text-align: center; cursor: pointer;
          background: var(--bg); transition: all .22s;
        }
        .rm-fin-opt:hover { border-color: var(--blue); background: #f0f6ff; }
        .rm-fin-opt.sel   { border-color: var(--blue); background: #eff6ff; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
        .rm-fin-icon  { font-size: 1.6rem; display: block; margin-bottom: 7px; }
        .rm-fin-label { font-size: .78rem; font-weight: 700; color: var(--muted); }
        .rm-fin-opt.sel .rm-fin-label { color: var(--blue); }

        /* ── summary card ── */
        .rm-summary {
          background: linear-gradient(135deg,#f0f9ff,#e8f4fd);
          border: 1px solid #bfdbfe; border-radius: 14px;
          padding: 18px 20px; margin-bottom: 16px;
        }
        .rm-sum-title { font-size: .68rem; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: .8px; margin-bottom: 12px; }
        .rm-sum-row   { display: flex; justify-content: space-between; align-items: center; font-size: .85rem; margin-bottom: 7px; }
        .rm-sum-row span:first-child { color: var(--muted); }
        .rm-sum-row span:last-child  { color: var(--slate); font-weight: 700; }
        .rm-sum-divider { height: 1px; background: #bfdbfe; margin: 12px 0; }
        .rm-sum-price {
          font-size: 1.6rem; font-weight: 900; letter-spacing: -1px;
          background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── nav buttons ── */
        .rm-nav { display: flex; gap: 10px; margin-top: 18px; }
        .rm-btn {
          flex: 1; padding: 13px 20px; color: white; border: none; border-radius: 99px;
          font-size: .95rem; font-weight: 700; font-family: 'Outfit',sans-serif;
          cursor: pointer; transition: transform .22s, box-shadow .22s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .rm-btn.blue  { background: var(--grad); box-shadow: 0 4px 16px rgba(37,99,235,.3); }
        .rm-btn.blue:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,99,235,.4); }
        .rm-btn.green { background: var(--grad-g); box-shadow: 0 4px 16px rgba(5,150,105,.3); }
        .rm-btn.green:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(5,150,105,.4); }
        .rm-btn-back {
          padding: 13px 20px; background: var(--bg); color: var(--muted);
          border: 1.5px solid var(--border); border-radius: 99px;
          font-size: .9rem; font-weight: 600; font-family: 'Outfit',sans-serif;
          cursor: pointer; transition: background .2s, color .2s;
        }
        .rm-btn-back:hover { background: var(--border); color: var(--slate); }

        /* ── notice ── */
        .rm-notice {
          display: flex; align-items: center; gap: 8px;
          background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px;
          padding: 10px 14px; margin-top: 14px; font-size: .75rem; color: #166534; font-weight: 600;
        }

        /* ── success ── */
        .rm-success { text-align: center; padding: 36px 20px; animation: fadeUp .4s ease; }
        .rm-success-ic {
          font-size: 4.5rem; margin-bottom: 16px; display: block;
          animation: pop .5s cubic-bezier(.4,0,.2,1) both;
        }
        .rm-success-ti  { font-size: 1.4rem; font-weight: 900; color: var(--slate); margin-bottom: 10px; }
        .rm-success-sub { font-size: .88rem; color: var(--muted); line-height: 1.7; margin-bottom: 22px; }
        .rm-success-ref {
          display: inline-flex; align-items: center; gap: 8px;
          background: #eff6ff; color: var(--blue);
          padding: 10px 22px; border-radius: 99px;
          font-size: .82rem; font-weight: 800; letter-spacing: .5px;
        }

        /* ── section title inside body ── */
        .rm-sec { font-size: .7rem; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }

        @media (max-width: 560px) {
          .rm-card   { border-radius: 20px; }
          .rm-body   { padding: 18px 18px 24px; }
          .rm-hd     { padding: 22px 18px 18px; }
          .rm-grid2  { grid-template-columns: 1fr; }
          .rm-fin-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="rm-card">

          {/* ── Header ── */}
          <div className="rm-hd">
            <div className="rm-hd-glow" />
            <div className="rm-hd-glow2" />
            <button className="rm-close" onClick={onClose}>✕</button>
            <div className="rm-hd-title">🛒 Commander ce véhicule</div>
            <div className="rm-hd-sub">Réservation sécurisée — Un conseiller vous rappelle sous 2h</div>
            {car && (
              <div className="rm-hd-pill">
                🚗 {car.brand} {car.model} {car.year} · {fmt(car.price)}
              </div>
            )}
          </div>

          {/* ── Stepper (masqué si done) ── */}
          {!done && (
            <div className="rm-stepper">
              {STEPS.map((s, idx) => (
                <div key={s.num} className="rm-step">
                  <div className="rm-step-row">
                    <div className={`rm-circle ${step > s.num ? 'done' : step === s.num ? 'active' : 'pending'}`}>
                      {step > s.num ? '✓' : s.num}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className={`rm-conn ${step > s.num ? 'done' : 'pending'}`} />
                    )}
                  </div>
                  <div className={`rm-slbl ${step > s.num ? 'done' : step === s.num ? 'active' : 'pending'}`}>
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Body ── */}
          <div className="rm-body">

            {/* ══ SUCCESS ══ */}
            {done ? (
              <div className="rm-success">
                <span className="rm-success-ic">🎉</span>
                <div className="rm-success-ti">Commande envoyée !</div>
                <p className="rm-success-sub">
                  Merci <strong>{data.firstName}</strong> !<br />
                  Un conseiller vous appellera sous 2h au <strong>{data.phone}</strong>.<br />
                  Un récapitulatif a été envoyé à <strong>{data.email}</strong>.
                </p>
                <div className="rm-success-ref">
                  📋 Réf : {ref}
                </div>
              </div>

            /* ══ ÉTAPE 1 — Coordonnées ══ */
            ) : step === 1 ? (
              <form onSubmit={next}>
                <div className="rm-sec">📋 Vos coordonnées</div>

                <div className="rm-grid2">
                  <div>
                    <label className="rm-label">Prénom <span className="rm-req">*</span></label>
                    <input className="rm-input" type="text" name="firstName" value={data.firstName} onChange={change} required placeholder="Jean" />
                  </div>
                  <div>
                    <label className="rm-label">Nom <span className="rm-req">*</span></label>
                    <input className="rm-input" type="text" name="lastName" value={data.lastName} onChange={change} required placeholder="Dupont" />
                  </div>
                </div>

                <label className="rm-label">Email <span className="rm-req">*</span></label>
                <input className="rm-input" type="email" name="email" value={data.email} onChange={change} required placeholder="jean@email.com" />

                <label className="rm-label">Téléphone <span className="rm-req">*</span></label>
                <input className="rm-input" type="tel" name="phone" value={data.phone} onChange={change} required placeholder="+33 6 00 00 00 00" />

                <label className="rm-label">Date de livraison souhaitée</label>
                <input className="rm-input" type="date" name="date" value={data.date} onChange={change} style={{ marginBottom: 0 }} />

                <div className="rm-nav">
                  <button type="submit" className="rm-btn blue">Étape suivante →</button>
                </div>
              </form>

            /* ══ ÉTAPE 2 — Financement ══ */
            ) : step === 2 ? (
              <form onSubmit={next}>
                <div className="rm-sec">💳 Mode de financement</div>

                <div className="rm-fin-grid">
                  {FINANCING.map(o => (
                    <div
                      key={o.key}
                      className={`rm-fin-opt${data.financing === o.key ? ' sel' : ''}`}
                      onClick={() => setData(p => ({ ...p, financing: o.key }))}
                    >
                      <span className="rm-fin-icon">{o.icon}</span>
                      <span className="rm-fin-label">{o.lbl}</span>
                    </div>
                  ))}
                </div>

                <label className="rm-label">Message / demandes particulières</label>
                <textarea
                  className="rm-textarea"
                  name="message"
                  value={data.message}
                  onChange={change}
                  placeholder="Reprise de votre véhicule, options souhaitées, livraison…"
                />

                <div className="rm-nav">
                  <button type="button" className="rm-btn-back" onClick={() => setStep(1)}>← Retour</button>
                  <button type="submit" className="rm-btn blue">Étape suivante →</button>
                </div>
              </form>

            /* ══ ÉTAPE 3 — Confirmation ══ */
            ) : (
              <form onSubmit={submit}>
                <div className="rm-sec">✅ Récapitulatif de commande</div>

                <div className="rm-summary">
                  <div className="rm-sum-title">📋 Détails</div>
                  {[
                    ['Véhicule',     car ? `${car.brand} ${car.model} ${car.year}` : '—'],
                    ['Client',       `${data.firstName} ${data.lastName}`],
                    ['Email',        data.email],
                    ['Téléphone',    data.phone],
                    ['Livraison',    data.date || 'À convenir'],
                    ['Financement',  { cash: 'Comptant', credit: 'Crédit auto', leasing: 'Leasing LOA' }[data.financing]],
                  ].map(([k, v]) => (
                    <div key={k} className="rm-sum-row">
                      <span>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                  {data.message && (
                    <div className="rm-sum-row">
                      <span>Message</span>
                      <span style={{ maxWidth: '200px', textAlign: 'right', fontSize: '.8rem' }}>{data.message}</span>
                    </div>
                  )}
                  <div className="rm-sum-divider" />
                  <div className="rm-sum-price">{car ? fmt(car.price) : '—'}</div>
                </div>

                <div className="rm-notice">
                  🔒 Aucun paiement à cette étape — Un conseiller vous recontacte sous 2h
                </div>

                <div className="rm-nav">
                  <button type="button" className="rm-btn-back" onClick={() => setStep(2)}>← Retour</button>
                  <button type="submit" className="rm-btn green">✅ Confirmer la commande</button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationModal;