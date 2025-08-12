# 🏘️ Village Profile PWA

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/village-profile-pwa)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/village-profile-pwa/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-enabled-purple)](https://web.dev/progressive-web-apps/)

> A modern, interactive Progressive Web Application for showcasing village profiles, tourism spots, and local businesses. Built with React, TypeScript, and Supabase.

![Village Profile PWA Screenshot](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Setup](#environment-setup)
- [Database Schema](#database-schema)
- [PWA Features](#pwa-features)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 About

Village Profile PWA is a comprehensive web application designed to digitally showcase rural communities and promote local tourism. Originally developed for KKN (Community Service Program) projects, this application provides an interactive platform for villages to present their cultural heritage, tourism attractions, and local businesses to visitors worldwide.

The application features a clean, Apple-inspired design with earth-tone aesthetics, smooth animations, and mobile-first responsive layout. It's built as a Progressive Web App, making it installable on devices and accessible offline.

## ✨ Features

### 🏠 Core Features
- **Interactive Village Showcase** - Comprehensive village profile with cultural and geographical information
- **Tourism Management** - Filterable tourism spots with categories and detailed descriptions
- **Business Directory** - Local business listings with contact information and locations
- **Interactive Maps** - Leaflet-powered maps with custom markers for tourism and business locations
- **Feedback System** - Real-time feedback collection and management

### 🎨 User Experience
- **Progressive Web App** - Installable, offline-capable, and app-like experience
- **Responsive Design** - Mobile-first design that works on all screen sizes
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Earth-tone Palette** - Carefully crafted color scheme reflecting natural village aesthetics

### 🔧 Technical Features
- **Real-time Database** - Supabase integration for dynamic content management
- **Form Validation** - React Hook Form with Yup schema validation
- **SEO Optimized** - Meta tags and structured data for better search visibility
- **TypeScript** - Full type safety and better developer experience
- **Modern Build Tools** - Vite for fast development and optimized production builds

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

### Backend & Services
- **Supabase** - Backend-as-a-Service (Database, Auth, Storage)
- **PostgreSQL** - Robust relational database via Supabase

### Maps & Location
- **Leaflet** - Open-source interactive maps
- **React Leaflet** - React components for Leaflet maps

### Forms & Validation
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation library

### Additional Tools
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Beautiful & consistent icon library

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**

### Step-by-step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/village-profile-pwa.git
   cd village-profile-pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the migration file in your Supabase SQL editor:
   ```sql
   -- Copy and paste the content from supabase/migrations/create_village_schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 💻 Usage

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Basic Usage Examples

#### Adding Tourism Spots
```typescript
import { supabase } from './services/supabase';

const addTourismSpot = async (spotData) => {
  const { data, error } = await supabase
    .from('tourism_spots')
    .insert([{
      name: spotData.name,
      description: spotData.description,
      image_url: spotData.image_url,
      lat: spotData.lat,
      lng: spotData.lng,
      category: spotData.category
    }]);
  
  if (error) throw error;
  return data;
};
```

#### Fetching Business Data
```typescript
const fetchBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
```

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Analytics
VITE_GA_TRACKING_ID=your-google-analytics-id
```

### Supabase Setup

1. **Create a new project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings > API
3. **Run the database migration** using the SQL editor
4. **Enable Row Level Security** for all tables
5. **Set up authentication** (if needed for admin features)

## 🗄️ Database Schema

### Tables Overview

#### `tourism_spots`
```sql
CREATE TABLE tourism_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `businesses`
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  contact TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `feedbacks`
```sql
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security Policies

All tables include RLS policies for secure data access:
- **Public read access** for tourism spots and businesses
- **Authenticated write access** for content management
- **Public write access** for feedback submission

## 📱 PWA Features

### Installation
The app can be installed on devices through the browser's "Add to Home Screen" feature.

### Offline Capability
- **Service Worker** caches essential resources
- **Offline fallback** pages for network failures
- **Background sync** for form submissions (when implemented)

### Manifest Configuration
```json
{
  "name": "Village Profile - Interactive Village Showcase",
  "short_name": "VillageProfile",
  "description": "Discover our beautiful village through interactive maps, tourism spots, and local businesses",
  "theme_color": "#059669",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design principles

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write self-documenting code with clear variable names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Village Profile PWA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/yourusername/village-profile-pwa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/village-profile-pwa/discussions)

### Contact Information
- **Project Maintainer**: [Your Name](mailto:your.email@example.com)
- **Project Repository**: [GitHub](https://github.com/yourusername/village-profile-pwa)
- **Demo**: [Live Demo](https://your-village-profile.netlify.app)

### Reporting Issues
When reporting issues, please include:
- **Environment details** (OS, browser, Node.js version)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Error messages** or console logs

---

<div align="center">

**Built with ❤️ for rural communities worldwide**

[⭐ Star this repo](https://github.com/yourusername/village-profile-pwa) | [🐛 Report Bug](https://github.com/yourusername/village-profile-pwa/issues) | [✨ Request Feature](https://github.com/yourusername/village-profile-pwa/issues)

</div>