<template>
  <div style="padding: 5px;margin: 5px;position: relative">
    <input type="text" placeholder="学科查找" @input="getLikeName" v-model.trim="allInfo.lname" class="add"/>
    <div class="tip">
      <label style="position: relative;right: 68px;font-weight: bold;color: #545d64">相似学科：</label>
      <div v-for="item in allInfo.tip" :key="item" @click="getInfo(item)"  style="width:100%;color: #dcc351;font-weight: bold;cursor: pointer;">
        {{item.name}}
      </div>
    </div>
    <label v-if="allInfo.info" style="margin-left: 10px;color: #6dbdda;font-size: 18px">Id:{{allInfo.info.id}}</label>
    <label v-if="allInfo.info" style="margin-left: 20px;color: #dcc351">{{allInfo.info.name}}</label>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import axios from "axios";
import {subject_like_name} from "@/utils/api_path";

const allInfo=reactive({
  tip:[],
  lname:'',
  info:null
})
function getInfo(value){
  allInfo.info=value
}
function getLikeName(){
  if(allInfo.lname){
    axios.get(subject_like_name+allInfo.lname).then(resolve=>{
      if(resolve)
        allInfo.tip=resolve.data
    })
  }else {
    allInfo.tip=[]
  }
}
</script>

<style scoped>
.tip{
  position: absolute;
  padding:5px;
  width: 95%;
  top:31px;
  z-index: 999999999;
  display: none;
}
.add{
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  border-top: none;
  border-left: none;
  border-right: none;
}
input::placeholder{
  font-size: 16px;
}
.add:focus + .tip {
  display: block;
}
.tip:hover{
  display: block;
}
</style>