import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createYmaps({ apikey: 'd586946e-7315-4761-90c2-1ea619e2eb6a' }));

app.mount('#app')
