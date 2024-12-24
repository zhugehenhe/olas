<script setup>
import { getUserInfo } from "../api";
import Header from "./header.vue";

onMounted(() => {
  getUserInfo().then((res) => {
    console.log(res);
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  });
});
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header /></el-header>
      <el-main><router-view /></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>



<style>
</style>