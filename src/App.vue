<template>
  <router-link to='/login'></router-link>
  <router-view/>
</template>
<script setup>
import {onMounted} from "vue";
import store from "@/store";

onMounted(()=>{
  if(localStorage.getItem('account')&&localStorage.getItem('token')){
    store.state.account=localStorage.getItem('account')
    store.state.token=localStorage.getItem('token')
  }
})
</script>
<style>

</style>
