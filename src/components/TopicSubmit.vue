<template>
  <div>
    <div>
      <SubjectLook></SubjectLook>
    </div>
    <div class="nav">
      <div :class="allInfo.slt==0?'lab active':'lab'" @click="allInfo.slt=0;allInfo.tip=excelTip.rds">单选题</div>
      <div :class="allInfo.slt==1?'lab active':'lab'" @click="allInfo.slt=1;allInfo.tip=excelTip.mlc">多选题</div>
      <div :class="allInfo.slt==2?'lab active':'lab'" @click="allInfo.slt=2;allInfo.tip=excelTip.jdg">判断题</div>
      <div :class="allInfo.slt==3?'lab active':'lab'" @click="allInfo.slt=3;allInfo.tip=excelTip.fitb">填空题</div>
      <div :class="allInfo.slt==4?'lab active':'lab'" @click="allInfo.slt=4;allInfo.tip=excelTip.vca">应用题</div>
    </div>
    <div class="tip">
      <div style="text-align: center;font-size: 24px">
        <label style="color: #3099e8">{{tip[allInfo.slt]}}</label>excel格式
      </div>
      <div style="align-content: center;display: flex;color: #666666;border-left:green 2px solid">
        <div v-for="(value,key) in allInfo.tip" :key="Date.now()" style="width:80px;border-top: green 2px solid;border-bottom:green 2px solid;border-right:green 2px solid  ">
          <div style="border-bottom: green 1px solid;border-left:green 1px solid;text-align: center">{{excelTip.turn[key]}}</div>
          <div style="color:black;height:100px;border-bottom: green 1px solid;border-left:green 1px solid ">{{value}}</div>
        </div>
      </div>
      <div class="warn">
        请按照正确格式上传excel文档，否则将无法正确上传题目<br>
        excel务必包含上列表头，以确保题目正确上传
      </div>
    </div>
    <div class="upload">
      <input type="file" ref="file_input" @change="upload($event)" style="position: absolute;top:-99999999999px;">
      <div style="width: 100%;align-content: center;vertical-align: middle;text-align: center">
        <div style="border: #DD302D 1px solid" @click="submit">
          <i class="bi bi-plus-lg" style="color: #DD302D;font-size: 60px"></i>
        </div>
      </div>
    </div>
    <div>
      <div style="text-align: center;color: #dcc351;font-size: 20px;padding-bottom: 10px">信息显示</div>
      <div style="height: auto;padding: 10px;border: #999999 1px solid;color: #3099e8">
        {{ allInfo.msg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import {upload_topic_excel} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";
import SubjectLook from "@/components/SubjectLook.vue";
const tip=['单选题','多选题','判断题','填空题','应用题']
const excelTip={
  turn:{
    qst:'题干',
    aws:'答案',
    als:'解析',
    dfc:'难度',
    a:'选项A',
    b:'选项B',
    c:'选项C',
    d:'选项D',
    e:'选项E',
    f:'选项F',
    subId:'学科Id'
  },
  rds:{
    qst:'必填',
    aws:'必填,小写的a,b,c,d,如b',
    als:'非必填',
    dfc:'数字1-5表示',
    a:'',
    b:'',
    c:'',
    d:'单选最多提供4个选项',
    subId:"所属学科Id，请正确填写"
  },
  mlc:{
    qst:'必填',
    aws:'必填,小写的a,b,c,d,如acd',
    als:'非必填',
    dfc:'数字1-5表示',
    a:'',
    b:'',
    c:'',
    d:'',
    e:'',
    f:'多选最多提供6个选项',
    subId:"所属学科Id，请正确填写"
  },
  jdg:{
    qst:'必填',
    aws:'必填,0错，1对',
    als:'非必填',
    dfc:'数字1-5表示',
    subId:"所属学科Id，请正确填写"
  },
  fitb:{
    qst:'必填',
    aws:'必填,每个答案以#answer#结尾',
    als:'非必填',
    dfc:'数字1-5表示',
    subId:"所属学科Id，请正确填写"
  },
  vca:{
    qst:'必填',
    aws:'必填,每个答案以#answer#结尾',
    als:'非必填',
    dfc:'数字1-5表示',
    subId:"所属学科Id，请正确填写"
  }
}
const allInfo=reactive({
  slt:0,
  tip:excelTip.rds,
  msg:'等待消息'
})
// 上传文件
//获取input框
const file_input=ref(null)
function submit(){
  if(file_input.value)
    file_input.value.value=''
  file_input.value.click()
}
function upload(event){
  const file=event.target.files[0]
  console.log(file)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', allInfo.slt+1);
  allInfo.msg='等待消息'
// 发送文件
  axios.post(upload_topic_excel,formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(resolve=>{
    if(resolve){
      commonTip('massage',resolve.msg,5000)
      allInfo.msg=resolve.msg
    }
  })
}
</script>

<style scoped>
.nav{
  width: 800px;
  display: flex;
}
.lab{
  width: 200px;
  text-align: center;
  padding-bottom: 10px;
  color: #666666;
  font-size: 20px;
  cursor: pointer;
}
.active{
  color: #3099e8;
  border-bottom: #3099e8 2px solid;
}
.tip{
  padding: 5px 0;
}
.warn{
  color: darkred;
  text-align: center;
  padding-top: 5px;
}
.upload{
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
}
</style>