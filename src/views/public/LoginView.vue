<template>
  <div class="mask">
    <div class="title">
      <label>在线练习平台登入入口</label>
    </div>
    <div class="box1">
      <div class="titl">登入</div>
      <div class="ipt">
        <div class="lal">账号</div>
        <div>
          <input v-model.trim="loginInfo.account" type="text">
        </div>
      </div>
      <div class="ipt">
        <div class="lal">密码</div>
        <div>
          <input v-model.trim="loginInfo.password" type="password">
        </div>
      </div>
      <div class="fun">
        <a style="float: left;font-size: 14px;color:white">没有账号？去注册</a>
        <a style="float: right;font-size: 14px;color:white">找回密码</a>
      </div>
      <div class="btn">
        <button style="float: left;margin-left: 25px" v-throttle:1000="stuLogin">学生登入</button>
        <button style="float: right;margin-right: 100px" v-throttle:1000="thLogin">教师登入</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {commonTip} from "@/utils/tip";
import axios from "axios";
import {stu_login, th_login} from "@/utils/api_path";

const loginInfo=reactive({
  account:'',
  password:''
})

function isNull(){
  return !(loginInfo.password&&loginInfo.account)
}

function stuLogin(){
  if(isNull()){
    commonTip('error', '账号或密码不能为空');
  }else {
    axios.post(stu_login,loginInfo).then(response=>{
      if(response){
        alert('登入成功！')
        console.log(response.msg);
        localStorage.setItem('account',loginInfo.account)
        }
    })
  }
}

function thLogin(){
  if(isNull()){
    commonTip('error', '账号或密码不能为空');
  }else {
    axios.post(th_login,loginInfo).then(response=> {
      if (response){
        alert('登入成功！')
        console.log(response.msg);
        localStorage.setItem('account',loginInfo.account)
      }
    })
  }
}

onMounted(()=>{
  if(localStorage.getItem('account'))
    loginInfo.account=localStorage.getItem('account')
})

</script>

<style scoped>
  .mask{
    width: 100%;
    height: 98vh;
    background-color: #3B7C9FFF;
    overflow: hidden;
  }
  .title{
    margin-top: 60px;
    text-align: center;
    font-size: 80px;
    vertical-align: middle;
    letter-spacing: 20px;
    font-family: 华文琥珀;
    height: 100px;
    line-height: 100px;
    color: white;
  }
  .titl{
    width: 100%;
    text-align: center;
    font-size: 35px;
    color:white;
    font-weight: bold;
    padding-bottom: 5px;
  }
  .box1{
    width: 380px;
    height: 330px;
    border: 3px solid lightsteelblue;
    border-radius: 10px;
    position: absolute;
    left: 25%;
    top: 60%;
    transform: translate(-50%,-50%);
    padding: 10px;
  }
  .ipt{
    padding: 5px;
    margin-bottom: 10px;
  }
  .lal{
    color: white;
    margin-bottom: 5px;
    font-size: 20px;
  }
  input{
    border: #999999 2px solid;
    border-radius: 4px;
    width: 300px;
    height: 30px;
    font-size: 20px;
  }
  .fun{
    width: 350px;
    height: 30px;
  }
  .btn{
    margin-top: 5px;
  }
  button{
    font-size: 14px;
    margin-top: 5px;
    border: cornflowerblue 1px solid;
    border-radius: 6px;
    height: 35px;
    width: 80px;
    background-color: #3099e8;
    color: white;
  }
  a,button:hover{
    cursor: pointer;
  }
</style>