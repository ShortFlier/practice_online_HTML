<template>
  <div>
    <div class="back">
      <el-button type="info" @click="router.push('/teacher/home/paper')"
      style="position: relative;left: 30px;top: 10px;">返回</el-button>
    </div>
    <div>
      <div>
        <RandomPaper></RandomPaper>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import RandomPaper from "@/views/teacher/RandomPaper.vue";
</script>

<style scoped>
.back{
  height: 50px;
  border-bottom: #545d64 1px solid;
}
</style>