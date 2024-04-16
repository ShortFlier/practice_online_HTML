<template>
  <div>
    <PaperSearch @getInfo="setSearchInfo"></PaperSearch>
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
          <el-button  type="success" size="small"  @click="look(scope.row.id)" >
            查看
          </el-button>
          <el-button  type="primary" size="small"  @click="test(scope.row.id)">
            开始考试
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <Page :total="allInfo.total" @pageChange="setPageInfo"></Page>
  </div>
</template>

<script setup>
import PaperSearch from "@/components/PaperSearch.vue";
import Page from "@/components/Page.vue";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {paper_search, sub_list} from "@/utils/api_path";

const allInfo=reactive({
  total:0,
  pageInfo:{
    page:1,
    pageSize:5
  },
  searchInfo:{
    subjectId:'',
    difficulty:'',
    title:''
  },
  tableData:[],
  subList:[]
})
function getSubs(){
  axios.get(sub_list).then(resolve=>{
    if(resolve){
      allInfo.subList=resolve.data
    }
  })
}
//获取分页信息
function setPageInfo(info){
  allInfo.pageInfo.page=info.page
  allInfo.pageInfo.pageSize=info.pageSize
  get()
}
//获取查询信息
function setSearchInfo(info){
  allInfo.searchInfo.subjectId=info.subjectId
  allInfo.searchInfo.difficulty=info.difficulty
  allInfo.searchInfo.title=info.title
  get()
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
function look(id){
  alert('试卷id:'+id)
}
function test(id){
  alert('试卷id做:'+id)
}
onMounted(()=>{
  get()
  getSubs()
})
</script>

<style scoped>
.page{
  padding: 20px;
}
.table{
  padding: 20px;
}
</style>