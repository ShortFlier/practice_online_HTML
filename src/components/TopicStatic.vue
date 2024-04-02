<template>
  <div class="out">
    <div class="title">
      <el-tooltip
          class="box-item"
          effect="light"
          content="点击刷新"
          placement="right">
        <label @click="fresh">题库数量统计</label>
      </el-tooltip>
    </div>
    <div class="total">
      <div style="color: gray">总题数</div>
      <div style="color: #3099e8">{{ allInfo.data[0].total}}</div>
    </div>
    <div class="tb">
      <el-table :data="allInfo.data" border style="width: 600px">
        <el-table-column prop="rdsNumber" label="单选题" width="120" />
        <el-table-column prop="mltNumber" label="多选题" width="120" />
        <el-table-column prop="jdgeNumber" label="判断题" width="120"/>
        <el-table-column prop="fitbNumber" label="填空题" width="120"/>
        <el-table-column prop="vocaNumber" label="应用题" width="120"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {topic_statistic} from "@/utils/api_path";
import axios from "axios";

const allInfo=reactive({
  data:[{
    total:0,
    rdsNumber:0,
    mltNumber:0,
    jdgeNumber:0,
    fitbNumber:0,
    vocaNumber:0
  }]
})
function fresh(){
  statistic()
}
//统计
function statistic(){
  axios.get(topic_statistic+'0').then(resolve=>{
    if(resolve){
      allInfo.data[0]=resolve.data
    }
  })
}
onMounted(()=>{
  statistic();
})
</script>

<style scoped>
.out{
  overflow: hidden;
}
.title{
  float: left;
  width: 200px;
  font-size: 30px;
  font-family: 华文琥珀;
  color: #3099e8;
  text-align: center;
  position: relative;
  top: 25px;
}
.title>label{
  cursor: pointer;
}
.total{
  float: left;
  position: relative;
  top: 20px;
  left: 100px;
}
.total div{
  width: 100%;
  text-align: center;
}
.tb{
  float: right;
}
</style>