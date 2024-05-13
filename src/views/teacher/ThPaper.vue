<template>
  <div style="position: relative">
    <div class="release">
      <el-button type="primary" @click="router.push('/teacher/home/release')">发布试卷</el-button>
      <el-button type="primary" @click="router.push('/teacher/home/myPaper')">我的试卷</el-button>
    </div>
    <div>
      <TestAdm></TestAdm>
    </div>
  </div>
</template>

<script setup>
import TestAdm from "@/views/admin/TestAdm.vue";
import router from "@/router";
</script>

<style scoped>
.release{
  margin: 20px 100px 0px 10px;
}
</style>