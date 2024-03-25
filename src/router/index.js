import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "@/views/public/LoginView.vue";

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
