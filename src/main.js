import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faLocationDot, faDroplet, faWind, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faLocationDot, faDroplet, faWind, faSpinner)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
