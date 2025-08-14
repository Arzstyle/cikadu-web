import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, Heart, Share2, Tag } from 'lucide-react';
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
  views: number;
  likes: number;
  created_at: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Mock data - same as NewsPage for consistency
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Program Pemberdayaan Masyarakat melalui Pelatihan Keterampilan Digital',
      excerpt: 'Mahasiswa KKN Universitas Nusa Putra menyelenggarakan pelatihan komputer dan media sosial untuk meningkatkan kemampuan digital warga Desa Cikadu dalam mengembangkan usaha mikro.',
      content: `
        <p>Program pelatihan keterampilan digital ini merupakan bagian dari kegiatan KKN yang bertujuan untuk meningkatkan literasi digital masyarakat desa. Kegiatan ini dilaksanakan selama dua minggu dengan melibatkan 50 peserta dari berbagai kalangan usia.</p>
        
        <p>Materi pelatihan meliputi penggunaan komputer dasar, pengelolaan media sosial untuk promosi usaha, dan pembuatan konten digital yang menarik. Para peserta sangat antusias mengikuti setiap sesi pelatihan yang dipandu langsung oleh mahasiswa KKN.</p>
        
        <p>"Kami sangat berterima kasih kepada mahasiswa KKN yang telah memberikan ilmu berharga ini. Sekarang kami bisa memasarkan produk kerajinan melalui media sosial," ujar Ibu Siti, salah satu peserta pelatihan.</p>
        
        <p>Program ini diharapkan dapat memberikan dampak jangka panjang bagi pengembangan ekonomi kreatif di Desa Cikadu. Dengan kemampuan digital yang meningkat, masyarakat dapat lebih mudah mengakses pasar yang lebih luas.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Tim KKN Universitas Nusa Putra',
      category: 'pendidikan',
      views: 1250,
      likes: 89,
      created_at: '2024-01-15T10:00:00Z',
    },
    // Add other articles here...
  ];

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      // Simulate API call
      const foundArticle = mockArticles.find(article => article.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // If article not found, redirect to news page
        navigate('/news');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/news');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (article) {
      setLiked(!liked);
      setArticle({
        ...article,
        likes: liked ? article.likes - 1 : article.likes + 1
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else if (article) {
      navigator.clipboard.writeText(window.location.href);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel tidak ditemukan
          </h1>
          <Button onClick={() => navigate('/news')}>
            Kembali ke Berita
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate('/news')}
            className="mb-6 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Kembali ke Berita
          </Button>
          
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(article.category)}`}>
              <Tag className="inline h-4 w-4 mr-1" />
              {article.category.toUpperCase()}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-gray-500 dark:text-gray-400 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-1" />
                  <span>{article.views}</span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 transition-colors ${
                    liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{article.likes}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden mb-8">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </Card>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">
                {article.excerpt}
              </p>
              
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Berita Terkait
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockArticles.filter(a => a.id !== article.id).slice(0, 3).map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/news/${relatedArticle.id}`)}
              >
                <img
                  src={relatedArticle.image_url}
                  alt={relatedArticle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(relatedArticle.category)}`}>
                    {relatedArticle.category.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {relatedArticle.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;