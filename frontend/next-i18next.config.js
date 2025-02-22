module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    localeDetection: true,
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
