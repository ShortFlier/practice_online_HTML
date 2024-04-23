<template>
  <div>
    <div style="color: #DD302D;text-align: center">给题目选定一个合适的学科以完成审核</div>
    <div style="padding: 10px">
      <el-radio-group v-model="allInfo.slt" size="large">
        <el-radio-button label="单选题" />
        <el-radio-button label="多选题"  />
        <el-radio-button label="判断题"  />
        <el-radio-button label="填空题"  />
        <el-radio-button label="应用题" />
      </el-radio-group>
    </div>
    <div>
      <div class="topic" v-for="(item,index) in allInfo.topic" :key="index+'#'+item.type+item.id">
        <div class="question">
          {{item.question}}
        </div>
        <div class="operate">
          <select class="selectInput" style="padding: 5px;width: 100px;height: 30px;font-size: 18px;cursor: pointer" @change="update($event,index)">
            <option></option>
            <option v-for="item in allInfo.subject" :key="item.id" :value="item.id" >{{item.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div style="padding: 10px">
      <Page :total="allInfo.total" @pageChange="setPageInfo"></Page>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, watch} from "vue";
import Page from "@/components/Page.vue";
import {sub_list, topic_audit, topic_update} from "@/utils/api_path";
import axios from "axios";
import {connectPath, getType} from "@/utils/util";
import {commonTip} from "@/utils/tip";

const allInfo=reactive({
  slt:"单选题",
  total:0,
  pageInfo:{
    page:1,
    pageSize:5
  },
  subject:[],
  topic:[]
})
watch(()=>allInfo.slt,()=>{
  getSubList();
  getTopic();
})
function setPageInfo(info){
  allInfo.pageInfo=info
  getSubList();
  getTopic();
}
function getSubList(){
  axios.get(sub_list).then(resolve=>{
    if(resolve){
      allInfo.subject=resolve.data
    }
  })
}
function update(event,index){
  if(!event.target.value)
    return
  const info={
    type:null,
    id:null,
    subjectId:null,
    auditState:1
  }
  info.type=allInfo.topic[index].type
  info.id=allInfo.topic[index].id
  info.subjectId=event.target.value
  console.log(info)
  axios.put(topic_update,info).then(resolve=>{
    if(resolve){
      commonTip('success',resolve.msg,500)
      allInfo.topic.splice(index,1)
      if(allInfo.topic.length==0){
        getSubList();
        getTopic();
      }
    }
  })
}
function getTopic(){
  axios.get(topic_audit+'?type='+getType(allInfo.slt)+'&'+connectPath(allInfo.pageInfo)).then(resolve=>{
    if (resolve){
      allInfo.topic=resolve.data.rows
      allInfo.total=resolve.data.total
      console.log(resolve)
    }
  })
}
onMounted(()=>{
  getSubList();
  getTopic();
})
</script>

<style scoped>
.topic{
  border-bottom: 1px solid #999999;
  height: 50px;
}
.question{
  width: 1000px;
  height: 50px;
  overflow: auto;
  float: left;
}
.operate{
  float: right;
  height: 50px;
  line-height: 50px;
  width: 165px;
  text-align: center;
}
.selectInput>option{
  padding: 5px;
  font-size: 30px;
}
</style>