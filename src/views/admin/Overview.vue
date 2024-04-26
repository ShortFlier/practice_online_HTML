<template>
  <div class="display">
    <div style="float: left;">
      <TopicChart></TopicChart>
    </div>
    <div style="float: right;position: relative;top: 20px">
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
  height: 400px;
}
</style>