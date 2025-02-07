<template>
  <div class="Headerbox">
    <!--     #region  头部左边-->
    <div class="left-side">在线法律咨询系统后台管理</div>
    <!--    #endregion -->
    <div class="right-side">
      <i>
        <el-row class="block-col-2">
          <el-col :span="12">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"> {{ user.userName }}<i class="el-icon-arrow-down el-icon--right" style="margin-top: 2px"></i> </span>
              <el-dropdown-menu slot="">
                <el-dropdown-item
                  ><span @click="backUserLogin()"><i class="iconfont icon-jinru">退出</i></span></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row></i
      >
      <img :src="user.avatar" />
      <i class="iconfont icon-xiaoxi1"></i>
      <i class="iconfont icon-wenhao"></i>
      <i class="iconfont icon-sousuo"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "../../router/index";

const user = JSON.parse(localStorage.getItem("userInfo"));

const backUserLogin = () => {
  router.push({ path: "/home" });
};
</script>

<style scoped>
.Headerbox {
  width: 100%;
  height: 50px;
  background-color: #0000005f;
  border-top: 2px solid rgba(255, 255, 255, 0.7);
  border-top-right-radius: 20px;
  backdrop-filter: blur(100px);
  margin: 0 auto;
  display: flex;
}

.Headerbox .left-side {
  flex: 0 0 30%;
  font-size: 20px;
  padding: 10px 15px;
  font-weight: bold;
  color: #ffffff;
}
.Headerbox .left-side img {
  height: 50px;
  width: 100px;
}
.Headerbox .right-side {
  flex: 0 0 70%;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  width: 100px;
  color: #ffffff;
}
.Headerbox .right-side img {
  height: 30px;
  width: 30px;
  filter: saturate(75%);
  border-radius: 50%;
  float: right;
  margin-top: 8px;
  margin-right: 6px;
}
.Headerbox .right-side i {
  margin-top: 15px;
  font-size: 15px;
  float: right;
  margin-right: 16px;
}
.Headerbox .right-side i span {
  margin-top: -2px;
  float: right;
}
</style>