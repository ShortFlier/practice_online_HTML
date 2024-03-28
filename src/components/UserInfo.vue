<template>
<div >
  <div class="title">
    {{type}}
  </div>
  <div>
    <el-form :model="info.data" label-width="100px" size="large">
      <el-form-item label="id号"><el-input v-model="info.data.id" readonly/></el-form-item>
      <el-form-item label="账号"><el-input v-model="info.data.account" readonly/></el-form-item>
      <el-form-item label="姓名"><el-input v-model="info.data.name" readonly/></el-form-item>
      <el-form-item label="邮箱"><el-input v-model="info.data.email" readonly/></el-form-item>
      <el-form-item label="手机号"><el-input v-model="info.data.phone" readonly/></el-form-item>
      <el-form-item label="创建时间"><el-input v-model="info.data.createTime" readonly/></el-form-item>
      <el-form-item label="更新时间"><el-input v-model="info.data.updateTime" readonly/></el-form-item>
    </el-form>
  </div>
</div>
</template>

<script setup>
import {reactive, watch} from "vue";
import axios from "axios";
import {get_stu_info, get_th_info} from "@/utils/api_path";

 const props=defineProps({
   type:String,
   account:String
 })
//  用户信息
 const info=reactive({
   data:{
     id:'null',
     account:'null',
     name:'null',
     email:'null',
     phone:'null',
     createTime:'null',
     updateTime:'null'
   }
 })
 //获取信息
 function getInfo(){
   if(props.type=='教师'){
     axios.get(get_th_info+props.account).then(reslove=>{
       if(reslove){
         info.data=reslove.data
         info.data.id=reslove.data.thId
       }
     })
   }else if(props.type=='学生'){
     axios.get(get_stu_info+props.account).then(reslove=>{
       if(reslove){
         info.data=reslove.data
         info.data.id=reslove.data.stuId
       }
     })
   }else{
     console.log('getInfo()-----none')
   }
 }
 watch(()=>props.account,()=>getInfo())
</script>

<style scoped>
.title{
  color: #3099e8;
  font-weight: bold;
  font-size: 23px;
  margin: 0 15px 20px 0;
}
</style>