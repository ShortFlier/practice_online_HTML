<template>
  <teleport to="body">
    <div class="mask" v-show="isShow">
      <div class="content">
        <el-button type="danger" circle class="quit" @click="close">
          <i class="bi bi-x-lg" ></i>
        </el-button>

        <!--        插槽，用于显示详细信息-->
        <slot></slot>

      </div>
    </div>
  </teleport>
</template>

<!--说明-->
<!--使用需要外部传递一个Boolean类型参数isShow，初值为false-->
<!--一个外部绑定的事件close修改isShow为false,无参-->
<!--传递一个组件用显示详细信息-->

<script setup>


const emit=defineEmits(['close'])

const props=defineProps({
  isShow:Boolean
})

function close(){
  emit('close')
}
</script>

<style scoped>
.mask{
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(213, 210, 210, 0.3);
  z-index: 99999999999;
}
.content{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: auto;
  height: auto;
  border: 1px solid black;
  background-color: #fff;
  padding: 15px;
}
.quit{
  float: right;
  position: relative;
  left: 25px;
  bottom: 25px;
}
</style>