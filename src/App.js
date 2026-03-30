// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import des pages
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Financing from './pages/Financing';
import Testimonials from './pages/Testimonials';
import SellCar from './pages/SellCar';
import Compare from './pages/Compare';
import Garage from './pages/Garage';
import Location from './pages/Location'; 
import Auth from './pages/Auth'; 
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/sell" element={<SellCar />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/garage" element={<Garage />} />
               <Route path="/location" element={<Location />} />
               <Route path="/dashboard" element={<Dashboard />} />
         

               
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;