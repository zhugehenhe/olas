<script setup>
import UserInfo from "./userInfo.vue";
import EditPwd from "./editPwd.vue";
import AskRecordVue from "./askRecord.vue";
import MyPost from "./myPost.vue";
import LawyerUser from "./lawyerUser.vue";
import Record from "./record.vue";
const activeName = ref("User");
const user = JSON.parse(localStorage.getItem("userInfo"));
</script>
<template>
  <div class="userinfo">
    <el-tabs type="border-card" v-model="activeName" tab-position="left">
      <el-tab-pane label="个人信息" name="User"><UserInfo v-if="activeName === 'User'" /></el-tab-pane>
      <el-tab-pane label="律师信息" v-if="user.role === 1" name="LawyerUser"
        ><LawyerUser v-if="activeName === 'LawyerUser' && user.role === 1"
      /></el-tab-pane>
      <el-tab-pane label="我的交流" name="MyPost"><MyPost v-if="activeName === 'MyPost'"></MyPost></el-tab-pane>
      <el-tab-pane label="修改密码" name="EditPwd"><EditPwd v-if="activeName === 'EditPwd'" /></el-tab-pane>
      <el-tab-pane label="我的咨询" name="AskRecordVue"><AskRecordVue v-if="activeName === 'AskRecordVue'" /></el-tab-pane>
      <el-tab-pane label="咨询记录" v-if="user.role === 1" name="Record"><Record v-if="activeName === 'Record' && user.role === 1" /></el-tab-pane>
    </el-tabs>
  </div>
</template>



<style lang="scss" scoped>
.userinfo {
  margin: 0 auto;
  width: 1400px;
}
</style>