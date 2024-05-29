// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devServer: {
    // port: 3000,
    // host: "0.0.0.0",
    // https: {
    //   key: "localhost-key.pem",
    //   cert: "localhost.pem",
    // },
  },
  devtools: {
    enabled: false,

    // timeline: {
    //   enabled: true,
    // },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL:
        process.env.NUXT_APP_API_URL || "https://stg-admin.chaspik.ua/api",
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "243212973257690",
      FACEBOOK_APP_VER: process.env.FACEBOOK_APP_VER || "v19.0",
    },
  },
  ssr: true,
  srcDir: "src/",
  alias: {
    "@": "src/",
  },
  app: {
    head: {
      title: "Канцтовари - для офісу та школи",
      meta: [
        {
          name: "description",
          content:
            "Канцелярія, подарунки і господарські товари для офісу та школи - інтернет-магазин Час-Пік . Замовити канцтовари з доставкою: тел. +38(067) 67-11-253",
        },
        { name: "msapplication-TileColor", content: "#2d89ef" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "mask-icon",
          color: "#5bbad5",
          href: "/favicon/safari-pinned-tab.svg",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
    },
  },
  css: ["vue-select/dist/vue-select.css", "~/assets/scss/common.scss"],
  modules: [
    "nuxt-vue3-google-signin",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "nuxt-swiper",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Manrope: "200..800",
        },
      },
    ],
  ],
  googleSignIn: {
    clientId:
      process.env.GOOGLE_CLIENT_ID ||
      "28500192381-gmp26ae5d5orkkid8udibfqsusurjh8n.apps.googleusercontent.com",
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  swiper: {
    prefix: "Swiper",
    modules: ["thumbs", "effect-creative", "navigation", "pagination"],
  },
  image: {
    quality: 100,
    format: ["avif", "webp"],
    domains: ["stg-admin.chaspik.ua", "chaspik.ua"],
  },
  colorMode: {
    preference: "light",
    fallback: "light",
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  i18n: {
    locales: [
      { name: "Russian", code: "ru", iso: "ru-RU", file: "ru.js" },
      { name: "Ukraine", code: "uk", iso: "uk-UA", file: "uk.js" },
    ],
    detectBrowserLanguage: false,
    baseUrl: "https://stg.chaspik.ua",
    strategy: "prefix_except_default",
    defaultLocale: "uk",
    langDir: "locales/",
    // skipSettingLocaleOnNavigate: true,
    fallbackLocale: "uk",
    trailingSlash: "append",
  },
  // routeRules: {
  //   "/user/**": { ssr: false },
  // },
  // router: {
  //   options: {
  //     scrollBehaviorType: "smooth",
  //   },
  // },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["search"].includes(tag),
    },
  },
  experimental: {
    componentIslands: true,
    defaults: {
      nuxtLink: {
        trailingSlash: "append",
      },
    },
  },
  // debug: true,
});
