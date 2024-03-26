import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "@/views/public/LoginView.vue";
import adminLogin from "@/views/admin/adminLogin.vue";
import AdminHome from "@/views/admin/AdminHome.vue";
import Overview from "@/views/admin/Overview.vue";
import UserAdm from "@/views/admin/UserAdm.vue";
import SubjectAdm from "@/views/admin/SubjectAdm.vue";
import TopicAdm from "@/views/admin/TopicAdm.vue";
import TestAdm from "@/views/admin/TestAdm.vue";
import AuditAdm from "@/views/admin/AuditAdm.vue";
import Else from "@/views/admin/Else.vue";

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:LoginView
  },
  {
    path: '/admin/login',
    component: adminLogin
  },
  {
    path: '/admin/home',
    component: AdminHome,
    redirect: '/admin/home/overview',
    children:[
      {
        path:'overview',
        component:Overview
      },
      {
        path:'userAdmin',
        component: UserAdm,
      },
      {
        path:'subjectAdmin',
        component: SubjectAdm
      },
      {
        path:'topicAdmin',
        component: TopicAdm
      },
      {
        path:'testAdm',
        component: TestAdm
      },
      {
        path:'auditAdmin',
        component: AuditAdm
      },
      {
        path:'else',
        component: Else
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
