import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import './index.css';
import router from './router';
import store from './store';
import Axios from "axios";
import Notifications from '@kyvg/vue3-notification';
const baseURL = 'http://172.29.107.64:5000';
Axios.defaults.baseURL = baseURL;
createApp(App)
    .use(store)
    .use(router)
    .use(Notifications)
    .mount("#app");
//# sourceMappingURL=main.js.map