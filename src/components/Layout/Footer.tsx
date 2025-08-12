import React from 'react';
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Home,
  Info,
  Newspaper,
  Briefcase,
  Map,
  MessageCircle,
} from 'lucide-react';

// Import logo sebagai URL - sesuaikan path dengan struktur folder
import logoUrl from '../../assets/logo-circle.svg';

const Footer = () => {
  // Navigation items dengan icon yang sesuai
  const navItems = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Tentang', path: '/about', icon: Info },
    { name: 'Berita', path: '/news', icon: Newspaper },
    { name: 'Ekonomi', path: '/business', icon: Briefcase },
    { name: 'Peta', path: '/map', icon: Map },
    { name: 'Kontak', path: '/contact', icon: MessageCircle },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand dengan Logo SVG */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-0">
              <img
                src={logoUrl}
                alt="Logo Desa Cikadu"
                className="h-12 w-12 lg:h-14 lg:w-14"
              />
              <span className="text-xl lg:text-2xl font-bold">Desa Cikadu</span>
            </div>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              Temukan keajaiban dan pesona budaya desa kami melalui pengalaman
              interaktif yang menakjubkan dan koneksi komunitas yang menghangatkan hati.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={handleScrollToTop}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors duration-200"
              >
                Kembali ke Atas
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white">
              Tautan Cepat
            </h3>
            <ul className="space-y-2 lg:space-y-3">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all duration-200 text-sm lg:text-base group w-full text-left"
                    >
                      <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white">
              Informasi Kontak
            </h3>
            <ul className="space-y-3 text-sm lg:text-base">
              <li className="flex items-start space-x-0 text-gray-400">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-10 w-8 lg:h-6 lg:w-6 mt-0.5 flex-shrink-0"
                />
                <span className="leading-relaxed">
                  Desa Cikadu, Kecamatan Pelabuhanratu, Kabupaten Sukabumi, Jawa Barat
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-green-400 flex-shrink-0" />
                <a
                  href="tel:+62123456789"
                  className="hover:text-green-400 transition-colors hover:underline"
                >
                  +62 123-456-789
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-green-400 flex-shrink-0" />
                <a
                  href="mailto:info@desacikadu.id"
                  className="hover:text-green-400 transition-colors break-all hover:underline"
                >
                  info@desacikadu.id
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => handleNavigation('/contact')}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Hubungi Kami</span>
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3 lg:space-y-4">
            <h3 className="text-base lg:text-lg font-semibold text-white">
              Ikuti Kami
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/desacikadu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 group"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com/desacikadu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-pink-600 transition-all duration-200 hover:scale-105 group"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/desacikadu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-sky-500 transition-all duration-200 hover:scale-105 group"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <p className="text-xs lg:text-sm text-gray-400 mt-2">
              Tetap terhubung dengan kami melalui media sosial untuk mendapatkan
              informasi terkini tentang kegiatan dan keajaiban desa.
            </p>
          </div>
        </div>

        {/* Copyright & Additional Links */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-xs lg:text-sm text-gray-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} Desa Cikadu. Dikembangkan dengan
              ❤️ untuk kemajuan masyarakat desa yang luar biasa.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-xs lg:text-sm">
              <button
                onClick={() => handleNavigation('/privacy')}
                className="text-gray-400 hover:text-green-400 transition-colors hover:underline"
              >
                Kebijakan Privasi
              </button>
              <button
                onClick={() => handleNavigation('/terms')}
                className="text-gray-400 hover:text-green-400 transition-colors hover:underline"
              >
                Syarat & Ketentuan
              </button>
              <button
                onClick={() => handleNavigation('/help')}
                className="text-gray-400 hover:text-green-400 transition-colors hover:underline"
              >
                Bantuan
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Website ini dibuat untuk memperkenalkan potensi luar biasa desa dan mendukung
              pengembangan ekonomi lokal yang berkelanjutan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;