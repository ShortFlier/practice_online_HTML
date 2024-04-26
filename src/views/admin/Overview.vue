<template>
  <div class="display">
    <div style="float: left;padding-top: 20px">
      <TopicChart></TopicChart>
    </div>
    <div style="float: right;">
      <UserChart></UserChart>
    </div>
  </div>
  <div style="width: 520px;margin: 0 auto">
    <SubjectChart></SubjectChart>
  </div>
</template>

<script setup>

import TopicChart from "@/components/TopicChart.vue";
import UserChart from "@/components/UserChart.vue";
import SubjectChart from "@/components/SubjectChart.vue";
</script>

<style scoped>
.display{
  overflow: hidden;
}
.display>div{
  height: 450px;
}
</style>