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
import PaperLook from "@/views/student/PaperLook.vue";
import PaperLooks from "@/views/public/PaperLooks.vue";
import TeacherSub from "@/views/teacher/TeacherSub.vue";
import ThTopic from "@/views/teacher/ThTopic.vue";
import ThPaper from "@/views/teacher/ThPaper.vue";
import MyStudyTeam from "@/views/teacher/MyStudyTeam.vue";
import PaperTest from "@/views/student/PaperTest.vue";
import TestHistory from "@/views/student/TestHistory.vue";
import TestOnline from "@/views/student/TestOnline.vue";
import TestLook from "@/views/student/TestLook.vue";
import PaperRelease from "@/views/teacher/PaperRelease.vue";
import MyPaper from "@/views/teacher/MyPaper.vue";

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
        component: TestOnline,
        redirect:'/student/home/test/do',
        children:[
          {
            path:'do',
            component: StuTest
          },
          {
            path:'his',
            component: TestHistory
          }
        ]
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
    },
      {
        path: 'subject',
        component: TeacherSub
      },
      {
        path: 'topic',
        component: ThTopic
      },
      {
        path: 'paper',
        component: ThPaper
      },
      {
        path: 'release',
        component: PaperRelease
      },
      {
        path: 'myPaper',
        component: MyPaper
      },
      {
        path: 'myStudent',
        component: MyStudyTeam
      }]
  },
    // 试卷路由
  { //学生查看试卷信息
    path: '/paper/look/:id',
    component: PaperLook
  },
  { //教师、管理员查看试卷信息
    path: '/paper/looks/:id',
    component: PaperLooks
  },
  { //学生考试功能
    path: '/paper/test/:id',
    component: PaperTest
  },
  { //学生考试查看
    path: '/paper/test/look/:id',
    component: TestLook
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
