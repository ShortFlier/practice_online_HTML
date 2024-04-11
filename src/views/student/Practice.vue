<template>
  <div>
    <div class="top">
      <div class="sub">
        <label>选择想要练习的科目：</label>
        <SubjectSelect @sltChange="getSubId"></SubjectSelect>
      </div>
      <div class="dif">
        <label>选择难度（可选）：</label>
        <el-rate v-model="allInfo.difficulty" :colors="colors" clearable size="large"/>
      </div>
      <div style="padding-top: 10px">
        <el-radio-group v-model="allInfo.topicType" size="large">
          <el-radio-button label="全部题型"  />
          <el-radio-button label="单选题" />
          <el-radio-button label="多选题"  />
          <el-radio-button label="判断题"  />
          <el-radio-button label="填空题"  />
          <el-radio-button label="应用题" />
        </el-radio-group>
        <label style="color: #999999;position: relative;top: 5px;margin-left: 10px">题型选择</label>
      </div>
    </div>
    <div class="content">
      <div class="start">
        <el-button type="primary" v-throttle:1000="getTopic">开始</el-button>
      </div>
      <div class="topic">

      </div>
    </div>
  </div>
</template>

<script setup>
import SubjectSelect from "@/components/SubjectSelect.vue";
import {reactive} from "vue";
import {connectPath, getType} from "@/utils/util";
import axios from "axios";
import {topic_practice} from "@/utils/api_path";
const colors = ['#99A9BF', '#F7BA2A', '#FF9900']
const allInfo=reactive({
  subjectId:'',
  difficulty:'',
  topicType:"全部题型",
  topic:null,
  type:0
})
function getSubId(id){
  allInfo.subjectId=id
}
function getTopic(){
  if(!allInfo.subjectId)
    return
  const type=getType(allInfo.topicType);
  const path=connectPath({
    subjectId:allInfo.subjectId,
    difficulty:allInfo.difficulty,
    type:type
  })
  axios.get(topic_practice+`?${path}`).then(resolve=>{
    if(resolve){
      allInfo.type=type
      allInfo.topic=resolve.data
    }
  })
}
</script>

<style scoped>
.top{
  padding: 20px 10px;
  border-bottom: #d5d2d2 1px solid;
}
.sub{
  height: 50px;
  float: left;
}
.sub,.dif>label{
  color: #999999;
}
.dif{
  float: left;
  height: 50px;
  margin-left: 200px;
}
.content{
  padding: 10px;
}
.start{
  width: 100%;
  text-align: center;
}
</style>