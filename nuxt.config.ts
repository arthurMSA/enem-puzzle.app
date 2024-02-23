// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores', 'composables'],
  },
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              background: '#fafafa',
              primary: '#3B6CB0',
              'primary-darken-1': '#1F5592',
              secondary: '#88ABDC',
              'secondary-darken-1': '#018786',
              error: '#B00020',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FB8C00',
            },
          }
        }
      }
    }
  }
})
