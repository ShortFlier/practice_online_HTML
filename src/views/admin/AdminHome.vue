<template>
  <div class="title">
    <div class="info">
      <label>管理员测试账号</label>
    </div>
    <div class="info">
      <label>admin_test</label>
    </div>
    <div class="info">
      <button v-throttle:1000="quitAccess">退出登入</button>
    </div>
  </div>
  <div class="outside">
    <div class="contain main">
      <div class="nav">
        <div :class="activeId==1?'item active':'item'" @click="goto(1)">概览</div>
        <div :class="activeId==2?'item active':'item'" @click="goto(2)">用户管理</div>
        <div :class="activeId==3?'item active':'item'" @click="goto(3)">学科管理</div>
        <div :class="activeId==4?'item active':'item'" @click="goto(4)">题目管理</div>
        <div :class="activeId==5?'item active':'item'" @click="goto(5)">试卷管理</div>
        <div :class="activeId==6?'item active':'item'" @click="goto(6)">审核管理</div>
        <div :class="activeId==7?'item active':'item'" @click="goto(7)">其他</div>
      </div>
      <div class="display">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>

import router from "@/router";
import {confirmationBox} from "@/utils/tip";
import "../../assets/css/public.css"
import {onMounted, ref} from "vue";

function quit(){
  router.push('/admin/login')
}

function quitAccess(){
  confirmationBox('确定要退出吗？','warning',quit);
}

const pathDict=['','overview','userAdmin','subjectAdmin','topicAdmin','testAdm','auditAdmin','else']

const activeId=ref(1)
function goto(id){
  activeId.value=id
  sessionStorage.setItem('admin_home_active_id', activeId.value)
  const newPath = '/admin/home/' + pathDict[parseInt(activeId.value)]
  router.push(newPath)
}

onMounted(()=>{
  if(sessionStorage.getItem('admin_home_active_id')) {
    activeId.value = sessionStorage.getItem('admin_home_active_id')
    const newPath = '/admin/home/' + pathDict[parseInt(activeId.value)]
    router.push(newPath)
  }
})
</script>

<style scoped>
.title{
  background-color: #293946;
  width: 100%;
  height: 150px;
  padding-top: 10px;
}
.info{
  height: 30px;
  padding: 5px;
  color: white;
  margin: 5px;
}
.info>label{
  font-size: 18px;
}
.info>button{
  width: 100px;
  height: 35px;
  font-size: 16px;
  letter-spacing: 4px;
  color: #3099e8;
  background-color: #eeeeee;
  font-weight: bold;
}
.info>button:hover{
  cursor: pointer;
}
.outside{
  width: 100%;
}
.main{
  border-left: #293946 1px solid;
  border-right: #293946 1px solid;
}
.nav{
  padding: 5px 10px 0 5px;
  height: 40px;
  background-color: #545d64;
  vertical-align: bottom;
  display: flex;
}
.item{
  text-align: center;
  margin: 0 5px;
  width: 120px;
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  letter-spacing: 4px;
  color: white;
  border-bottom: 5px #545d64 solid;
}
.item:hover{
  cursor: pointer;
  background-color: #434a50;
  border-bottom: 5px #434a50 solid;
}
.active{
  color: #dcc351;
  border-bottom: 5px #dcc351 solid;
}
.display{
  padding: 10px 5px;
}
</style>