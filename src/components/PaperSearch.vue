<template>
  <div style="overflow: hidden;border-bottom: #999999 1px solid">
    <div style="float: left;padding-top: 20px;font-size: 18px;color: #3099e8;margin-left: 60px">
      <label>学科选择：</label>
      <SubjectSelect @sltChange="setSub"></SubjectSelect>
    </div>
    <div style="float: left;padding-top: 20px;font-size: 18px;color: #3099e8;margin-left: 160px">
      <label>难度选择：</label>
      <el-rate v-model="allInfo.difficulty" :colors="colors" clearable size="large"/>
    </div>
    <div v-if="store.state.identity==identity_admin" style="float: left;color: #3099e8;font-size: 18px;cursor: pointer;position: relative;top:30px;left:50px">
      <input type="radio" id="male" name="gender" :value="display_true" v-model="allInfo.display">
      <label for="male">公开</label>
      <input type="radio" id="female" name="gender" :value="display_false" v-model="allInfo.display">
      <label for="female">私有</label>
    </div>
    <div style="float: left;width: 800px;height: 40px;line-height: 40px;padding: 10px">
      <input v-model.trim="allInfo.title" type="search" placeholder="试卷查找" style="width: 300px;height: 30px;font-size: 24px;margin-left: 50px">
      <el-button type="primary" circle style="position:relative;bottom: 3px;left: 70px" @click="popInfo">
        <i class="bi bi-search"></i>
      </el-button>
    </div>
  </div>
</template>

<!--外部绑定事件@getInfo,函数接受参数获取信息-->

<script setup>
import {reactive, toRaw} from "vue";
import SubjectSelect from "@/components/SubjectSelect.vue";
import {display_false, display_true, identity_admin} from "@/utils/constant";
import store from "@/store";

const emits=defineEmits(['getInfo'])

const colors = ['#99A9BF', '#F7BA2A', '#FF9900']

const allInfo=reactive({
    subjectId:'',
    difficulty:'',
    title:'',
    display:display_true
})
function setSub(id){
  allInfo.subjectId=id
}
function popInfo(){
  emits('getInfo',toRaw(allInfo))
}
</script>
<style scoped>
input::placeholder{
  font-size: 16px;
}
</style>