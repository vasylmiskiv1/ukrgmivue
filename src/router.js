import { createRouter, createWebHashHistory } from "vue-router";

import PostsScreen from "./screens/PostsScreen.vue";
import PostScreen from "./screens/PostScreen.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/posts" },
    { path: "/posts", component: PostsScreen },
    { path: "/post/:id", component: PostScreen },
  ],
});
