<template>
  <div class="search">
    <input type="text" placeholder="输入关键字查找学科" v-model.trim="searchInfo.key"/>
    <el-button type="primary" circle style="position: relative; left: 10px" @click="getSubData">
      <i class="bi bi-search" style="font-size: 24px"></i>
    </el-button>
    <el-button type="success" circle style="position: relative; left: 150px">
      <i class="bi bi-plus-lg" style="font-size: 24px"></i>
    </el-button>
  </div>
  <div class="table">
    <el-table :data="subjectData.rows" border style="width: 680px"  max-height="500">
      <el-table-column prop="name" label="学科名" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="launcher" label="创建者" width="220" />
      <el-table-column prop="topicNumber" label="题目数" width="100" />
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
import {subject_getData} from "@/utils/api_path";
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
.search>input{
  height: 40px;
  font-size: 30px;
}
.search>button{
  height: 45px;
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
</style>