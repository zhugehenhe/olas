<script setup>
import { login, getUserInfo } from "../../api";
import image from "@/assets/image";
import router from "@/router";
import { userStore } from "../../store";
const user = userStore();
const { loginbg } = image;
let loginUser = reactive({
  userName: "",
  password: "",
});
const toRegister = () => {
  router.push("/register");
};
const Login = () => {
  login(loginUser).then((res) => {
    if (res.status === 200) {
      ElMessage({
        type: "success",
        message: "登录成功",
      });
      localStorage.setItem("token", res.data);
      getUserInfo().then((res) => {
        user.updateUserInfo(res.data);
        if (res.status == 200) {
          router.push("/OLAS/index");
        }
      });
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
</script>
<template>
  <div class="login-form-container">
    <el-image class="login-bg" :src="loginbg"></el-image>
    <el-form class="login-form" :model="loginUser">
      <h2>密码登录</h2>
      <el-form-item label="账号" prop="phone">
        <el-input v-model="loginUser.userName" placeholder="请输入手机号/邮箱/用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginUser.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="Login"> 登录 </el-button>
        <el-button link @click="toRegister"> 前往注册 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f7fa;

  .login-bg {
    float: left;
    width: 40%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .login-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;

    h2 {
      margin-bottom: 20px;
      text-align: center;
      color: #333;
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>