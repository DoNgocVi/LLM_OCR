import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import 'uno.css';
import './assets/fonts.css';
import enLocal from '@/locales/en.json'
import jaLocal from '@/locales/ja.json'
import App from './App.vue'
import router from './routes'
import naive from 'naive-ui'
import { createPinia } from 'pinia'

const savedLocale = localStorage.getItem('language') || 'en';
const i18n = createI18n({
  // legacy: false,
  locale: savedLocale,
  fallbackLocale: 'ja',
  messages: {
    en: enLocal,
    ja: jaLocal
  }
})
const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(naive)
app.use(i18n)
app.use(pinia)
app.mount('#app');