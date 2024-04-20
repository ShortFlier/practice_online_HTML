<template>
  <router-link to='/login'></router-link>
  <router-view/>
</template>
<script setup>
import {onMounted} from "vue";
import store from "@/store";
import router from "@/router";

onMounted(()=>{
  if(sessionStorage.getItem('identity')&&sessionStorage.getItem('account')&&sessionStorage.getItem('token')){
    store.state.identity=sessionStorage.getItem('identity')
    store.state.account=sessionStorage.getItem('account')
    store.state.token=sessionStorage.getItem('token')
    if(sessionStorage.getItem('id'))
      store.state.id=sessionStorage.getItem('id')
  }
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  console.log(from.path+' [to] '+to.path)
  // 前往登入，放行
  if(to.path.includes('login')){
    store.state.identity=null
    store.state.account=null
    store.state.token=null
    store.state.id=null
    next()
  }else if(to.path.includes('paper')){ //前往查看试卷
    next()
  } else {
    // 学生界面允许前往学生界面，不允许前往其他界面
    if (from.path.includes('student')&&to.path.includes('student')) {
      next()
    } //教师界面允许前往教师界面，不允许前往其他界面
    else if(from.path.includes('teacher')&&to.path.includes('teacher')){
      next()
    }//管理员登入界面不允许前往管理员界面
    else if(from.path.includes('admin/login')&&to.path.includes('admin')){
      if(store.state.identity=='admin')
        next()
      else{
        router.replace('/admin/login')
        console.log('管理员登入界面不允许前往管理员界面')
      }

    }//管理员界面允许前往管理员界面，不允许前往其他界面
    else if(from.path.includes('admin')&&to.path.includes('admin')){
      next()
    }else{
      if(to.path.includes(store.state.identity)&&store.state.account&&store.state.token)
        next()
      else{
        console.log('其他路由拦截')
        console.log(from.path)
        console.log(to.path)
        console.log(store.state.identity)
        router.replace('/login')
      }
    }
  }
})

</script>
<style>

</style>
