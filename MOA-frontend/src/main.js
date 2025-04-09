import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { useMoaStore } from '@/stores/moaStore'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const store = useMoaStore()
store.loadUserFromLocalStorage()

app.mount('#app')