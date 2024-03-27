<template>
  <div>
    <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";

// <!--复用组件Page，用于分页选择-->
// <!--需要外部传递一个Number型参数total，显示总结果数；-->
// <!--外部绑定一个事件pageChange，用于更新pageSize和page-->

const props=defineProps({
  total:Number
})

const emits=defineEmits(['pageChange'])

const pageInfo=reactive({
  currentPage:1,
  pageSize:5
})

function getPageInfo(){
  emits('pageChange',{
    page:pageInfo.currentPage,
    pageSize:pageInfo.pageSize
  })
}

const handleSizeChange = () => {
  getPageInfo()
}
const handleCurrentChange = () => {
  getPageInfo()
}
onMounted(()=>{
  getPageInfo()
})
</script>

<style scoped>

</style>