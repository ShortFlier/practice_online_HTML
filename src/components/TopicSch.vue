<template>
  <div>
    <div>
      <el-radio-group v-model="allInfo.slt" size="large">
        <el-radio-button label="全部题型"  />
        <el-radio-button label="单选题" />
        <el-radio-button label="多选题"  />
        <el-radio-button label="判断题"  />
        <el-radio-button label="填空题"  />
        <el-radio-button label="应用题" />
      </el-radio-group>
    </div>
    <div class="sch">
      <input type="search" placeholder="输入题目模糊匹配">
      <select v-model="allInfo.userSlt" style="height: 30px;font-size: 16px;" class="r">
        <option value="3">管理员</option>
        <option value="2">教师</option>
      </select>
      <input type="search" placeholder="输入账号查询" class="r">
      <el-button type="primary" circle style="position: relative; left: 160px;height: 35px;bottom: 2px"  >
        <i class="bi bi-search" style="font-size: 18px"></i>
      </el-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const allInfo = reactive({
  slt: '全部题型',
  userSlt:'3',
});
</script>

<style scoped>
.sch{
  padding:10px;
  margin-top: 10px;
}
.sch>input{
  height: 35px;
  font-size: 20px;
}
input::placeholder {
  font-size: 12px; /* 设置提示文字的字体大小为12px */
}
.r{
  position: relative;
  left: 130px;
}
</style>
