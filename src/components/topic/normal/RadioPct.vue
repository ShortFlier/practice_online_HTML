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
    <div class="analyse_display" v-if="reply!=reply_test">
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
import {nextTick, reactive, ref, watch} from "vue";
import {reply_test} from "@/utils/constant";
const props=defineProps({
  topicInfo:Object,
  reply:Number,
  sign:Number
})
const emits=defineEmits(['getAnswer'])
//抛出答案
watch(()=>props.sign,()=>{
  emits('getAnswer',slt.value)
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
watch(()=>props.reply,()=>{
  nextTick(() => {
    if (props.reply!=reply_test) {
      options[props.topicInfo.answer].classList.add('true')
    }else {
      options[props.topicInfo.answer].classList.remove('true')
    }
  });
},{
  immediate:true
})
watch(()=>props.topicInfo,()=>{
  console.log('info: '+props.topicInfo)
},{
  immediate:true
})
//答题功能
const slt=ref('')
//选择
function select(option){
  if(props.reply!=reply_test)
    return
  //去除已选择
  if(options[slt.value]){
    options[slt.value].classList.remove('selected')
  }
  slt.value=option
  options[option].classList.add('selected')
}
</script>

<style scoped>
*{
  font-family: 华文宋体;
}
.qst{
  white-space: pre-line;
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