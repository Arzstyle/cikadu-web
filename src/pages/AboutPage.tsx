import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Award } from 'lucide-react';
import Card from '../components/UI/Card';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Population', value: '2,500+' },
    { icon: MapPin, label: 'Area', value: '15 km²' },
    { icon: Calendar, label: 'Founded', value: '1892' },
    { icon: Award, label: 'Awards', value: '5+' },
  ];

  const traditions = [
    {
      title: 'Annual Harvest Festival',
      description: 'A celebration of our agricultural heritage with traditional dances, local food, and community gatherings.',
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Traditional Crafts',
      description: 'Local artisans continue centuries-old traditions of pottery, weaving, and woodcarving.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Community Gardens',
      description: 'Sustainable farming practices passed down through generations, focusing on organic methods.',
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
              About Our Village
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nestled in the heart of nature, our village represents a perfect blend of 
              traditional values and modern sustainable living.
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
                <Card className="p-6 text-center">
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
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 1892 by a group of pioneering families, our village has grown 
                  from a small agricultural settlement into a thriving community that 
                  balances tradition with innovation.
                </p>
                <p>
                  Over the decades, we've maintained our commitment to sustainable living, 
                  community cooperation, and environmental stewardship. Our residents take 
                  pride in preserving the natural beauty that surrounds us while embracing 
                  modern amenities and opportunities.
                </p>
                <p>
                  Today, our village serves as a model for rural development, attracting 
                  visitors who seek authentic experiences and a connection to nature. 
                  We welcome guests with open arms and invite them to be part of our story.
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
                alt="Village landscape"
                className="rounded-2xl shadow-2xl"
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
              Our Traditions & Culture
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Rich cultural heritage and time-honored traditions that define our 
              community identity and bring us together.
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
                <Card className="overflow-hidden">
                  <img
                    src={tradition.image}
                    alt={tradition.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {tradition.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
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
                alt="Village geography"
                className="rounded-2xl shadow-2xl"
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
                Geography & Environment
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Our village is strategically located in a fertile valley, surrounded 
                  by rolling hills and pristine forests. The region enjoys a temperate 
                  climate with four distinct seasons, each bringing its own beauty 
                  and agricultural opportunities.
                </p>
                <p>
                  The area is blessed with natural springs, meandering streams, and 
                  rich soil that has supported agriculture for generations. Our 
                  commitment to environmental conservation ensures that future 
                  generations will inherit the same natural beauty we enjoy today.
                </p>
                <p>
                  Wildlife thrives in our protected forests, and our sustainable 
                  farming practices have created a harmonious ecosystem where 
                  human activity and nature coexist peacefully.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;