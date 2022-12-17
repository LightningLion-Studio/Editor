import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/edit",
      name: "editor",
      component: () => import("../views/edit.vue"),
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.path === '/edit') {
    document.querySelector('body').style = 'height: auto;overflow: hidden'
  } else {
    document.querySelector('body').style = 'height: 100vh;overflow: auto'
  }
})

export default router;
