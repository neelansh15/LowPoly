import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "virtual:windi.css";
// Only for development
import "virtual:windi-devtools";
import "./assets/main.css";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router).mount("#app");
