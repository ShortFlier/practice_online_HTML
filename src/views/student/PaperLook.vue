<template>
  <div>
    <div>
      <PaperTitle :paper="allInfo.paperInfo.paper"></PaperTitle>
    </div>
    <div class="topic">
      <div class="rdo" v-if="allInfo.paperInfo.radioMarks">
        <div>
          单选题部分（
          <label class="mask">{{allInfo.paperInfo.radioMarks}}</label>
          分）
        </div>
        <div class="qst">
          <RadioPct :reply="allInfo.reply"
                    v-for="item in allInfo.paperInfo.radioList"
                    :key="item.id" :topicInfo="item"
          ></RadioPct>
        </div>
      </div>
      <div class="mul" v-if="allInfo.paperInfo.mulMarks">
        <div>
          多选题部分（
          <label class="mask">{{allInfo.paperInfo.mulMarks}}</label>
          分）
        </div>
        <div class="qst">
          <MulChoicePct :reply="allInfo.reply"
                        v-for="item in allInfo.paperInfo.mulList"
                        :key="item.id" :topicInfo="item"></MulChoicePct>
        </div>
      </div>
      <div class="judg" v-if="allInfo.paperInfo.judgMarks">
        <div>
          判断题部分（
          <label class="mask">{{ allInfo.paperInfo.judgMarks }}</label>
          分）
        </div>
        <div class="qst">
          <JudgPct :reply="allInfo.reply"
                   v-for="item in allInfo.paperInfo.judgList"
                   :key="item.id" :topicInfo="item"></JudgPct>
        </div>
      </div>
      <div class="fitb" v-if="allInfo.paperInfo.fitbMarks">
        <div>
          填空题部分（
          <label class="mask">{{allInfo.paperInfo.fitbMarks}}</label>
          分）
        </div>
        <div class="qst">
          <div class="dp" v-for="item in allInfo.paperInfo.fitbList"
              :key="item.id" >
            <FitbPct :reply="allInfo.reply" :topicInfo="item"></FitbPct>
          </div>
        </div>
      </div>
      <div class="voc" v-if="allInfo.paperInfo.vocMarks">
        <div>
          应用题部分（
          <label class="mask">{{allInfo.paperInfo.vocMarks}}</label>
          分）
        </div>
        <div class="qst">
          <div class="dp" v-for="item in allInfo.paperInfo.vocList"
               :key="item.id">
            <VocaPct :reply="allInfo.reply"
                      :topicInfo="item"></VocaPct>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {stu_paper_look} from "@/utils/api_path";
import router from "@/router";
import {isLogin} from "@/utils/util";
import {commonTip} from "@/utils/tip";
import PaperTitle from "@/components/PaperTitle.vue";
import RadioPct from "@/components/topic/normal/RadioPct.vue";
import MulChoicePct from "@/components/topic/normal/MulChoicePct.vue";
import JudgPct from "@/components/topic/normal/JudgPct.vue";
import FitbPct from "@/components/topic/normal/FitbPct.vue";
import VocaPct from "@/components/topic/normal/VocaPct.vue";
import {reply_look} from "@/utils/constant";

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
  reply:reply_look
})

onMounted(()=>{
  // if(!isLogin())
  //   router.push('/login')
  const id=useRoute().params.id
  axios.get(stu_paper_look+id).then(resolve=>{
    if (resolve){
      allInfo.paperInfo=resolve.data
    }else {
      commonTip('error','没有找到试卷信息!',2000)
      router.back()
    }
  })
})
</script>

<style scoped>
.rdo,.mul,.judg,.fitb,.voc{
  font-weight: bold;
  font-size: 24px;
}
.mask{
  font-size: 28px;
  font-weight: bolder;
  color: #3099e8;
}
.topic{
  margin-left: 100px;
  padding: 10px;
}
.dp{
  padding: 10px 0;
  border-bottom: 2px black solid;
}
</style>