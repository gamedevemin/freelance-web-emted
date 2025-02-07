import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: string;
}

const ProductList = memo(function ProductList({ 
  products, 
  isLoading, 
  error 
}: ProductListProps) {
  const { t } = useTranslation('common');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-80"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-4 py-2 rounded-md bg-red-50 text-red-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('product.noResults')}</p>
        <p className="text-sm text-gray-400 mt-2">{t('product.tryDifferent')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;
