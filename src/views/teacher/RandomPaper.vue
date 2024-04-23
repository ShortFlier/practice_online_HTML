<template>
  <div>
    <label style="font-weight: bold;color: #666666;margin: 20px">随机组卷</label>
    <div>
      <div class="option" v-for="(item,index) in topics" :key="index">
        <el-form-item :label="item" >
          <el-input-number controls-position="right" v-model="allInfo.topicNumbers[index]" style="width: 100px"/>
          <label class="lbl">每题分数：</label>
          <el-input-number controls-position="right" v-model="allInfo.topicMarks[index]" style="width: 100px"/>
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
    <div>
      <el-button type="primary">生成组卷</el-button>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";
import SubjectSelect from "@/components/SubjectSelect.vue";

const allInfo=reactive({
  topicNumbers:[0,0,0,0,0],
  difficulty:1,
  topicMarks:[0,0,0,0,0],
  subjectId:null,
  totalMarks:0,
  display:'是'
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
</script>

<style scoped>
.option{
  padding: 10px;
  border-bottom: 1px solid #d5d2d2;
  width: 650px;
  margin-left: 30px;
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
</style>