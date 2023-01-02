import {createApp} from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import './index.css';
import router from './router';
import store from './store';
import Axios from 'axios';
import Notifications from '@kyvg/vue3-notification';

const baseURL = 'https://api.freeport.cash';

Axios.defaults.baseURL = baseURL;

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Notifications)
.mount("#app");
