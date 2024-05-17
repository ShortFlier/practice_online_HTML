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
        <el-table :data="allInfo.tableData" stripe style="width: 700px" border>
          <el-table-column prop="name" label="组名" width="240" />
          <el-table-column prop="thName" label="教师" width="160" />
          <el-table-column prop="finishRate" label="作业完成情况" width="120" />
          <el-table-column width="180">
            <template v-slot="scope">
              <el-button link type="danger" size="small" @click="exit(scope.row)">退出小组</el-button>
              <el-button link type="primary" size="small" @click="workLook(scope.row.id)">作业查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Mask :isShow="allInfo.isShow" @close="close">
        <WorkLook :info="allInfo.workLook"></WorkLook>
      </Mask>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {team_exit, team_join, team_student_gets} from "@/utils/api_path";
import {connectPath} from "@/utils/util";
import store from "@/store";
import {commonTip, confirmationBox} from "@/utils/tip";
import Mask from "@/components/Mask.vue";
import WorkLook from "@/views/public/WorkLook.vue";

const allInfo=reactive({
  code:'',
  tableData:[],
  workLook:{
    teamId:null,
    stuId:store.state.id
  },
  isShow:false
})
function close(){
  allInfo.isShow=false
}
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
      // console.log(resolve.data)
    }
  })
}
//退出小组
function exit(row){
  const path=connectPath({
    teamId:row.id,
    stuId:store.state.id
  })
  confirmationBox("你确定退出"+row.name,'warning',()=>{
    axios.delete(team_exit+'?'+path).then(resolve=>{
      if(resolve){
        commonTip('success',resolve.msg,1000)
        teamGet()
      }
    })
  })
}
//作业情况查看
function workLook(teamId){
  allInfo.workLook.teamId=0
  allInfo.workLook.teamId=teamId
  allInfo.isShow=true
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