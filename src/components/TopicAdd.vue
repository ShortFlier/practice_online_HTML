<template>
  <div class="btn">
    <div>
      <el-tooltip
          class="box-item"
          effect="dark"
          content="通过excel导入题目"
          placement="bottom">
        <el-button type="success" circle @click="allInfo.show=true">
          <i class="bi bi-folder-plus" ></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
  <Mask :isShow="allInfo.show" @close="close">
    <TopicSubmit></TopicSubmit>
  </Mask>
</template>

<script setup>
import {reactive} from "vue";
import Mask from "@/components/Mask.vue";
import TopicSubmit from "@/components/TopicSubmit.vue";

const allInfo=reactive({
  show:false
})
function close(){
  allInfo.show=false
}
</script>

<style scoped>
.btn{
  text-align: center;
}
i{
  font-size: 16px;
}
</style>