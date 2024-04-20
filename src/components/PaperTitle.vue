<template>
  <div v-if="paper" class="all">
    <div class="title">
      {{paper.title}}
    </div>
    <div class="description">
      {{paper.description}}
    </div>
    <div class="time">
      考试时间：<label class="label">{{paper.duration}}</label> 分钟
    </div>
    <div class="mask">
      总分：<label class="label">{{paper.totalMarks}}</label>
    </div>
    <div class="dif" v-if="paper.difficulty">
      难度：<el-rate disabled v-model="paper.difficulty" />
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const props=defineProps({
  paper:Object
})
</script>

<style scoped>
.all{
  padding: 20px;
  text-align: center;
}
.title{
  font-size: 40px;
  font-weight: bold;
  padding: 10px;
}
.description{
  font-size: 18px;
  padding: 5px;
  width: 600px;
  margin: 0 auto;
  white-space: pre;
  word-wrap: break-word;
  font-weight: bold;
}
.label{
  font-size: 18px;
  color: #3099e8;
  font-weight: bold;
}
.time{
  padding: 5px;
}
.mask{
  padding: 5px;
}
.dif{
  padding: 5px;
}
</style>