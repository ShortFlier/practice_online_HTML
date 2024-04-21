<template>
  <div>
    <div>
      <PaperTitle :paper="allInfo.paperInfo.paper"></PaperTitle>
    </div>
    <div class="display">
      <div v-if="allInfo.paperInfo.radioMarks" class="topic_blank">
        <div class="title_t">单选题（
          <label class="mask_dp">{{allInfo.paperInfo.radioMarks}}</label>
          ）分</div>
        <div class="topic" v-for="(item,index) in allInfo.paperInfo.radioList" :key="index">
          <RadTest :topicInfo="item" :testType="allInfo.testType" :sign="allInfo.sign"
                    @getAnswer="setAnswer"></RadTest>
        </div>
      </div>
      <div v-if="allInfo.paperInfo.mulMarks" class="topic_blank">
        <div class="title_t">多选题（
          <label class="mask_dp">{{allInfo.paperInfo.mulMarks}}</label>
          ）分</div>
        <div class="topic" v-for="(item,index) in allInfo.paperInfo.mulList" :key="index">
          <MulTest :topicInfo="item" :testType="allInfo.testType" :sign="allInfo.sign"
                   @getAnswer="setAnswer"></MulTest>
        </div>
      </div>
      <div v-if="allInfo.paperInfo.judgMarks" class="topic_blank">
        <div class="title_t">判断题（
          <label class="mask_dp">{{allInfo.paperInfo.judgMarks}}</label>
          ）分</div>
        <div class="topic" v-for="(item,index) in allInfo.paperInfo.judgList" :key="index">
          <JudTest :topicInfo="item" :testType="allInfo.testType" :sign="allInfo.sign"
                   @getAnswer="setAnswer"></JudTest>
        </div>
      </div>
      <div v-if="allInfo.paperInfo.fitbMarks" class="topic_blank">
        <div class="title_t">填空题（
          <label class="mask_dp">{{allInfo.paperInfo.fitbMarks}}</label>
          ）分</div>
        <div class="topic" v-for="(item,index) in allInfo.paperInfo.fitbList" :key="index">
          <FitbTest :topicInfo="item" :testType="allInfo.testType" :sign="allInfo.sign"
                    @getAnswer="setAnswer"></FitbTest>
        </div>
      </div>
      <div v-if="allInfo.paperInfo.vocMarks" class="topic_blank">
        <div class="title_t">应用题（
          <label class="mask_dp">{{allInfo.paperInfo.vocMarks}}</label>
          ）分</div>
        <div class="topic" v-for="(item,index) in allInfo.paperInfo.vocList" :key="index">
          <VocTest :topicInfo="item" :testType="allInfo.testType" :sign="allInfo.sign"
                   @getAnswer="setAnswer"></VocTest>
        </div>
      </div>
    </div>
    <div class="submit_tip" @click="submit">
      <button :class="overTime.minutes>=3?'primary':'warning'">
        <div class="tip">
          交卷
        </div>
        <div class="time">
          （{{overTime.minutes}}:{{overTime.seconds}}）
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import PaperTitle from "@/components/PaperTitle.vue";
import {onMounted, reactive, watch} from "vue";
import {test_type_test} from "@/utils/constant";
import {useRoute} from "vue-router";
import {isLogin} from "@/utils/util";
import router from "@/router";
import axios from "axios";
import {stu_test, stu_test_submit} from "@/utils/api_path";
import RadTest from "@/components/topic/test/RadTest.vue";
import MulTest from "@/components/topic/test/MulTest.vue";
import JudTest from "@/components/topic/test/JudTest.vue";
import FitbTest from "@/components/topic/test/FitbTest.vue";
import VocTest from "@/components/topic/test/VocTest.vue";
import {commonTip, confirmationBox} from "@/utils/tip";
import store from "@/store";
const allInfo=reactive({
  paperInfo:{
    paper:null,
    radioMarks:0,
    radioList:[],
    mulMarks:0,
    mulList:[],
    judgMarks:0,
    judgList:[],
    fitbMarks:0,
    fitbList:[],
    vocMarks:0,
    vocList:[],
    difficulty:''
  },
  testType:test_type_test,
  id:'',
  sign:1,
  answerInfo:[],
  end:false,
  topicNumber:0,
  createTime:''
})
//获取用户回答
function setAnswer(value){
  allInfo.answerInfo.push(value)
  if(allInfo.answerInfo.length==allInfo.topicNumber)
    save()
}
watch(()=>allInfo.end,()=>{
  if(allInfo.end)
    ++allInfo.sign
})
//提交后端
function save(){
  commonTip('success','已交卷！',10000)
  console.log('交卷')
  // console.log(allInfo.answerInfo)
  //发送后端
  axios.put(stu_test_submit,{
    paperId:allInfo.paperInfo.paper.id,
    submitId:store.state.id,
    smtAswListDTOList:allInfo.answerInfo,
    createTime:allInfo.createTime
  }).then(resolve=>{
    if(resolve)
      commonTip('success',resolve.msg,2000)
  })
}
//点击交卷功能
function submit(){
  if(allInfo.end){
    commonTip('error','考试已结束!!!',500)
    return
  }
  confirmationBox('确定交卷？','warning',()=>{
    if(!allInfo.end)
      allInfo.end=true
    else
      commonTip('error','考试已结束!!!',500)
  })
}
//计时功能
const overTime = reactive({
  minutes: 0,
  seconds: 0
})
let targetTime
function compuTime() {
  const currentTime = new Date().getTime();
  let timeDifference = Math.max(0, Math.floor((targetTime - currentTime) / 1000));

  overTime.minutes = Math.floor(timeDifference / 60);
  overTime.seconds = timeDifference % 60;

  if (timeDifference <= 0) {
    // 倒计时结束的逻辑
    allInfo.end=true
    console.log('倒计时结束');
    return;
  }

  if(!allInfo.end)
    setTimeout(compuTime, 1000); // 递归调用 compuTime 函数，实现每秒钟更新一次 overTime
}
onMounted(()=>{
  if(!isLogin())
    router.push('/login')
  allInfo.id=useRoute().params.id
  allInfo.createTime=new Date().toISOString();
  axios.get(stu_test+allInfo.id).then(resolve=>{
    if (resolve){
      allInfo.paperInfo=resolve.data
      //计算总题目数
      if(allInfo.paperInfo.radioList)
        allInfo.topicNumber+=allInfo.paperInfo.radioList.length
      if(allInfo.paperInfo.mulList)
        allInfo.topicNumber+=allInfo.paperInfo.mulList.length
      if(allInfo.paperInfo.judgList)
        allInfo.topicNumber+=allInfo.paperInfo.judgList.length
      if(allInfo.paperInfo.fitbList)
        allInfo.topicNumber+=allInfo.paperInfo.fitbList.length
      if(allInfo.paperInfo.vocList)
        allInfo.topicNumber+=allInfo.paperInfo.vocList.length
      //计时器开启
      targetTime = new Date().getTime() + allInfo.paperInfo.paper.duration * 60 * 1000
      compuTime()
    }
  })
})
</script>

<style scoped>
.title_t{
  font-weight: bold;
  font-size: 24px;
}
.mask_dp{
  font-size: 28px;
  font-weight: bolder;
  color: #3099e8;
}
.display{
  width: 1200px;
  margin: 10px auto;
}
.topic{
  margin: 20px;
}
.tip{
  font-weight: bolder;
  font-size: 40px;
}
.submit_tip{
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10;
}
.submit_tip:hover{
  cursor: pointer;
}
.primary{
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #3099e8;
}
.warning{
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #DD302D;
}
.time{
  font-size: 20px;
}
</style>