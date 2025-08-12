/*
  # Village Profile Database Schema

  1. New Tables
    - `tourism_spots`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `lat` (float)
      - `lng` (float)
      - `category` (text)
      - `created_at` (timestamp)
    
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `contact` (text)
      - `location` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `feedbacks`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and authenticated write access
*/

-- Create tourism_spots table
CREATE TABLE IF NOT EXISTS tourism_spots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  lat float NOT NULL,
  lng float NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  contact text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE tourism_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create policies for tourism_spots
CREATE POLICY "Tourism spots are viewable by everyone"
  ON tourism_spots
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Tourism spots can be created by authenticated users"
  ON tourism_spots
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for businesses
CREATE POLICY "Businesses are viewable by everyone"
  ON businesses
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Businesses can be created by authenticated users"
  ON businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for feedbacks
CREATE POLICY "Feedbacks can be created by everyone"
  ON feedbacks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Feedbacks are viewable by authenticated users"
  ON feedbacks
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data for tourism spots
INSERT INTO tourism_spots (name, description, image_url, lat, lng, category) VALUES
('Ancient Temple Ruins', 'Explore the mysterious ruins of an ancient temple dating back to the 14th century, surrounded by lush tropical vegetation.', 'https://images.unsplash.com/photo-1539650116574-75c0c6bbf8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2575, 112.7521, 'historical'),
('Sunrise Viewpoint', 'Wake up early to catch the breathtaking sunrise from our highest peak, offering panoramic views of the entire valley.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2585, 112.7531, 'nature'),
('Traditional Market', 'Experience authentic local life at our bustling traditional market, featuring fresh produce and handmade crafts.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2565, 112.7511, 'cultural'),
('Hidden Waterfall', 'Discover a secluded waterfall hidden deep in the forest, perfect for swimming and nature photography.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2555, 112.7541, 'nature'),
('Heritage Village Center', 'Step back in time at our heritage center, showcasing traditional architecture and cultural artifacts.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2575, 112.7501, 'cultural'),
('Eco-Adventure Trail', 'Embark on a guided eco-adventure through diverse ecosystems, perfect for hiking and wildlife spotting.', 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', -7.2595, 112.7551, 'adventure');

-- Insert sample data for businesses
INSERT INTO businesses (name, description, contact, location, image_url) VALUES
('Green Valley Organic Farm', 'Family-owned organic farm producing fresh vegetables, herbs, and free-range eggs. Visit our farm shop for the freshest produce straight from the field.', '+62 812-3456-7890', 'North Village District', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'),
('Traditional Handicrafts Workshop', 'Authentic handmade pottery, textiles, and woodcarvings created by local artisans using traditional techniques passed down through generations.', '+62 813-4567-8901', 'Village Center', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'),
('Mountain View Café', 'Cozy café serving locally sourced coffee, traditional snacks, and homemade pastries with stunning mountain views from our terrace.', '+62 814-5678-9012', 'Main Street', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'),
('Village Eco-Tourism Guide', 'Professional tour guide services for hiking, bird watching, and cultural tours. Discover hidden gems with our experienced local guides.', '+62 815-6789-0123', 'Tourism Information Center', 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'),
('Sunrise Bakery', 'Traditional bakery making fresh bread, pastries, and local specialties daily. Famous for our wood-fired oven and ancient recipes.', '+62 816-7890-1234', 'Old Town Square', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'),
('Herbal Medicine Shop', 'Traditional herbal remedies and natural health products made from locally grown medicinal plants. Consultations available with certified herbalists.', '+62 817-8901-2345', 'East Village', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80');