<template>
  <div class="mask">
    <div class="title">
      <label>管理员登入界面</label>
    </div>
    <div class="box1">
      <div class="fun">
        <input type="text" placeholder="请输入账号" v-model.trim="loginInfo.account">
      </div>
      <div class="fun">
        <input type="password" placeholder="请输入密码" v-model.trim="loginInfo.password">
      </div>
      <div class="fun">
        <button v-throttle:1000="login">登入</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {commonTip} from "@/utils/tip";
import axios from "axios";
import {admin_login} from "@/utils/api_path";
import router from "@/router";

const loginInfo=reactive({
  account:'',
  password:''
})

function isNull(){
  return !(loginInfo.password&&loginInfo.account)
}

function login(){
  if(isNull()){
    commonTip('error', '账号或密码不能为空');
  }else {
    axios.post(admin_login,loginInfo).then(response=>{
      if(response){
        console.log(response.msg);
        localStorage.setItem('admin_account',loginInfo.account)
        router.push('/admin/home')
      }
    })
  }
}

onMounted(()=>{
  if(localStorage.getItem('admin_account'))
    loginInfo.account=localStorage.getItem('admin_account')
})
</script>

<style scoped>
.mask{
  width: 100%;
  height: 98vh;
  background-color:#293946;
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
.box1{
  width: 600px;
  height: 380px;
  border: 3px solid lightsteelblue;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%,-50%);
  padding: 20px 10px 10px 10px;
  background-color: #a4bee0;
}
.fun{
  width: 100%;
  height: 130px;
  line-height: 130px;
  text-align: center;
  box-sizing: border-box;
}
.fun>*{
  vertical-align: middle;
}
.fun>input{
  width: 480px;
  height: 70px;
  border: #6dbdda 2px solid;
  font-size: 30px;
  letter-spacing: 3px;
  color: black;
}
.fun>button{
  text-align: center;
  width: 400px;
  height: 70px;
  background-color: #3099e8 ;
  border-radius: 20px;
  border: #3099e8 solid 1px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 10px;
}
.fun>button:hover{
  cursor: pointer;
}
</style>