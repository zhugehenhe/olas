<script setup>
import { ElMessage } from "element-plus";
import { getPhoneCode, loginPhone, getUserInfo } from "../../api";
import image from "@/assets/image";
import router from "@/router";
import { userStore } from "../../store";
const user = userStore();
const { loginbg } = image;
let loginCode = reactive({
  phone: "",
  code: "",
});
const getCode = () => {
  if (loginCode.phone === "") {
    ElMessage({ type: "error", message: "请输入手机号" });
    return;
  }
  getPhoneCode(loginCode.phone).then((res) => {
    if (res.code === 200) {
      ElMessage.success("验证码已发送");
    }
  });
};
const toRegister = () => {
  router.push("/register");
};
const login = () => {
  if (loginCode.phone === "") {
    ElMessage({ type: "error", message: "请输入手机号" });
    return;
  }
  loginPhone(loginCode).then((res) => {
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
    <el-form class="login-form" :model="loginCode">
      <h2>验证码登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginCode.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="loginCode.code" maxlength="6" placeholder="请输入六位验证码">
          <template #append>
            <a @click="getCode" style="cursor: pointer; color: #409eff">获取验证码</a>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="login"> 登录 </el-button>
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

    .el-input-group__append a {
      text-decoration: none;
      color: #409eff;
    }
  }
}
</style>