<template>
  <div class="title">
    <div class="font">
      <label>教师端——在线题库练习平台</label>
    </div>
    <div class="exit" @click="router.push('/login')">
      <i class="bi bi-box-arrow-right"></i>
    </div>
  </div>
  <div class="outside">
    <div class="contain">
      <div class="nav">
        <div :class="activeId==0?'item active':'item'" @click="goto(0)">个人中心</div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../../assets/css/public.css"
import router from "@/router";
import {onMounted, ref} from "vue";

const activeId=ref(0)
const path=['/teacher/home/personal']
function goto(index){
  activeId.value=index
  sessionStorage.setItem('teacher_home_active_id',activeId.value)
  router.push(path[index])
}
onMounted(()=>{
  if(sessionStorage.getItem('teacher_home_active_id')) {
    activeId.value = sessionStorage.getItem('teacher_home_active_id')
    router.push(path[activeId.value])
  }
})
</script>

<style scoped>
.outside{
  width: 100%;
}
.title{
  width: 100%;
  background-color: #3099e8;
  height: 120px;
  overflow: hidden;
}
.font{
  height: 120px;
  line-height: 120px;
  color: white;
  font-family:华文琥珀;
  font-size: 45px;
  padding-right: 20px;
  float: right;
}
.exit{
  float: left;
  color: white;
  font-size: 60px;
  cursor: pointer;
  padding-left: 20px;
  position: relative;
  top:40px;
}
.nav{
  width: 100%;
  height: 40px;
  background-color: #3099e8;
  display: flex;
  vertical-align: bottom;
}
.item{
  text-align: center;
  margin: 0 5px;
  width: 150px;
  height: 35px;
  line-height: 35px;
  border-bottom: 5px solid #d5d2d2;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #d5d2d2;
}
.active{
  border-bottom: 5px solid white;
  font-weight: bolder;
  font-size: 20px;
  color: white;
}
</style>