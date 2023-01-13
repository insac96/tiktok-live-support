const AppConfig = require('./app.config')

module.exports = {
  telemetry: false,

  ssr: false,

  srcDir: '_client/',

  dev: !(process.env.NODE_ENV === 'production'),

  head: {
    title: 'Tiktok Live Support',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Quicksand:300,400,500,600,700' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/boxicons@2.0.9/css/boxicons.min.css' }
    ]
  },

  css: [
    '@/assets/style/index.sass'
  ],

  plugins: [
    { src: '@/plugins/socket.js', mode: 'client' },
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      theme_color: '#232830'
    },
    manifest: {
      name: 'Tiktok Live Support',
      short_name: 'TLS',
      description: 'App Support for Tiktok Live',
      background_color: '#232830',
      lang: 'vi'
    }
  },

  loadingIndicator: {
    color: '#ffffff',
    background: '#232830'
  },

  build: {
    postcss: null
  },

  server: {
    port: process.env.PORT || AppConfig.port
  }
}
