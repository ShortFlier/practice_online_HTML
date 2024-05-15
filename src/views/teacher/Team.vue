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
          <el-table :data="allInfo.tableData" border stripe style="width: 400px">
            <el-table-column prop="name" label="昵称" width="220" />
            <el-table-column prop="x" label="加入日期" width="180" />
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
import {team_get, team_members} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import Page from "@/components/Page.vue";
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
  }
})
function setPage(value){
  allInfo.pageInfo=value
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

}
onMounted(()=>{
  // if(store.state.identity!=identity_teacher||store.state.id!=useRoute().query.id)
  //   router.push('/teacher/home/myStudent')
  const path=connectPath(useRoute().query)
  axios.get(team_get+'?'+path).then(resolve=>{
    if (resolve){
      allInfo.team=resolve.data
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