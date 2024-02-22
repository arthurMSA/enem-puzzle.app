// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              background: '#fafafa',
              primary: '#3B6CB0',
              'primary-darken-1': '#1F5592',
              secondary: '#48A9A6',
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
