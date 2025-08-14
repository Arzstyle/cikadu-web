import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Eye, Heart, Share2, Search, Filter, ArrowRight, TrendingUp, Clock } from 'lucide-react';
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
    { value: 'all', label: 'Semua Kategori', count: mockArticles.length },
    { value: 'pendidikan', label: 'Pendidikan', count: mockArticles.filter(a => a.category === 'pendidikan').length },
    { value: 'infrastruktur', label: 'Infrastruktur', count: mockArticles.filter(a => a.category === 'infrastruktur').length },
    { value: 'budaya', label: 'Budaya', count: mockArticles.filter(a => a.category === 'budaya').length },
    { value: 'ekonomi', label: 'Ekonomi', count: mockArticles.filter(a => a.category === 'ekonomi').length },
    { value: 'lingkungan', label: 'Lingkungan', count: mockArticles.filter(a => a.category === 'lingkungan').length },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, selectedCategory, searchTerm]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setArticles(mockArticles);
      } else {
        setArticles(data || mockArticles);
      }
    } catch (error) {
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
      pendidikan: 'bg-blue-500/20 text-blue-800 border border-blue-500/30 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-500/50',
      infrastruktur: 'bg-gray-500/20 text-gray-800 border border-gray-500/30 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-500/50',
      budaya: 'bg-purple-500/20 text-purple-800 border border-purple-500/30 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-500/50',
      ekonomi: 'bg-green-500/20 text-green-800 border border-green-500/30 dark:bg-green-900/30 dark:text-green-200 dark:border-green-500/50',
      lingkungan: 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-500/50',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-800 border border-gray-500/30 dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-500/50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} minggu yang lalu`;
  };

  const handleCardClick = (articleId: string) => {
    navigate(`/news/${articleId}`);
  };

  const handleShare = async (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/news/${article.id}`;
    
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      // Add toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Enhanced Hero Section with Background Image & Green Gradient */}
      <section 
        className="py-20 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.8) 50%, rgba(4, 120, 87, 0.9) 100%), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-overlay filter blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <TrendingUp className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Berita Terpercaya & Terkini</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Portal Berita
              </span>
              <br />
              <span className="text-emerald-100">Desa Cikadu</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-50 max-w-4xl mx-auto leading-relaxed font-light">
              Jendela informasi terdepan untuk program <strong className="text-white">Kuliah Kerja Nyata</strong>, 
              kegiatan pemberdayaan masyarakat, dan transformasi berkelanjutan menuju 
              <strong className="text-white"> Desa Cikadu yang Maju dan Sejahtera</strong>.
            </p>
          </motion.div>

          {/* Enhanced Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-600" />
                  <input
                    type="text"
                    placeholder="Temukan berita dan kegiatan yang menginspirasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-300 text-base shadow-lg"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center space-x-3">
                  <Filter className="h-5 w-5 text-white" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-300 text-base min-w-[180px] shadow-lg cursor-pointer"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center justify-center mt-4 space-x-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{mockArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()} Total Views</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{mockArticles.reduce((sum, article) => sum + article.likes, 0)} Likes</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Update Harian</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="font-semibold">HEADLINE UTAMA</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Sorotan Utama Hari Ini
                </h2>
              </div>

              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-emerald-100 dark:border-emerald-800"
                onClick={() => handleCardClick(filteredArticles[0].id)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 relative overflow-hidden">
                    <img
                      src={filteredArticles[0].image_url}
                      alt={filteredArticles[0].title}
                      className="w-full h-72 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${getCategoryColor(filteredArticles[0].category)}`}>
                        {filteredArticles[0].category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                      <p className="text-white text-sm mb-2">{getTimeAgo(filteredArticles[0].created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                        {getTimeAgo(filteredArticles[0].created_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                      {filteredArticles[0].title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed line-clamp-3">
                      {filteredArticles[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span className="font-medium">{filteredArticles[0].author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-blue-500" />
                          <span>{filteredArticles[0].views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          <span>{filteredArticles[0].likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      icon={ArrowRight}
                    >
                      Baca Artikel Lengkap
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced News Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Berita & Kegiatan Terbaru
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pantau terus perkembangan program KKN dan transformasi berkelanjutan masyarakat Desa Cikadu
            </p>
          </motion.div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tidak Ada Hasil
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tidak ada berita yang sesuai dengan pencarian Anda. Coba kata kunci lain.
                </p>
              </div>
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
                  <Card 
                    className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
                    onClick={() => handleCardClick(article.id)}
                  >
                    <div className="relative">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getCategoryColor(article.category)}`}>
                          {article.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                          {getTimeAgo(article.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-[120px] font-medium">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{article.views.toLocaleString()}</span>
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
                            className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                            onClick={(e) => handleShare(article, e)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="px-4 py-2 text-sm border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-200 rounded-lg font-medium"
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

          {/* Load More Button */}
          {filteredArticles.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 rounded-xl font-semibold"
              >
                Muat Lebih Banyak Berita
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter CTA with Background Image & Green Gradient */}
      <section 
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.9) 50%, rgba(4, 120, 87, 0.95) 100%), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-300 rounded-full mix-blend-overlay filter blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Heart className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Jadilah Bagian dari Komunitas</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Tetap Terhubung
              </span>
              <br />
              <span className="text-emerald-100">dengan Kami</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-emerald-50 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Dapatkan informasi <strong className="text-white">eksklusif</strong> mengenai program KKN, 
              kegiatan pemberdayaan masyarakat, dan transformasi berkelanjutan 
              <strong className="text-white"> Desa Cikadu</strong> langsung di email Anda.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Masukkan alamat email Anda..."
                    className="w-full px-6 py-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-300 text-base shadow-lg"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Berlangganan Sekarang
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-4 space-x-6 text-white/70 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                  <span>Gratis Selamanya</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                  <span>Bisa Berhenti Kapan Saja</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                  <span>Tanpa Spam</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-emerald-100 text-sm">
              <p>🔒 Data Anda aman dan tidak akan dibagikan kepada pihak ketiga</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;