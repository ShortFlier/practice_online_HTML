<template>
  <div>
    <div class="top">
      输入邀请码加入一个学习小组：
      <el-input v-model.trim="allInfo.code" style="width: 240px"  clearable/>
      <el-button type="primary" style="margin: 0 10px" @click="join">加入</el-button>
    </div>
    <div>
      <div style="color: #999999;padding: 10px">
        我加入的学习小组
      </div>
      <div class="table">
        <el-table :data="allInfo.tableData" stripe style="width: 520px" border>
          <el-table-column prop="name" label="组名" width="240" />
          <el-table-column prop="thName" label="教师" width="160" />
          <el-table-column prop="finishRate" label="作业完成情况" width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {team_join, team_student_gets} from "@/utils/api_path";
import {connectPath} from "@/utils/util";
import store from "@/store";
import {commonTip} from "@/utils/tip";

const allInfo=reactive({
  code:'',
  tableData:[]
})
function join(){
  const path=connectPath({
    code:allInfo.code,
    stuId:store.state.id
  })
  axios.post(team_join+'?'+path).then(resolve=>{
    if(resolve){
      commonTip('success',resolve.msg,1000)
      teamGet()
    }
  })
}
//获取小组视图
function teamGet(){
  axios.get(team_student_gets+'?stuId='+store.state.id).then(resolve=>{
    if (resolve){
      allInfo.tableData=resolve.data
      console.log(resolve.data)
    }
  })
}
onMounted(()=>{
  teamGet()
})
</script>

<style scoped>
.top{
  padding: 20px;
  border-bottom: solid 1px #999999;
  margin-bottom: 10px;
}
</style>