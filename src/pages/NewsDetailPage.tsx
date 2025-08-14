import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2, Tag, Clock, TrendingUp, BookOpen, MessageCircle, Phone, MapPin, Mail, ExternalLink, Heart } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  created_at: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 50) + 10);

  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Program Pemberdayaan Masyarakat melalui Pelatihan Keterampilan Digital',
      excerpt: 'Mahasiswa KKN Universitas Nusa Putra menyelenggarakan pelatihan komputer dan media sosial untuk meningkatkan kemampuan digital warga Desa Cikadu dalam mengembangkan usaha mikro.',
      content: `
        <p>Program pelatihan keterampilan digital ini merupakan bagian dari kegiatan KKN yang bertujuan untuk meningkatkan literasi digital masyarakat desa. Kegiatan ini dilaksanakan selama dua minggu dengan melibatkan 50 peserta dari berbagai kalangan usia.</p>
        
        <p>Materi pelatihan meliputi penggunaan komputer dasar, pengelolaan media sosial untuk promosi usaha, dan pembuatan konten digital yang menarik. Para peserta sangat antusias mengikuti setiap sesi pelatihan yang dipandu langsung oleh mahasiswa KKN.</p>
        
        <p><strong>Dampak Positif Program</strong></p>
        <p>Program ini telah memberikan dampak yang luar biasa bagi masyarakat desa. Banyak peserta yang sebelumnya tidak familiar dengan teknologi digital, kini mulai dapat menggunakan smartphone dan komputer untuk mendukung usaha mereka.</p>
        
        <p>"Kami sangat berterima kasih kepada mahasiswa KKN yang telah memberikan ilmu berharga ini. Sekarang kami bisa memasarkan produk kerajinan melalui media sosial," ujar Ibu Siti, salah satu peserta pelatihan yang menjalankan usaha kerajinan tangan.</p>
        
        <p><strong>Keberlanjutan Program</strong></p>
        <p>Program ini diharapkan dapat memberikan dampak jangka panjang bagi pengembangan ekonomi kreatif di Desa Cikadu. Dengan kemampuan digital yang meningkat, masyarakat dapat lebih mudah mengakses pasar yang lebih luas dan meningkatkan pendapatan keluarga.</p>
        
        <p>Ke depannya, akan dibentuk komunitas digital desa yang akan terus memberikan pendampingan dan sharing knowledge antar anggota. Hal ini diharapkan dapat menjaga keberlanjutan manfaat program pelatihan ini.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Tim KKN Universitas Nusa Putra',
      category: 'pendidikan',
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
      created_at: '2024-01-10T19:00:00Z',
    },
  ];

  useEffect(() => {
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (article) {
      const wordCount = article.content.replace(/<[^>]*>/g, '').split(' ').length;
      setReadingTime(Math.ceil(wordCount / 200));
    }
  }, [article]);

  const fetchArticle = async () => {
    try {
      const foundArticle = mockArticles.find(article => article.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        navigate('/news');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/news');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else if (article) {
      await navigator.clipboard.writeText(window.location.href);
      setShareCount(prev => prev + 1);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Maaf, artikel yang Anda cari tidak dapat ditemukan atau mungkin sudah dipindahkan.
          </p>
          <Button 
            onClick={() => navigate('/news')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header with Background */}
      <section 
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.8) 50%, rgba(4, 120, 87, 0.9) 100%), url('${article.image_url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              icon={ArrowLeft}
              onClick={() => navigate('/news')}
              className="mb-8 text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg transition-all duration-300"
            >
              Kembali ke Berita
            </Button>
            
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${getCategoryColor(article.category)}`}>
                  <Tag className="inline h-4 w-4 mr-2" />
                  {article.category.toUpperCase()}
                </span>
                <div className="flex items-center text-white/90 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{readingTime} menit baca</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Trending</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed font-light max-w-4xl">
                {article.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-white/90">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{article.author}</div>
                      <div className="text-sm text-white/70">Penulis</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">{formatDate(article.created_at)}</div>
                      <div className="text-sm text-white/70">Dipublikasikan</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-all duration-300 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 ${
                      isLiked ? 'text-red-300 hover:text-red-200' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">Suka</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Bagikan</span>
                    <span className="text-xs bg-white/30 rounded-full px-2 py-0.5">{shareCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden mb-12 shadow-2xl border-0">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-80 md:h-96 object-cover"
              />
            </Card>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div 
                  className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.8'
                  }}
                />
              </div>

              {/* Article Footer Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      Apakah artikel ini bermanfaat?
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleLike}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                          isLiked 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span>Suka</span>
                      </button>
                      <button
                        onClick={handleShare}
                        className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Bagikan</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">Diskusi di grup WhatsApp desa</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Related Articles */}
      <section 
        className="py-16 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.03) 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Berita Terkait
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Artikel lainnya yang mungkin menarik untuk Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockArticles.filter(a => a.id !== article.id).slice(0, 3).map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 h-full"
                    onClick={() => navigate(`/news/${relatedArticle.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={relatedArticle.image_url}
                        alt={relatedArticle.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${getCategoryColor(relatedArticle.category)}`}>
                          {relatedArticle.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-grow leading-relaxed mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span className="truncate max-w-[120px] font-medium">{relatedArticle.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(relatedArticle.created_at)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-200 rounded-lg font-medium"
                      >
                        Baca Artikel
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate('/news')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Lihat Semua Berita
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Information Section */}
      <section 
        className="py-20 relative overflow-hidden"
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <MessageCircle className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Hubungi Kami</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Terlibat Aktif dalam
              </span>
              <br />
              <span className="text-emerald-100">Pembangunan Desa</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Mari bergabung dan berpartisipasi dalam <strong className="text-white">transformasi berkelanjutan</strong> 
              Desa Cikadu menuju <strong className="text-white">masyarakat digital yang maju</strong> dan sejahtera.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Phone,
                title: "Hubungi Langsung",
                description: "Kantor Desa Cikadu",
                contact: "+62 266 431234",
                action: "Telepon Sekarang",
                color: "bg-blue-500"
              },
              {
                icon: Mail,
                title: "Kirim Email",
                description: "Untuk pertanyaan dan saran",
                contact: "info@desacikadu.id",
                action: "Kirim Email",
                color: "bg-emerald-500"
              },
              {
                icon: MapPin,
                title: "Kunjungi Kami",
                description: "Desa Cikadu, Pelabuhanratu",
                contact: "Sukabumi, Jawa Barat",
                action: "Lihat Peta",
                color: "bg-purple-500"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-16 h-16 ${contact.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{contact.title}</h3>
                <p className="text-emerald-100 mb-2 text-lg">{contact.description}</p>
                <p className="text-white font-semibold text-xl mb-6">{contact.contact}</p>
                
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50">
                  {contact.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Social Media & Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Ikuti Media Sosial Kami</h3>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { name: 'WhatsApp Grup Desa', icon: '📱', color: 'bg-green-600' },
                  { name: 'Facebook Desa', icon: '📘', color: 'bg-blue-600' },
                  { name: 'Instagram Desa', icon: '📸', color: 'bg-pink-600' },
                  { name: 'YouTube Channel', icon: '🎥', color: 'bg-red-600' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`${social.color} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl`}
                  >
                    <span className="text-lg">{social.icon}</span>
                    <span>{social.name}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Jam Operasional
                  </h4>
                  <div className="space-y-2 text-emerald-100">
                    <div className="flex justify-between">
                      <span>Senin - Jumat</span>
                      <span className="font-semibold">08:00 - 16:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu</span>
                      <span className="font-semibold">08:00 - 12:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minggu</span>
                      <span className="font-semibold text-yellow-300">Tutup</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Layanan Online
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Surat Keterangan Online',
                      'Pengaduan Masyarakat',
                      'Informasi Program Desa',
                      'Konsultasi KKN'
                    ].map((service, index) => (
                      <div key={index} className="flex items-center text-emerald-100">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-emerald-100">
                <p className="text-lg leading-relaxed">
                  <strong className="text-white">Program KKN Universitas Nusa Putra</strong> bersama masyarakat 
                  Desa Cikadu berkomitmen untuk menciptakan transformasi berkelanjutan menuju 
                  <strong className="text-white"> desa digital yang maju, sejahtera, dan berdaya saing</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action (tanpa warna putih) */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.8 }}
  viewport={{ once: true }}
  className="text-center mt-12"
>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

    {/* Tombol utama (CTA) */}
    <Button
  onClick={() => navigate('/news')}
  className="
    bg-white text-emerald-700 hover:bg-emerald-50
    font-bold py-4 px-8 rounded-xl transition-all duration-300
    shadow-lg hover:shadow-xl
    focus:outline-none focus:ring-4 focus:ring-emerald-200/60
  "
>
  Lihat Berita Lainnya
</Button>

<Button
  onClick={() => navigate('/')}
  variant="outline"
  className={
    "border-2 border-white text-white bg-transparent hover:bg-white/90 hover:text-emerald-700 " +
    "font-bold py-4 px-8 rounded-xl transition-all duration-300 " +
    "focus:outline-none focus:ring-4 focus:ring-white/30"
  }
>
  Kembali ke Beranda
</Button>

  </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-emerald-100 text-sm flex-wrap gap-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                <span>Berita Terpercaya</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                <span>Update Harian</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                <span>Program KKN</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-emerald-300 rounded-full mr-2"></span>
                <span>Transformasi Digital</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;