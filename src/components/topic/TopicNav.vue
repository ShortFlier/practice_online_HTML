<template>
  <div class="display">
    <RadioPct ref="r" v-if="props.type==radioes&topic!=null"
              :reply="rreply" :topicInfo="topic"
              :sign="allInfo.sign1" @getAnswer="getAnswer"
    ></RadioPct>
    <MulChoicePct v-if="props.type==multiple_choices&topic!=null"
                  :reply="rreply" :topicInfo="topic"
                  :sign="allInfo.sign2" @getAnswer="getAnswer"
    ></MulChoicePct>
    <JudgPct v-if="props.type==judgment&topic!=null"
             :reply="rreply" :topicInfo="topic"
             :sign="allInfo.sign3" @getAnswer="getAnswer"
    ></JudgPct>
    <FitbPct v-if="props.type==fill_in_the_blank&topic!=null"
             :reply="rreply" :topicInfo="topic"
             :sign="allInfo.sign4" @getAnswer="getAnswer"
    ></FitbPct>
    <VocaPct v-if="props.type==vocabulary_qst&topic!=null"
             :reply="rreply" :topicInfo="topic"
             :sign="allInfo.sign5" @getAnswer="getAnswer"
    ></VocaPct>
  </div>
</template>
<!--外部传入type,确定题目类型-->
<!--外部传入题目信息topicInfo-->
<!--是否开启答题功能reply,true为开启,false显示答案-->
<script setup>
import RadioPct from "@/components/topic/normal/RadioPct.vue";
import MulChoicePct from "@/components/topic/normal/MulChoicePct.vue";
import JudgPct from "@/components/topic/normal/JudgPct.vue";
import FitbPct from "@/components/topic/normal/FitbPct.vue";
import VocaPct from "@/components/topic/normal/VocaPct.vue";
import {fill_in_the_blank, judgment, multiple_choices, radioes, vocabulary_qst} from "@/utils/constant";
import {computed, nextTick, reactive, ref, toRaw, watch} from "vue";

const props=defineProps({
  type:Number,
  reply:Number,
  topicInfo:Object,
  signal:Number,
})
const emits=defineEmits(['getAnswer'])
const allInfo=reactive({
  answer:null,
  sign1:-1000,
  sign2:-1000,
  sign3:-1000,
  sign4:-1000,
  sign5:-1000
})
watch(()=>props.signal,()=>{
    if(props.type==radioes){
      ++allInfo.sign1
    }else if(props.type==multiple_choices){
      ++allInfo.sign2
    }else if(props.type==judgment){
      ++allInfo.sign3
    }else if(props.type==fill_in_the_blank){
      ++allInfo.sign4
    }else if(props.type==vocabulary_qst){
      ++allInfo.sign5
    }else
      console.log('none')
})
//获取答案
function getAnswer(value){
  allInfo.answer=value
  console.log('answer:')
  console.log(allInfo.answer)
  emits('getAnswer',allInfo.answer)
}
const topic=computed(()=>{
  return toRaw(props.topicInfo)
})
const rreply=computed(()=>{
  return toRaw(props.reply)
})
</script>

<style scoped>

</style>