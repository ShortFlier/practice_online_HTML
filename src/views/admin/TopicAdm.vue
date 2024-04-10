<template>
  <div class="statistic">
    <TopicStatic></TopicStatic>
  </div>
  <div class="add">
    <TopicAdd></TopicAdd>
  </div>
  <div class="search">
<!--    <TopicSch></TopicSch>-->
  </div>
</template>

<script setup>
import TopicStatic from "@/components/TopicStatic.vue";
import TopicAdd from "@/components/TopicAdd.vue";
import TopicSch from "@/components/TopicSch.vue";
</script>

<style scoped>
.statistic{
  border-bottom: 2px solid #999999;
}
.add{
  padding: 10px;
}
</style>