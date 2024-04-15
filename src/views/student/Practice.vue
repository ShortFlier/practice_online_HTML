<template>
  <div>
    <div class="top">
      <div class="sub">
        <label>选择想要练习的科目：</label>
        <SubjectSelect @sltChange="getSubId"></SubjectSelect>
      </div>
      <div class="dif">
        <label>选择难度（可选）：</label>
        <el-rate v-model="allInfo.difficulty" :colors="colors" clearable size="large"/>
      </div>
      <div style="padding-top: 10px">
        <el-radio-group v-model="allInfo.topicType" size="large" :disabled="!allInfo.typeEnable">
          <el-radio-button label="全部题型"  />
          <el-radio-button label="单选题" />
          <el-radio-button label="多选题"  />
          <el-radio-button label="判断题"  />
          <el-radio-button label="填空题"  />
          <el-radio-button label="应用题" />
        </el-radio-group>
        <label style="color: #999999;position: relative;top: 5px;margin-left: 10px">题型选择</label>
      </div>
    </div>
    <div class="content">
      <div class="start">
        <el-button v-if="allInfo.typeEnable" type="primary" v-throttle:1000="getTopic">开始</el-button>
      </div>
      <div class="start">
        <el-button v-if="!allInfo.typeEnable" type="primary" v-throttle:1000="over">结束</el-button>
      </div>
      <div class="topic">
        <TopicNav @getAnswer="getAnswer" :signal="allInfo.signal" :reply="allInfo.reply" :type="allInfo.type" :topicInfo="allInfo.topic"></TopicNav>
      </div>
    </div>
    <div class="bottom" >
      <div v-throttle="submit" v-if="!allInfo.typeEnable&!allInfo.submit" style="text-align: center;">
        <el-tooltip
            class="box-item"
            effect="light"
            content="确认提交"
            placement="bottom"
        >
          <el-button type="success">
            <i class="bi bi-check2-circle"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div class="assess" v-if="allInfo.submit&!allInfo.assess">
        <label style="font-size: 14px;color: #3099e8;position: relative;bottom: 3px">难度怎么样？</label>
        <el-rate  v-model="allInfo.assess" :colors="colors" clearable size="large"/>
      </div>
      <div v-if="allInfo.submit" v-throttle="next" style="float: right;color: white;font-size: 30px;background-color: #3099e8;cursor: pointer;padding-right: 10px;margin-right: 50px">
        <i class="bi bi-dash-lg" style="position: relative;left: 7px"></i>
        <i class="bi bi-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import SubjectSelect from "@/components/SubjectSelect.vue";
import {nextTick, reactive, watch} from "vue";
import {connectPath, getRandomInt, getType, isEmpty} from "@/utils/util";
import axios from "axios";
import {practice_add, topic_practice, topic_update} from "@/utils/api_path";
import {reply_all, reply_test} from "@/utils/constant";
import TopicNav from "@/components/topic/TopicNav.vue";
import {commonTip} from "@/utils/tip";
import store from "@/store";
const colors = ['#99A9BF', '#F7BA2A', '#FF9900']
const allInfo=reactive({
  subjectId:'',
  difficulty:'',
  topicType:"全部题型",
  topic:null,
  type:0,
  typeEnable:true,
  reply:reply_test,
  submit:false,
  assess:'',
  isAssess:false,
  signal:-1000,
  answer:null
})
//获取选择的学科
function getSubId(id){
  allInfo.subjectId=id
}
//向后端获取题目
function getTopic(){
  if(!allInfo.subjectId){
    commonTip('warning','请选择学科',500)
    return
  }
  allInfo.topic=null
  const type=getType(allInfo.topicType)?getType(allInfo.topicType):getRandomInt(1,5);
  allInfo.type=type
  allInfo.typeEnable=false
  const path=connectPath({
    subjectId:allInfo.subjectId,
    difficulty:allInfo.difficulty,
    type:allInfo.type
  })
  axios.get(topic_practice+`?${path}`).then(resolve=>{
    if(resolve){
      allInfo.type=type
      allInfo.topic=resolve.data
      allInfo.assess=resolve.data.difficulty
      allInfo.submit=false
    }else
      allInfo.typeEnable=true
      allInfo.reply=reply_test
  },reject=>{
    allInfo.typeEnable=true
  })
}
//结束
function over(){
  allInfo.topic=null
  allInfo.typeEnable=true
  allInfo.submit=false
  allInfo.reply=reply_test
}
//提交
function submit(){
  ++allInfo.signal
  //显示答案
  allInfo.reply=reply_all
  allInfo.submit=true
}
//用户难度评价,如果没有难度
watch(()=>allInfo.assess,()=>{
  if(allInfo.assess&allInfo.assess!=allInfo.topic.difficulty){
    //更新难度
    axios.put(topic_update,{
      type:allInfo.type,
      id:allInfo.topic.id,
      difficulty:allInfo.assess
    }).then(resolve=>{
      if(resolve)
        commonTip('success','感谢评价!',1000)
    })
  }
})
//将题目发送后端
function save(){
  if(allInfo.answer==0|!isEmpty(allInfo.answer)){
    const info={
      type:allInfo.type,
      topicId:allInfo.topic.id,
      submitId:store.state.id,
      submitAnswer:allInfo.answer,
    }
    console.log(info)
    axios.post(practice_add,info)
  }else {
    allInfo.reply=reply_test
    allInfo.submit=false
    commonTip('warning','请作答!',1000)
  }
}
//获取用户输入答案
function getAnswer(input){
  allInfo.answer=input
  save()
}
//下一题
function next(){
  allInfo.reply=reply_test
  allInfo.topic=null
  getTopic()
}
</script>

<style scoped>
.top{
  padding: 20px 10px;
  border-bottom: #d5d2d2 1px solid;
}
.sub{
  height: 50px;
  float: left;
}
.sub,.dif>label{
  color: #999999;
}
.dif{
  float: left;
  height: 50px;
  margin-left: 200px;
}
.content{
  padding: 10px;
}
.start{
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}
.bottom{
  margin: 20px 0 0 0;
}
.assess{
  margin-left: 30px;
}
</style>