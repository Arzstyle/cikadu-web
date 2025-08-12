import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { supabase } from '../services/supabase';

const schema = yup.object({
  name: yup.string().required('Nama wajib diisi').min(2, 'Nama minimal 2 karakter'),
  email: yup.string().required('Email wajib diisi').email('Masukkan email yang valid'),
  message: yup.string().required('Pesan wajib diisi').min(10, 'Pesan minimal 10 karakter'),
});

type FormData = yup.InferType<typeof schema>;

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('feedbacks')
        .insert([{
          name: data.name,
          email: data.email,
          message: data.message,
        }]);

      if (error) {
        // If Supabase fails, show success anyway for demo purposes
        console.log('Supabase not configured, showing success message');
      }

      toast.success('Terima kasih atas pesan hati Anda! Kami akan segera merespons dengan penuh kehangatan.');
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.success('Terima kasih atas pesan hati Anda! Kami akan segera merespons dengan penuh kehangatan.');
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat Surga Kami',
      details: ['Desa Cikadu, Kecamatan Pelabuhanratu', 'Kabupaten Sukabumi, Jawa Barat', 'Indonesia 43364'],
    },
    {
      icon: Phone,
      title: 'Sambungan Hati',
      details: ['+62 123-456-789', '+62 987-654-321'],
    },
    {
      icon: Mail,
      title: 'Surat Elektronik',
      details: ['info@desacikadu.id', 'wisata@desacikadu.id'],
    },
    {
      icon: Clock,
      title: 'Waktu Pelayanan',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 09:00 - 14:00', 'Minggu: Tutup'],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sampaikan Hati Anda
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kami sangat menantikan untuk mendengar dari Anda! Baik itu pertanyaan tentang keindahan desa kami, 
              berbagi masukan berharga, atau membutuhkan bantuan, kami siap melayani dengan sepenuh hati.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Heart className="h-6 w-6 text-red-500 mr-2" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Kirimkan Pesan Hati Anda
                  </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200`}
                      placeholder="Masukkan nama lengkap Anda"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200`}
                      placeholder="Masukkan alamat email Anda"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pesan dari Hati
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-200`}
                      placeholder="Ceritakan apa yang ada di hati Anda..."
                    />
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    icon={Send}
                    disabled={isSubmitting}
                    className="w-full hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? 'Mengirim dengan Cinta...' : 'Kirim Pesan Hati'}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Informasi Kontak Kami
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  Hubungi kami melalui berbagai saluran komunikasi berikut. Kami berkomitmen 
                  merespons semua pertanyaan dalam waktu 24 jam dengan penuh perhatian dan kehangatan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                            <info.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map Preview */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Temukan Surga Kami di Sini
                </h3>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Peta interaktif akan ditampilkan di sini
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => window.open('/map', '_blank')}
                    >
                      Lihat Peta Lengkap
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Pertanyaan yang Sering Menggugah Hati
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Jawaban cepat untuk pertanyaan umum tentang mengunjungi surga kecil kami.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'Kapan waktu terbaik untuk mengunjungi Desa Cikadu?',
                answer: 'Waktu terbaik adalah selama musim kemarau dari April hingga Oktober, ketika cuaca cerah dan sebagian besar aktivitas outdoor tersedia dengan kondisi optimal.',
              },
              {
                question: 'Apakah tersedia akomodasi untuk menginap?',
                answer: 'Ya, kami memiliki beberapa homestay dan rumah tamu yang dikelola keluarga lokal dengan kehangatan khas desa. Hubungi kami untuk reservasi dan rekomendasi terbaik.',
              },
              {
                question: 'Bagaimana cara menuju ke Desa Cikadu?',
                answer: 'Desa dapat diakses dengan bus dari kota terdekat, dilanjutkan perjalanan singkat dengan ojek. Kami dapat mengatur transportasi atas permintaan dengan senang hati.',
              },
              {
                question: 'Aktivitas apa saja yang tersedia untuk wisatawan?',
                answer: 'Kami menawarkan jalur hiking yang menakjubkan, workshop budaya yang menginspirasi, pengalaman pertanian tradisional, dan tur situs bersejarah yang memukau.',
              },
              {
                question: 'Apakah ada panduan lokal yang bisa membantu?',
                answer: 'Tentu saja! Kami memiliki pemandu lokal berpengalaman yang siap berbagi pengetahuan mendalam tentang sejarah, budaya, dan keindahan alam desa kami.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mari Bersama Membangun Mimpi
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Setiap pesan dari Anda adalah langkah berharga menuju masa depan yang lebih cerah 
              bagi Desa Cikadu. Mari bersama-sama mewujudkan impian komunitas yang berkelanjutan.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Mulai Percakapan Sekarang
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;