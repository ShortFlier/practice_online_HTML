<template>
  <div class="search">
    <input type="search" placeholder="学科名匹配(不区分大小写)" v-model.trim="searchInfo.key"/>
    <el-button type="primary" circle style="position: relative; left: 10px" v-throttle:1000="getSubData">
      <i class="bi bi-search" style="font-size: 24px"></i>
    </el-button>
    <el-button v-if="store.state.identity==identity_admin" type="success" circle style="position: relative; left: 50px" v-throttle:1000="addSub">
      <i class="bi bi-plus-lg" style="font-size: 24px"></i>
    </el-button>
    <div v-if="store.state.identity==identity_admin" style="display: inline-block;position: relative;left: 90px" >
      <input type="search" placeholder="输入学科名添加学科" @input="getLikeName" v-model.trim="addInfo.name" class="add"/>
      <div class="tip">
        <label style="position: relative;right: 68px;font-weight: bold;color: #3099e8">相似学科：</label>
        <div v-for="item in addInfo.tipName" :key="item" style="color: #dcc351;font-weight: bold">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
  <div class="table">
    <el-table :data="subjectData.rows" border style="width: 800px;"  max-height="500">
      <el-table-column prop="name" label="学科名" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="launcher" label="创建者" width="220" />
      <el-table-column prop="topicNumber" label="题目数" width="100" />
      <el-table-column fixed="right" label="操作" width="120" v-if="store.state.identity==identity_admin">
        <template v-slot="scope">
          <el-button link type="danger" size="small" @click="handleDle(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="amend(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <Page :total="subjectData.total" @pageChange="setPage"></Page>
  </div>
  <Mask :isShow="isShow" @close="close">
    <div style="text-align: center;width: 400px;font-size: 35px;font-weight: bolder">
      <label>{{rawName}}</label>
    </div>
    <div style="text-align: center;color: #3099e8;padding: 20px">
      <label>改为</label>
    </div>
    <div style="text-align: center;padding: 10px">
      <input class="newName" v-model.trim="subAmd.name" type="search" >
    </div>
    <div style="text-align: center;padding: 10px">
      <el-button type="success" circle v-throttle:1000="upd">
        <i class="bi bi-pen" style="font-size: 20px"></i>
      </el-button>
    </div>
  </Mask>
</template>

<script setup>
import Page from "@/components/Page.vue";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {sub_update, subject_admin_add, subject_delete, subject_getData, subject_like_name} from "@/utils/api_path";
import {commonTip, confirmationBox} from "@/utils/tip";
import Mask from "@/components/Mask.vue";
import {connectPath} from "@/utils/util";
import store from "@/store";
import {identity_admin} from "@/utils/constant";
// 学科数据
const subjectData=reactive({
  total:0,
  rows:[]
})
//分页确认
const searchInfo=reactive({
  key:null,
  pageInfo:{
    page:1,
    pageSize:5
  }
})
function setPage(newPageInfo){
  searchInfo.pageInfo.page=newPageInfo.page
  searchInfo.pageInfo.pageSize=newPageInfo.pageSize
  getSubData()
}
//查询学科数据
function getSubData(){
  axios.post(subject_getData,searchInfo).then(resolve=>{
    if(resolve){
      subjectData.total=resolve.data.total
      subjectData.rows=resolve.data.rows
    }
  })
}
const addInfo=reactive({
  name:'',
  tipName:[]
})
function getLikeName(){
  if(addInfo.name){
    axios.get(subject_like_name+addInfo.name).then(resolve=>{
      if(resolve)
        addInfo.tipName=resolve.data
    })
  }else {
    addInfo.tipName=[]
  }
}
function addSub(){
  if(addInfo.name){
    axios.put(subject_admin_add,{
      name:addInfo.name
    }).then(resolve=>{
      if(resolve){
        commonTip('success',resolve.msg)
        addInfo.name=''
        getSubData()
      }
    })
  }
}
// 删除操作
function handleDle(row){
  const name=row.name
  const msg='你确定要删除"'+name+'"吗？与它关联的题目可能会受到不可确定的影响，甚至影响程序的正常运行！！'
  confirmationBox(msg,'warning',()=>{
    dleByName(name)
  })
}
//前往后端删除
function dleByName(name){
  axios.delete(subject_delete+name).then(rsv=>{
    if(rsv){
      commonTip('success',rsv.msg,500)
      getSubData()
    }
  })
}
// 控制mask
const isShow=ref(false);
function close(){
  isShow.value=false
}
//修改
const subAmd=reactive({
  name:'',
  id:'',
})
const rawName=ref('')
function amend(row){
  isShow.value=true
  subAmd.id=row.id
  rawName.value=row.name
}
//前往数据库修改
function upd(){
  if(subAmd.name){
    const path=connectPath(subAmd)
    console.log(path)
    console.log(subAmd)
    confirmationBox('你确定要将"'+rawName.value+'"改为"'+subAmd.name+'"吗？','warning',()=>{
      axios.post(sub_update,subAmd).then(resolve=>{
        if(resolve){
          commonTip('success',resolve.msg)
          setTimeout(()=>{isShow.value=false,subAmd.name=''},500)
          getSubData()
        }
      })
    })
  }
}
onMounted(()=>{
  getSubData()
})
</script>

<style scoped>
.search{
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
  padding-top: 30px;
}
.search input{
  height: 35px;
  font-size: 20px;
}
.search>button{
  height: 40px;
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
.tip{
  position: absolute;
  padding:5px;
  width: 95%;
  top:31px;
  z-index: 999999999;
  display: none;
}
.add:focus + .tip {
  display: block;
}
input::placeholder {
  font-size: 12px; /* 设置提示文字的字体大小为12px */
}
.newName{
  width: 300px;
  height: 40px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 26px;
}
.newName:focus{
  border: none;
  outline: none;
  border-bottom: 2px solid black;
}
</style>