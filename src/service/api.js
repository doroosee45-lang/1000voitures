// services/api.js (version tout axios)
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Service pour le comparateur
export const compareService = {
  getCompareCars: async (ids = []) => {
    try {
      const params = ids.length ? `?ids=${ids.join(',')}` : '';
      const response = await api.get(`/compare${params}`);
      return response.data;
    } catch (error) {
      console.error('Erreur compareService:', error);
      throw error;
    }
  }
};

// Service pour les voitures
export const carService = {
  getCars: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/cars?${params}`);
    return response.data;
  },

  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  createCar: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  addImages: async (id, formData) => {
    const response = await api.post(`/cars/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

// Service pour l'authentification
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Service pour les témoignages
export const testimonialService = {
  getTestimonials: async (filter = 'all') => {
    const response = await api.get(`/testimonials?filter=${filter}`);
    return response.data;
  },

  createTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  }
};

// Service pour les demandes de vente
export const sellService = {
  createRequest: async (requestData) => {
    const response = await api.post('/sell', requestData);
    return response.data;
  }
};

// Service pour les locations
export const rentalService = {
  createRental: async (rentalData) => {
    const response = await api.post('/rentals', rentalData);
    return response.data;
  },

  getMyRentals: async () => {
    const response = await api.get('/rentals/my-rentals');
    return response.data;
  },

  cancelRental: async (id) => {
    const response = await api.put(`/rentals/${id}/cancel`);
    return response.data;
  }
};

// Service pour les commandes
export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  }
};

// Service pour le garage
export const garageService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/garage', bookingData);
    return response.data;
  }
};

// Service pour le contact
export const contactService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  }
};

// Service pour le financement
export const financingService = {
  createRequest: async (requestData) => {
    const response = await api.post('/financing', requestData);
    return response.data;
  }
};

