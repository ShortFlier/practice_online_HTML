<template>
  <div class="out">
    <div class="title">
      <el-tooltip
          class="box-item"
          effect="light"
          content="点击刷新"
          placement="right">
        <label>题库数量统计</label>
      </el-tooltip>
    </div>
    <div class="total">
      <div style="color: gray">总题数</div>
      <div style="color: #3099e8">{{ allInfo.total }}</div>
    </div>
    <div class="tb">
      <el-table :data="allInfo.data" border style="width: 600px">
        <el-table-column prop="date" label="单选题" width="120" />
        <el-table-column prop="name" label="多选题" width="120" />
        <el-table-column prop="address" label="判断题" width="120"/>
        <el-table-column prop="address" label="填空题" width="120"/>
        <el-table-column prop="address" label="应用题" width="120"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const allInfo=reactive({
  total:0,
  data:[{
    date:100000000
  }]
})
</script>

<style scoped>
.out{
  overflow: hidden;
}
.title{
  float: left;
  width: 200px;
  font-size: 30px;
  font-family: 华文琥珀;
  color: #3099e8;
  text-align: center;
  position: relative;
  top: 25px;
}
.title>label{
  cursor: pointer;
}
.total{
  float: left;
  position: relative;
  top: 20px;
  left: 100px;
}
.total div{
  width: 100%;
  text-align: center;
}
.tb{
  float: right;
}
</style>