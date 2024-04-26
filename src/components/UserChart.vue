<template>
  <div>
    <div style="text-align: center;position: relative;top: 10px;font-weight: bold">
      用户统计
      <div style="color: #3099e8;position: relative;top: 10px">{{total}}</div>
    </div>
    <div id="chartu" class="chart"></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import axios from "axios";
import {stu_total, th_total} from "@/utils/api_path";

const option = {
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
      data: ['教师', '学生'],
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
      name: '人数',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52]
    }
  ]
};
const total=ref(0)
function init(){
  const Chart=echarts.init(document.getElementById("chartu"))
  Chart.setOption(option)
}

onMounted(() => {
  axios.get(th_total).then(resolve=>{
    if(resolve){
      option.series[0].data[0]=resolve.data
      total.value+=resolve.data
      axios.get(stu_total).then(resolve=>{
        option.series[0].data[1]=resolve.data
        total.value+=resolve.data
        init()
      })
    }
  })
});
</script>

<style scoped>
.chart{
  margin-top: 10px;
  width: 500px;
  height: 400px;
}
</style>