<template>
  <div>
    <div>
      <div class="nav">
        <div>
          学科选择：<SubjectSelect @sltChange="setSubject"></SubjectSelect>
        </div>
        <div>
          起始时间：<el-date-picker v-model="allinfo.searchInfo.begin" type="datetime"/>
        </div>
        <div>
          终止时间：<el-date-picker v-model="allinfo.searchInfo.end" type="datetime"/>
        </div>
      </div>
      <div class="chart">
        <div id="all" class="all_chart"></div>
        <div style="border: 1px solid #999999;">
          <div style="height: 16px;text-align: center;padding-top:4px;font-weight: bold; ">
            练习情况（仅选择、判断）
          </div>
          <div id="rate" class="rate_chart"></div>
        </div>
        <div>
<!--          <div style="text-align: center; font-weight: bold;font-size: 20px;padding-top: 10px;margin-left: 100px">练习记录</div>-->
          <div id="date" class="date_chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import SubjectSelect from "@/components/SubjectSelect.vue";
import {onMounted, reactive, watch} from "vue";
import store from "@/store";
import axios from "axios";
import {addDaysToCurrentDateTime, connectPath, getCurrentDateTimeString} from "@/utils/util";
import {practice_grade_all, practice_grade_date, practice_grade_rate} from "@/utils/api_path";
const allinfo=reactive({
  searchInfo:{
    subjectId:-5,
    begin:addDaysToCurrentDateTime(-30),
    end:getCurrentDateTimeString(),
    stuId:store.state.id
  }
})
watch(()=>allinfo.searchInfo,()=>{
  //获取全题数
  axios.post(practice_grade_all,allinfo.searchInfo).then(resolve=>{
    if(resolve){
      console.log(resolve.data)
      let sum=0
      for (let i = 0; i < 5; i++) {
        sum+=resolve.data[i]
        allChart.series[0].data[i].value=resolve.data[i]
      }
      allChart.title.subtext=sum
      canve()
    }
  })
  //获取正确率
  axios.post(practice_grade_rate,allinfo.searchInfo).then(resolve=>{
    if(resolve){
      for (let i = 0; i < 7; i++) {
        rate.series[0].data[i].value=resolve.data[i]
      }
      canve()
    }
  })
  //获取日期练习情况
  axios.post(practice_grade_date,allinfo.searchInfo).then(resolve=>{
    if(resolve){
      console.log(resolve.data)
      date.xAxis.data=resolve.data.date
      date.series[0].data=resolve.data.number
      canve()
    }
  })
},{
  deep:true
})
function canve(){
  const chartDom1= document.querySelector('#all');
  if(chartDom1){
    echarts.dispose(chartDom1)
    echarts.init(chartDom1).setOption(allChart)
  }

  const chartDom2=document.querySelector('#rate')
  if(chartDom2){
    echarts.dispose(chartDom2)
    echarts.init(chartDom2).setOption(rate)
  }

  const chartDom3=document.querySelector('#date')
  if(chartDom3){
    echarts.dispose(chartDom3)
    echarts.init(chartDom3).setOption(date)
  }

}
function setSubject(id){
  allinfo.searchInfo.subjectId=id
}
const allChart={
  title: {
    text: '全部题型练习统计',
    subtext: '总题数',
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
      name: '数目统计',
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
const rate= {
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
  xAxis: {
    type: 'category',
        data: ['单选正确', '单选错误', '多选全对', '多选半对', '多选错误', '判断正确', '判断错误'],
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [
        {
          value: 20,
          itemStyle: {
            color: '#2fa92f'
          }
        },
        {
          value: 200,
          itemStyle: {
            color: '#a90000'
          }
        },
        {
          value: 100,
          itemStyle: {
            color: '#2fa92f'
          }
        },
        {
          value: 400
        },
        {
          value: 50,
          itemStyle: {
            color: '#a90000'
          }
        },
        {
          value: 200,
          itemStyle: {
            color: '#2fa92f'
          }
        },
        {
          value: 700,
          itemStyle: {
            color: '#a90000'
          }
        }
      ],
      type: 'bar'
    }
  ]
};
const date= {
  title: {
    text: '练习日志'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['单日练习数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '单日练习数',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
};
onMounted(()=>{
  allinfo.searchInfo.subjectId=null
  // canve()
})
</script>

<style scoped>
.nav{
  padding: 20px 20px 0 20px;
  border-bottom:1px solid #c5c4c4;
  overflow: hidden;
}
.nav>div{
  float: left;
  margin: 5px 20px;
}
.all_chart{
  width: 430px;
  height: 350px;
  border: 1px solid #999999;
  margin-left: 100px;
}
.chart>div{
  float: left;
}
.rate_chart{
  height: 330px;
  width: 570px;
}
.date_chart{
  width: 1002px;
  height: 300px;
  margin-left: 100px;
  border: 1px solid #999999;
  border-top: none;
}
</style>