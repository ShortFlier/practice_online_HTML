<template>
  <div>
    <div class="qst">
      <label>{{topicInfo.question}}</label>
    </div>
    <div class="answer_display" v-if="props.reply!=reply_test">
      <div>答案</div>
      <div v-for="(item,index) in answerList" :key="item" class="answer">
        <label>问题{{index+1}}</label>
        {{ item }}
      </div>
    </div>
    <div class="analyse_display" v-if="topicInfo.analyse!=null&&reply!=reply_test">
      <div>解析</div>
      <div class="analyse">
        {{topicInfo.analyse}}
      </div>
    </div>
    <div class="replyCon" v-if="props.reply!=reply_look">
      <div>你的回答</div>
      <div class="input" v-for="(item, index) in answerNumber" :key="uuidv4">
        <div class="lbl">问题{{ index + 1 }}</div>
        <div>
          <el-input
              v-model.trim="myAnswer[index]"
              style="width: 90%;font-size:20px;font-family: 微软雅黑"
              :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea"
              size="large"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<!--外部传入题目信息topicInfo-->
<!--是否开启答题功能reply,true为开启,false显示答案-->
<!--外部获取用户填入答案信号sign，绑定事件getAnswer，传递单个参数的函数用于获取答案-->
<script setup>
import {answer_apart, reply_look, reply_test} from "@/utils/constant";
import { v4 as uuidv4 } from 'uuid';
import {computed, reactive, toRaw, watch} from "vue";
import {connectAnswer} from "@/utils/util";

const props=defineProps({
  topicInfo:Object,
  reply:Number,
  sign:Number
})
const emits=defineEmits(['getAnswer'])
//抛出答案
watch(()=>props.sign,()=>{
  const answer=connectAnswer(toRaw(myAnswer),answerNumber.value.length)
  emits('getAnswer',answer)
})
//正确答案
const answerList=computed(()=>{
  return props.topicInfo.answer.split(answer_apart)
})
//回答
const answerNumber=computed(()=>{
  return Array.from({ length: answerList.value.length }, () =>'')
})
const myAnswer=reactive([])
</script>

<style scoped>
*{
  font-family: 华文宋体;
}
.qst{
  white-space: pre;
  padding: 10px;
  border: #d5d2d2 1px solid;
  color: #0374cb;
  font-size: 24px;
  border-bottom: none;
}
.answer_display{
  margin: 10px 0;
  padding: 10px 0 0 5px;
  background-color: #adeead;
}
.answer{
  background-color: white;
  font-size: 20px;
  border-bottom: #c5c4c4 1px solid;
  padding: 10px 0;
}
.answer>label{
  font-weight: bolder;
  color: #a4bee0;
  font-size: 18px;
  margin-right: 15px;
}
.replyCon{
  margin: 10px 0;
  background-color: #f3e9b8;
  padding: 10px 0 0 5px;
}
.input{
  padding: 10px 0 5px 0;
  background-color: white;
  border-bottom: #c5c4c4 1px solid;
}
.input>.lbl{
  font-weight: bolder;
  color: #a4bee0;
  float: left;
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