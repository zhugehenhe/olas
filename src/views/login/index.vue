<script setup>
import CodeLogin from "./CodeLogin.vue";
import PasswordLogin from "./PasswordLogin.vue";
const activeName = ref("first");
</script>
<template>
  <div class="login-container">
    <h1 class="system-title">在线法律咨询系统</h1>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="验证码登录" name="first">
        <CodeLogin v-if="activeName === 'first'" />
      </el-tab-pane>
      <el-tab-pane label="密码登录" name="second">
        <PasswordLogin v-if="activeName === 'second'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(#fff1eb, #ace0f9 100%);
  display: flex;
  flex-direction: column; /* 修改为列布局 */
  justify-content: center;
  align-items: center;

  .system-title {
    margin-bottom: 20px; /* 根据需要调整标题与表单的距离 */
    font-size: 24px;
    color: #303133;
    text-align: center; /* 确保标题居中 */
  }

  .demo-tabs {
    background-color: #fff;
    width: 500px;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .el-tabs__header {
      margin-bottom: 20px;
    }

    .el-tabs__item {
      font-size: 16px;
    }
  }
}
</style>