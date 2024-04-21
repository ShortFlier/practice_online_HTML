<template>
  <div>
    <div class="qst">
      <label>{{topicInfo.question}}</label>
    </div>
    <div class="slt" >
      <div v-if="topicInfo.optionA" @click="select('a')" ref="a" class="option">
        <label>A</label>
        {{topicInfo.optionA}}</div>
      <div v-if="topicInfo.optionB" @click="select('b')" ref="b" class="option">
        <label>B</label>
        {{topicInfo.optionB}}</div>
      <div v-if="topicInfo.optionC" @click="select('c')" ref="c" class="option">
        <label>C</label>
        {{topicInfo.optionC}}</div>
      <div v-if="topicInfo.optionD" @click="select('d')" ref="d" class="option">
        <label>D</label>
        {{topicInfo.optionD}}</div>
    </div>
    <div class="analyse_display" v-if="topicInfo.analyse!=null&&testType==test_type_all">
      <div>解析</div>
      <div class="analyse">
        {{topicInfo.analyse}}
      </div>
    </div>
  </div>
</template>
<!--外部传入题目信息topicInfo-->
<!--是否开启答题功能reply,true为开启,false显示答案-->
<!--外部获取用户填入答案信号sign，绑定事件getAnswer，传递单个参数的函数用于获取答案-->
<script setup>
import {nextTick, onMounted, reactive, ref, toRaw, watch} from "vue";
import {radioes, test_type_all, test_type_look, test_type_test} from "@/utils/constant";
const props=defineProps({
  topicInfo:Object,
  testType:Number,
  sign:Number,
  theReply:String  //用户已回答答案
})
const emits=defineEmits(['getAnswer'])
//抛出答案
watch(()=>props.sign,()=>{
  emits('getAnswer',toRaw(answerReply))
})
//显示答案功能
const a=ref(null)
const b=ref(null)
const c=ref(null)
const d=ref(null)
const options=reactive({
  a:a,
  b:b,
  c:c,
  d:d
})
//是否显示答案
watch(()=>props.testType,()=>{
  nextTick(() => {
    if (props.testType==test_type_all)
      options[props.topicInfo.answer].classList.add('true')
  });
},{
  immediate:true
})
//答题功能
const answerReply=reactive({
  type:radioes,
  topicId:props.topicInfo.id,
  submitAnswer:''
})
//选择
function select(option){
  if(props.testType!=test_type_test)
    return
  //去除已选择
  if(options[answerReply.submitAnswer]){
    options[answerReply.submitAnswer].classList.remove('selected')
  }
  answerReply.submitAnswer=option
  options[option].classList.add('selected')
}
//显示用户的回答
function view(){
  if(props.testType==test_type_look||props.testType==test_type_all)
    if(options[props.theReply]){
      options[answerReply.submitAnswer].classList.remove('selected')
    }
}
onMounted(()=>{
  view()
})
</script>

<style scoped>
*{
  font-family: 华文宋体;
}
.qst{
  padding: 10px;
  border: #d5d2d2 1px solid;
  color: #0374cb;
  font-size: 24px;
  border-bottom: none;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.option{
  cursor: pointer;
  font-size: 18px;
  border-bottom: #eeeeee 1px solid;
  padding: 5px;
  color: #777777;
  margin: 5px 0;
}
.option>label{
  font-size: 20px;
  color: black;
  margin-right: 10px;
}
.option:hover{
  font-size: 20px;
}
.true{
  background-color: #adeead;
  color: #3099e8;
  font-size: 20px;
  border: 5px solid #adeead;
  border-right: 10px solid #adeead;
}
.selected{
  background-color: #f3e9b8;
  color: #3099e8;
}
.analyse_display{
  margin: 10px 0;
  background-color: #c5c4c4;
  padding: 10px 0 0 5px;
}
.analyse{
  background-color: white;
  font-size: 20px;
  border-bottom: #c5c4c4 1px solid;
  padding: 10px 0;
}
</style>