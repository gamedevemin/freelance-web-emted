import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import SearchBar from '../../components/SearchBar';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

interface ProductsPageProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function Products({ initialProducts, categories }: ProductsPageProps) {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}&category=${selectedCategory}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?category=${categoryId}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Emted Tedarik - {t('products.title')}</title>
        <meta name="description" content={t('products.description')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              placeholder={t('products.searchPlaceholder')}
              className="max-w-2xl mx-auto"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('products.categories')}
                </h2>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      selectedCategory === ''
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('filter.allCategories')}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                      <div className="relative aspect-w-4 aspect-h-3">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl font-bold text-blue-600">
                              {new Intl.NumberFormat('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                              }).format(product.price)}
                            </span>
                            <span className={`text-sm ${
                              product.stock > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {product.stock > 0
                                ? t('products.inStock', { count: product.stock })
                                : t('products.outOfStock')}
                            </span>
                          </div>
                          <button
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {/* Add to cart logic */}}
                            disabled={product.stock === 0}
                          >
                            {t('products.addToCart')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('products.noResults')}
                  </h3>
                  <p className="text-gray-500">{t('products.tryDifferent')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { category } = query;
  
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products${category ? `?category=${category}` : ''}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
    ]);

    const [initialProducts, categories] = await Promise.all([
      productsRes.json(),
      categoriesRes.json()
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'tr', ['common'])),
        initialProducts,
        categories,
      },
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'tr', ['common'])),
        initialProducts: [],
        categories: [],
      },
    };
  }
};
