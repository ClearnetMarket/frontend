import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import './index.css';
import router from './router';
import store from './store';
import Axios from "axios";

const baseURL = 'http://192.168.1.101:5000';
Axios.defaults.baseURL = baseURL;
createApp(App)
.use(store)
.use(router)
.mount('#app')
