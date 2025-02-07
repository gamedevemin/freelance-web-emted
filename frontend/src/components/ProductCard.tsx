import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import type { Product } from '../types/product';

export default function ProductCard({
  name,
  description,
  price,
  image,
  category,
  stock,
}: Product) {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 sm:h-64">
        <Image
          src={image || '/images/placeholder.jpg'}
          alt={name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-blue-600 mb-1">{category}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            ₺{price.toLocaleString('tr-TR')}
          </span>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
            <span className="text-sm text-gray-600">
              {stock > 0 ? `${stock} ${t('product.inStock')}` : t('product.outOfStock')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
