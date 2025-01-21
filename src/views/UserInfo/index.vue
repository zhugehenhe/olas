<script setup>
import UserInfo from "./userInfo.vue";
const activeName = ref("User");
</script>
<template>
  <div class="userinfo">
    <el-tabs type="border-card" v-model="activeName" tab-position="left">
      <el-tab-pane label="个人信息" name="User" v-if="activeName === 'User'"><UserInfo /></el-tab-pane>
      <el-tab-pane label="Collect">我的收藏</el-tab-pane>
      <el-tab-pane label="Role">修改密码</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>



<style lang="scss" scoped>
.userinfo {
  margin: 0 auto;
  width: 1000px;
}
</style>