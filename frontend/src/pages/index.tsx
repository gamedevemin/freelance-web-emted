import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories, products } from '../data/products';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

// Stil ve animasyon sabitleri
const buttonStyles = {
  base: 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform',
  active: 'bg-blue-600 text-white shadow-lg scale-105',
  inactive: 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:scale-105',
};

const trustIndicators = [
  { icon: '🏢', title: '1000+', description: 'Kurumsal Müşteri' },
  { icon: '⭐', title: '15+', description: 'Yıllık Tecrübe' },
  { icon: '🚚', title: '24h', description: 'Hızlı Teslimat' },
  { icon: '💯', title: '100%', description: 'Müşteri Memnuniyeti' },
];

const categoryEmojis: { [key: string]: string } = {
  'temizlik-malzemeleri': '🧹',
  'kagit-urunleri': '🧻',
  'tek-kullanimlik': '🥤',
  'endüstriyel': '🏭',
  'dezenfektanlar': '🧪',
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simüle edilmiş yükleme durumu
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Head>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <motion.section 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-gradient-to-b from-white to-gray-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="text-center">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
                  variants={fadeInUp}
                >
                  <span className="block text-blue-600 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                    Kurumsal Temizlik ve Hijyen 🧼
                  </span>
                  <span className="block">
                    Çözümlerinde Güvenilir Tedarikçiniz
                  </span>
                </motion.h1>
                <motion.p 
                  className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
                  variants={fadeInUp}
                >
                  Tek kullanımlık ürünlerden, endüstriyel temizlik malzemelerine kadar tüm ihtiyaçlarınız için yanınızdayız.
                </motion.p>
                <motion.div 
                  className="mt-8 flex justify-center space-x-4"
                  variants={fadeInUp}
                >
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Ürünleri Keşfet
                  </button>
                  <a
                    href="https://wa.me/+905001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div 
                className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
                variants={stagger}
              >
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-4xl mb-3 transform transition-transform hover:scale-110">
                      {indicator.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {indicator.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {indicator.description}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Featured Brands */}
              <motion.div 
                className="mt-16"
                variants={fadeInUp}
              >
                <p className="text-sm font-medium text-gray-500 text-center mb-8">
                  ÇALIŞTIĞIMIZ MARKALAR ⭐
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                  {[...Array(6)].map((_, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="h-12 flex items-center justify-center"
                    >
                      <Image
                        src={`https://placehold.co/120x40?text=Marka+${i + 1}`}
                        alt={`Marka ${i + 1}`}
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Categories */}
          <motion.section 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={fadeInUp}
          >
            <div className="flex flex-wrap gap-4 py-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${buttonStyles.base} ${
                  selectedCategory === '' ? buttonStyles.active : buttonStyles.inactive
                }`}
                onClick={() => setSelectedCategory('')}
              >
                {t('filter.allCategories')}
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${buttonStyles.base} ${
                    selectedCategory === category.slug
                      ? buttonStyles.active
                      : buttonStyles.inactive
                  }`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {categoryEmojis[category.slug]} {category.name}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Products */}
          <motion.section 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            variants={fadeInUp}
          >
            <ErrorBoundary>
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <Loading />
                </div>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </ErrorBoundary>
          </motion.section>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
