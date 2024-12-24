<script setup>
import CodeLogin from "./CodeLogin.vue";
import PasswordLogin from "./PasswordLogin.vue";
const activeName = ref("first");
</script>
<template>
  <div class="login-container">
    <el-tabs style="" v-model="activeName" class="demo-tabs">
      <el-tab-pane label="验证码登录" name="first"
        ><CodeLogin v-if="activeName === 'first'"
      /></el-tab-pane>
      <el-tab-pane label="密码登录" name="second"
        ><PasswordLogin v-if="activeName === 'second'"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>


<style lang="scss">
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(#fff1eb, #ace0f9 100%);
  .el-tabs {
    background-color: #fff;
    width: 500px;
    margin: 150px auto;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>