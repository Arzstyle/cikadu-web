import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Users,
  Building,
  Newspaper,
  Home,
} from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Newspaper,
      title: 'Program KKN Terbaru',
      description:
        'Saksikan program-program inovatif mahasiswa yang memberikan dampak nyata bagi kemajuan Desa Cikadu',
      path: '/news',
      gradient: 'from-blue-600 to-blue-700',
      bgColor:
        'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Building,
      title: 'Pemberdayaan Ekonomi',
      description:
        'Temukan inovasi UMKM dan pengembangan ekonomi kreatif yang memberdayakan masyarakat desa',
      path: '/business',
      gradient: 'from-emerald-600 to-emerald-700',
      bgColor:
        'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Home,
      title: 'Profil Desa Cikadu',
      description:
        'Pelajari sejarah panjang, budaya khas, dan potensi luar biasa dari Desa Cikadu yang membanggakan',
      path: '/about',
      gradient: 'from-violet-600 to-violet-700',
      bgColor:
        'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      icon: MapPin,
      title: 'Peta Kegiatan',
      description:
        'Jelajahi lokasi-lokasi strategis program KKN dan potensi wisata alam Desa Cikadu',
      path: '/map',
      gradient: 'from-orange-600 to-orange-700',
      bgColor:
        'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(31, 41, 55, 0.8) 50%, rgba(17, 24, 39, 0.85) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/3 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center text-white max-w-5xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            KKN Universitas Nusa Putra
            <span className="block text-emerald-400 drop-shadow-lg text-3xl md:text-5xl lg:text-6xl mt-2">
              Desa Cikadu 2025
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md"
          >
            Bergabunglah dengan mahasiswa KKN dalam membangun masa depan cerah
            Desa Cikadu melalui program-program inovatif yang berkelanjutan dan
            berdampak nyata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/news')}
              className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Jelajahi Program KKN
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => navigate('/about')}
              className="group px-8 py-4 border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-semibold text-lg rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              Tentang Desa
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <motion.div
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 font-semibold text-sm mb-6"
            >
              ✨ Program Unggulan KKN
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 dark:from-white dark:via-emerald-300 dark:to-white bg-clip-text text-transparent mb-6">
              Inovasi untuk Kemajuan Desa
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Melalui program KKN yang terstruktur dan inovatif, kami
              berkomitmen membangun Desa Cikadu yang lebih maju, mandiri, dan
              berkelanjutan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card
                  onClick={() => navigate(feature.path)}
                  className={`p-8 text-center h-full cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${feature.bgColor} backdrop-blur-sm relative overflow-hidden rounded-2xl`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  />

                  <div className="relative z-10">
                    <div className="mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 ${feature.bgColor} backdrop-blur-sm border border-white/20 shadow-md group-hover:shadow-lg transition-all duration-300`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon
                          className={`h-8 w-8 ${feature.iconColor}`}
                        />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>

                    <motion.div
                      className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-semibold">
                        Selengkapnya
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, 
        rgba(5, 150, 105, 0.95) 0%, 
        rgba(16, 185, 129, 0.9) 25%, 
        rgba(52, 211, 153, 0.85) 50%, 
        rgba(34, 197, 94, 0.9) 75%, 
        rgba(21, 128, 61, 0.95) 100%), 
        url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')`,
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-2xl backdrop-blur-sm"
          />

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full backdrop-blur-lg"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/10 to-transparent" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="w-full max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-8 border border-white/20 shadow-lg"
            >
              <span className="text-lg">🌟</span>
              <span>Bergabunglah dengan KKN</span>
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight text-center"
            >
              <span className="inline-block">Mari Wujudkan</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-white to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                Desa Cikadu yang Maju
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm text-center"
            >
              Ikuti perjalanan transformatif KKN Universitas Nusa Putra di Desa
              Cikadu.
              <span className="text-cyan-200 font-semibold">
                {' '}
                Bagikan ide kreatif Anda
              </span>
              , berkolaborasi dengan masyarakat, dan ciptakan dampak positif
              yang berkelanjutan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigate('/map')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-700 hover:bg-emerald-50 shadow-2xl hover:shadow-emerald-200/50 font-semibold rounded-xl transform transition-all duration-300 whitespace-nowrap text-base sm:text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Jelajahi Lokasi KKN
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => navigate('/contact')}
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/60 hover:border-white text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-md shadow-lg hover:shadow-white/20 transform transition-all duration-300 whitespace-nowrap text-base sm:text-lg"
              >
                Hubungi Desa
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 flex justify-center"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 text-white/70 text-xs sm:text-sm font-medium text-center">
                <div className="hidden sm:block w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
                <span className="px-4 sm:px-0">
                  Program KKN yang telah mengubah kehidupan masyarakat desa
                </span>
                <div className="hidden sm:block w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
