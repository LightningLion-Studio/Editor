import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import naive from "naive-ui";
import format from "./utils/format"
Date.prototype.format = format

import "./assets/main.less";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
