<script setup>
import { ElMessage } from "element-plus";
import { getPhoneCode, loginPhone } from "../../api";
import image from "@/assets/image";
import router from "@/router";
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
      router.push("/home");
      localStorage.setItem("token", res.data);
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
  <el-form v-model="loginCode">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="loginCode.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码">
      <el-input
        v-model="loginCode.code"
        maxlength="6"
        placeholder="请输入六位验证码"
      >
        <template #append
          ><a @click="getCode" style="cursor: pointer">获取验证码</a></template
        >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="margin: auto; width: 100px"
        @click="login(loginCode)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
</style>