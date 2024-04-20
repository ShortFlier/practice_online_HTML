<template>
  <div class="display">
    <div class="title">
      基本信息
    </div>
    <div class="info">
      <el-descriptions  :column="2" border size="large">
        <el-descriptions-item
            label="昵称"
            label-align="center"
            align="center"
        >
          {{ personal.name }}
        </el-descriptions-item>
        <el-descriptions-item label="账号" label-align="center" align="center">
          {{ personal.account }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱" label-align="center" align="center">
          {{ personal.email }}
        </el-descriptions-item>
        <el-descriptions-item label="电话号码" label-align="center" align="center">
          {{personal.phone}}
        </el-descriptions-item>
        <el-descriptions-item label="注册时间" label-align="center" align="center">
          {{personal.createTime}}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
  <div class="border">
    <div class="info_amend">
      <el-tooltip
          class="box-item"
          effect="light"
          content="信息修改"
          placement="bottom"
      >
        <el-button type="success" circle >
          <i class="bi bi-pencil-square" style="font-size: 18px"></i>
        </el-button>
      </el-tooltip>
    </div>
    <div class="psd">
      <el-link type="primary">修改密码</el-link>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import store from "@/store";
import axios from "axios";
import {get_stu_info, get_th_info} from "@/utils/api_path";

const personal=reactive({
  id:'',
  account:'',
  name:'',
  email:'',
  phone:'',
  createTime:''
})
function getInfo(){
  if(store.state.identity=='student'){
    axios.get(get_stu_info+store.state.account).then(resolve=>{
      if(resolve){
        Object.assign(personal,resolve.data)
        personal.id=resolve.data.stuId
      }
    })
  }else if(store.state.identity=='teacher'){
    axios.get(get_th_info+store.state.account).then(resolve=>{
      if(resolve){
        Object.assign(personal,resolve.data)
        personal.id=resolve.data.thId
      }
    })
  }else {
    console.log('none')
  }
}
onMounted(()=>{
  getInfo()
})
</script>

<style scoped>
.display{
  width: 90%;
  padding: 20px;
}
.title{
  text-align: center;
  margin: 20px;
  font-size: 26px;
  font-weight: bold;
  color: #545d64;
}
.info{
  cursor: pointer;
}
.info_amend{
  margin-left: 550px;
}
.psd{
  margin-top: 100px;
  margin-left: 550px;
}
</style>