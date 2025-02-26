import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Initialize Pinia
const pinia = createPinia()
app.use(pinia) // Use Pinia in the app
app.use(router)

app.mount('#app')







