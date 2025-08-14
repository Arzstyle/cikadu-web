import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NewsPage from '../pages/NewsPage';
import NewsDetailPage from '../pages/NewsDetailPage';
import BusinessPage from '../pages/BusinessPage';
import MapPage from '../pages/MapPage';
import ContactPage from '../pages/ContactPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#059669',
              color: '#ffffff',
            },
            success: {
              iconTheme: {
                primary: '#ffffff',
                secondary: '#059669',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default AppRouter;