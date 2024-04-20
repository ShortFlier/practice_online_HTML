<template>
  <div>
    <el-table :data="allInfo.tableData" border style="width: 800px;"  max-height="500">
      <el-table-column prop="name" label="学科名" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="launcher" label="创建者" width="220" />
      <el-table-column prop="topicNumber" label="题目数" width="100" />
      <el-table-column fixed="right" label="状态" width="120" >
        <template v-slot="scope">
          <el-button link type="danger" size="small" v-if="scope.row.auditState==not_access">
            未通过
          </el-button>
          <el-button link type="success" size="small" v-if="scope.row.auditState==access">
            审核通过
          </el-button>
          <el-button link type="info" size="small" v-if="scope.row.auditState==wait">
            待审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="padding: 10px">
    <Page :total="allInfo.total" @pageChange="getPage"></Page>
  </div>
</template>

<script setup>
import Page from "@/components/Page.vue";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {connectPath} from "@/utils/util";
import {teacher_subject_get} from "@/utils/api_path";
import {access, not_access, wait} from "@/utils/constant";
const allInfo=reactive({
  total:0,
  pageInfo:{
    page:1,
    pageSize:5
  },
  tableData:[]
})
function getPage(page){
  allInfo.pageInfo=page
  getData()
}
function getData(){
  const path=connectPath(allInfo.pageInfo)
  axios.get(teacher_subject_get+'?'+path).then(resolve=>{
    if(resolve){
      allInfo.total=resolve.data.total
      allInfo.tableData=resolve.data.rows
    }
  })
}
onMounted(()=>{
  getData()
})
</script>

<style scoped>

</style>