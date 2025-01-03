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
  <el-image style="float: left; width: 35%; margin-right: 10px" :src="loginbg">
  </el-image>
  <el-form v-model="loginUser">
    <el-form-item label="账号" prop="phone">
      <el-input
        v-model="loginUser.userName"
        placeholder="请输入手机号/邮箱/用户名"
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="margin: auto; width: 100px"
        @click="Login(loginUser)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
</style>