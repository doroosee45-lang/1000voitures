// pages/Compare.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Compare = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState('');

  const specifications = [
    { key: 'price', label: 'Prix', format: '€' },
    { key: 'power', label: 'Puissance', format: 'ch' },
    { key: 'fuel', label: 'Carburant', format: '' },
    { key: 'consumption', label: 'Consommation', format: 'L/100km' },
    { key: 'acceleration', label: '0-100 km/h', format: 's' }
  ];

  // Charger les voitures pour la comparaison
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/cars?limit=10`);
        
        // Transformer les données pour le format de comparaison
        const compareCars = response.data.cars.map(car => ({
          id: car._id,
          brand: car.brand,
          model: car.model,
          price: car.price,
          power: car.power || `${Math.floor(Math.random() * 100 + 100)} ch`,
          fuel: car.fuel,
          consumption: car.consumption || `${(Math.random() * 3 + 4).toFixed(1)} L/100km`,
          acceleration: car.acceleration || `${(Math.random() * 3 + 5).toFixed(1)}s`,
          image: car.images?.[0]?.url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200'
        }));

        setCars(compareCars.slice(0, 3)); // Prendre les 3 premières pour la comparaison
        setAvailableCars(compareCars);
      } catch (err) {
        console.error('Erreur lors du chargement des voitures:', err);
        setError('Impossible de charger les voitures');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleAddCar = () => {
    if (!selectedCarId) return;
    
    const carToAdd = availableCars.find(car => car.id === selectedCarId);
    if (carToAdd && !cars.some(car => car.id === carToAdd.id)) {
      setCars([...cars, carToAdd]);
    }
    setSelectedCarId('');
  };

  const handleRemoveCar = (carId) => {
    if (cars.length > 1) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' €';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-['Outfit']">
        <div className="w-11 h-11 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-gray-400 text-sm font-medium">Chargement des véhicules…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 px-5 font-['Outfit']">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Erreur</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="font-['Outfit'] bg-gray-50 min-h-screen py-12 px-4">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3">
          Comparateur de voitures
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto">
          Comparez les modèles côte à côte pour faire le meilleur choix
        </p>
      </div>

      {/* Tableau de comparaison */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* En-tête du tableau */}
          <div className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-gray-200">
            <div className="p-6 font-bold text-gray-500 text-sm uppercase tracking-wide">
              Caractéristiques
            </div>
            {cars.map(car => (
              <div key={car.id} className="p-6 text-center relative group">
                {/* Bouton supprimer */}
                {cars.length > 1 && (
                  <button
                    onClick={() => handleRemoveCar(car.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                  >
                    ✕
                  </button>
                )}
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-32 h-24 object-cover rounded-lg mx-auto mb-3"
                />
                <div className="font-bold text-slate-900">{car.brand}</div>
                <div className="text-sm text-gray-500">{car.model}</div>
              </div>
            ))}
          </div>

          {/* Lignes de spécifications */}
          {specifications.map(spec => (
            <div key={spec.key} className="grid grid-cols-[200px_1fr_1fr_1fr] border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-5 font-semibold text-gray-700">
                {spec.label}
              </div>
              {cars.map(car => (
                <div key={car.id} className="p-5 text-center text-gray-800">
                  {spec.key === 'price' ? formatPrice(car[spec.key]) : `${car[spec.key]} ${spec.format}`}
                </div>
              ))}
            </div>
          ))}

          {/* Ligne des boutons commander */}
          <div className="grid grid-cols-[200px_1fr_1fr_1fr] bg-gray-50">
            <div className="p-6"></div>
            {cars.map(car => (
              <div key={car.id} className="p-6 text-center">
                <button
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  Commander
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ajouter une voiture */}
        {availableCars.length > cars.length && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            >
              <option value="">Ajouter un modèle à comparer...</option>
              {availableCars
                .filter(car => !cars.some(c => c.id === car.id))
                .map(car => (
                  <option key={car.id} value={car.id}>
                    {car.brand} {car.model}
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddCar}
              disabled={!selectedCarId}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;