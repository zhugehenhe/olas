<script setup>
// import Header from "./header.vue";
// import Title from "./title.vue";
const Header = defineAsyncComponent(() => import("./header.vue"));
const Title = defineAsyncComponent(() => import("./title.vue"));
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: 40px"><Title /></el-header>
      <el-header style="background-color: #fff"><Header /></el-header>
      <el-main><router-view /></el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<style>
.el-header {
  padding: 0;
}
.common-layout {
  top: 0;
  height: 100vh;
  position: fixed;
  width: 100%;
  overflow: auto;
  background-color: #f4f4f4;
}
.el-main {
  min-width: 1600px;
  overflow: hidden;
}
</style>