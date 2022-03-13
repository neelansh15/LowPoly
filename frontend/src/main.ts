import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import 'virtual:windi.css'
// Only for development
import 'virtual:windi-devtools'

createApp(App).use(router).mount("#app");
