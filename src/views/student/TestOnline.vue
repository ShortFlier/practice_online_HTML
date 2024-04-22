<template>
  <div class="nav">
    <router-link to="/student/home/test/do" @click="info.activeId=0"  :class="info.activeId==0?'active':''">在线考试</router-link>
    |
    <router-link to="/student/home/test/his" @click="info.activeId=1"  :class="info.activeId==1?'active':''">考试历史</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {onMounted, reactive, watch} from "vue";
import router from "@/router";

const info=reactive({
  activeId:0
})
</script>

<style scoped>
.nav{
  padding: 20px;
  border-bottom: 1px solid #545d64;
}
.nav>a{
  color: #545d64;
  text-decoration: none;
  font-size: 22px;
  padding: 5px;
}
.active{
  font-weight: bold;
  font-size: 24px;
  color: #3099e8;
}
</style>