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
  </div>
</template>

<script setup>
import PaperTitle from "@/components/PaperTitle.vue";
import {onMounted, reactive} from "vue";
import {test_type_look} from "@/utils/constant";
import {useRoute} from "vue-router";
import {isLogin} from "@/utils/util";
import router from "@/router";
import RadTest from "@/components/topic/test/RadTest.vue";
import MulTest from "@/components/topic/test/MulTest.vue";
import JudTest from "@/components/topic/test/JudTest.vue";
import FitbTest from "@/components/topic/test/FitbTest.vue";
import VocTest from "@/components/topic/test/VocTest.vue";
import axios from "axios";
import {stu_test_look} from "@/utils/api_path";
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
  testType:test_type_look,
  id:'',
  sign:1
})

onMounted(()=>{
  if(!isLogin())
    router.push('/login')
  allInfo.id=useRoute().params.id
  axios.get(stu_test_look+allInfo.id).then(resolve=>{
    if(resolve){
      allInfo.paperInfo=resolve.data
      const list=['radioList','mulList', 'judgList', 'fitbList', 'vocList']
      for (let i = 0; i < 5; i++) {
        if (allInfo.paperInfo[list[i]]) {
          allInfo.paperInfo[list[i]].forEach((item, index) => {
            if (item && item.topic) {
              const modifiedItem = {
                ...item.topic, // 将topic对象的值放到外面
                submitAnswer: item.submitAnswer,
                grade: item.grade
              };
              allInfo.paperInfo[list[i]][index] = modifiedItem; // 替换原数组对象
            }
          });
        }
      }
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