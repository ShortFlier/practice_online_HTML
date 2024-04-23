<template>
  <div style="position: relative">
    <div>
      <TestAdm></TestAdm>
    </div>
    <div class="release">
      <el-button type="primary" @click="router.push('/teacher/home/release')">发布试卷</el-button>
    </div>
  </div>
</template>

<script setup>
import TestAdm from "@/views/admin/TestAdm.vue";
import router from "@/router";
</script>

<style scoped>
.release{
  float: right;
  margin-right: 100px;
  position: absolute;
  top: 40px;
  right: 80px;
}
</style>