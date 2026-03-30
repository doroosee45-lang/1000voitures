// components/CarCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat('fr-FR').format(price) + ' €';

  const fuelIcon = { Essence: '⛽', Diesel: '🛢️', Hybride: '🔋', Électrique: '⚡' };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* ── Wrapper pour l'espacement entre cards ── */
        .car-card-wrapper {
          padding: 12px;
          background: #f8fafc;
        }

        .car-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.35s cubic-bezier(.4,0,.2,1);
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(37,99,235,0.06), 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid #f1f5f9;
          height: 100%;
        }
        .car-card:hover {
          box-shadow: 0 20px 50px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.06) !important;
          transform: translateY(-6px);
          border-color: #bfdbfe;
          z-index: 3;
        }

        .car-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #f1f5f9;
          border-radius: 16px 16px 0 0;
        }
        .car-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.4,0,.2,1);
        }
        .car-card:hover .car-img { transform: scale(1.06); }

        .car-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.55) 100%);
          transition: opacity 0.3s; opacity: 0;
        }
        .car-card:hover .car-img-overlay { opacity: 1; }

        .car-badge {
          position: absolute; top: 12px; left: 12px;
          padding: 4px 12px; border-radius: 99px;
          font-size: 0.68rem; font-weight: 800; letter-spacing: 1px;
          text-transform: uppercase; backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .car-badge.new  { background: rgba(5,150,105,0.9);  color: white; }
        .car-badge.used { background: rgba(245,158,11,0.9); color: white; }

        .car-quick-view {
          position: absolute; bottom: 14px; left: 50%;
          transform: translateX(-50%) translateY(8px);
          opacity: 0; transition: all 0.3s;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.4);
          color: white; padding: 7px 18px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer; backdrop-filter: blur(8px); white-space: nowrap;
        }
        .car-card:hover .car-quick-view {
          opacity: 1; transform: translateX(-50%) translateY(0);
        }

        .car-body {
          padding: 20px 20px 18px;
          flex: 1; display: flex; flex-direction: column;
        }
        .car-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 4px;
        }
        .car-title { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.3px; }
        .car-year {
          font-size: 0.75rem; font-weight: 600; color: #94a3b8;
          background: #f1f5f9; padding: 3px 9px; border-radius: 99px; white-space: nowrap;
        }
        .car-location {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.78rem; color: #94a3b8; font-weight: 500; margin-bottom: 14px;
        }

        .car-specs {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
          padding: 12px 0;
          border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;
          margin-bottom: 16px;
        }
        .car-spec {
          text-align: center; padding: 6px 4px; border-radius: 8px; transition: background 0.2s;
        }
        .car-card:hover .car-spec { background: #f8fafc; }
        .car-spec-icon  { font-size: 1rem; margin-bottom: 2px; }
        .car-spec-label {
          font-size: 0.62rem; color: #94a3b8; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;
        }
        .car-spec-value { font-size: 0.82rem; font-weight: 700; color: #0f172a; }

        .car-footer {
          display: flex; justify-content: space-between; align-items: center; margin-top: auto;
        }
        .car-price-label {
          font-size: 0.65rem; color: #94a3b8; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 1px;
        }
        .car-price { font-size: 1.4rem; font-weight: 900; color: #2563eb; letter-spacing: -0.5px; line-height: 1; }

        .car-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white; border: none; border-radius: 99px;
          font-size: 0.82rem; font-weight: 700; font-family: 'Outfit', sans-serif;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 3px 10px rgba(37,99,235,0.25); white-space: nowrap;
        }
        .car-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,99,235,0.4); }
        .car-btn:active { transform: translateY(0); }
      `}</style>

      <div className="car-card-wrapper">
        <div
          className="car-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => navigate(`/car/${car._id || car.id}`)}
        >
          <div className="car-img-wrap">
            <img 
              src={car.images?.[0]?.url || car.image} 
              alt={`${car.brand} ${car.model}`} 
              className="car-img" 
            />
            <div className="car-img-overlay" />
            <span className={`car-badge ${car.isNewCar || car.isNew ? 'new' : 'used'}`}>
              {car.isNewCar || car.isNew ? '✦ Neuf' : '◈ Occasion'}
            </span>
            <button 
              className="car-quick-view" 
              onClick={(e) => { e.stopPropagation(); navigate(`/car/${car._id || car.id}`); }}
            >
              👁 Voir le détail
            </button>
          </div>

          <div className="car-body">
            <div className="car-header">
              <h3 className="car-title">{car.brand} {car.model}</h3>
              <span className="car-year">{car.year}</span>
            </div>
            <div className="car-location"><span>📍</span> {car.location || 'Paris'}</div>

            <div className="car-specs">
              <div className="car-spec">
                <div className="car-spec-icon">🛣️</div>
                <span className="car-spec-label">Km</span>
                <span className="car-spec-value">{new Intl.NumberFormat('fr-FR').format(car.mileage)}</span>
              </div>
              <div className="car-spec">
                <div className="car-spec-icon">{fuelIcon[car.fuel] || '⛽'}</div>
                <span className="car-spec-label">Carburant</span>
                <span className="car-spec-value">{car.fuel}</span>
              </div>
              <div className="car-spec">
                <div className="car-spec-icon">⚙️</div>
                <span className="car-spec-label">Boîte</span>
                <span className="car-spec-value">{car.transmission}</span>
              </div>
            </div>

            <div className="car-footer">
              <div>
                <span className="car-price-label">Prix</span>
                <div className="car-price">{formatPrice(car.price)}</div>
              </div>
              <button 
                className="car-btn" 
                onClick={(e) => { e.stopPropagation(); navigate(`/car/${car._id || car.id}`); }}
              >
                Voir l'offre →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCard;