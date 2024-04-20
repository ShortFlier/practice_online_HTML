<template>
  <div style="position: relative">
    <SubjectAdm></SubjectAdm>
    <el-tooltip
        class="box-item"
        effect="light"
        content="点击添加学科"
        placement="left"
    >
      <el-button type="success" circle class="add" @click="allInfo.isShow=true;allInfo.turn=true">
        <i class="bi bi-plus-circle" style="font-size: 16px;"></i>
      </el-button>
    </el-tooltip>
    <el-tooltip
        class="box-item"
        effect="light"
        content="上传历史"
        placement="left"
    >
      <el-button type="success" circle class="history" @click="allInfo.isShow=true;allInfo.turn=false">
        <i class="bi bi-clock" style="font-size: 16px;"></i>
      </el-button>
    </el-tooltip>
    <Mask :isShow="allInfo.isShow" @close="close">
<!--      true显示添加学科-->
      <div v-if="allInfo.turn" style="width: 500px;padding: 20px">
        <div  style="display: inline-block;position: relative;left: 90px" >
          <input type="search" placeholder="输入学科名添加学科" @input="getLikeName" v-model.trim="allInfo.name" class="adds"/>
          <div class="tip">
            <label style="position: relative;right: 68px;font-weight: bold;color: #3099e8">相似学科：</label>
            <div v-for="item in allInfo.tipName" :key="item" style="color: #dcc351;font-weight: bold">
              {{item.name}}
            </div>
          </div>
        </div>
        <el-button type="primary" circle style="float: right;top:10px" v-throttle:1000="addSub">
          <i class="bi bi-check2-circle"></i>
        </el-button>
      </div>
<!--      false显示上传历史-->
      <div v-if="!allInfo.turn">
        <SubjectSbmHis></SubjectSbmHis>
      </div>
    </Mask>
  </div>
</template>

<script setup>
import SubjectAdm from "@/views/admin/SubjectAdm.vue";
import Mask from "@/components/Mask.vue";
import {reactive} from "vue";
import axios from "axios";
import {subject_add, subject_like_name} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import SubjectSbmHis from "@/components/SubjectSbmHis.vue";

const allInfo=reactive({
  isShow:false,
  turn:false,
  name:'',
  tipName:[]
})
function close(){
  allInfo.isShow=false
}
function getLikeName(){
  if(allInfo.name){
    axios.get(subject_like_name+allInfo.name).then(resolve=>{
      if(resolve)
        allInfo.tipName=resolve.data
    })
  }else {
    allInfo.tipName=[]
  }
}
function addSub(){
  axios.put(subject_add,{
    name:allInfo.name
  }).then(resolve=>{
    if(resolve){
      commonTip('success',resolve.msg,2000)
    }
  })
}
</script>

<style scoped>
.add{
  position: absolute;
  right: 400px;
  top: 30px;
}
.history{
  position: absolute;
  right: 60px;
  top: 30px;
}
.tip{
  position: absolute;
  padding:5px;
  width: 95%;
  top:31px;
  z-index: 999999999;
  display: none;
}
.adds:focus + .tip {
  display: block;
}
.adds{
  width: 300px;
  height: 40px;
  font-size: 34px;
}
.adds::placeholder{
  font-size: 16px;
}
</style>