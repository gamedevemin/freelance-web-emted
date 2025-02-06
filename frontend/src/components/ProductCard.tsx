import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onCompare?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onCompare,
  onFavorite,
}: ProductCardProps) {
  const { t } = useTranslation('common');
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick Actions */}
      <div
        className={`absolute right-2 top-2 flex flex-col space-y-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {onCompare && (
          <button
            onClick={() => onCompare(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title={t('products.actions.compare')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
        )}
        {onFavorite && (
          <button
            onClick={() => onFavorite(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title={t('products.actions.favorite')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Product Image */}
      <div className="relative h-64 rounded-t-lg overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-200"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={product.featured}
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-red-500 rounded-full">
              {t('products.outOfStock')}
            </span>
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-600">
                  {formatPrice(
                    product.price * (1 - product.discount / 100)
                  )}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          {product.stock > 0 && (
            <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {t('products.inStock', { count: product.stock })}
            </span>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        {product.stock > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className="w-16 text-center border-x border-gray-300 py-1"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('products.addToCart')}
            </button>
          </div>
        )}

        {/* Bulk Order Button */}
        {product.stock > 0 && (
          <button
            onClick={() => window.location.href = '/contact'}
            className="w-full mt-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
          >
            {t('products.actions.bulkOrder')}
          </button>
        )}
      </div>
    </article>
  );
}
