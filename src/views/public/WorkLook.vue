<template>
  <div class="out">
    <div style="position: relative;left: 30px;overflow: hidden">
      <div class="homeworkT">
        <div style="text-align: center;font-size: 20px;color: #545d64;font-weight: bold">
          {{allInfo.homework.name}}
        </div>
        <div style="text-align: center;color: #999999;margin-top: 5px">
          练习科目：<label>{{allInfo.homework.subjectName}}</label>
        </div>
        <div id="homework_chart" class="homework"></div>
      </div>
      <div class="my_workT">
        <div style="text-align: center;font-size: 20px;color: #545d64;font-weight: bold">
          作业完成情况
        </div>
        <div style="text-align: center;margin-top: 10px">
          {{allInfo.myWork.stuName}}
        </div>
        <div id="work_chart" class="my_work"></div>
      </div>
    </div>
    <div style="text-align: center;color: #666666">
      完成率：<label class="last" :style="allInfo.rate=='100%'?'color: #1fd71f;':'color:red'">{{allInfo.rate}}</label>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import {reactive, watch} from "vue";
import {stu_get_by_team_work, student_get_by_id, team_get, team_homework_id_get} from "@/utils/api_path";
import axios from "axios";
import {connectPath} from "@/utils/util";
const props=defineProps({
  info:Object
})
watch(()=>props.info,()=>{
  //获取作业信息和完成情况信息
  const path=connectPath(props.info)
  axios.get(stu_get_by_team_work+'?'+path).then(resolve=>{
    if (resolve){
      for (let i = 0; i < 5; i++) {
        homework.series[0].data[i]=resolve.data.finishs[i]
      }
      for (let i = 0; i < 5; i++) {
        // my_work.series[0].data[i]=resolve.data.finishs[i+5]
        const obj={
          value:0,
          itemStyle:{
          }
        }
        if(resolve.data.finishs[i+5]>=resolve.data.finishs[i]){ //达标
          obj.value=resolve.data.finishs[i+5]
          my_work.series[0].data[i]=obj
        }else { //不达标
          obj.value=resolve.data.finishs[i+5]
          obj.itemStyle.color='#a90000'
          my_work.series[0].data[i]=obj
        }
      }
      allInfo.rate=resolve.data.finishRate
      const homeworkElt=document.querySelector('#homework_chart')
      echarts.init(homeworkElt).setOption(homework)
      const myWorkElt=document.querySelector('#work_chart')
      echarts.init(myWorkElt).setOption(my_work)

    }
  })
},{
  deep:true
})
const allInfo=reactive({
  homework:{
    name:'',
    subjectName:''
  },
  myWork:{
    stuName:'老刘'
  },
  rate:''
})
const homework= {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['单选题数', '多选题数', '判断题数', '填空题数', '应用题数'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390]
    }
  ]
}
watch(()=>props.info,()=>{

  //获取subjectName
  axios.get(team_homework_id_get+props.info.teamId).then(resolve=>{
    if(resolve){
      allInfo.homework.subjectName=resolve.data.subjectName
    }
  })
  //获取teamName
  const path=connectPath({
    teacher:-100,
    id:props.info.teamId
  })
  axios.get(team_get+'?'+path).then(resolve=>{
    if(resolve){
      allInfo.homework.name=resolve.data.name
    }
  })
},{
  deep:true
})
const my_work={
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['单选题数', '多选题数', '判断题数', '填空题数', '应用题数'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '达标数量',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390]
    }
  ]
}
watch(()=>props.info,()=>{

  //获取stuName
  axios.get(student_get_by_id+'?id='+props.info.stuId).then(resolve=>{
    if(resolve){
      allInfo.myWork.stuName=resolve.data.name
    }
  })
},{
  deep:true
})
</script>

<style scoped>
.homework{
  width: 400px;
  height: 300px;
}
.my_work{
  width: 400px;
  height: 300px;
}
.homeworkT,.my_workT{
  width: 450px;
  height: 400px;
  padding: 5px;
  border: #999999 1px solid;
  float: left;
}
.out{
  width: 1000px;
}
.last{
  font-size: 20px;
  font-weight: bolder;
}
</style>