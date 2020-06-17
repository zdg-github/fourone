export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: "四一疫情"|| '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
      'element-ui/lib/theme-chalk/index.css', 
      '@assets/styles/global.css'
    ],
  /*
   ** Plugins to load before mounting the App
   */  // 配置插件
  plugins: [
      '@/plugins/element-ui',
      '~plugins/echarts',
      "~/plugins/axios",
      { src: '@/plugins/localStorage.js', ssr: false},
      { src: '@/plugins/CKEditorPlugin.js', ssr: false}
    ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    //   baseURL:"http://n3167553k9.wicp.vip/"
      baseURL:"http://39.99.141.244:8085/",
      proxy:true,

  },
  proxy: {
    '/api': {
    target: 'http://39.99.141.244:8085',
    pathRewrite: {
    '^/api' : '/',
    changeOrigin: true
    },
    },
    '/reg': {
    target: 'http://39.99.141.244:8085',
    pathRewrite: {
    '^/reg' : '/',
    changeOrigin: true
    }
    },
    '/img/': {
    target: 'http://manyuem.cn',
    pathRewrite: {
    '^/img/' : '/',
    changeOrigin: true
    }
    },
    '/extension': {
    target: 'http://c.m.163.com',
    pathRewrite: {
    '^/extension' : '/',
    changeOrigin: true
    }
    }
    },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    rules:[
      {
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            'stylus-loader'
        ]
      }  
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
