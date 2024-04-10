<template>
  <div class="out">
    <div>
      <div class="lbl">自定义账号：</div>
      <div class="input">
        <input type="search" placeholder="由数组、大小写字母、下滑线组成" v-model.trim="registInfo.account">
      </div>
    </div>
    <div>
      <div class="lbl">输入昵称：</div>
      <div class="input">
        <input type="search" v-model.trim="registInfo.name">
      </div>
    </div>
    <div>
      <div class="lbl">输入邮箱号：</div>
      <div class="input">
        <input type="email" v-model.trim="registInfo.email">
      </div>
    </div>
    <div>
      <div class="lbl">输入手机号（选填）：</div>
      <div class="input">
        <input type="search" v-model.trim="registInfo.phone">
      </div>
    </div>
    <div>
      <div class="lbl">密码：</div>
      <div class="input">
        <input type="password" placeholder="由数组、大小写字母、下滑线组成" v-model.trim="registInfo.password">
      </div>
    </div>
    <div>
      <div class="lbl">确认密码：</div>
      <div class="input">
        <input type="password" placeholder="由数组、大小写字母、下滑线组成" v-model.trim="repassword">
      </div>
    </div>
    <div style="text-align: center">
      <button @click="regist(identity_student)" style="cursor: pointer;color: white;background-color: #3099e8;height: 40px;border:none;float: left;margin-left: 100px">
        注册学生</button>
      <button @click="regist(identity_teacher)" style="cursor: pointer;color: #333131;background-color: #dcc351;height: 40px;border:none;float: right;margin-right: 100px">
        注册教师</button>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {identity_student, identity_teacher} from "@/utils/constant";
import axios from "axios";
import {stu_login, stu_register, th_login, th_register} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import store from "@/store";
import router from "@/router";

const registInfo=reactive({
  account:'',
  name:'',
  password:'',
  email:'',
  phone:''
})
const repassword=ref('')
function regist(type){
  if(registInfo.password!=repassword.value){
    commonTip('error',"两次密码输入不同！",1000)
    return
  }
  if(type==identity_student){
    axios.post(stu_register,registInfo).then(resolve=>{
      if(resolve){
        axios.post(stu_login,{
          account:registInfo.account,
          password:registInfo.password
        }).then(resolve=>{
          if(resolve){
            save(identity_student,resolve.msg)
          }
        })
      }
    })
  }else if(type==identity_teacher){
    axios.post(th_register,registInfo).then(resolve=>{
      if(resolve){
        axios.post(th_login,{
          account:registInfo.account,
          password:registInfo.password
        }).then(resolve=>{
          if(resolve){
            save(identity_teacher,resolve.msg)
          }
        })
      }
    })
  }else
    console.log('none')
}
function save(type,token){
  console.log(type)
  store.state.identity=type
  store.state.account=registInfo.account
  store.state.token=token
  sessionStorage.setItem('identity',store.state.identity)
  sessionStorage.setItem('account',store.state.account)
  sessionStorage.setItem('token',store.state.token)
  localStorage.setItem('account',store.state.account)
  router.push(`/${store.state.identity}/home`)
}
</script>

<style scoped>
.out>div{
  height: 50px;
  width: 600px;
  overflow: hidden;
  margin: 10px;
}
.lbl{
  width: 180px;
  float: left;
  color: #999999;
  text-align: right;
}
.input{
  float: left;
}
input{
  height: 35px;
  font-size: 30px;
  width: 380px;
}
input::placeholder{
  font-size: 16px;
}
</style>