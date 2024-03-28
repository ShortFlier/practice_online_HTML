<template>
  <div class="top">
    <div style="float:left;">
      <div style="margin:10px">当前查看:</div>
      <div style="margin:10px;padding-top:10px ">
        <el-radio-group v-model="allInfo.slt" size="large">
          <el-radio-button label="教师" value="教师" />
          <el-radio-button label="学生" value="学生" />
        </el-radio-group>
      </div>
    </div>
    <div style="float: right;padding: 20px">
      <div>
        <label>人员统计：教师 | 学生</label>
      </div>
      <div style="float: right;padding: 10px;font-size: 20px">
        <label style="color: #3099e8;padding-right: 5px">
          {{allInfo.thTotal}}
        </label>
        <label style="font-size: 22px;font-weight: bolder">|</label>
        <label  style="color: #3099e8;padding-left: 5px">
          {{allInfo.stuTotal}}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const allInfo=reactive({
  slt:'教师',
  thTotal:0,
  stuTotal:0,
})
</script>

<style scoped>
.top{
  width: 100%;
  height: 100px;
  border-bottom: #666666 1px solid;
}
</style>