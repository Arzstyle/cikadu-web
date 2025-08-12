import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Award } from 'lucide-react';
import Card from '../components/UI/Card';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Jiwa Mulia', value: '2,500+' },
    { icon: MapPin, label: 'Hamparan Surga', value: '15 km²' },
    { icon: Calendar, label: 'Tahun Berdiri', value: '1892' },
    { icon: Award, label: 'Prestasi Gemilang', value: '15+' },
  ];

  const traditions = [
    {
      title: 'Festival Panen Raya yang Memukau',
      description: 'Perayaan spektakuler warisan leluhur dengan tarian tradisional yang menghipnotis, kuliner khas yang menggugah selera, dan kebersamaan yang menyentuh hati.',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Kerajinan Tangan Warisan Emas',
      description: 'Para seniman lokal melestarikan tradisi berabad-abad dalam seni gerabah, tenun, dan ukiran kayu yang memukau mata dan menyentuh jiwa.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Kebun Komunitas Berkelanjutan',
      description: 'Praktik pertanian organik turun-temurun yang menciptakan harmoni sempurna antara manusia dan alam, menghasilkan panen berlimpah penuh berkah.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Jiwa Masyarakat Bersatu
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Terletak di jantung keindahan alam Sukabumi, Desa Cikadu adalah permata tersembunyi 
              yang memancarkan kehangatan persaudaraan dan kearifan tradisi yang tak ternilai harganya.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Legenda yang Menginspirasi
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Didirikan pada tahun 1892 oleh sekelompok keluarga pemberani yang memiliki visi mulia, 
                  Desa Cikadu telah berkembang dari pemukiman pertanian sederhana menjadi komunitas yang 
                  menakjubkan, memadukan kearifan tradisi dengan inovasi modern yang membanggakan.
                </p>
                <p>
                  Selama puluhan dekade, kami mempertahankan komitmen suci terhadap kehidupan berkelanjutan, 
                  kerjasama komunitas yang menghangatkan hati, dan pelestarian lingkungan yang menginspirasi. 
                  Penduduk kami bangga melestarikan keindahan alam yang menakjubkan sambil merangkul 
                  fasilitas modern dan peluang emas yang tak terbatas.
                </p>
                <p>
                  Hari ini, Desa Cikadu berdiri sebagai model pembangunan pedesaan yang memukau, 
                  menarik pengunjung yang mencari pengalaman autentik dan koneksi mendalam dengan alam. 
                  Kami menyambut tamu dengan tangan terbuka dan hati yang hangat, mengundang mereka 
                  menjadi bagian dari kisah legendaris kami.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Pemandangan menakjubkan Desa Cikadu"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tradisi Suci & Budaya Memukau
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Warisan budaya yang kaya dan tradisi luhur yang telah mengakar dalam jiwa, 
              membentuk identitas komunitas yang membanggakan dan menyatukan hati dalam kebersamaan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {traditions.map((tradition, index) => (
              <motion.div
                key={tradition.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <img
                    src={tradition.image}
                    alt={tradition.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {tradition.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {tradition.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Keindahan geografis Desa Cikadu"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Surga Geografis & Lingkungan Menawan
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Desa Cikadu terletak strategis di lembah subur yang memukau, dikelilingi 
                  perbukitan hijau yang mempesona dan hutan pristine yang menyejukkan jiwa. 
                  Wilayah ini dikaruniai iklim tropis yang sempurna dengan empat musim yang 
                  berbeda, masing-masing membawa keindahan dan peluang pertanian yang luar biasa.
                </p>
                <p>
                  Kawasan ini diberkahi mata air alami yang jernih, sungai berkelok yang 
                  menenangkan, dan tanah subur yang telah mendukung pertanian selama 
                  berabad-abad. Komitmen kami terhadap konservasi lingkungan memastikan 
                  bahwa generasi mendatang akan mewarisi keindahan alam yang sama yang 
                  kami nikmati hari ini.
                </p>
                <p>
                  Satwa liar berkembang pesat di hutan lindung kami, dan praktik pertanian 
                  berkelanjutan telah menciptakan ekosistem harmonis di mana aktivitas 
                  manusia dan alam hidup berdampingan dalam kedamaian yang menginspirasi.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Visi Mulia untuk Masa Depan Gemilang
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Kami bermimpi menjadi desa percontohan yang menginspirasi dunia, 
              di mana tradisi luhur berpadu harmonis dengan inovasi modern, 
              menciptakan kehidupan yang berkelanjutan dan membahagiakan bagi semua.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Keberlanjutan</h3>
                <p className="text-primary-100 text-sm">Melestarikan alam untuk generasi mendatang</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Inovasi</h3>
                <p className="text-primary-100 text-sm">Mengadopsi teknologi untuk kemajuan bersama</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Kebersamaan</h3>
                <p className="text-primary-100 text-sm">Membangun komunitas yang saling mendukung</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;