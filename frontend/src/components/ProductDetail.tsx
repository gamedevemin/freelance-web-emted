import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import ImageModal from './ImageModal';

interface ProductDetailProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  minOrder: number;
  technicalSpecs?: {
    [key: string]: string;
  };
}

export default function ProductDetail({
  id,
  name,
  description,
  price,
  image,
  category,
  stock,
  minOrder,
  technicalSpecs = {},
}: ProductDetailProps) {
  const { t } = useTranslation('common');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const whatsappNumber = '+905001234567';
  const message = encodeURIComponent(`Merhaba, ${name} ürünü hakkında bilgi almak istiyorum.`);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Media Section */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={image || '/images/placeholder.jpg'}
              alt={name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
            />
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors"
            >
              {t('product.viewImage')}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-blue-600 mb-2">{category}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
            <p className="text-lg font-semibold text-blue-600">
              ₺{price.toLocaleString('tr-TR')}
            </p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {stock > 0 ? `${stock} ${t('product.inStock')}` : t('product.outOfStock')}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {t('product.description')}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">{description}</p>
          </div>

          {/* Technical Specifications */}
          {Object.keys(technicalSpecs).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {t('product.specifications')}
              </h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
                {Object.entries(technicalSpecs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              <span>{t('product.contactViaWhatsapp')}</span>
            </a>
            <button
              onClick={() => window.location.href = '/contact'}
              className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {t('product.getQuote')}
            </button>
          </div>

          {/* Minimum Order */}
          {minOrder > 1 && (
            <p className="text-sm text-gray-500">
              {t('product.minOrder', { count: minOrder })}
            </p>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={image || '/images/placeholder.jpg'}
        productName={name}
      />
    </div>
  );
}
