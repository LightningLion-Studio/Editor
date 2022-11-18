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

document.addEventListener("gesturestart", function (event) {
	event.preventDefault()
})

document.addEventListener("dblclick", function (event) {
	event.preventDefault()
})

var lastTouchEnd = 0;
document.addEventListener("touchend",function (event) {
	var now = new Date().getTime();
	if (now - lastTouchEnd <= 300) {
		event.preventDefault();
	}
	lastTouchEnd = now
},false)


app.mount("#app");
