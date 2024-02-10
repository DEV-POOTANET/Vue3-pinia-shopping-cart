import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router/index'

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

//import css
import './styles.css'

// Pinia 
import { createPinia } from 'pinia'
const pinia = createPinia()

const app =createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
