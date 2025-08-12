import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { MapPin, Building, Camera, Navigation } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { supabase, TourismSpot, Business } from '../services/supabase';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const tourismIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const businessIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapPage: React.FC = () => {
  const [tourismSpots, setTourismSpots] = useState<TourismSpot[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTourism, setShowTourism] = useState(true);
  const [showBusinesses, setShowBusinesses] = useState(true);

  // Mock data
  const mockTourismSpots: TourismSpot[] = [
    {
      id: '1',
      name: 'Ancient Temple Ruins',
      description: 'Explore mysterious ruins dating back to the 14th century.',
      image_url: 'https://images.unsplash.com/photo-1539650116574-75c0c6bbf8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      lat: -7.2575,
      lng: 112.7521,
      category: 'historical',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sunrise Viewpoint',
      description: 'Breathtaking sunrise views of the entire valley.',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      lat: -7.2585,
      lng: 112.7531,
      category: 'nature',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Hidden Waterfall',
      description: 'Secluded waterfall perfect for swimming and photography.',
      image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      lat: -7.2555,
      lng: 112.7541,
      category: 'nature',
      created_at: new Date().toISOString(),
    },
  ];

  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Green Valley Organic Farm',
      description: 'Fresh organic produce and farm-to-table experience.',
      contact: '+62 812-3456-7890',
      location: 'North Village District',
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Mountain View Café',
      description: 'Cozy café with stunning mountain views.',
      contact: '+62 814-5678-9012',
      location: 'Main Street',
      image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      created_at: new Date().toISOString(),
    },
  ];

  // Add lat/lng to mock businesses for map display
  const mockBusinessesWithCoords = mockBusinesses.map((business, index) => ({
    ...business,
    lat: -7.2565 + (index * 0.001),
    lng: 112.7511 + (index * 0.001),
  }));

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      // Try to fetch from Supabase
      const [tourismResponse, businessResponse] = await Promise.all([
        supabase.from('tourism_spots').select('*'),
        supabase.from('businesses').select('*')
      ]);

      if (tourismResponse.error || businessResponse.error) {
        console.log('Using mock data as Supabase is not configured');
        setTourismSpots(mockTourismSpots);
        setBusinesses(mockBusinessesWithCoords);
      } else {
        setTourismSpots(tourismResponse.data || mockTourismSpots);
        setBusinesses(businessResponse.data || mockBusinessesWithCoords);
      }
    } catch (error) {
      console.log('Using mock data:', error);
      setTourismSpots(mockTourismSpots);
      setBusinesses(mockBusinessesWithCoords);
    } finally {
      setLoading(false);
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
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Village Map
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our village through an interactive map showing tourism spots and local businesses.
            </p>
          </motion.div>

          {/* Map Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={showTourism ? 'primary' : 'outline'}
              icon={Camera}
              onClick={() => setShowTourism(!showTourism)}
            >
              Tourism Spots
            </Button>
            <Button
              variant={showBusinesses ? 'primary' : 'outline'}
              icon={Building}
              onClick={() => setShowBusinesses(!showBusinesses)}
            >
              Local Businesses
            </Button>
            <Button
              variant="ghost"
              icon={Navigation}
              onClick={() => window.navigator.geolocation?.getCurrentPosition(() => {})}
            >
              My Location
            </Button>
          </div>
        </div>
      </section>

      {/* Map Container */}
      <section className="h-[70vh] relative">
        <MapContainer
          center={[-7.2575, 112.7521]}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Tourism Spots Markers */}
          {showTourism && tourismSpots.map((spot) => (
            <Marker
              key={`tourism-${spot.id}`}
              position={[spot.lat, spot.lng]}
              icon={tourismIcon}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <img
                    src={spot.image_url}
                    alt={spot.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-bold text-lg mb-1">{spot.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {spot.category}
                    </span>
                    <button
                      onClick={() => window.open(`/tourism#${spot.id}`, '_blank')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Business Markers */}
          {showBusinesses && businesses.map((business) => (
            <Marker
              key={`business-${business.id}`}
              position={[(business as any).lat || -7.2565, (business as any).lng || 112.7511]}
              icon={businessIcon}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <img
                    src={business.image_url}
                    alt={business.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-bold text-lg mb-1">{business.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{business.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{business.location}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`tel:${business.contact}`, '_self')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Call
                      </button>
                      <button
                        onClick={() => window.open(`/business#${business.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      {/* Legend and Info */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Tourism Spots</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Green markers indicate tourism attractions and points of interest.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Local Businesses</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Blue markers show local businesses and services available in the village.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Features</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Click on markers for detailed information and direct actions.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapPage;