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
import SubAudit from "@/views/admin/SubAudit.vue";
import TopicAudit from "@/views/admin/TopicAudit.vue";
import StuHome from "@/views/student/StuHome.vue";
import TeacherHome from "@/views/teacher/TeacherHome.vue";
import Personal from "@/views/public/Personal.vue";
import Practice from "@/views/student/Practice.vue";
import StuTest from "@/views/student/StuTest.vue";
import StuGrade from "@/views/student/StuGrade.vue";
import StuMyTeacher from "@/views/student/StuMyTeacher.vue";

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
    // 管理员路由
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
        component: AuditAdm,
        redirect: '/admin/home/auditAdmin/subAudit',
        children:[
          {
            path:'subAudit',
            component:SubAudit
          },
          {
            path: 'topicAudit',
            component: TopicAudit
          }
        ]
      },
      {
        path:'else',
        component: Else
      }
    ]
  },
    // 学生路由
  {
    path: '/student/home',
    component: StuHome,
    redirect: '/student/home/personal',
    children: [
      {
        path: 'personal',
        component: Personal
      },
      {
        path: 'practice',
        component: Practice
      },
      {
        path:'test',
        component: StuTest
      },
      {
        path: 'grade',
        component: StuGrade
      },
      {
        path:'myTeacher',
        component: StuMyTeacher
      }
    ]
  },
    //教师路由
  {
    path: '/teacher/home',
    component: TeacherHome,
    redirect: '/teacher/home/personal',
    children: [{
      path: 'personal',
      component: Personal
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
