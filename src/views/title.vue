<script setup>
import { userStore } from "../store";
import { getUserInfo } from "../api";
import router from "../router";
const user = userStore();
const toLogin = () => {
  router.push("/login");
};
const logout = () => {
  localStorage.clear();
  window.location.reload();
};
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    getUserInfo().then((res) => {
      user.updateUserInfo(res.data);
    });
  }
});
</script>
<template>
  <div class="title">
    <div class="left_title">
      <router-link to="/home">首页</router-link>
      <router-link to="/home">法律咨询</router-link>
      <router-link to="/home">找律师</router-link>
    </div>
    <div class="right_title">
      <span v-if="!user.loginStatus">免费注册</span>
      <span v-if="!user.loginStatus" @click="toLogin">登录</span>
      <span v-if="user.loginStatus">{{ user.userInfo.nickName }}</span>
      <span v-if="user.loginStatus" @click="logout">退出登录</span>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.title {
  display: flex;
  width: 1180px;
  margin: 0 auto;
  justify-content: space-between;
  line-height: 40px;
}
.left_title {
  flex-grow: 1;
  a {
    margin: 0 10px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
}
.right_title {
  flex-grow: 1;
  text-align: right;
  span {
    margin: 0 10px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>