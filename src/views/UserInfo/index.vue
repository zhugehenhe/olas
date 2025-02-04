<script setup>
import UserInfo from "./userInfo.vue";
import EditPwd from "./editPwd.vue";
import AskRecordVue from "./askRecord.vue";
import MyPost from "./myPost.vue";
const activeName = ref("User");
</script>
<template>
  <div class="userinfo">
    <el-tabs type="border-card" v-model="activeName" tab-position="left">
      <el-tab-pane label="个人信息" name="User"><UserInfo v-if="activeName === 'User'" /></el-tab-pane>
      <el-tab-pane label="Collect">我的收藏</el-tab-pane>
      <el-tab-pane label="我的帖子" name="MyPost"><MyPost v-if="activeName === 'MyPost'"></MyPost></el-tab-pane>
      <el-tab-pane label="修改密码" name="EditPwd"><EditPwd v-if="activeName === 'EditPwd'" /></el-tab-pane>
      <el-tab-pane label="咨询记录" name="AskRecordVue"><AskRecordVue v-if="activeName === 'AskRecordVue'" /></el-tab-pane>
    </el-tabs>
  </div>
</template>



<style lang="scss" scoped>
.userinfo {
  margin: 0 auto;
  width: 1300px;
}
</style>