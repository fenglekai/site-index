import { createApp } from "vue";
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./style.css";
import App from "./App.vue";
import router from "./router";
// import { registerSW } from 'virtual:pwa-register';
import directive from "./directive";

const pinia = createPinia()
const app = createApp(App);

// registerSW({ immediate: true });

app.use(directive);
app.use(pinia)
app.use(router);
app.mount("#app");
