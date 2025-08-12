import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, ExternalLink, Search, Filter, Star } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { supabase, Business } from '../services/supabase';

const BusinessPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Mock data dengan gaya dramatis
  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Kebun Organik Lembah Hijau',
      description:
        'Surga pertanian keluarga yang menghasilkan sayuran segar penuh nutrisi, rempah aromatik yang menggugah selera, dan telur ayam kampung berkualitas premium langsung dari ladang yang subur.',
      contact: '+62 812-3456-7890',
      location: 'Kawasan Utara Desa',
      image_url:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sanggar Kerajinan Warisan Emas',
      description:
        'Karya seni autentik buatan tangan dari gerabah yang memukau, tekstil tradisional yang mempesona, dan ukiran kayu yang menakjubkan, diciptakan oleh seniman lokal menggunakan teknik turun-temurun.',
      contact: '+62 813-4567-8901',
      location: 'Pusat Desa',
      image_url:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Kafe Pemandangan Gunung',
      description:
        'Kedai kopi yang menyajikan kopi lokal berkualitas tinggi, camilan tradisional yang menggugah kenangan, dan kue buatan rumah dengan pemandangan gunung yang memukau dari teras kami.',
      contact: '+62 814-5678-9012',
      location: 'Jalan Utama',
      image_url:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Pemandu Wisata Alam Berpengalaman',
      description:
        'Layanan pemandu profesional untuk petualangan hiking yang menantang, pengamatan burung yang mempesona, dan tur budaya yang menginspirasi. Temukan permata tersembunyi bersama pemandu lokal berpengalaman.',
      contact: '+62 815-6789-0123',
      location: 'Pusat Informasi Wisata',
      image_url:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Toko Roti Fajar Berkah',
      description:
        'Toko roti tradisional yang membuat roti segar, kue kering yang lezat, dan makanan khas lokal setiap hari. Terkenal dengan oven kayu bakar dan resep kuno yang diwariskan turun-temurun.',
      contact: '+62 816-7890-1234',
      location: 'Alun-alun Kota Lama',
      image_url:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Apotek Herbal Tradisional',
      description:
        'Ramuan herbal tradisional dan produk kesehatan alami yang dibuat dari tanaman obat lokal yang ditanam sendiri. Konsultasi tersedia dengan ahli herbal bersertifikat yang berpengalaman.',
      contact: '+62 817-8901-2345',
      location: 'Desa Bagian Timur',
      image_url:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'Warung Makan Cita Rasa Nusantara',
      description:
        'Hidangan autentik dengan cita rasa nusantara yang menggugah selera, menggunakan bahan-bahan segar dari kebun sendiri dan resep rahasia keluarga yang telah diwariskan berabad-abad.',
      contact: '+62 818-9012-3456',
      location: 'Kawasan Utara Desa',
      image_url:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      created_at: new Date().toISOString(),
    },
  ];

  const sortOptions = [
    { value: 'name', label: 'Nama (A-Z)' },
    { value: 'location', label: 'Lokasi' },
    { value: 'created_at', label: 'Terbaru' },
  ];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    filterAndSortBusinesses();
  }, [businesses, searchTerm, sortBy]);

  const fetchBusinesses = async () => {
    try {
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using mock data as Supabase is not configured');
        setBusinesses(mockBusinesses);
      } else {
        setBusinesses(data || mockBusinesses);
      }
    } catch (error) {
      console.log('Using mock data:', error);
      setBusinesses(mockBusinesses);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBusinesses = () => {
    let filtered = businesses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          business.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'created_at':
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredBusinesses(filtered);
  };

  const handleCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-warm-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Kekuatan Ekonomi Lokal
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dukung para pejuang ekonomi lokal yang luar biasa dan temukan produk serta layanan unik 
              yang menjadi kebanggaan komunitas Desa Cikadu yang mandiri dan berdaya saing tinggi.
            </p>
          </motion.div>

          {/* Search and Sort */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari usaha yang menginspirasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      Urutkan: {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Business */}
      {filteredBusinesses.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Usaha Unggulan yang Membanggakan
              </h2>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={filteredBusinesses[0].image_url}
                      alt={filteredBusinesses[0].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        UNGGULAN
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {filteredBusinesses[0].name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{filteredBusinesses[0].location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {filteredBusinesses[0].description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="primary"
                        size="lg"
                        icon={Phone}
                        onClick={() => handleCall(filteredBusinesses[0].contact)}
                        className="flex-1"
                      >
                        Hubungi Sekarang
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        icon={ExternalLink}
                        onClick={() =>
                          window.open(
                            `/map?business=${filteredBusinesses[0].id}`,
                            '_blank'
                          )
                        }
                      >
                        Lihat Lokasi
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Businesses Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Usaha Lokal yang Menginspirasi
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Setiap usaha adalah perjuangan mulia yang patut didukung
            </p>
          </motion.div>

          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tidak ada usaha yang sesuai dengan pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.slice(1).map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                    <img
                      src={business.image_url}
                      alt={business.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {business.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{business.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 leading-relaxed">
                        {business.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Phone}
                          onClick={() => handleCall(business.contact)}
                          className="flex-1"
                        >
                          Hubungi
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={ExternalLink}
                          onClick={() =>
                            window.open(
                              `/map?business=${business.id}`,
                              '_blank'
                            )
                          }
                        >
                          Lokasi
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Support Local CTA */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Dukung Ekonomi Kerakyatan yang Mulia
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Setiap pembelian dari usaha lokal kami adalah investasi untuk memperkuat 
              komunitas dan melestarikan karakter unik yang membuat Desa Cikadu istimewa dan berdaya saing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Jelajahi Lebih Banyak Usaha
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Bergabung Sebagai Mitra
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;