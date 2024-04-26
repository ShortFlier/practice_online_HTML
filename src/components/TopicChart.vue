<template>
  <div>
    <div>
      <label>学科选择：</label>
      <SubjectSelect @sltChange="setId"></SubjectSelect>
    </div>
    <div id="chart" class="chart"></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import SubjectSelect from "@/components/SubjectSelect.vue";
import axios from "axios";
import {subject_getData, topic_statistic} from "@/utils/api_path";

const option = {
  title: {
    text: '题库数目统计',
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
        { value: 1048, name: '单选题' },
        { value: 735, name: '多选题' },
        { value: 580, name: '判断题' },
        { value: 484, name: '填空题' },
        { value: 300, name: '应用题' }
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
const subjectId=ref(0)
function setId(id){
  subjectId.value=id
  if(subjectId.value){
    //获取指定学科题目
    axios.post(subject_getData,{
      id:subjectId.value,
      pageInfo:{
        page:1,
        pageSize:1
      }
    }).then(resolve=>{
      if(resolve){
        option.title.subtext=resolve.data.rows[0].topicNumber
        option.series[0].data[0].value=resolve.data.rows[0].radioesNumber
        option.series[0].data[1].value=resolve.data.rows[0].mchoicesNumber
        option.series[0].data[2].value=resolve.data.rows[0].judgmentNumber
        option.series[0].data[3].value=resolve.data.rows[0].fitbNumber
        option.series[0].data[4].value=resolve.data.rows[0].vocaNumber
        init()
      }
    })
  }else {  //未选择学科
    //获取全部题目
    axios.get(topic_statistic+0).then(resolve=>{
      if(resolve){
        option.title.subtext=resolve.data.total
        option.series[0].data[0].value=resolve.data.rdsNumber
        option.series[0].data[1].value=resolve.data.mltNumber
        option.series[0].data[2].value=resolve.data.jdgeNumber
        option.series[0].data[3].value=resolve.data.fitbNumber
        option.series[0].data[4].value=resolve.data.vocaNumber
        init()
      }
    })
  }
}
function init(){
  const Chart=echarts.init(document.getElementById("chart"))
  Chart.setOption(option)
}

onMounted(() => {
  setId(0)
});
</script>

<style scoped>
.chart{
  margin-top: 10px;
  width: 500px;
  height: 400px;
}
</style>