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
      <div v-if="topicInfo.optionE" @click="select('e')" ref="e" class="option">
        <label>E</label>
        {{topicInfo.optionE}}</div>
      <div v-if="topicInfo.optionF" @click="select('f')" ref="f" class="option">
        <label>F</label>
        {{topicInfo.optionF}}</div>
    </div>
  </div>
</template>
<!--外部传入题目信息topicInfo-->
<!--是否开启答题功能reply,true为开启,false显示答案-->
<script setup>
import {nextTick, reactive, ref, watch} from "vue";
import {reply_test} from "@/utils/constant";
const props=defineProps({
  topicInfo:Object,
  reply:Number
})
//显示答案功能
const a=ref(null)
const b=ref(null)
const c=ref(null)
const d=ref(null)
const e=ref(null)
const f=ref(null)
const options=reactive({
  a:a,
  b:b,
  c:c,
  d:d,
  e:e,
  f:f
})
//是否显示答案
watch(()=>props.reply,()=>{
  nextTick(() => {
    if (props.reply!=reply_test) {
      const answerList=props.topicInfo.answer.split('')
      answerList.forEach(item=>{
        options[item].classList.add('true')
      })
    }
  });
},{
  immediate:true
})
//答题功能
const slt=ref('')
let slts=''
//选择
function select(option){
  if(props.reply!=reply_test)
    return
  //取消选择
  if(slts.includes(option)){
    slts=slts.replace(option,'')
    slt.value=''
    options[option].classList.remove('selected')
  }else {
    slts=slts+option
    slt.value=option
    options[option].classList.add('selected')
  }
}
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
}
.selected{
  background-color: #dcc351;
  color: #3099e8;
}
</style>