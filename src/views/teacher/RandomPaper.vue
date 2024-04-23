<template>
  <div>
    <label style="font-weight: bold;color: #666666;margin: 20px">随机组卷</label>
    <div class="option">
      <el-form-item label="试卷名" >
        <el-input v-model.trim="allInfo.title" style="width: 400px"  />
      </el-form-item>
      <el-form-item label="考试时间" style="position: absolute;right: 5px;top:10px" >
        <el-input-number min="0" controls-position="right" v-model="allInfo.duration" style="width: 100px"/>
      </el-form-item>
      <el-form-item label="试卷描述" >
        <el-input
            v-model.trim="allInfo.description"
            style="width: 450px"
            :autosize="{ minRows: 1, maxRows: 3 }"
            type="textarea"
        />
      </el-form-item>
    </div>
    <div>
      <div class="option" v-for="(item,index) in topics" :key="index">
        <el-form-item :label="item" >
          <el-input-number min="0" controls-position="right" v-model="allInfo.topicNumbers[index]" style="width: 100px"/>
          <label class="lbl">每题分数：</label>
          <el-input-number min="0" controls-position="right" v-model="allInfo.topicMarks[index]" style="width: 100px"/>
        </el-form-item>
      </div>
    </div>
    <div style="overflow: hidden">
      <div class="slt">
        <label>选择学科：</label>
        <SubjectSelect @sltChange="setSubjectId"></SubjectSelect>
      </div>
      <div class="slt">
        <label>最低难度选择：</label>
        <el-rate v-model="allInfo.difficulty" />
      </div>
      <div class="slt">
        <label>是否公开：</label>
        <el-radio-group v-model="allInfo.display" size="large">
          <el-radio-button label="是" value="1" />
          <el-radio-button label="否" value="0" />
        </el-radio-group>
      </div>
      <div class="slt">
        <label>卷面总分：</label>
        <label style="font-size: 26px;color: #3099e8">{{ totalMarks }}</label>
      </div>
    </div>
    <div class="smt">
      <el-button type="primary" @click="get">生成组卷</el-button>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";
import SubjectSelect from "@/components/SubjectSelect.vue";
import axios from "axios";
import {test_random} from "@/utils/api_path";

const allInfo=reactive({
  topicNumbers:[0,0,0,0,0],
  difficulty:1,
  topicMarks:[0,0,0,0,0],
  subjectId:null,
  display:'是',
  title:'',
  description:'',
  duration:0,
  paperId:null
})
const topics=["单选题数","多选题数","判断题数","填空题数","应用题数"]
function setSubjectId(id){
  allInfo.subjectId=id
}
const totalMarks=computed(()=>{
  let marks=0
  for (let i = 0; i < 5; i++) {
    marks+=allInfo.topicNumbers[i]*allInfo.topicMarks[i]
  }
  return marks
})

function get(){
  const info={
    topicNumbers:allInfo.topicNumbers,
    difficulty:allInfo.difficulty.toString(),
    topicMarks:allInfo.topicMarks,
    subjectId:allInfo.subjectId,
    totalMarks:totalMarks.value,
    display:allInfo.display=='是'?'1':'0',
    title:allInfo.title,
    description:allInfo.description,
    duration:allInfo.duration
  }
  axios.put(test_random,info)
}
</script>

<style scoped>
.option{
  padding: 10px;
  border-bottom: 1px solid #d5d2d2;
  width: 650px;
  margin-left: 30px;
  position: relative;
}
.lbl{
  margin: 0 5px 0 30px;
  font-weight: bold;
  color: #666666;
}
.slt{
  float: left;
  padding: 20px;
}
.smt{
  padding-left: 400px;
  padding-bottom: 10px;
  border-bottom: #d5d2d2 solid 1px;
}
</style>