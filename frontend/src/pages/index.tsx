import { useState, Suspense } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { categories, products } from '../data/products';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';

// Ortak stil sınıfları
const buttonStyles = {
  base: 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-200',
  active: 'bg-blue-600 text-white shadow-lg',
  inactive: 'bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600',
};

const trustIndicators = [
  { icon: '', title: '1000+', description: 'Kurumsal Müşteri' },
  { icon: '', title: '15+', description: 'Yıllık Tecrübe' },
  { icon: '', title: '24h', description: 'Hızlı Teslimat' },
  { icon: '', title: '100%', description: 'Müşteri Memnuniyeti' },
];

export default function Home() {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Head>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                  <span className="block text-blue-600 mb-2">
                    Kurumsal Temizlik ve Hijyen
                  </span>
                  <span className="block">
                    Çözümlerinde Güvenilir Tedarikçiniz
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                  Tek kullanımlık ürünlerden, endüstriyel temizlik malzemelerine kadar tüm ihtiyaçlarınız için yanınızdayız.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Ürünleri Keşfet
                  </button>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors">
                    Özel Teklif Al
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                {trustIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="text-3xl mb-3">{indicator.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {indicator.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {indicator.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Brands */}
              <div className="mt-16">
                <p className="text-sm font-medium text-gray-500 text-center mb-8">
                  ÇALIŞTIĞIMIZ MARKALAR
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 flex items-center justify-center">
                      <Image
                        src={`https://placehold.co/120x40?text=Marka+${i + 1}`}
                        alt={`Marka ${i + 1}`}
                        width={120}
                        height={40}
                        className="grayscale"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 py-8">
              <button
                className={`${buttonStyles.base} ${
                  selectedCategory === '' ? buttonStyles.active : buttonStyles.inactive
                }`}
                onClick={() => setSelectedCategory('')}
              >
                {t('filter.allCategories')}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${buttonStyles.base} ${
                    selectedCategory === category.slug
                      ? buttonStyles.active
                      : buttonStyles.inactive
                  }`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          {/* Products */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <article
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                    >
                      <div className="relative h-64 rounded-t-lg overflow-hidden">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          priority={product.id === '1'}
                        />
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {t('products.outOfStock')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold text-blue-600">
                            {new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY',
                            }).format(product.price)}
                          </span>
                          {product.stock > 0 && (
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              {t('products.inStock', { count: product.stock })}
                            </span>
                          )}
                        </div>
                        <button
                          className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                            product.stock > 0
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0
                            ? t('products.addToCart')
                            : t('products.outOfStock')}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </Suspense>
            </ErrorBoundary>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
};
