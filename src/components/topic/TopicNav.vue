<template>
  <div class="display">
    <RadioPct v-if="props.type==radioes&topic!=null"
              :reply="rreply" :topicInfo="topic"
    ></RadioPct>
    <MulChoicePct v-if="props.type==multiple_choices&topic!=null"
                  :reply="rreply" :topicInfo="topic"
    ></MulChoicePct>
    <JudgPct v-if="props.type==judgment&topic!=null"
             :reply="rreply" :topicInfo="topic"
    ></JudgPct>
    <FitbPct v-if="props.type==fill_in_the_blank&topic!=null"
             :reply="rreply" :topicInfo="topic"
    ></FitbPct>
    <VocaPct v-if="props.type==vocabulary_qst&topic!=null"
             :reply="rreply" :topicInfo="topic"
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
import {computed, reactive, toRaw} from "vue";

const props=defineProps({
  type:Number,
  reply:Number,
  topicInfo:Object
})

const topic=computed(()=>{
  return toRaw(props.topicInfo)
})
const rreply=computed(()=>{
  return toRaw(props.reply)
})
</script>

<style scoped>

</style>