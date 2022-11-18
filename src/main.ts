import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist'

import App from "./App.vue";
import router from "./router";
import naive from "naive-ui";
import format from "./utils/format"
Date.prototype.format = format
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import "./assets/main.less";

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia);
app.use(router);
app.use(naive);


app.mount("#app");
