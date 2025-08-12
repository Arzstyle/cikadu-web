import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { supabase, TourismSpot } from '../services/supabase';

const TourismPage: React.FC = () => {
  const [spots, setSpots] = useState<TourismSpot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<TourismSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockSpots: TourismSpot[] = [
    {
      id: '1',
      name: 'Ancient Temple Ruins',
      description: 'Explore the mysterious ruins of an ancient temple dating back to the 14th century, surrounded by lush tropical vegetation.',
      image_url: 'https://images.unsplash.com/photo-1539650116574-75c0c6bbf8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2575,
      lng: 112.7521,
      category: 'historical',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sunrise Viewpoint',
      description: 'Wake up early to catch the breathtaking sunrise from our highest peak, offering panoramic views of the entire valley.',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2585,
      lng: 112.7531,
      category: 'nature',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Traditional Market',
      description: 'Experience authentic local life at our bustling traditional market, featuring fresh produce and handmade crafts.',
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2565,
      lng: 112.7511,
      category: 'cultural',
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Hidden Waterfall',
      description: 'Discover a secluded waterfall hidden deep in the forest, perfect for swimming and nature photography.',
      image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2555,
      lng: 112.7541,
      category: 'nature',
      created_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Heritage Village Center',
      description: 'Step back in time at our heritage center, showcasing traditional architecture and cultural artifacts.',
      image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2575,
      lng: 112.7501,
      category: 'cultural',
      created_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Eco-Adventure Trail',
      description: 'Embark on a guided eco-adventure through diverse ecosystems, perfect for hiking and wildlife spotting.',
      image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      lat: -7.2595,
      lng: 112.7551,
      category: 'adventure',
      created_at: new Date().toISOString(),
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'nature', label: 'Nature' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'historical', label: 'Historical' },
    { value: 'adventure', label: 'Adventure' },
  ];

  useEffect(() => {
    fetchTourismSpots();
  }, []);

  useEffect(() => {
    filterSpots();
  }, [spots, selectedCategory, searchTerm]);

  const fetchTourismSpots = async () => {
    try {
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('tourism_spots')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using mock data as Supabase is not configured');
        setSpots(mockSpots);
      } else {
        setSpots(data || mockSpots);
      }
    } catch (error) {
      console.log('Using mock data:', error);
      setSpots(mockSpots);
    } finally {
      setLoading(false);
    }
  };

  const filterSpots = () => {
    let filtered = spots;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(spot => spot.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(spot =>
        spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spot.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSpots(filtered);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      nature: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      historical: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      adventure: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
              Tourism Spots
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the most beautiful and interesting places our village has to offer. 
              From natural wonders to cultural treasures, there's something for everyone.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tourism spots..."
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

      {/* Tourism Spots Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSpots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                No tourism spots found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpots.map((spot, index) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={spot.image_url}
                        alt={spot.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(spot.category)}`}>
                          {spot.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {spot.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {spot.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>View on map</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/map?spot=${spot.id}`, '_blank')}
                        >
                          Learn More
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
    </div>
  );
};

export default TourismPage;