import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import 'virtual:windi.css'
// Only for development
import 'virtual:windi-devtools'
import './assets/main.css'

createApp(App).use(router).mount("#app");
