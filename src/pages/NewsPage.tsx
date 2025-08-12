import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Share2, Search, Filter } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { supabase } from '../services/supabase';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  views: number;
  likes: number;
  created_at: string;
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data dengan gaya dramatis
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Keajaiban Panen Raya: Ketika Sawah Emas Menari di Bawah Sinar Mentari',
      excerpt: 'Saksikan momen magis ketika hamparan padi kuning keemasan bergoyang lembut tertiup angin, membawa berkah melimpah bagi seluruh warga Desa Cikadu yang bersyukur.',
      content: 'Musim panen tahun ini membawa kebahagiaan luar biasa...',
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Pak Suherman',
      category: 'pertanian',
      views: 1250,
      likes: 89,
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Kisah Heroik: Gotong Royong Membangun Jembatan Harapan di Tengah Hujan Deras',
      excerpt: 'Dalam derasnya hujan yang mengguyur, semangat persaudaraan warga Cikadu berkobar membangun jembatan yang menghubungkan dua kampung terpisah.',
      content: 'Hujan deras tidak menyurutkan semangat warga...',
      image_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Bu Siti Aminah',
      category: 'sosial',
      views: 2100,
      likes: 156,
      created_at: '2024-01-12T14:30:00Z',
    },
    {
      id: '3',
      title: 'Festival Budaya Spektakuler: Tarian Tradisional yang Menghipnotis Ribuan Mata',
      excerpt: 'Malam yang tak terlupakan ketika para penari cilik memukau hati dengan gerakan anggun warisan nenek moyang, membuat air mata haru mengalir deras.',
      content: 'Festival budaya tahunan Desa Cikadu kembali digelar...',
      image_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Mas Joko Santoso',
      category: 'budaya',
      views: 3200,
      likes: 245,
      created_at: '2024-01-10T19:00:00Z',
    },
    {
      id: '4',
      title: 'Mukjizat Ekonomi: UMKM Keripik Singkong Tembus Pasar Internasional',
      excerpt: 'Dari dapur sederhana Ibu Marni, keripik singkong renyah kini menjadi primadona di mancanegara, membawa nama harum Desa Cikadu ke kancah dunia.',
      content: 'Perjalanan luar biasa Ibu Marni dimulai dari...',
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Pak Bambang',
      category: 'ekonomi',
      views: 1800,
      likes: 134,
      created_at: '2024-01-08T11:15:00Z',
    },
    {
      id: '5',
      title: 'Prestasi Membanggakan: Anak Desa Raih Juara Nasional Olimpiade Matematika',
      excerpt: 'Adik kecil kita, Sari Dewi, berhasil mengharumkan nama Desa Cikadu dengan meraih medali emas olimpiade matematika tingkat nasional.',
      content: 'Sari Dewi, gadis cilik berusia 12 tahun...',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Bu Guru Ratna',
      category: 'pendidikan',
      views: 2800,
      likes: 198,
      created_at: '2024-01-05T16:45:00Z',
    },
    {
      id: '6',
      title: 'Revolusi Hijau: Program Penanaman 1000 Pohon Mengubah Wajah Desa',
      excerpt: 'Gerakan luar biasa warga Cikadu menanam seribu pohon dalam sehari, menciptakan oasis hijau yang menyejukkan mata dan menyegarkan jiwa.',
      content: 'Inisiatif lingkungan yang dimulai oleh karang taruna...',
      image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Ketua Karang Taruna',
      category: 'lingkungan',
      views: 1650,
      likes: 112,
      created_at: '2024-01-03T08:20:00Z',
    },
  ];

  const categories = [
    { value: 'all', label: 'Semua Berita' },
    { value: 'pertanian', label: 'Pertanian' },
    { value: 'sosial', label: 'Sosial' },
    { value: 'budaya', label: 'Budaya' },
    { value: 'ekonomi', label: 'Ekonomi' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'lingkungan', label: 'Lingkungan' },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, selectedCategory, searchTerm]);

  const fetchNews = async () => {
    try {
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using mock data as Supabase is not configured');
        setArticles(mockArticles);
      } else {
        setArticles(data || mockArticles);
      }
    } catch (error) {
      console.log('Using mock data:', error);
      setArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      pertanian: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      sosial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      budaya: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      ekonomi: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      pendidikan: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      lingkungan: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Fitur Berita Terkini
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Saksikan kisah-kisah menakjubkan, prestasi membanggakan, dan momen bersejarah 
              yang menggetarkan jiwa dari kehidupan sehari-hari masyarakat Desa Cikadu yang luar biasa.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita yang menginspirasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
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
                Berita Utama yang Mengguncang Hati
              </h2>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={filteredArticles[0].image_url}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(filteredArticles[0].category)}`}>
                        {filteredArticles[0].category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {filteredArticles[0].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{filteredArticles[0].author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(filteredArticles[0].created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{filteredArticles[0].views}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>{filteredArticles[0].likes}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" size="lg" className="w-full">
                      Baca Kisah Lengkapnya
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
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
              Kisah-Kisah Menginspirasi Lainnya
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Setiap cerita adalah permata berharga yang memperkaya jiwa
            </p>
          </motion.div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Belum ada berita yang sesuai dengan pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                          {article.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="truncate">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-red-500" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Baca
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Jangan Lewatkan Kisah Menakjubkan Berikutnya
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Berlangganan untuk mendapatkan berita terbaru dan kisah-kisah inspiratif 
              langsung dari jantung Desa Cikadu yang membanggakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap"
              >
                Berlangganan Sekarang
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;