import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Eye, Heart, Share2, Search, Filter, ArrowRight } from 'lucide-react';
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
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Professional KKN-focused mock data
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Program Pemberdayaan Masyarakat melalui Pelatihan Keterampilan Digital',
      excerpt: 'Mahasiswa KKN Universitas Nusa Putra menyelenggarakan pelatihan komputer dan media sosial untuk meningkatkan kemampuan digital warga Desa Cikadu dalam mengembangkan usaha mikro.',
      content: 'Program pelatihan keterampilan digital ini merupakan bagian dari kegiatan KKN yang bertujuan untuk meningkatkan literasi digital masyarakat desa...',
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Tim KKN Universitas Nusa Putra',
      category: 'pendidikan',
      views: 1250,
      likes: 89,
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Gotong Royong Pembangunan Infrastruktur Jalan Desa',
      excerpt: 'Masyarakat Desa Cikadu bersama mahasiswa KKN bergotong royong memperbaiki jalan desa yang rusak untuk memperlancar akses transportasi dan distribusi hasil pertanian.',
      content: 'Kegiatan gotong royong ini melibatkan seluruh elemen masyarakat dalam upaya perbaikan infrastruktur desa...',
      image_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Kepala Desa Cikadu',
      category: 'infrastruktur',
      views: 2100,
      likes: 156,
      created_at: '2024-01-12T14:30:00Z',
    },
    {
      id: '3',
      title: 'Festival Budaya dan Seni Tradisional Desa Cikadu',
      excerpt: 'Penyelenggaraan festival budaya tahunan yang menampilkan tarian tradisional, musik daerah, dan pameran kerajinan tangan sebagai upaya pelestarian warisan budaya lokal.',
      content: 'Festival budaya ini merupakan wadah untuk melestarikan dan memperkenalkan kekayaan budaya Desa Cikadu...',
      image_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Karang Taruna Desa Cikadu',
      category: 'budaya',
      views: 3200,
      likes: 245,
      created_at: '2024-01-10T19:00:00Z',
    },
    {
      id: '4',
      title: 'Pengembangan UMKM Produk Olahan Pertanian',
      excerpt: 'Program pendampingan UMKM oleh mahasiswa KKN dalam mengembangkan produk olahan hasil pertanian lokal untuk meningkatkan nilai tambah dan daya saing produk desa.',
      content: 'Kegiatan pendampingan UMKM ini fokus pada pengembangan produk olahan yang memiliki nilai ekonomi tinggi...',
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Tim Ekonomi KKN',
      category: 'ekonomi',
      views: 1800,
      likes: 134,
      created_at: '2024-01-08T11:15:00Z',
    },
    {
      id: '5',
      title: 'Program Beasiswa Pendidikan untuk Anak Desa Berprestasi',
      excerpt: 'Pemberian beasiswa pendidikan kepada siswa berprestasi dari keluarga kurang mampu sebagai bentuk investasi jangka panjang dalam pengembangan sumber daya manusia desa.',
      content: 'Program beasiswa ini merupakan hasil kerjasama antara pemerintah desa dengan berbagai pihak...',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Dinas Pendidikan Desa',
      category: 'pendidikan',
      views: 2800,
      likes: 198,
      created_at: '2024-01-05T16:45:00Z',
    },
    {
      id: '6',
      title: 'Program Penghijauan dan Konservasi Lingkungan',
      excerpt: 'Kegiatan penanaman pohon dan edukasi lingkungan yang dilaksanakan mahasiswa KKN bersama masyarakat untuk menjaga kelestarian alam dan mencegah erosi tanah.',
      content: 'Program penghijauan ini merupakan bagian dari upaya konservasi lingkungan yang berkelanjutan...',
      image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Tim Lingkungan KKN',
      category: 'lingkungan',
      views: 1650,
      likes: 112,
      created_at: '2024-01-03T08:20:00Z',
    },
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'budaya', label: 'Budaya' },
    { value: 'ekonomi', label: 'Ekonomi' },
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
      pendidikan: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      infrastruktur: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      budaya: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      ekonomi: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
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

  const handleCardClick = (articleId: string) => {
    // Navigate to individual article page
    navigate(`/news/${articleId}`);
  };

  const handleShare = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `${window.location.origin}/news/${article.id}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/news/${article.id}`);
    }
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
      {/* Hero Section with News Background */}
      <section 
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.7) 100%), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Berita & Kegiatan KKN
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Informasi terkini mengenai program Kuliah Kerja Nyata, kegiatan pemberdayaan masyarakat, 
              dan perkembangan pembangunan Desa Cikadu.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita dan kegiatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 md:py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-300" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 md:px-4 py-3 md:py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base min-w-[140px]"
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
        <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
                Berita Utama
              </h2>
              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => handleCardClick(filteredArticles[0].id)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-80 lg:h-auto">
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
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {filteredArticles[0].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-500 mb-6 gap-3 sm:gap-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-xs md:text-sm">{filteredArticles[0].author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-xs md:text-sm">{formatDate(filteredArticles[0].created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="text-xs md:text-sm">{filteredArticles[0].views}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-xs md:text-sm">{filteredArticles[0].likes}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      icon={ArrowRight}
                    >
                      Baca Selengkapnya
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Berita & Kegiatan Terbaru
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Ikuti perkembangan terbaru program KKN dan kegiatan masyarakat Desa Cikadu
            </p>
          </motion.div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Tidak ada berita yang sesuai dengan pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleCardClick(article.id)}
                  >
                    <div className="relative">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                          {article.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col h-full">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs md:text-sm text-gray-500 mb-4 gap-2 sm:gap-0">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-[150px]">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs md:text-sm text-gray-500">
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
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                            onClick={(e) => handleShare(article, e)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="px-3 py-1 text-xs md:text-sm border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200"
                          >
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
      <section className="py-12 md:py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Tetap Terhubung dengan Kami
            </h2>
            <p className="text-base md:text-xl text-primary-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Dapatkan informasi terbaru mengenai program KKN dan kegiatan pemberdayaan masyarakat 
              Desa Cikadu langsung di email Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 md:py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
              />
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap text-sm md:text-base"
              >
                Berlangganan
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;