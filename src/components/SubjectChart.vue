<template>
  <div>
    <div id="chartsub" class="chart"></div>
  </div>
</template>

<script setup>
import {nextTick, onMounted} from "vue";
import * as echarts from "echarts";
import axios from "axios";
import {stu_total, subject_getData, th_total} from "@/utils/api_path";

const option = {
  title: {
    text: '学科统计',
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
  const Chart=echarts.init(document.getElementById("chartsub"))
  Chart.setOption(option)
}

onMounted(() => {
  axios.post(subject_getData,{
    pageInfo:{
      page:0,
      pageSize:0
    }
  }).then(resolve=>{
    if(resolve){
      option.title.subtext=resolve.data.total+'学科'
      console.log(resolve.data.rows)
      for (let i = 0; i <resolve.data.rows.length ; i++) {
        const info={
          value:resolve.data.rows[i].topicNumber,
          name:resolve.data.rows[i].name
        }
        option.series[0].data.push(info)
      }
      init()
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