import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login.vue";
import Home from "../views/setup/Home.vue";
import Lobby from "../views/setup/Lobby.vue";
import GamePlay from "../views/game-play/GamePlay.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/lobby/:roomId",
    name: "Lobby",
    component: Lobby,
    props: true,
  },
  {
    path: "/game-play",
    name: "game-play",
    component: GamePlay,
  },
  // {
  // path: '/about',
  // name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
