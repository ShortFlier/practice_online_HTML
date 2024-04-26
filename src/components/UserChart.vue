<template>
  <div>
    <div id="chartu" class="chart"></div>
  </div>
</template>

<script setup>
import {nextTick, onMounted} from "vue";
import * as echarts from "echarts";
import axios from "axios";
import {stu_total, th_total} from "@/utils/api_path";

const option = {
  title: {
    text: '用户统计',
    subtext: 2016,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '题目数',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '学生' },
        { value: 735, name: '教师' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

function init(){
  const Chart=echarts.init(document.getElementById("chartu"))
  Chart.setOption(option)
}

onMounted(() => {
  axios.get(th_total).then(resolve=>{
    if(resolve){
      option.title.subtext=resolve.data
      option.series[0].data[1].value=resolve.data
      axios.get(stu_total).then(resolve=>{
        option.title.subtext+=resolve.data
        option.series[0].data[0].value=resolve.data
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