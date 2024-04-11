<template>
  <select  @change="update($event)" class="out">
    <option value=""></option>
    <option v-for="item in allInfo.subject" :key="item.id" :value="item.id" >{{item.name}}</option>
  </select>
</template>

<!--一个供选择的学科select框，外部绑定事件sltChange来获取修改的学科-->

<script setup>
import axios from "axios";
import {sub_list} from "@/utils/api_path";
import {onMounted, reactive} from "vue";

const emits=defineEmits(['sltChange'])

const allInfo=reactive({
  subject:[]
})

function getSubList(){
  axios.get(sub_list).then(resolve=>{
    if(resolve){
      allInfo.subject=resolve.data
    }
  })
}

function update(event){
  const subjectId=event.target.value
  emits('sltChange',subjectId)
}

onMounted(()=>{
  getSubList();
})
</script>

<style scoped>
.out{
  width: 150px;
  height: 35px;
  font-size: 26px;
  cursor: pointer;
}
</style>