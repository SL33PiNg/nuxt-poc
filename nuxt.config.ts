// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    "@hebilicious/vue-query-nuxt",
    "@vueuse/nuxt",
    "vuetify-nuxt-module"
  ],
  devtools: { enabled: true }
})