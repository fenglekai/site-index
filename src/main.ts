import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { registerSW } from 'virtual:pwa-register';
import directive from "./directive";

const app = createApp(App);

registerSW({ immediate: true });

app.use(directive);
app.use(router);
app.mount("#app");
