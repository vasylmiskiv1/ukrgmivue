import { createApp } from "vue";
import App from "./App.vue";
import Paginate from "vuejs-paginate-next";
import router from "./router";
import store from "@/store";

createApp(App).use(router, Paginate).use(store).mount("#app");
