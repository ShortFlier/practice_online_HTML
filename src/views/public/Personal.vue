<template>
  <div class="display">
    <div>
      <div class="label">Id</div>
      <div class="info">{{personal.id}}</div>
    </div>
    <div>
      <div class="label">账号</div>
      <div class="info">{{personal.account}}</div>
    </div>
    <div>
      <div class="label">昵称</div>
      <div class="info">{{personal.name}}</div>
    </div>
    <div>
      <div class="label">邮箱</div>
      <div class="info">{{personal.email}}</div>
    </div>
    <div>
      <div class="label">电话号码</div>
      <div class="info">{{personal.phone}}</div>
    </div>
    <div>
      <div class="label">创建日期</div>
      <div class="info">{{personal.createTime}}</div>
    </div>
  </div>
  <div class="border">
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
  margin: 50px 0 0 50px;
  width: 500px;
  border: #c5c4c4 solid 1px;
  padding: 25px 5px;
  cursor: pointer;
}
.display>div{
  overflow: hidden;
  height: 50px;
  padding: 5px 0;
}
.label{
  float: left;
  width: 100px;
  height: 20px;
  text-align: right;
  color: #666666;
  position: relative;
  top:20px;
  padding-right: 10px;
}
.info{
  width: 350px;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  float: left;
  color: #3099e8;
  font-size: 28px;
  border-bottom: #c2d7f5 2px solid;
}
.border{
  margin: 0 0 0 50px;
  float: left;
  width: 100px;
  height: 100px;
  position: relative;
  bottom: 412px;
  border-top: 5px solid #dcc351;
  border-left: 5px solid #dcc351;
  cursor: pointer;
}
</style>