<script setup>
const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    style="width: 1180px; margin: 0 auto"
    @select="handleSelect"
    router
  >
    <el-menu-item index="1" route="/home">
      <el-icon size="150"><House /></el-icon>
    </el-menu-item>
    <el-menu-item index="1" route="/home">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>法律咨询</template>
      <el-menu-item index="2-1">法律咨询</el-menu-item>
      <el-menu-item index="2-2">快速问律师</el-menu-item>
      <el-menu-item index="2-3">法律问答</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3"> 找律师 </el-menu-item>
    <el-menu-item index="4"> 合同范本下载 </el-menu-item>
  </el-menu>
</template>


<style lang="scss">
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>