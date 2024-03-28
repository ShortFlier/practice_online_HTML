<template>
  <div class="top">
    <div style="float:left;">
      <div style="margin:10px">当前查看:</div>
      <div style="margin:10px;padding-top:10px ">
        <el-radio-group v-model="allInfo.slt" size="large">
          <el-radio-button label="教师" value="教师" />
          <el-radio-button label="学生" value="学生" />
        </el-radio-group>
      </div>
    </div>
    <div style="float: right;padding: 20px">
      <div>
        <label>人员统计：教师 | 学生</label>
      </div>
      <div style="float: right;padding: 10px;font-size: 20px">
        <label style="color: #3099e8;padding-right: 5px">
          {{allInfo.thTotal}}
        </label>
        <label style="font-size: 22px;font-weight: bolder">|</label>
        <label  style="color: #3099e8;padding-left: 5px">
          {{allInfo.stuTotal}}
        </label>
      </div>
    </div>
  </div>
  <div class="search">
    <input type="search" placeholder="姓名匹配" v-model.trim="allInfo.searchInfo.name"/>
    <input type="search" placeholder="账号匹配" v-model.trim="allInfo.searchInfo.account"/>
    <el-button type="primary" circle style="position: relative; left: 10px;height: 35px" v-throttle:1000="getData" >
      <i class="bi bi-search" style="font-size: 18px"></i>
    </el-button>
  </div>
  <div class="table">
    <el-table :data="allInfo.result.rows" border style="width: 740px;"  max-height="500">
      <el-table-column prop="account" label="账号" width="220" />
      <el-table-column prop="name" label="昵称" width="220" />
      <el-table-column prop="email" label="邮箱号" width="220" />
      <el-table-column fixed="right" label="操作" width="80">
        <template v-slot="scope">
          <el-button link type="primary" size="small" @click="look(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <Page :total="allInfo.result.total" @pageChange="setPage"></Page>
  </div>
  <Mask :isShow="allInfo.isShow" @close="close">
    <UserInfo :type="allInfo.slt" :account="allInfo.account"></UserInfo>
  </Mask>
</template>

<script setup>
import {onMounted, reactive, watch} from "vue";
import Page from "@/components/Page.vue";
import axios from "axios";
import {stu_page, th_page, th_total,stu_total} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import Mask from "@/components/Mask.vue";
import UserInfo from "@/components/UserInfo.vue";

const allInfo=reactive({
  slt:'教师',
  thTotal:0,
  stuTotal:0,
  searchInfo:{
    account:'',
    name:''
  },
  result:{
    total:0,
    rows:[]
  },
  pageInfo:{
      page:0,
    pageSize:5
  },
  isShow:false,
  account:''
})
function close(){
  allInfo.isShow=false
}
watch(()=> allInfo.slt,()=>{
  allInfo.result.total=0
  allInfo.result.rows=[]
})
// 获取分页信息
function setPage(newPageInfo){
  allInfo.pageInfo.page=newPageInfo.page
  allInfo.pageInfo.pageSize=newPageInfo.pageSize
  // 信息查询
  if(allInfo.searchInfo.account||allInfo.searchInfo.name)
    getUserData()
}
//查询约束
function getData(){
  if(allInfo.searchInfo.account||allInfo.searchInfo.name)
    getUserData()
  else
    commonTip('warning','请输入信息以查询',500)
}
//搜索用户信息
function getUserData(){
  if(allInfo.slt=='教师'){  //查询教师信息
    axios.post(th_page,{
      account:allInfo.searchInfo.account,
      name:allInfo.searchInfo.name,
      pageInfo:allInfo.pageInfo
    }).then(resolve=>{
      if(resolve){
        allInfo.result.total=resolve.data.total
        allInfo.result.rows=resolve.data.rows
      }
    })
  }else if(allInfo.slt=='学生'){  //查询学生信息
    axios.post(stu_page,{
      account:allInfo.searchInfo.account,
      name:allInfo.searchInfo.name,
      pageInfo:allInfo.pageInfo
    }).then(resolve=>{
      if(resolve){
        allInfo.result.total=resolve.data.total
        allInfo.result.rows=resolve.data.rows
      }
    })
  }else{
    console.log('none')
  }
}
// 账号统计
onMounted(()=>{
//   统计教师
  axios.get(th_total).then(resolve=>{
    if(resolve)
      allInfo.thTotal=resolve.data
  })
//   统计学生
  axios.get(stu_total).then(resolve=>{
    if(resolve)
      allInfo.stuTotal=resolve.data
  })
})
// 用户信息查看
function look(value){
  allInfo.isShow=true
  allInfo.account=value.account
}
</script>

<style scoped>
.top{
  width: 100%;
  height: 100px;
  border-bottom: #666666 1px solid;
}
.search{
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
  padding-top: 30px;
}
.search input{
  margin-right: 40px;
  width: 180px;
  height: 30px;
  font-size: 20px;
}
.table{
  margin: 10px 10px;
  padding: 20px 0 10px 20px;
  border-top: #333333 1px solid;
  border-bottom: #333333 1px solid;
}
.page{
  margin-left: 30px;
}
input::placeholder {
  font-size: 12px; /* 设置提示文字的字体大小为12px */
}
</style>