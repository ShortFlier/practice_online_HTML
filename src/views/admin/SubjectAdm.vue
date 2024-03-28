<template>
  <div class="search">
    <input type="text" placeholder="输入关键字查找学科" v-model.trim="searchInfo.key"/>
    <el-button type="primary" circle style="position: relative; left: 10px" v-throttle:1000="getSubData">
      <i class="bi bi-search" style="font-size: 24px"></i>
    </el-button>
    <el-button type="success" circle style="position: relative; left: 50px" v-throttle:1000="addSub">
      <i class="bi bi-plus-lg" style="font-size: 24px"></i>
    </el-button>
    <div style="display: inline-block;position: relative;left: 90px" >
      <input type="text" placeholder="输入学科名添加学科" @input="getLikeName" v-model.trim="addInfo.name" class="add"/>
      <div class="tip">
        <div v-for="item in addInfo.tipName" :key="item" style="color: #dcc351;font-weight: bold">
          {{item}}
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
      <el-table-column fixed="right" label="操作" width="120">
        <template v-slot="scope">
          <el-button link type="danger" size="small" @click="handleDle(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <Page :total="subjectData.total" @pageChange="setPage"></Page>
  </div>
</template>

<script setup>
import Page from "@/components/Page.vue";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {subject_admin_add, subject_delete, subject_getData, subject_like_name} from "@/utils/api_path";
import {commonTip, confirmationBox} from "@/utils/tip";
import store from "@/store";
// 学科数据
const subjectData=reactive({
  total:0,
  rows:[]
})
//分页确认
const searchInfo={
  key:null,
  pageInfo:{
    page:1,
    pageSize:5
  }
}
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
  height: 30px;
  font-size: 25px;
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
</style>