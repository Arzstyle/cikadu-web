import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building, Newspaper } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Newspaper,
      title: 'Fitur Berita Terkini',
      description:
        'Saksikan kisah-kisah menakjubkan dan peristiwa bersejarah yang menggetarkan jiwa warga Desa Cikadu',
      path: '/news',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor:
        'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Building,
      title: 'Kekuatan Ekonomi Lokal',
      description:
        'Temukan keajaiban usaha mandiri yang membanggakan, karya tangan emas para pejuang ekonomi desa',
      path: '/business',
      gradient: 'from-emerald-500 to-teal-500',
      bgColor:
        'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Users,
      title: 'Jiwa Masyarakat Bersatu',
      description:
        'Rasakan kehangatan persaudaraan yang mengalir dalam darah, tradisi suci yang menyatukan hati',
      path: '/about',
      gradient: 'from-violet-500 to-purple-500',
      bgColor:
        'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      icon: MapPin,
      title: 'Surga Tersembunyi',
      description:
        'Jelajahi keindahan alam yang memukau mata, panorama surgawi yang menyentuh relung hati terdalam',
      path: '/map',
      gradient: 'from-green-500 to-lime-500',
      bgColor:
        'bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Natural background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(31, 41, 55, 0.8) 50%, rgba(17, 24, 39, 0.85) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />

        {/* Subtle decorative elements */}
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
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Selamat Datang di Surga
            <span className="block text-emerald-400 drop-shadow-lg">
              Desa Cikadu
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md"
          >
            Bersiaplah terpesona oleh keajaiban alam yang menakjubkan, warisan budaya yang membanggakan, 
            dan kehangatan jiwa masyarakat yang tak tergantikan di permata tersembunyi Sukabumi ini.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/news')}
              icon={ArrowRight}
              iconPosition="right"
              className="text-lg px-8 py-4 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold border-0"
            >
              Jelajahi Keajaiban Ini
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
              className="text-lg px-8 py-4 border-2 border-white/80 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Temukan Kisah Kami
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator - Hidden on mobile, visible on desktop */}
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
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        {/* Background pattern */}
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
              className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 font-semibold text-sm mb-6"
            >
              ✨ Keajaiban Tak Terbantahkan
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 dark:from-white dark:via-emerald-300 dark:to-white bg-clip-text text-transparent mb-6">
              Pesona Magis yang Menghipnotis Jiwa
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Dari lanskap alam yang memukau hingga semangat juang masyarakat yang menggelora,
              Desa Cikadu menawarkan pengalaman luar biasa yang akan mengubah cara pandang Anda selamanya.
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
                  className={`p-8 text-center h-full cursor-pointer border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${feature.bgColor} backdrop-blur-sm relative overflow-hidden`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.bgColor} backdrop-blur-sm border border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon
                          className={`h-10 w-10 ${feature.iconColor}`}
                        />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-sm font-semibold">Jelajahi Sekarang</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 relative overflow-hidden min-h-screen flex items-center">
        {/* Complex gradient background with natural tones */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, 
        rgba(5, 150, 105, 0.95) 0%, 
        rgba(16, 185, 129, 0.9) 25%, 
        rgba(52, 211, 153, 0.85) 50%, 
        rgba(34, 197, 94, 0.9) 75%, 
        rgba(21, 128, 61, 0.95) 100%), 
        url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`,
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-2xl backdrop-blur-sm"
          />

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full backdrop-blur-lg"
          />

          <motion.div
            animate={{
              x: [0, 30, 0],
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-lg rotate-45 backdrop-blur-sm"
          />

          {/* Mesh gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-400/5 via-transparent to-teal-600/5"></div>

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Main content */}
        <div className="w-full max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            {/* Badge with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-8 border border-white/20 shadow-lg"
            >
              <span className="text-lg">🌟</span>
              <span>Bergabunglah dengan Keajaiban</span>
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Enhanced typography */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-center"
            >
              <span className="inline-block">Siapkah Jiwa Anda</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-white to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                Terhanyut dalam Pesona?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm text-center"
            >
              Ikuti kami dalam perjalanan magis menyelami keindahan Desa Cikadu.
              <span className="text-cyan-200 font-semibold">
                {' '}
                Bagikan cerita hati Anda
              </span>
              , terhubung dengan jiwa-jiwa mulia, dan jadilah bagian dari legenda yang akan dikenang selamanya.
            </motion.p>

            {/* Enhanced buttons - Optimized sizing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/map')}
                  icon={MapPin}
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-700 hover:bg-emerald-50 shadow-2xl hover:shadow-emerald-200/50 font-semibold rounded-xl border-0 backdrop-blur-sm transform transition-all duration-300 whitespace-nowrap"
                >
                  Jelajahi Peta Ajaib
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/60 text-white hover:bg-white/10 hover:border-white font-semibold rounded-xl backdrop-blur-md shadow-lg hover:shadow-white/20 transform transition-all duration-300 whitespace-nowrap"
                >
                  Sampaikan Hati Anda
                </Button>
              </motion.div>
            </motion.div>

            {/* Additional decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 flex justify-center"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 text-white/70 text-xs sm:text-sm font-medium text-center">
                <div className="hidden sm:block w-8 h-px bg-gradient-to-r from-transparent to-white/40"></div>
                <span className="px-4 sm:px-0">
                  Lebih dari 1000+ jiwa telah terpesona oleh keajaiban ini
                </span>
                <div className="hidden sm:block w-8 h-px bg-gradient-to-l from-transparent to-white/40"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;