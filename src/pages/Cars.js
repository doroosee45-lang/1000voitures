// pages/Cars.js
import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { carService } from '../service/api';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '', 
    minPrice: '', 
    maxPrice: '',
    fuel: '', 
    transmission: '', 
    year: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 1
  });

  // Charger les voitures depuis l'API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construire les filtres pour l'API
        const apiFilters = {};
        if (filters.brand) apiFilters.brand = filters.brand;
        if (filters.minPrice) apiFilters.minPrice = filters.minPrice;
        if (filters.maxPrice) apiFilters.maxPrice = filters.maxPrice;
        if (filters.fuel) apiFilters.fuel = filters.fuel;
        if (filters.transmission) apiFilters.transmission = filters.transmission;
        if (filters.year) apiFilters.year = filters.year;
        
        // Ajouter la pagination
        apiFilters.page = pagination.page;
        apiFilters.limit = 12;
        
        const data = await carService.getCars(apiFilters);
        setCars(data.cars || []);
        setPagination({
          page: data.page || 1,
          total: data.total || 0,
          pages: data.pages || 1
        });
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement des voitures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, pagination.page]); // Recharger quand les filtres ou la page changent

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    // Réinitialiser la page à 1 quand on change les filtres
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({ brand: '', minPrice: '', maxPrice: '', fuel: '', transmission: '', year: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

        .cars-page { background: #f8fafc; min-height: 100vh; }

        .filter-bar {
          background: white;
          border-bottom: 1px solid #f1f5f9;
          padding: 20px 32px;
          position: sticky;
          top: 68px;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(37,99,235,0.06);
        }
        .filter-bar-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
          margin-right: 4px;
        }
        .filter-input {
          padding: 9px 13px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          background: #f8fafc;
          outline: none;
          transition: all 0.2s;
          min-width: 130px;
        }
        .filter-input:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .filter-input::placeholder { color: #94a3b8; }

        .filter-select {
          padding: 9px 30px 9px 13px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #0f172a;
          font-family: 'Outfit', sans-serif;
          background: #f8fafc;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: all 0.2s;
          min-width: 130px;
        }
        .filter-select:focus {
          border-color: #2563eb;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }

        .btn-reset {
          padding: 9px 18px;
          background: #f1f5f9;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-reset:hover { background: #e2e8f0; color: #0f172a; }

        .results-bar {
          max-width: 1400px;
          margin: 28px auto 20px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .results-count {
          display: flex; align-items: center; gap: 10px;
        }
        .results-badge {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 99px;
          letter-spacing: 0.3px;
        }
        .results-label {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          gap: 16px;
        }
        .spinner {
          width: 44px; height: 44px;
          border: 3px solid #e2e8f0;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .spinner-text {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #94a3b8;
        }
        .empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .empty-title { font-size: 1.2rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .empty-sub { font-size: 0.9rem; }

        .error-state {
          text-align: center;
          padding: 80px 20px;
          color: #dc2626;
        }
        .error-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .error-title { font-size: 1.2rem; font-weight: 700; color: #dc2626; margin-bottom: 8px; }
        .error-sub { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 40px 20px;
        }
        .page-btn {
          padding: 8px 14px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .page-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }
        .page-btn.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }
        .page-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cars-grid > * {
          border-radius: 0 !important;
          box-shadow: none !important;
          border-right: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }
        .cars-grid > *:hover {
          box-shadow: inset 0 0 0 2px #2563eb !important;
          z-index: 2;
          position: relative;
        }

        @media (max-width: 768px) {
          .filter-bar { padding: 14px 16px; top: 60px; }
          .cars-grid { grid-template-columns: 1fr; }
          .results-bar { padding: 0 16px; }
          .pagination { flex-wrap: wrap; }
        }
      `}</style>

      <div className="cars-page">

        <HeroSection />

        <div className="filter-bar">
          <div className="filter-bar-inner">
            <span className="filter-label">🔍 Filtres</span>

            <input
              className="filter-input"
              type="text"
              name="brand"
              placeholder="Marque"
              value={filters.brand}
              onChange={handleFilterChange}
            />
            <input
              className="filter-input"
              type="number"
              name="minPrice"
              placeholder="Prix min €"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              className="filter-input"
              type="number"
              name="maxPrice"
              placeholder="Prix max €"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
            <select className="filter-select" name="fuel" value={filters.fuel} onChange={handleFilterChange}>
              <option value="">Carburant</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
            </select>
            <select className="filter-select" name="transmission" value={filters.transmission} onChange={handleFilterChange}>
              <option value="">Boîte</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>
            <input
              className="filter-input"
              type="number"
              name="year"
              placeholder="Année"
              value={filters.year}
              onChange={handleFilterChange}
              style={{ maxWidth: '100px' }}
            />
            <button className="btn-reset" onClick={resetFilters}>
              ✕ Réinitialiser
            </button>
          </div>
        </div>

        {!loading && !error && (
          <div className="results-bar">
            <div className="results-count">
              <span className="results-badge">{pagination.total}</span>
              <span className="results-label">
                {pagination.total <= 1 ? 'véhicule trouvé' : 'véhicules trouvés'}
              </span>
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500 }}>
              Mis à jour aujourd'hui
            </span>
          </div>
        )}

        {loading ? (
          <div className="spinner-wrap">
            <div className="spinner" />
            <span className="spinner-text">Chargement des véhicules…</span>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <div className="error-title">Erreur de chargement</div>
            <p className="error-sub">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Réessayer
            </button>
          </div>
        ) : cars.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Aucun véhicule trouvé</div>
            <div className="empty-sub">Essayez de modifier vos filtres</div>
          </div>
        ) : (
          <>
            <div className="cars-grid">
              {cars.map(car => (
                <CarCard key={car._id || car.id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  className={`page-btn ${pagination.page === 1 ? 'disabled' : ''}`}
                  onClick={() => pagination.page > 1 && handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  ←
                </button>
                
                {[...Array(pagination.pages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Afficher seulement quelques pages autour de la page courante
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.pages ||
                    (pageNum >= pagination.page - 2 && pageNum <= pagination.page + 2)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        className={`page-btn ${pagination.page === pageNum ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === pagination.page - 3 ||
                    pageNum === pagination.page + 3
                  ) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  className={`page-btn ${pagination.page === pagination.pages ? 'disabled' : ''}`}
                  onClick={() => pagination.page < pagination.pages && handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
};

export default Cars;