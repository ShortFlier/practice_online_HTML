<template>
  <div style="padding: 20px">
    <SubjectSelect @sltChange="setSubId"></SubjectSelect>
  </div>
  <div class="table">
    <el-table :data="allInfo.tableData" border stripe style="width: 930px">
      <el-table-column prop="title" label="试卷名" width="220" />
      <el-table-column prop="subjectName" label="学科" width="220" />
      <el-table-column prop="createTime" label="考试时间"  width="180"/>
      <el-table-column prop="totalMarks" label="试卷总分" width="130"/>
      <el-table-column prop="grade" label="得分" width="90"/>
      <el-table-column  label="查看"  width="90">
        <template v-slot="scope">
          <el-button  type="success" size="small"  @click="look(scope.row)" >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <Page :total="allInfo.total" @pageChange="setPage"></Page>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import Page from "@/components/Page.vue";
import SubjectSelect from "@/components/SubjectSelect.vue";
import store from "@/store";
import {connectPath} from "@/utils/util";
import axios from "axios";
import {stu_test_history} from "@/utils/api_path";
import router from "@/router";

const allInfo=reactive({
  tableData:[],
  total:0,
  pageInfo:{
    page:1,
    pageSize:5
  },
  subjectId:null
})
function setSubId(id){
  allInfo.subjectId=id
  getData()
}
function setPage(page){
  allInfo.pageInfo=page
  getData()
}
function getData(){
  const info={
    subjectId:allInfo.subjectId,
    studentId:store.state.id,
    page:allInfo.pageInfo.page,
    pageSize:allInfo.pageInfo.pageSize
  }
  axios.get(stu_test_history+'?'+connectPath(info)).then(resolve=>{
    if(resolve){
      allInfo.total=resolve.data.total
      allInfo.tableData=resolve.data.rows
    }
  })
}
function look(row){
  router.push('/paper/test/look/'+row.id)
}
</script>

<style scoped>
.table{
  padding: 20px;
}
.page{
  padding: 20px;
}
</style>