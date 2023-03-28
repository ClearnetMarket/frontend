import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/main.css'
import router from './router'
import Pagination from 'v-pagination-3';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell,faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import Axios from 'axios'
import Notifications from '@kyvg/vue3-notification'

library.add(faBell, faShoppingCart, faEnvelope)

const baseURL = import.meta.env.VITE_BASE_URL
Axios.defaults.baseURL = baseURL

const app = createApp(App)

app.use(router)
.component("font-awesome-icon", FontAwesomeIcon)
.component('pagination', Pagination);
app.use(Notifications).mount('#app')
