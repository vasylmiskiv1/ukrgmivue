import { createRouter, createWebHashHistory } from "vue-router";

import PostsScreen from "./views/PostsScreen.vue";
import MapScreen from "./views/MapScreen.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/posts" },
    { path: "/posts", component: PostsScreen },
    { path: "/map", component: MapScreen },
  ],
});
