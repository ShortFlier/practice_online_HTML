<template>
  <div class="nav">
    <el-radio-group v-model="allInfo.slt">
      <el-radio-button label="待审核" value="待审核" />
      <el-radio-button label="未通过" value="未通过" />
    </el-radio-group>
  </div>
  <div class="like" >
    <input type="search" placeholder="相似学科名查找" @input="getLikeName" v-model.trim="allInfo.like.name" class="add"/>
    <div class="tip">
      <label style="position: relative;right: 68px;font-weight: bold;color: #3099e8">相似学科：</label>
      <div v-for="item in allInfo.like.tipName" :key="item" style="color: #dcc351;font-weight: bold">
        {{item}}
      </div>
    </div>
  </div>
  <div class="table" v-show="allInfo.slt=='待审核'">
    <el-table :data="allInfo.tableData.rows" max-height="500px" border stripe height="100px" style="width: 720px">
      <el-table-column prop="name" label="学科名" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="launcher" label="创建者" width="180"/>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="scope">
          <el-button  type="success" size="small" @click="setAuditState(scope.row.id,1)" >
            通过
          </el-button>
          <el-button  type="danger" size="small" @click="setAuditState(scope.row.id,-1)">
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="table2" v-show="allInfo.slt=='未通过'">
    <el-table :data="allInfo.noData.rows" max-height="500px" border stripe height="100px" style="width: 800px">
      <el-table-column prop="name" label="学科名" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="launcher" label="创建者" width="180"/>
      <el-table-column prop="auditTime" label="审核时间" width="180"/>
      <el-table-column fixed="right" label="操作" width="80">
        <template v-slot="scope">
          <el-button  type="success" size="small" @click="setAuditState(scope.row.id,1)" >
            通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div>
    <Page :total="allInfo.tableData.total" @pageChange="setPageInfo"></Page>
  </div>
</template>

<script setup>
import {onMounted, reactive, watch} from "vue";
import Page from "@/components/Page.vue";
import {connectPath} from "@/utils/util";
import axios from "axios";
import {sub_get_by_audit, sub_update, subject_like_name} from "@/utils/api_path";
import {commonTip} from "@/utils/tip";

const allInfo=reactive({
  slt:'待审核',
  tableData:{
    total:0,
    rows:[]
  },
  pageInfo:{
    page:1,
    pageSize:5
  },
  noData:{
    total:0,
    rows:[]
  },
  like:{
    name:'',
    tipName:''
  }
})
watch(()=>allInfo.slt,()=>{
  sessionStorage.setItem('sub_audit_select',allInfo.slt)
  getSubAuditData()
})
// Page控键
function setPageInfo(info){
  allInfo.pageInfo=info
  //信息查询
  getSubAuditData()
}
// 访问后端数据
function getSubAuditData(){
  console.log('start')
  const path=connectPath(allInfo.pageInfo)
  if(allInfo.slt=='待审核'){
    allInfo.noData.total=0
    allInfo.noData.rows=[]
    axios.get(sub_get_by_audit+'?auditState=0&'+path).then((resolve)=>{
      if(resolve){
        allInfo.tableData.total=resolve.data.total
        allInfo.tableData.rows=resolve.data.rows
      }
    })
  }else if(allInfo.slt=='未通过'){
    allInfo.tableData.total=0
    allInfo.tableData.rows=[]
    axios.get(sub_get_by_audit+'?auditState=-1&'+path).then((resolve)=>{
      if(resolve){
        console.log(resolve.data)
        allInfo.noData.total=resolve.data.total
        allInfo.noData.rows=resolve.data.rows
      }
    })
  }else
    console.log('none')
}
// 设置是否通过
function setAuditState(id,state){
  axios.post(sub_update,{
    id:id,
    auditState:state
  }).then((resolve)=>{
    if (resolve){
      commonTip('success',resolve.msg,500)
      getSubAuditData()
    }
  })
}
// 相似学科操作
function getLikeName(){
  if(allInfo.like.name){
    axios.get(subject_like_name+allInfo.like.name).then(resolve=>{
      if(resolve)
        allInfo.like.tipName=resolve.data
    })
  }else {
    allInfo.like.tipName=[]
  }
}
onMounted(()=>{
  if(sessionStorage.getItem('sub_audit_select'))
    allInfo.slt=sessionStorage.getItem('sub_audit_select')
})
</script>

<style scoped>
.like{
  display: inline-block;
  position: relative;
  left: 300px;
  bottom: 30px;
}
.like input{
  height: 35px;
  font-size: 20px;
}
.tip{
  display: none;
}
.add:focus + .tip {
  display: block;
}
input::placeholder {
  font-size: 12px; /* 设置提示文字的字体大小为12px */
}
</style>