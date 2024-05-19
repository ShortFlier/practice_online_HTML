<template>
  <div>
    <div class="nav">
      我管理的学习小组
      <div style="position:absolute;right: 500px;top:10px">
        <el-tooltip
            class="box-item"
            effect="light"
            content="创建一个学习小组"
            placement="left"
        >
          <el-button type="primary" circle @click="allInfo.isShow=true">
            <i class="bi bi-patch-plus"></i>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="table">
      <el-table :data="allInfo.tableData" stripe style="width: 860px" border>
        <el-table-column  label="组名" width="500" >
          <template v-slot="scope">
            <div style="font-size: 20px;font-weight: bold">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <el-table-column width="180">
          <template v-slot="scope">
            <el-button link type="primary" size="small" @click="access(scope.row)">
              管理
            </el-button>
            <el-button link type="danger" size="small" @click="fire(scope.row)">
              解散
            </el-button>
            <el-button link type="success" size="small" @click="copy(scope.row)">
              邀请码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Mask :isShow="allInfo.isShow" @close="close">
      <div>
        <el-form-item label="组名">
          <el-input v-model.trim="allInfo.name" style="width: 400px"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model.trim="allInfo.description" type="textarea" style="width: 400px"/>
        </el-form-item>
        <el-button type="success" @click="submit">提交</el-button>
        <router-link v-if="allInfo.id" style="position: relative;left: 100px" :to="'/teacher/home/team?id='+allInfo.id+'&'+store.state.identity+'='+store.state.id">前往查看</router-link>
      </div>
    </Mask>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {team_add, team_delete, team_teacher_get} from "@/utils/api_path";
import store from "@/store";
import axios from "axios";
import Mask from "@/components/Mask.vue";
import {commonTip, confirmationBox} from "@/utils/tip";
import router from "@/router";
const allInfo=reactive({
  tableData:[],
  isShow:false,
  name:'',
  description:'',
  id:0
})
function close(){
  allInfo.isShow=false
  allInfo.name=''
  allInfo.description=''
  allInfo.id=0
}
function getData(){
  axios.get(team_teacher_get+'?thId='+store.state.id).then(resolve=>{
    if (resolve){
      allInfo.tableData=resolve.data
    }
  })
}
function submit(){
  if(allInfo.name){
    axios.post(team_add,{
      name:allInfo.name,
      description:allInfo.description,
      thId:store.state.id
    }).then(resolve=>{
      if(resolve){
        allInfo.id=resolve.data
        allInfo.name=''
        allInfo.description=''
        getData()
      }
    })
  }else
    commonTip('error','请输入组名！',500)
}
//管理
function access(team){
  router.push('/teacher/home/team?id='+team.id+'&'+store.state.identity+'='+store.state.id)
}
//解散
function fire(team){
  confirmationBox('你确定要解散'+team.name,'warning',()=>{
    axios.delete(team_delete+'?id='+team.id).then(resolve=>{
      if(resolve){
        commonTip('success',resolve.msg,1500)
        getData()
      }
    })
  })
}
//复制邀请码
function copy(team){
  navigator.clipboard.writeText(team.invitationCode)
      .then(() => {
        commonTip('success','邀请码已复制到剪贴板',1000);
      })
      .catch(() => {
        commonTip('error','复制失败',1000);
      });
}
onMounted(()=>{
  getData()
})
</script>

<style scoped>
.nav{
  font-size: 20px;
  padding: 10px;
  position: relative;
  color: #545d64;
  margin-top: 20px;
}
.table{
  border-bottom: 1px solid #666666;
  border-top: 1px solid #666666;
  padding: 10px;
}
</style>