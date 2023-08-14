import './assets/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
