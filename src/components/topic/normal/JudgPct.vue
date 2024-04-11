<template>
  <div>
    <div class="qst">
      <label>{{topicInfo.question}}</label>
    </div>
    <div class="slt" >
      <div class="option" ref="t" @click="select(1)">
        <label>正确</label>
      </div>
      <div class="option" ref="f"  @click="select(0)">
        <label>错误</label>
      </div>
    </div>
  </div>
</template>
<!--外部传入题目信息topicInfo-->
<!--是否开启答题功能reply,true为开启,false显示答案-->
<script setup>
import {nextTick,ref, watch} from "vue";
import {reply_test} from "@/utils/constant";
const props=defineProps({
  topicInfo:Object,
  reply:Number
})
//显示答案功能
const t=ref(null)
const f=ref(null)
//是否显示答案
watch(()=>props.reply,()=>{
  nextTick(() => {
    if (props.reply!=reply_test) {
      if(props.topicInfo.answer==1)
        t.value.classList.add('true')
      else
        f.value.classList.add('true')
    }
  });
},{
  immediate:true
})
//答题功能
let slt
//选择
function select(option){
  if(props.reply!=reply_test)
    return
  //去除已选择
  slt=option
  if(option){ //选择"正确"
    t.value.classList.add('selected')
    f.value.classList.remove('selected')
  }else {
    f.value.classList.add('selected')
    t.value.classList.remove('selected')
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
.slt{
  overflow: hidden;
}
.option{
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  border-bottom: #eeeeee 1px solid;
  padding: 5px;
  color: #777777;
  margin: 5px 0;
  width: 50%;
  box-sizing: border-box;
  float: left;
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