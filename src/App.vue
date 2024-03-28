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
  }
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  // 前往登入，放行
  if(to.path.includes('login')){
    store.state.identity=''
    store.state.account=''
    store.state.token=''
    next()
  }else {
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
      else
        router.replace('/admin/login')
    }//管理员界面允许前往管理员界面，不允许前往其他界面
    else if(from.path.includes('admin')&&to.path.includes('admin')){
      next()
    }else{
      if(store.state.identity&&store.state.account&&store.state.token)
        next()
      else
        router.replace('/login')
    }
  }
})

</script>
<style>

</style>
