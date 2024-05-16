<template>
  <div>
    <div style="padding: 20px;border-bottom: 1px solid #545d64">
      <el-button type="info" @click="router.push('/teacher/home/myStudent')">返回</el-button>
    </div>
    <div class="display">
      <div class="name">
        {{allInfo.team.name}}
      </div>
      <div class="des">
        {{allInfo.team.description}}
      </div>
      <div style="border-top: 1px solid #545d64">
        <div class="total">
          成员统计：
          <label style="font-size: 20px;color: #3099e8">{{allInfo.total}}</label>
          <el-button type="warning" @click="copy" style="float: right;margin: 5px 100px 0 0">复制邀请码</el-button>
        </div>
        <div class="table">
          <el-button type="success" style="float: right;margin: 15px -100px 0 0" @click="allInfo.workShow=true">作业布置</el-button>
          <Mask :isShow="allInfo.workShow" @close="workClose">
            <div class="work" v-if="allInfo">
              <div style="font-size: 18px;color: #3099e8">
                小组作业：
              </div>
              <div>
                <el-form  label-width="auto" style="max-width: 600px">
                  <el-form-item label="练习科目">
                    <el-input v-model="allInfo.work.subjectName" disabled/>
                  </el-form-item>
                  <el-form-item v-if="allInfo.work.amend" label="科目选择">
                    <SubjectSelect @sltChange="setSub" ></SubjectSelect>
                  </el-form-item>
                  <el-form-item label="最低难度">
                    <el-rate v-model="allInfo.work.difficulty" :disabled="!allInfo.work.amend"/>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <el-date-picker v-model="allInfo.work.createTime" type="datetime" :disabled="!allInfo.work.amend"/>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <el-date-picker v-model="allInfo.work.overTime" type="datetime" :disabled="!allInfo.work.amend"/>
                  </el-form-item>
                  <el-form-item label="单选题数目">
                    <el-input-number v-model="allInfo.work.radios" min="0" :disabled="!allInfo.work.amend" controls-position="right"/>
                  </el-form-item>
                  <el-form-item label="多选题数目">
                    <el-input-number v-model="allInfo.work.muls" min="0" :disabled="!allInfo.work.amend" controls-position="right"/>
                  </el-form-item>
                  <el-form-item label="判断题数目">
                    <el-input-number v-model="allInfo.work.judg" min="0" :disabled="!allInfo.work.amend" controls-position="right"/>
                  </el-form-item>
                  <el-form-item label="填空题数目">
                    <el-input-number v-model="allInfo.work.fitb" min="0" :disabled="!allInfo.work.amend" controls-position="right"/>
                  </el-form-item>
                  <el-form-item label="应用题数目">
                    <el-input-number v-model="allInfo.work.vocal" min="0" :disabled="!allInfo.work.amend" controls-position="right"/>
                  </el-form-item>
                </el-form>
              </div>
              <div>
                <el-button type="info" @click="amend">修改</el-button>
                <el-button v-if="allInfo.work.amend" type="success" @click="workSet">完成</el-button>
              </div>
            </div>
          </Mask>
          <el-table :data="allInfo.tableData" border stripe style="width: 400px">
            <el-table-column prop="name" label="昵称" width="220" />
            <el-table-column prop="createTime" label="加入日期" width="180" />
          </el-table>
        </div>
        <div class="page">
          <Page :total="allInfo.total" @pageChange="setPage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {connectPath} from "@/utils/util";
import store from "@/store";
import {identity_teacher} from "@/utils/constant";
import axios from "axios";
import {team_get, team_homework_id_get, team_homework_set, team_members, team_members_gets} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import Page from "@/components/Page.vue";
import Mask from "@/components/Mask.vue";
import SubjectSelect from "@/components/SubjectSelect.vue";
const allInfo=reactive({
  team:{
    id:null,
    name:null,
    description:null,
    thId:null,
    invitationCode:null,
    createTime:null,
    updateTime:null
  },
  total:0,
  tableData:[],
  pageInfo:{
    page:1,
    pageSize:5
  },
  work:{
    difficulty:null,
    subjectName:'',
    subjectId:null,
    createTime:null,
    overTime:null,
    radios:0,
    muls:0,
    judg:0,
    fitb:0,
    vocal:0,
    amend:false
  },
  workShow:false
})
//布置作业
function workSet(){
  axios.put(team_homework_set,{
    teamId:allInfo.team.id,
    ...allInfo.work
  }).then(resolve=>{
    if(resolve){
      commonTip('success',resolve.msg,1000)
      allInfo.work.amend=false
      workGet()
    }
  })
}
//修改按钮点击
function amend(){
  allInfo.work.amend=true
}
//获取选择的学科id
function setSub(id){
  allInfo.work.subjectId=id
}
//关闭作业界面
function workClose(){
  allInfo.workShow=false
  allInfo.work.amend=false
  workGet()
}
//Page修改
function setPage(value){
  allInfo.pageInfo=value
  if(allInfo.team.id)
    memberGet()
}
//获取小组作业信息
function workGet(){
  axios.get(team_homework_id_get+allInfo.team.id).then(resolve=>{
    if (resolve){
      console.log(resolve.data)
      Object.assign(allInfo.work,resolve.data)
    }
  })
}
//复制邀请码
function copy(){
  navigator.clipboard.writeText(allInfo.team.invitationCode)
      .then(() => {
        commonTip('success','邀请码已复制到剪贴板',1000);
      })
      .catch(() => {
        commonTip('error','复制失败',1000);
      });
}
//获取小组成员
function memberGet(){
  const path=connectPath({
    teamId:allInfo.team.id,
    page:allInfo.pageInfo.page,
    pageSize:allInfo.pageInfo.pageSize
  })
  axios.get(team_members_gets+'?'+path).then(resolve=>{
    if(resolve){
      allInfo.tableData=resolve.data
    }
  })
}
onMounted(()=>{
  // if(store.state.identity!=identity_teacher||store.state.id!=useRoute().query.id)
  //   router.push('/teacher/home/myStudent')
  const path=connectPath(useRoute().query)
  axios.get(team_get+'?'+path).then(resolve=>{
    if (resolve){
      allInfo.team=resolve.data
      memberGet()
      workGet()
    }
  })
  //获取人数
  axios.get(team_members+'?id='+useRoute().query.id).then(resolve=>{
    if(resolve){
      allInfo.total=resolve.data
    }
  })
})
</script>

<style scoped>
.display{
  padding: 20px;
  position: relative;
}
.display>div{
  margin: 10px;
}
.name{
  font-size: 24px;
  color: #545d64;
}
.des{
  font-size: 16px;
  color: #999999;
}
.page{
  margin-top: 5px;
}
</style>