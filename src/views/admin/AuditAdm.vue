<template>
  <div>
    <label class="subject transition left-label" id="subject">学科审核</label>
    <div class="button transition left-button" v-throttle:1300="turn" id="button">
      <div class="circle transition left-circle" id="circle">
      </div>
    </div>
    <label class="topic transition" id="topic">题目审核</label>
  </div>
  <div class="display">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import router from "@/router";
// 0显示学科审核，1显示题目审核
const display=ref(0)
const path=['/subAudit','/topicAudit']
function turnDisplay(){
  display.value=(display.value+1)%2
}
function turn(){
  turnDisplay()
  sessionStorage.setItem('audit_admin_display',`${display.value}`)
}
watch(()=>display.value,()=>doThen())
// 跳转业务处理以及css样式变化
function doThen(){
//   路由跳转
  setTimeout(()=>{
      router.push('/admin/home/auditAdmin'+path[display.value])
  },600)
//   css样式处理
  const button=document.querySelector('#button')
  const circle=document.querySelector('#circle')
  const subject=document.querySelector('#subject')
  const topic=document.querySelector('#topic')
  if(display.value){ //值为1 删除left样式，加上right样式
    button.classList.remove('left-button')
    button.classList.add('right-button')
    circle.classList.remove('left-circle')
    circle.classList.add('right-circle')
    circle.classList.add('translate')
    subject.classList.remove('left-label')
    topic.classList.add('right-label')
  }else{ //值为2 删除left样式，加上right样式
    button.classList.remove('right-button')
    button.classList.add('left-button')
    circle.classList.remove('right-circle')
    circle.classList.add('left-circle')
    circle.classList.remove('translate')
    subject.classList.add('left-label')
    topic.classList.remove('right-label')
  }
}
onMounted(()=>{
  if(sessionStorage.getItem('audit_admin_display')) {
    display.value = parseInt(sessionStorage.getItem('audit_admin_display'))
  }
})
</script>

<style scoped>
.transition{
  transition: 0.5s  linear all;
}
.button{
  margin-left: 100px;
  height: 40px;
  width: 100px;
  border-radius: 40px;
  cursor: pointer;
}
.circle{
  width: 40px;
  height: 40px;
  border-radius: 40px;
  position: relative;
  animation-duration: 1s;
  animation-timing-function: linear;
}
.left-button{
  border: #3099e8 2px solid;
}
.right-button{
  border:  #dcc351 2px solid;
}
.left-circle{
  background-color: #3099e8;
}
.right-circle{
  background-color: #dcc351;
}
.translate{
  transform: translateX(60px);
}
.left-label{
  color: #3099e8;
  font-weight: bolder;
}
.right-label{
  color: #dcc351;
  font-weight: bolder;
}
.subject{
  font-size: 20px;
  position: relative;
  top: 35px;
  left: 7px;
}
.topic{
  font-size: 20px;
  position: relative;
  left: 215px;
  bottom: 35px;
}
.display{
  border-top: #999999 2px solid;
  padding: 10px;
}
</style>