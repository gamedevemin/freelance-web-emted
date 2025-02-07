export default {
  titleTemplate: '%s | Emted Tedarik',
  defaultTitle: 'Emted Tedarik - Kurumsal Temizlik ve Hijyen Çözümleri',
  description: 'Profesyonel temizlik ürünleri ve ekipmanlarında 15 yıllık tecrübe. Kurumsal müşterilerimize özel çözümler sunuyoruz.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://emted.com.tr/',
    site_name: 'Emted Tedarik',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Emted Tedarik',
      },
    ],
  },
  twitter: {
    handle: '@emtedtedarik',
    site: '@emtedtedarik',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#2563EB',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};
