<template>
  <div >
    <div class="back">
      <el-button type="info" @click="router.push('/teacher/home/paper')"
                 style="position: relative;left: 30px;top: 10px;">返回</el-button>
    </div>
    <div>
      <div class="nav">
        <div>
          <el-radio-group v-model="allInfo.radio" size="large">
            <el-radio-button label="公开" value="1" />
            <el-radio-button label="私有" value="0" />
          </el-radio-group>
        </div>
        <div style="color: #666666;margin: 5px auto;font-size: 14px">
          {{allInfo.info[slt]}}
        </div>
      </div>
      <div class="table">
        <el-table :data="allInfo.tableData" stripe style="width: 850px" border>
          <el-table-column prop="subjectName" label="学科" width="200" />
          <el-table-column prop="title" label="试卷名" width="250" />
          <el-table-column prop="duration" label="考试时间/分钟" width="120"/>
          <el-table-column prop="totalMarks" label="总分" width="70"/>
          <el-table-column prop="difficulty" label="难度" width="70"/>
          <el-table-column  width="140">
            <template v-slot="scope">
              <el-button  type="success" size="small"   >
                <router-link style="text-decoration: none;color: white" target="_blank" :to="'/paper/look/'+scope.row.id">查看</router-link>
              </el-button>
              <el-button v-if="allInfo.radio=='私有'"   type="danger" size="small" @click="plc(scope.row.id)" >
                公开
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <Page :total="allInfo.total" @pageChange="setPage"></Page>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {computed, reactive, watch} from "vue";
import Page from "@/components/Page.vue";
import axios from "axios";
import {paper_search, paper_update} from "@/utils/api_path";
import {getLoginInfo} from "@/utils/util";
import {commonTip, confirmationBox} from "@/utils/tip";

const allInfo=reactive({
  radio:"公开",
  info:['私有的试卷属于您自己，仅自己和自己的学生可见','公开的试卷所有人可见'],
  tableData:[],
  total:0,
  page:1,
  pageSize:5
})
const slt=computed(()=>{
  return turn(allInfo.radio)
})
function turn(value){
  return value=='公开'?1:0;
}
function setPage(pageInfo){
  allInfo.page=pageInfo.page
  allInfo.pageSize=pageInfo.pageSize

  paperGets()
}
watch(()=>slt.value,()=>{
  paperGets()
})
function paperGets(){
  axios.post(paper_search,{
    display:''+slt.value,
    pageInfo:{
      page: allInfo.page,
      pageSize: allInfo.pageSize
    },
    launcher:getLoginInfo()
  }).then(resolve=>{
    if(resolve){
      allInfo.total=resolve.data.total
      allInfo.tableData=resolve.data.rows
    }else {
      allInfo.total=0
      allInfo.tableData=[]
    }
  })
}
let id
function plc(aid){
  id=aid
  confirmationBox('你确定公开此试卷，操作不可逆','warning',setPublic)
}
function setPublic(){
  console.log('id：'+id)
  axios.put(paper_update,{
    id:id,
    display:'1'
  }).then(resolve=>{
    if (resolve){
      commonTip('success',resolve.msg,1000)
      paperGets()
    }
  })
}
</script>

<style scoped>
.back{
  height: 50px;
  border-bottom: #545d64 1px solid;
}
.nav{
  margin: 10px 20px;
}
.table{
  padding: 20px;
}
.page{
  padding: 20px;
}
</style>