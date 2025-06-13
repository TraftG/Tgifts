import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { WebApp } from './telegram/telegram'

WebApp.lockOrientation()
WebApp.disableVerticalSwipes()
WebApp.enableClosingConfirmation()
// WebApp.requestFullscreen()

const app = createApp(App)
app.use(router)
app.mount('#app')
