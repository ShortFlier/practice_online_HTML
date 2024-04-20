<template>
  <div>
    <div class="sch">
      <PaperSearch @getInfo="setInfo"></PaperSearch>
    </div>
    <div class="table">
      <el-table :data="allInfo.tableData" stripe border height="150px" max-height="500px" style="width: 910px">
        <el-table-column prop="title" label="试卷名" width="250" />
        <el-table-column prop="subjectName" label="学科" width="200" />
        <el-table-column prop="duration" label="考试时间/分钟" width="120" />
        <el-table-column prop="totalMarks" label="总分" width="70"/>
        <el-table-column prop="difficulty" label="难度" width="70"/>
        <el-table-column  label="操作" width="200">
          <template v-slot="scope">
            <el-button  type="success" size="small"   >
              <router-link style="text-decoration: none;color: white" :to="'/paper/looks/'+scope.row.id">查看</router-link>
            </el-button>
            <el-button v-if="store.state.identity==identity_admin"  type="danger" size="small"  @click="dlt">
              删除试卷
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <Page :total="allInfo.total" @pageChange="setPage"></Page>
    </div>
  </div>
</template>

<script setup>
import PaperSearch from "@/components/PaperSearch.vue";
import {reactive} from "vue";
import Page from "@/components/Page.vue";
import axios from "axios";
import {paper_search} from "@/utils/api_path";
import store from "@/store";
import {identity_admin} from "@/utils/constant";
const allInfo=reactive({
  searchInfo:{
    subjectId:'',
    difficulty:'',
    title:''
  },
  total:0,
  pageInfo:{
    page:1,
    pageSize:5
  },
  tableData:[]
})
function setInfo(info){
  allInfo.searchInfo=info
  get()
}
function setPage(value){
  allInfo.pageInfo=value
  get()
}
function dlt(){
  alert('你不能这么做!')
}
//获取试卷信息
function get(){
  axios.post(paper_search,{
    pageInfo:allInfo.pageInfo,
    subjectId:allInfo.searchInfo.subjectId,
    difficulty:allInfo.searchInfo.difficulty,
    title:allInfo.searchInfo.title
  }).then(resolve=>{
    if(resolve){
      allInfo.total=resolve.data.total
      allInfo.tableData=resolve.data.rows
    }
  })
}
</script>

<style scoped>
.sch{
  margin: 10px 0;
}
.page{
  padding: 20px;
}
</style>